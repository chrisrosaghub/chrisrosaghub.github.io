/**
 * AI-powered learning path generator.
 * Uses the OpenAI chat completions API (or any compatible endpoint).
 * NOTE(ai): All data is ephemeral — no persistence outside the session.
 */

import type { Level } from "@/lib/brainy-data";

const LEVEL_DESCRIPTIONS: Record<Level, string> = {
  kindergarten: "Kindergarten (age 5-6): use very simple words, concrete ideas, short sentences",
  grade1: "1st Grade (age 6-7): simple vocabulary, friendly tone, relatable examples",
  grade2: "2nd Grade (age 7-8): basic vocabulary, straightforward sentences",
  grade3: "3rd Grade (age 8-9): intermediate vocabulary, can handle a bit more detail",
  grade4: "4th Grade (age 9-10): more complex concepts, richer vocabulary",
};

export interface AIQuestion {
  prompt: string;
  choices: string[];
  /** 0-based index of the correct choice. */
  answer: number;
  explanation: string;
}

export interface AILearningStep {
  emoji: string;
  title: string;
  description: string;
  keyPoints: string[];
  questions: AIQuestion[];
}

export interface GeneratedLearningPath {
  id: string;
  topic: string;
  level: Level;
  title: string;
  summary: string;
  emoji: string;
  steps: AILearningStep[];
  generatedAt: number;
}

export interface GenerateOptions {
  topic: string;
  level: Level;
  apiKey: string;
  baseUrl?: string;
  model?: string;
}

const SYSTEM_PROMPT =
  "You are a friendly, encouraging educational content creator for children. " +
  "Generate age-appropriate, engaging learning content. " +
  "Always respond with valid JSON only — no markdown code fences, no extra text.";

function buildUserPrompt(topic: string, level: Level): string {
  const levelDesc = LEVEL_DESCRIPTIONS[level];
  return `Create a learning path for a student at level: ${levelDesc}

Topic: "${topic}"

Return ONLY valid JSON matching this exact schema (no markdown, no text outside the JSON):
{
  "title": "Fun, catchy title for this learning journey",
  "summary": "1-2 sentences describing what they will discover",
  "emoji": "single emoji representing the topic",
  "steps": [
    {
      "emoji": "single emoji for this step",
      "title": "Short step title",
      "description": "2-3 sentences explaining this concept at the appropriate reading level",
      "keyPoints": ["Fun fact or key idea 1", "Fun fact or key idea 2", "Fun fact or key idea 3"],
      "questions": [
        {
          "prompt": "Question text?",
          "choices": ["Choice A", "Choice B", "Choice C", "Choice D"],
          "answer": 0,
          "explanation": "Brief, kid-friendly explanation of why the answer is correct"
        }
      ]
    }
  ]
}

Rules:
- Exactly 3-4 steps total
- Each step must have exactly 3 questions
- Language and complexity must match: ${levelDesc}
- Tone: fun, warm, encouraging — like a great teacher
- Distractors should be plausible but clearly wrong when you know the material
- "answer" is the 0-based index (0, 1, 2, or 3) of the correct choice`;
}

function normalisePath(
  raw: Record<string, unknown>,
  topic: string,
  level: Level,
): GeneratedLearningPath {
  const steps = Array.isArray(raw.steps) ? raw.steps : [];
  return {
    id: crypto.randomUUID(),
    topic,
    level,
    title: String(raw.title ?? topic),
    summary: String(raw.summary ?? ""),
    emoji: String(raw.emoji ?? "📚"),
    steps: steps.map((s: Record<string, unknown>) => ({
      emoji: String(s.emoji ?? "📖"),
      title: String(s.title ?? "Step"),
      description: String(s.description ?? ""),
      keyPoints: Array.isArray(s.keyPoints) ? (s.keyPoints as unknown[]).map(String) : [],
      questions: Array.isArray(s.questions)
        ? (s.questions as Record<string, unknown>[]).map((q) => ({
            prompt: String(q.prompt ?? ""),
            choices: Array.isArray(q.choices) ? (q.choices as unknown[]).map(String) : [],
            answer: Number(q.answer ?? 0),
            explanation: String(q.explanation ?? ""),
          }))
        : [],
    })),
    generatedAt: Date.now(),
  };
}

export async function generateLearningPath(
  options: GenerateOptions,
): Promise<GeneratedLearningPath> {
  const {
    topic,
    level,
    apiKey,
    baseUrl = "https://api.openai.com",
    model = "gpt-4o-mini",
  } = options;

  const cleanBase = baseUrl.replace(/\/$/, "");

  const response = await fetch(`${cleanBase}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(topic, level) },
      ],
      temperature: 0.7,
      max_tokens: 3500,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    let message = `API error ${response.status}`;
    try {
      const err = (await response.json()) as { error?: { message?: string } };
      if (err.error?.message) message = err.error.message;
    } catch {
      // ignore parse failure
    }
    throw new Error(message);
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("No content returned from AI");

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(content) as Record<string, unknown>;
  } catch {
    throw new Error("AI returned malformed JSON");
  }

  if (!parsed.title || !Array.isArray(parsed.steps)) {
    throw new Error("AI response is missing required fields (title, steps)");
  }

  return normalisePath(parsed, topic, level);
}
