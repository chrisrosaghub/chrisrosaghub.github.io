/**
 * Internal MCP call wrapper — not for direct use in hooks.
 * Import typed functions from the server-specific client files instead.
 */

import { invokeMcpServer } from './mcp-service-client';
import { extractItems } from './mcp-response-parser';

export { McpToolError } from './mcp-response-parser';

/**
 * Dispatch a `tools/call` to one of the MCP servers, then flatten the
 * response into an array of typed items.
 *
 * Note: `sessionId` is passed through for future use but is currently ignored
 * — each call creates a fresh MCP session. Pass `''`.
 */
export async function callM365Mcp<
  ResponseData = Record<string, unknown>,
  RequestParams = Record<string, unknown>,
>(
  server: string,
  sessionId: string,
  toolName: string,
  args: RequestParams,
): Promise<ResponseData[]> {
  const result = await invokeMcpServer(server, sessionId, {
    jsonrpc: '2.0',
    id: crypto.randomUUID(),
    method: 'tools/call',
    params: { name: toolName, arguments: args },
  });
  return extractItems<ResponseData>(result);
}

/**
 * Strip responseSchema from args, serialize it, and merge into the message field.
 * Used by NL-backed tool wrappers (copilotChat, searchMessages, searchTeamsMessages).
 */
export function buildNlToolArgs<
  T extends {
    message: string;
    responseSchema: Record<string, 'string' | 'number' | 'boolean'>;
  },
>(args: T): Omit<T, 'responseSchema'> {
  const { responseSchema, ...rest } = args;
  const schemaStr = Object.entries(responseSchema)
    .map(([key, type]) => `${key}:${type}`)
    .join(', ');
  return {
    ...rest,
    message: `${rest.message}. Return data as a flat JSON array with the following properties -> ${schemaStr}`,
  } as Omit<T, 'responseSchema'>;
}
