/**
 * MCP response parsing utilities.
 * Handles JSON-RPC envelope unwrapping, SSE stripping, fenced-JSON extraction,
 * and domain-specific response shape normalization.
 */

/** Error thrown when an MCP tool call fails (e.g., 429 rate limit, auth failure, bad arguments). */
export class McpToolError extends Error {
  readonly isRateLimited: boolean;

  constructor(message: string) {
    super(message);
    this.name = 'McpToolError';
    this.isRateLimited =
      message.includes('429') || message.toLowerCase().includes('rate limit');
  }
}

/** Extracts a JSON array from a markdown fence, or parses the text directly. */
function parseFencedJson<T>(text: string): T[] {
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/m);
  const json = fenceMatch?.[1] ?? text;
  const parsed: unknown = JSON.parse(json.trim());
  return Array.isArray(parsed) ? (parsed as T[]) : [parsed as T];
}

/**
 * Shared layers 1–4: unwrap { success, data } → SSE → JSON-RPC → content[0].text → wrapper.
 * Returns the parsed wrapper object, or null if any layer fails. Throws McpToolError when
 * the JSON-RPC result has isError: true (e.g. 429 rate limits).
 */
function unwrapToWrapper(raw: unknown): Record<string, unknown> | null {
  try {
    // Layer 1: Unwrap { success, data } envelope if present
    let text: string;
    if (typeof raw === 'string') {
      try {
        const envelope = JSON.parse(raw) as Record<string, unknown>;
        text = typeof envelope?.data === 'string' ? envelope.data : raw;
      } catch {
        text = raw;
      }
    } else if (raw !== null && typeof raw === 'object' && 'data' in raw) {
      text = String((raw as Record<string, unknown>).data);
    } else if (raw !== null && typeof raw === 'object') {
      text = JSON.stringify(raw);
    } else {
      return null;
    }

    // Layer 2: Strip SSE envelope — get the line starting with "data: "
    const dataLine = text.split('\n').find((l) => l.startsWith('data:'));
    const jsonRpcStr = dataLine ? dataLine.slice(6) : text;

    // Layer 3: Parse JSON-RPC envelope
    const rpc = JSON.parse(jsonRpcStr) as Record<string, unknown>;
    const result = rpc?.result as Record<string, unknown> | undefined;

    // Check for MCP tool-level errors (e.g., 429 rate limits)
    if (result?.isError === true) {
      const content = result.content;
      const errorText = Array.isArray(content)
        ? (content as Array<{ type: string; text?: string }>)
            .filter((c) => c.type === 'text')
            .map((c) => c.text ?? '')
            .join(' ')
        : 'Unknown MCP tool error';
      throw new McpToolError(errorText);
    }

    const content = result?.content;
    if (!Array.isArray(content)) return null;
    const textEntry = (content as Array<{ type: string; text?: string }>).find(
      (c) => c.type === 'text',
    );
    if (!textEntry?.text) return null;

    // Layer 4: Parse wrapper.
    const rawText = textEntry.text;
    try {
      return JSON.parse(rawText) as Record<string, unknown>;
    } catch {
      const jsonStart = rawText.search(/[{[]/);
      if (jsonStart === -1) return null;
      return JSON.parse(rawText.slice(jsonStart)) as Record<string, unknown>;
    }
  } catch (err) {
    // Re-throw MCP tool errors so callers (and react-query) see them; swallow parse errors.
    if (err instanceof McpToolError) {
      throw err;
    }
    return null;
  }
}

/**
 * Parses any MCP response into a flat array of items. Handles all response shapes:
 *
 * - Graph API list: rawResponse → { value: T[] }
 * - LLM conversation: rawResponse → { messages: [...] } → markdown fence JSON
 * - Service envelope: { message: string, data: T | T[] }
 * - Domain-keyed array: { teams: T[] }, { channels: T[] }, etc.
 * - Single-record: plain object → wrapped in one-element array
 * - NL reply: { reply: string } with optional fenced JSON
 */
export function extractItems<T = unknown>(raw: unknown): T[] {
  const wrapper = unwrapToWrapper(raw);
  if (!wrapper) return [];

  // rawResponse field: present for MailTools and mcp_m365copilot responses
  if (typeof wrapper.rawResponse === 'string') {
    try {
      const inner = JSON.parse(wrapper.rawResponse) as Record<string, unknown>;

      if (Array.isArray(inner.value)) {
        return inner.value as T[];
      }

      if (Array.isArray(inner.messages)) {
        const messages = inner.messages as Array<{ text?: string }>;
        if (messages.length < 2) return [];
        const replyText = messages[messages.length - 1]?.text ?? '';
        return parseFencedJson<T>(replyText);
      }

      return [inner as unknown as T];
    } catch {
      return [];
    }
  }

  // Natural-language reply field
  if (typeof wrapper.reply === 'string') {
    try {
      return parseFencedJson<T>(wrapper.reply);
    } catch {
      return [];
    }
  }

  // Service envelope: { message: string, data: T | T[] }
  if (
    typeof wrapper.message === 'string' &&
    wrapper.data != null &&
    typeof wrapper.data === 'object'
  ) {
    if (Array.isArray(wrapper.data)) {
      return wrapper.data as T[];
    }
    const data = wrapper.data as Record<string, unknown>;
    if (Array.isArray(data.value)) {
      return data.value as T[];
    }
    return [data as unknown as T];
  }

  // Domain-keyed array: { teams: T[] }, { channels: T[] }, etc.
  const arrayValue = Object.values(wrapper).find(
    (v) =>
      Array.isArray(v) &&
      v.length > 0 &&
      typeof v[0] === 'object' &&
      v[0] !== null,
  );
  if (arrayValue !== undefined) {
    return arrayValue as T[];
  }

  // Single-record direct response
  if (Object.keys(wrapper).length > 0) {
    return [wrapper as unknown as T];
  }

  return [];
}
