/**
 * Brainy Buddies — Kindergarten Sight Words activities.
 * Loaded by brainy-data.ts and merged into the ACTIVITIES list.
 *
 * Sight words are very common words kids learn to recognize on sight,
 * roughly based on the Dolch / Fry pre-K and Kindergarten lists.
 */
import type { Activity } from "@/lib/brainy-data";

export const SIGHT_WORDS_ACTIVITIES: Activity[] = [
  // --- Sight Words 1: very first words ---
  {
    id: "k-read-sw1",
    subjectId: "reading",
    level: "kindergarten",
    title: "Sight Words: First Words",
    description: "the, a, I, see, is, go, to, and, my, like.",
    emoji: "\u{1F4D6}",
    questions: [
      { id: "q1", prompt: "Which word is 'the'?", choices: ["the", "and", "see", "my"], answer: 0 },
      { id: "q2", prompt: "Which word means 'me, myself'?", choices: ["go", "I", "to", "a"], answer: 1 },
      { id: "q3", prompt: "Finish: I ___ a cat.", choices: ["see", "the", "and", "my"], answer: 0 },
      { id: "q4", prompt: "Finish: Let's ___ home.", choices: ["the", "go", "I", "and"], answer: 1 },
      { id: "q5", prompt: "Which word is 'and'?", choices: ["and", "see", "go", "is"], answer: 0 },
      { id: "q6", prompt: "Finish: This ___ my dog.", choices: ["is", "to", "see", "the"], answer: 0 },
      { id: "q7", prompt: "Which word is 'my'?", choices: ["the", "I", "my", "a"], answer: 2 },
      { id: "q8", prompt: "Finish: I want ___ play.", choices: ["to", "my", "and", "a"], answer: 0 },
      { id: "q9", prompt: "Finish: I ___ ice cream.", choices: ["the", "like", "to", "go"], answer: 1 },
      { id: "q10", prompt: "Which is the word 'a'?", choices: ["and", "I", "a", "the"], answer: 2 },
      { id: "q11", prompt: "Finish: I see ___ bug.", choices: ["a", "I", "go", "like"], answer: 0 },
      { id: "q12", prompt: "Which word says 'see'?", choices: ["see", "the", "and", "go"], answer: 0 },
    ],
  },

  // --- Sight Words 2: little action words ---
  {
    id: "k-read-sw2",
    subjectId: "reading",
    level: "kindergarten",
    title: "Sight Words: Little Actions",
    description: "can, run, jump, look, play, come, here, said, do, you.",
    emoji: "\u{1F3C3}",
    questions: [
      { id: "q1", prompt: "Which word is 'can'?", choices: ["can", "do", "come", "run"], answer: 0 },
      { id: "q2", prompt: "Finish: I ___ fast.", choices: ["run", "come", "said", "here"], answer: 0 },
      { id: "q3", prompt: "Finish: ___ at the bird!", choices: ["Look", "You", "Do", "Said"], answer: 0 },
      { id: "q4", prompt: "Finish: Let's ___ a game.", choices: ["play", "said", "here", "you"], answer: 0 },
      { id: "q5", prompt: "Which word is 'jump'?", choices: ["come", "jump", "look", "do"], answer: 1 },
      { id: "q6", prompt: "Finish: Please ___ here.", choices: ["come", "said", "can", "play"], answer: 0 },
      { id: "q7", prompt: "Finish: The dog is ___ .", choices: ["here", "you", "do", "said"], answer: 0 },
      { id: "q8", prompt: "Finish: Mom ___ , 'hi!'", choices: ["said", "come", "look", "play"], answer: 0 },
      { id: "q9", prompt: "Finish: I ___ my homework.", choices: ["do", "you", "here", "said"], answer: 0 },
      { id: "q10", prompt: "Finish: Can ___ help me?", choices: ["you", "do", "said", "jump"], answer: 0 },
      { id: "q11", prompt: "Which word is 'here'?", choices: ["come", "here", "said", "play"], answer: 1 },
    ],
  },

  // --- Sight Words 3: colors & numbers as words ---
  {
    id: "k-read-sw3",
    subjectId: "reading",
    level: "kindergarten",
    title: "Sight Words: Colors & Numbers",
    description: "red, blue, yellow, green, one, two, three, four, five.",
    emoji: "\u{1F308}",
    questions: [
      { id: "q1", prompt: "Which word is 'red'?", choices: ["red", "blue", "two", "one"], answer: 0 },
      { id: "q2", prompt: "Which word is 'blue'?", choices: ["one", "blue", "green", "five"], answer: 1 },
      { id: "q3", prompt: "Which word means the color of the sun?", choices: ["green", "yellow", "blue", "two"], answer: 1 },
      { id: "q4", prompt: "Which word matches 3?", choices: ["two", "three", "four", "five"], answer: 1 },
      { id: "q5", prompt: "Which word matches 1?", choices: ["one", "two", "four", "five"], answer: 0 },
      { id: "q6", prompt: "Which word matches the color of grass?", choices: ["red", "blue", "green", "yellow"], answer: 2 },
      { id: "q7", prompt: "Which word matches 5?", choices: ["four", "five", "three", "one"], answer: 1 },
      { id: "q8", prompt: "Finish: I have ___ pets. (number 2)", choices: ["two", "four", "red", "green"], answer: 0 },
      { id: "q9", prompt: "Finish: My shirt is ___ . (color of a stop sign)", choices: ["blue", "green", "red", "yellow"], answer: 2 },
      { id: "q10", prompt: "Which word matches 4?", choices: ["three", "four", "five", "one"], answer: 1 },
      { id: "q11", prompt: "Finish: The sky is ___ today.", choices: ["blue", "red", "three", "five"], answer: 0 },
    ],
  },

  // --- Sight Words 4: tiny everyday words ---
  {
    id: "k-read-sw4",
    subjectId: "reading",
    level: "kindergarten",
    title: "Sight Words: Everyday Words",
    description: "in, on, up, it, big, little, yes, no, we, are.",
    emoji: "\u{1F31F}",
    questions: [
      { id: "q1", prompt: "Which word is 'in'?", choices: ["on", "in", "up", "it"], answer: 1 },
      { id: "q2", prompt: "Finish: The cat is ___ the box.", choices: ["in", "up", "no", "we"], answer: 0 },
      { id: "q3", prompt: "Finish: The book is ___ the table.", choices: ["in", "on", "we", "big"], answer: 1 },
      { id: "q4", prompt: "Finish: Look ___ at the stars!", choices: ["up", "on", "no", "it"], answer: 0 },
      { id: "q5", prompt: "Which word means the opposite of 'little'?", choices: ["big", "on", "yes", "we"], answer: 0 },
      { id: "q6", prompt: "Which word means the opposite of 'big'?", choices: ["yes", "little", "in", "we"], answer: 1 },
      { id: "q7", prompt: "Which word means the opposite of 'no'?", choices: ["yes", "are", "on", "up"], answer: 0 },
      { id: "q8", prompt: "Finish: ___ are friends.", choices: ["We", "It", "In", "Yes"], answer: 0 },
      { id: "q9", prompt: "Finish: You ___ kind.", choices: ["are", "in", "on", "no"], answer: 0 },
      { id: "q10", prompt: "Finish: ___ is a sunny day.", choices: ["It", "Up", "We", "No"], answer: 0 },
      { id: "q11", prompt: "Which word is 'no'?", choices: ["yes", "we", "no", "on"], answer: 2 },
    ],
  },
];
