import type { Activity, Level } from "@/lib/brainy-data";
import type { LearnItem } from "@/lib/science-learn-data";

interface WordPart {
  form: string;
  meaning: string;
  example: string;
  exampleMeaning: string;
  emoji: string;
}

interface ModuleDefinition {
  id: string;
  title: string;
  description: string;
  emoji: string;
  levels: Level[];
  intro: string;
  parts: WordPart[];
}

const DISTRACTOR_MEANINGS = [
  "again", "before", "not", "under", "life", "water", "write", "hear",
  "see", "carry", "time", "many", "full of", "without", "one who",
  "the act or result of", "against", "around", "above normal", "below normal",
];

function choicesFor(correct: string, seed: number): { choices: string[]; answer: number } {
  const wrong = DISTRACTOR_MEANINGS
    .filter((choice) => choice !== correct)
    .slice(seed % 7, (seed % 7) + 3);
  while (wrong.length < 3) wrong.push(DISTRACTOR_MEANINGS[wrong.length]);
  const answer = seed % 4;
  const choices = [...wrong];
  choices.splice(answer, 0, correct);
  return { choices, answer };
}

function buildActivity(module: ModuleDefinition): Activity {
  return {
    id: module.id,
    subjectId: "language",
    title: module.title,
    description: module.description,
    emoji: module.emoji,
    availableLevels: module.levels,
    questions: module.parts.flatMap((part, index) => {
      const definition = choicesFor(part.meaning, index);
      const application = choicesFor(part.exampleMeaning, index + 4);
      return [
        {
          id: `q${index * 2 + 1}`,
          prompt: `What does the word part “${part.form}” mean?`,
          choices: definition.choices,
          answer: definition.answer,
          explanation: `${part.form} means ${part.meaning}. ${part.example} means ${part.exampleMeaning}.`,
        },
        {
          id: `q${index * 2 + 2}`,
          prompt: `Use the word part “${part.form}” to decode “${part.example}.” What does it mean?`,
          choices: application.choices,
          answer: application.answer,
          explanation: `${part.form} means ${part.meaning}, so ${part.example} means ${part.exampleMeaning}.`,
        },
      ];
    }),
  };
}

function buildLearnItems(module: ModuleDefinition): LearnItem[] {
  return [
    { emoji: module.emoji, title: module.title, fact: module.intro },
    ...module.parts.map((part) => ({
      emoji: part.emoji,
      title: `${part.form} = ${part.meaning}`,
      fact: `${part.form} means ${part.meaning}. ${part.example} means ${part.exampleMeaning}. Look for this word part as a clue when you meet a new word.`,
    })),
  ];
}

const MODULES: ModuleDefinition[] = [
  // Kindergarten–Grade 1: familiar words and concrete meanings.
  {
    id: "lang-early-prefixes", title: "Word Beginnings", description: "Use simple prefixes to unlock familiar words.", emoji: "🧩",
    levels: ["kindergarten", "grade1"],
    intro: "A prefix is a small word part added to the beginning of a word. These two prefixes make meanings young readers use every day.",
    parts: [
      { form: "un-", meaning: "not", example: "unhappy", exampleMeaning: "not happy", emoji: "🙃" },
      { form: "re-", meaning: "again", example: "reread", exampleMeaning: "read again", emoji: "🔄" },
      { form: "pre-", meaning: "before", example: "preview", exampleMeaning: "see before", emoji: "⏮️" },
      { form: "mis-", meaning: "wrongly", example: "miscount", exampleMeaning: "count wrongly", emoji: "🔢" },
    ],
  },
  {
    id: "lang-early-suffixes", title: "Word Endings", description: "Notice endings that tell when or how many.", emoji: "🧱",
    levels: ["kindergarten", "grade1"],
    intro: "A suffix is a word part added to the end. These endings help readers know whether there is one or more, or whether an action is happening now or already happened.",
    parts: [
      { form: "-s", meaning: "more than one", example: "cats", exampleMeaning: "more than one cat", emoji: "🐈" },
      { form: "-ed", meaning: "happened in the past", example: "jumped", exampleMeaning: "jump in the past", emoji: "⏪" },
      { form: "-ing", meaning: "happening now", example: "running", exampleMeaning: "run happening now", emoji: "🏃" },
      { form: "-er", meaning: "one who", example: "helper", exampleMeaning: "one who helps", emoji: "🤝" },
    ],
  },

  // Grades 2–3: common derivational affixes plus a gentle roots introduction.
  {
    id: "lang-prefixes-foundations", title: "Prefixes I", description: "Build meaning with common word beginnings.", emoji: "⬅️",
    levels: ["grade2", "grade3"],
    intro: "Prefixes attach to the beginning of a base word. Learn these high-use prefixes first, then combine each one with words you already know.",
    parts: [
      { form: "un-", meaning: "not", example: "unfair", exampleMeaning: "not fair", emoji: "❌" },
      { form: "re-", meaning: "again", example: "rebuild", exampleMeaning: "build again", emoji: "🔄" },
      { form: "pre-", meaning: "before", example: "preheat", exampleMeaning: "heat before", emoji: "⏮️" },
      { form: "dis-", meaning: "not or opposite", example: "disconnect", exampleMeaning: "not connected", emoji: "🔌" },
      { form: "mis-", meaning: "wrongly", example: "misspell", exampleMeaning: "spell wrongly", emoji: "✏️" },
    ],
  },
  {
    id: "lang-suffixes-foundations", title: "Suffixes I", description: "Build meaning with common word endings.", emoji: "➡️",
    levels: ["grade2", "grade3"],
    intro: "Suffixes attach to the end of a base word. They can change a word's meaning or change how the word works in a sentence.",
    parts: [
      { form: "-ful", meaning: "full of", example: "helpful", exampleMeaning: "full of help", emoji: "✨" },
      { form: "-less", meaning: "without", example: "fearless", exampleMeaning: "without fear", emoji: "🦁" },
      { form: "-ness", meaning: "state or quality", example: "kindness", exampleMeaning: "the quality of being kind", emoji: "💛" },
      { form: "-ly", meaning: "in a certain way", example: "quickly", exampleMeaning: "in a quick way", emoji: "💨" },
      { form: "-able", meaning: "can be", example: "washable", exampleMeaning: "can be washed", emoji: "✅" },
    ],
  },
  {
    id: "lang-roots-starter", title: "Greek & Latin Root Starter", description: "Meet five roots found in science and everyday words.", emoji: "🏛️",
    levels: ["grade2", "grade3"],
    intro: "A root carries a word's central meaning. English borrowed many roots from Greek and Latin. One root can help you decode a whole family of words.",
    parts: [
      { form: "bio", meaning: "life", example: "biology", exampleMeaning: "study of life", emoji: "🌿" },
      { form: "geo", meaning: "earth", example: "geology", exampleMeaning: "study of earth", emoji: "🌍" },
      { form: "aqua", meaning: "water", example: "aquatic", exampleMeaning: "living in water", emoji: "💧" },
      { form: "port", meaning: "carry", example: "portable", exampleMeaning: "can be carried", emoji: "🎒" },
      { form: "aud", meaning: "hear", example: "audience", exampleMeaning: "people who hear a show", emoji: "👂" },
    ],
  },

  // Grades 4–5: content-area roots and multi-syllable affixes.
  {
    id: "lang-greek-roots-i", title: "Greek Roots I", description: "Decode science and technology words with Greek roots.", emoji: "🏛️",
    levels: ["grade4", "grade5"],
    intro: "Greek roots appear often in science, math, and technology. Study a small set at a time and use the examples to reason out unfamiliar words.",
    parts: [
      { form: "photo", meaning: "light", example: "photograph", exampleMeaning: "image made with light", emoji: "📸" },
      { form: "tele", meaning: "far", example: "telescope", exampleMeaning: "tool for seeing far", emoji: "🔭" },
      { form: "micro", meaning: "small", example: "microscope", exampleMeaning: "tool for viewing small things", emoji: "🔬" },
      { form: "graph", meaning: "write or record", example: "autograph", exampleMeaning: "self-written name", emoji: "✍️" },
      { form: "therm", meaning: "heat", example: "thermometer", exampleMeaning: "tool that measures heat", emoji: "🌡️" },
      { form: "phon", meaning: "sound", example: "microphone", exampleMeaning: "tool for small sounds", emoji: "🎤" },
    ],
  },
  {
    id: "lang-latin-roots-i", title: "Latin Roots I", description: "Decode reading and school words with Latin roots.", emoji: "📜",
    levels: ["grade4", "grade5"],
    intro: "Latin roots form many English word families. Find the root, recall its meaning, and then use the rest of the word as extra clues.",
    parts: [
      { form: "dict", meaning: "say or speak", example: "predict", exampleMeaning: "say before", emoji: "🗣️" },
      { form: "vis / vid", meaning: "see", example: "visible", exampleMeaning: "can be seen", emoji: "👁️" },
      { form: "scrib / script", meaning: "write", example: "manuscript", exampleMeaning: "a written document", emoji: "📝" },
      { form: "struct", meaning: "build", example: "construct", exampleMeaning: "build together", emoji: "🏗️" },
      { form: "spect", meaning: "look or see", example: "spectator", exampleMeaning: "one who looks on", emoji: "👀" },
      { form: "rupt", meaning: "break", example: "interrupt", exampleMeaning: "break into", emoji: "💥" },
    ],
  },
  {
    id: "lang-affixes-intermediate", title: "Prefixes & Suffixes II", description: "Use affixes found in longer school words.", emoji: "🧬",
    levels: ["grade4", "grade5"],
    intro: "Longer words often contain both a prefix and a suffix. Decode one part at a time, then combine the clues with the base word.",
    parts: [
      { form: "sub-", meaning: "under", example: "submarine", exampleMeaning: "vehicle under water", emoji: "🚇" },
      { form: "inter-", meaning: "between", example: "international", exampleMeaning: "between nations", emoji: "🌐" },
      { form: "trans-", meaning: "across", example: "transport", exampleMeaning: "carry across", emoji: "🚚" },
      { form: "-ment", meaning: "the act or result of", example: "movement", exampleMeaning: "the act of moving", emoji: "🎬" },
      { form: "-tion", meaning: "the act or result of", example: "invention", exampleMeaning: "the result of inventing", emoji: "💡" },
      { form: "-ist", meaning: "one who", example: "scientist", exampleMeaning: "one who studies science", emoji: "🥼" },
    ],
  },

  // Grades 6–7: academic vocabulary, etymology, and precise contrasts.
  {
    id: "lang-greek-roots-ii", title: "Greek Roots II", description: "Unlock advanced academic words from Greek.", emoji: "🏺",
    levels: ["grade6", "grade7"],
    intro: "Advanced texts combine several Greek word parts. Analyze each part, verify the meaning in context, and notice related words across subjects.",
    parts: [
      { form: "chron", meaning: "time", example: "chronology", exampleMeaning: "study or order of time", emoji: "⏱️" },
      { form: "demo", meaning: "people", example: "democracy", exampleMeaning: "government by the people", emoji: "🗳️" },
      { form: "poly", meaning: "many", example: "polygon", exampleMeaning: "shape with many angles", emoji: "🔷" },
      { form: "mono", meaning: "one", example: "monologue", exampleMeaning: "speech by one person", emoji: "1️⃣" },
      { form: "psych", meaning: "mind", example: "psychology", exampleMeaning: "study of the mind", emoji: "🧠" },
      { form: "path", meaning: "feeling or disease", example: "empathy", exampleMeaning: "feeling with another person", emoji: "💞" },
    ],
  },
  {
    id: "lang-latin-roots-ii", title: "Latin Roots II", description: "Unlock advanced academic words from Latin.", emoji: "🏛️",
    levels: ["grade6", "grade7"],
    intro: "Latin roots can shift spelling while keeping their core meaning. Connect each variant to its word family and use context to confirm your inference.",
    parts: [
      { form: "duc / duct", meaning: "lead", example: "conduct", exampleMeaning: "lead together", emoji: "🧭" },
      { form: "mit / miss", meaning: "send", example: "transmit", exampleMeaning: "send across", emoji: "📨" },
      { form: "cred", meaning: "believe", example: "credible", exampleMeaning: "can be believed", emoji: "🤝" },
      { form: "jur", meaning: "law", example: "jurisdiction", exampleMeaning: "authority of the law", emoji: "⚖️" },
      { form: "bene", meaning: "good or well", example: "benefit", exampleMeaning: "a good result", emoji: "🌟" },
      { form: "temp", meaning: "time", example: "temporary", exampleMeaning: "lasting a short time", emoji: "⌛" },
    ],
  },
  {
    id: "lang-affixes-advanced", title: "Advanced Greek & Latin Affixes", description: "Analyze precise prefixes and suffixes in academic vocabulary.", emoji: "🔎",
    levels: ["grade6", "grade7"],
    intro: "Academic words often preserve Greek and Latin affixes. Compare similar affixes carefully: hyper- and hypo-, for example, point in opposite directions.",
    parts: [
      { form: "hyper-", meaning: "above normal", example: "hyperactive", exampleMeaning: "active above normal", emoji: "⬆️" },
      { form: "hypo-", meaning: "below normal", example: "hypothermia", exampleMeaning: "heat below normal", emoji: "⬇️" },
      { form: "anti-", meaning: "against", example: "antibiotic", exampleMeaning: "working against living bacteria", emoji: "🛡️" },
      { form: "circum-", meaning: "around", example: "circumnavigate", exampleMeaning: "travel around", emoji: "🌎" },
      { form: "-ology", meaning: "study of", example: "geology", exampleMeaning: "study of earth", emoji: "📚" },
      { form: "-ive", meaning: "having the nature of", example: "creative", exampleMeaning: "having the nature of creating", emoji: "🎨" },
    ],
  },
];

export const LANGUAGE_MORPHOLOGY_ACTIVITIES: Activity[] = MODULES.map(buildActivity);

export const LANGUAGE_MORPHOLOGY_LEARN_DATA: Record<string, LearnItem[]> = Object.fromEntries(
  MODULES.map((module) => [module.id, buildLearnItems(module)]),
);
