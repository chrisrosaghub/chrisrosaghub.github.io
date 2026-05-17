/**
 * Brainy Buddies — in-memory data layer.
 * NOTE(ai): Pure ephemeral data. Lost on refresh (per Agents.md). No persistence.
 *
 * Each activity stores a LARGE POOL of questions. At quiz time we randomly
 * sample `QUESTIONS_PER_ROUND` from that pool so re-doing an activity
 * presents different questions every time.
 */
import { KINDERGARTEN_ACTIVITIES } from "@/lib/brainy-data-kindergarten";
import { GRADE1_ACTIVITIES } from "@/lib/brainy-data-grade1";
import { GRADE3_ACTIVITIES } from "@/lib/brainy-data-grade3";
import { SIGHT_WORDS_ACTIVITIES } from "@/lib/brainy-data-sight-words";

export type SubjectId = "math" | "science" | "history" | "geography" | "reading";
export type Level = "kindergarten" | "grade1" | "grade2" | "grade3";
export const LEVELS: { id: Level; label: string; shortLabel: string; emoji: string }[] = [
  { id: "kindergarten", label: "Kindergarten", shortLabel: "K", emoji: "\u{1F33C}" },
  { id: "grade1", label: "1st Grade", shortLabel: "G1", emoji: "\u{1F4D6}" },
  { id: "grade2", label: "2nd Grade", shortLabel: "G2", emoji: "\u{1F4DA}" },
  { id: "grade3", label: "3rd Grade", shortLabel: "G3", emoji: "\u{1F4D9}" },
];

export interface Subject {
  id: SubjectId;
  name: string;
  emoji: string;
  mascot: string;
  tagline: string;
  gradientClass: string;
  ringClass: string;
  textClass: string;
  bgSoftClass: string;
  chartVar: string;
  /** Levels where this subject is available. If omitted, available everywhere. */
  availableLevels?: Level[];
}

export interface Question {
  id: string;
  prompt: string;
  choices: string[];
  /** Index of the correct choice. */
  answer: number;
  /** Short, kid-friendly explanation shown after answering. */
  explanation?: string;
}

export interface Activity {
  id: string;
  subjectId: SubjectId;
  title: string;
  description: string;
  emoji: string;
  /** Grade level (defaults to grade2 if missing). */
  level?: Level;
  /** Full pool of questions for this activity (more than shown per round). */
  questions: Question[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  rule:
    | { kind: "firstActivity" }
    | { kind: "subjectComplete"; subjectId: SubjectId }
    | { kind: "totalStars"; amount: number }
    | { kind: "perfectActivity" }
    | { kind: "streakDays"; days: number }
    | { kind: "dailyChallenge" };
}

export interface ActivityResult {
  activityId: string;
  subjectId: SubjectId;
  correct: number;
  total: number;
  starsEarned: number;
  completedAt: number;
}

export interface ProgressState {
  totalStars: number;
  streakDays: number;
  lastActivityAt: number | null;
  results: ActivityResult[];
  earnedBadgeIds: string[];
  lastDailyChallengeDate: string | null;
  dailyChallengesCompleted: number;
}

/** How many questions to show in a single play-through. */
export const QUESTIONS_PER_ROUND = 5;

export const SUBJECTS: Subject[] = [
  {
    id: "math",
    name: "Math",
    emoji: "🦉",
    mascot: "Ollie the Owl",
    tagline: "Numbers, shapes, and brain teasers",
    gradientClass: "from-orange-300 via-amber-300 to-yellow-300",
    ringClass: "ring-orange-300",
    textClass: "text-orange-700",
    bgSoftClass: "bg-orange-100",
    chartVar: "var(--chart-1)",
  },
  {
    id: "science",
    name: "Science",
    emoji: "🐸",
    mascot: "Finn the Frog",
    tagline: "Discover plants, animals, and space",
    gradientClass: "from-emerald-300 via-green-300 to-lime-300",
    ringClass: "ring-emerald-300",
    textClass: "text-emerald-700",
    bgSoftClass: "bg-emerald-100",
    chartVar: "var(--chart-2)",
  },
  {
    id: "history",
    name: "History",
    emoji: "🦁",
    mascot: "Leo the Lion",
    tagline: "Heroes, holidays, and big moments",
    gradientClass: "from-fuchsia-300 via-purple-300 to-violet-300",
    ringClass: "ring-violet-300",
    textClass: "text-violet-700",
    bgSoftClass: "bg-violet-100",
    chartVar: "var(--chart-3)",
  },
  {
    id: "geography",
    name: "Geography",
    emoji: "🐼",
    mascot: "Pip the Panda",
    tagline: "Maps, places, and amazing landmarks",
    gradientClass: "from-sky-300 via-cyan-300 to-blue-300",
    ringClass: "ring-sky-300",
    textClass: "text-sky-700",
    bgSoftClass: "bg-sky-100",
    chartVar: "var(--chart-4)",
  },
  {
    id: "reading",
    name: "Sight Words",
    emoji: "\u{1F4DA}",
    mascot: "Ruby the Rabbit",
    tagline: "Read super-common words in a snap",
    gradientClass: "from-pink-300 via-rose-300 to-red-300",
    ringClass: "ring-pink-300",
    textClass: "text-pink-700",
    bgSoftClass: "bg-pink-100",
    chartVar: "var(--chart-5)",
    availableLevels: ["kindergarten"],
  },
];

const GRADE2_ACTIVITIES: Activity[] = [
  // -------- MATH --------
  {
    id: "math-add-1",
    subjectId: "math",
    title: "Adding to 100",
    description: "Add 2-digit numbers, sometimes with regrouping.",
    emoji: "➕",
    questions: [
      { id: "q1", prompt: "27 + 38 = ?", choices: ["55", "65", "66", "75"], answer: 1, explanation: "7 + 8 = 15 (carry the 1), then 2 + 3 + 1 = 6. So 65." },
      { id: "q2", prompt: "49 + 26 = ?", choices: ["65", "75", "76", "85"], answer: 1 },
      { id: "q3", prompt: "58 + 34 = ?", choices: ["82", "91", "92", "94"], answer: 2, explanation: "8 + 4 = 12 (carry 1), 5 + 3 + 1 = 9. So 92." },
      { id: "q4", prompt: "15 + 27 + 13 = ?", choices: ["45", "55", "65", "42"], answer: 1 },
      { id: "q5", prompt: "What number plus 18 makes 50?", choices: ["22", "28", "32", "38"], answer: 2, explanation: "50 − 18 = 32." },
      { id: "q6", prompt: "36 + 47 = ?", choices: ["73", "83", "84", "93"], answer: 1 },
      { id: "q7", prompt: "19 + 19 = ?", choices: ["28", "36", "38", "39"], answer: 2, explanation: "Think 20 + 20 = 40, then subtract 2." },
      { id: "q8", prompt: "What is 25 + 25 + 25 + 25?", choices: ["75", "95", "100", "125"], answer: 2 },
      { id: "q9", prompt: "Sam has 24 marbles. He finds 18 more. How many now?", choices: ["32", "42", "44", "52"], answer: 1 },
      { id: "q10", prompt: "68 + 14 = ?", choices: ["72", "81", "82", "84"], answer: 2 },
      { id: "q11", prompt: "What plus 35 equals 80?", choices: ["35", "45", "55", "65"], answer: 1 },
      { id: "q12", prompt: "39 + 26 = ?", choices: ["55", "63", "65", "75"], answer: 2 },
      { id: "q13", prompt: "50 + 47 = ?", choices: ["87", "96", "97", "107"], answer: 2 },
      { id: "q14", prompt: "12 + 18 + 20 = ?", choices: ["40", "48", "50", "60"], answer: 2 },
    ],
  },
  {
    id: "math-sub-1",
    subjectId: "math",
    title: "Take Away Time",
    description: "Subtract 2-digit numbers, sometimes with borrowing.",
    emoji: "➖",
    questions: [
      { id: "q1", prompt: "63 − 27 = ?", choices: ["34", "36", "44", "46"], answer: 1, explanation: "Borrow from the tens: 13 − 7 = 6, 5 − 2 = 3. So 36." },
      { id: "q2", prompt: "82 − 45 = ?", choices: ["27", "33", "37", "47"], answer: 2 },
      { id: "q3", prompt: "100 − 38 = ?", choices: ["52", "62", "68", "72"], answer: 1 },
      { id: "q4", prompt: "71 − 29 = ?", choices: ["32", "42", "48", "52"], answer: 1, explanation: "71 − 30 = 41, then add 1 back → 42." },
      { id: "q5", prompt: "Mia had 54 stickers. She gave away 28. How many are left?", choices: ["24", "26", "32", "36"], answer: 1 },
      { id: "q6", prompt: "90 − 47 = ?", choices: ["33", "43", "47", "53"], answer: 1 },
      { id: "q7", prompt: "56 − 19 = ?", choices: ["27", "37", "39", "47"], answer: 1 },
      { id: "q8", prompt: "What is 100 − 75?", choices: ["15", "20", "25", "35"], answer: 2 },
      { id: "q9", prompt: "45 − 17 = ?", choices: ["22", "28", "32", "38"], answer: 1 },
      { id: "q10", prompt: "Jake has 80¢. He spends 35¢. How much is left?", choices: ["35¢", "45¢", "55¢", "65¢"], answer: 1 },
      { id: "q11", prompt: "73 − 38 = ?", choices: ["25", "35", "45", "55"], answer: 1 },
      { id: "q12", prompt: "60 − 26 = ?", choices: ["24", "34", "36", "44"], answer: 1 },
      { id: "q13", prompt: "What is 88 − 49?", choices: ["29", "39", "41", "49"], answer: 1 },
      { id: "q14", prompt: "There are 100 cookies. 64 are eaten. How many are left?", choices: ["26", "34", "36", "46"], answer: 2 },
    ],
  },
  {
    id: "math-place",
    subjectId: "math",
    title: "Hundreds, Tens & Ones",
    description: "Place value up to 1,000.",
    emoji: "🔢",
    questions: [
      { id: "q1", prompt: "In 472, the digit 4 is in the ___ place.", choices: ["ones", "tens", "hundreds", "thousands"], answer: 2 },
      { id: "q2", prompt: "What is 300 + 60 + 5?", choices: ["356", "360", "365", "3,605"], answer: 2 },
      { id: "q3", prompt: "What number is 10 more than 396?", choices: ["306", "397", "406", "496"], answer: 2, explanation: "Add 1 ten: the tens roll over to make a new hundred." },
      { id: "q4", prompt: "Which number has 5 hundreds, 0 tens, and 8 ones?", choices: ["58", "508", "580", "805"], answer: 1 },
      { id: "q5", prompt: "What is 100 less than 624?", choices: ["514", "524", "623", "724"], answer: 1 },
      { id: "q6", prompt: "In 836, the digit 3 is in the ___ place.", choices: ["ones", "tens", "hundreds", "thousands"], answer: 1 },
      { id: "q7", prompt: "What number is 10 less than 405?", choices: ["395", "399", "404", "415"], answer: 0 },
      { id: "q8", prompt: "Which number is 700 + 40 + 2?", choices: ["724", "742", "7,042", "7,402"], answer: 1 },
      { id: "q9", prompt: "Which number is the smallest?", choices: ["402", "420", "204", "240"], answer: 2 },
      { id: "q10", prompt: "What is 100 more than 568?", choices: ["569", "578", "668", "768"], answer: 2 },
      { id: "q11", prompt: "Write 'four hundred sixteen' as a number.", choices: ["406", "416", "461", "460"], answer: 1 },
      { id: "q12", prompt: "In 999, how many hundreds are there?", choices: ["1", "9", "99", "999"], answer: 1 },
      { id: "q13", prompt: "The number 250 has how many tens?", choices: ["2", "5", "25", "250"], answer: 1 },
    ],
  },
  {
    id: "math-time",
    subjectId: "math",
    title: "Telling Time",
    description: "Read clocks to the 5 minutes and figure out elapsed time.",
    emoji: "⏰",
    questions: [
      { id: "q1", prompt: "How many minutes are in a quarter of an hour?", choices: ["5", "10", "15", "30"], answer: 2 },
      { id: "q2", prompt: "The minute hand is on the 8. How many minutes past the hour?", choices: ["8", "30", "40", "45"], answer: 2, explanation: "Each number on the clock = 5 minutes. 8 × 5 = 40." },
      { id: "q3", prompt: "School starts at 8:15 and lunch is at 11:45. How long until lunch?", choices: ["2 hr 30 min", "3 hr", "3 hr 30 min", "4 hr"], answer: 2 },
      { id: "q4", prompt: "How many minutes are in 2 hours?", choices: ["60", "90", "100", "120"], answer: 3 },
      { id: "q5", prompt: "It is 2:50. What time will it be in 25 minutes?", choices: ["3:05", "3:15", "3:25", "3:75"], answer: 1 },
      { id: "q6", prompt: "Half past 4 is the same as...", choices: ["4:15", "4:30", "4:45", "5:30"], answer: 1 },
      { id: "q7", prompt: "How many hours are in a day?", choices: ["12", "24", "30", "60"], answer: 1 },
      { id: "q8", prompt: "How many seconds are in a minute?", choices: ["30", "60", "100", "120"], answer: 1 },
      { id: "q9", prompt: "It is 9:20. What time was it 15 minutes ago?", choices: ["9:05", "9:15", "9:35", "9:45"], answer: 0 },
      { id: "q10", prompt: "The minute hand is on the 3. How many minutes past the hour?", choices: ["3", "10", "15", "20"], answer: 2 },
      { id: "q11", prompt: "A.M. is the time from midnight to...", choices: ["sunrise", "noon", "sunset", "midnight"], answer: 1 },
      { id: "q12", prompt: "It is 6:45. What time will it be in 30 minutes?", choices: ["7:00", "7:15", "7:30", "7:45"], answer: 1 },
      { id: "q13", prompt: "How many days are in a week?", choices: ["5", "6", "7", "10"], answer: 2 },
    ],
  },
  {
    id: "math-money",
    subjectId: "math",
    title: "Coin Counting",
    description: "Add up coins and make change.",
    emoji: "🪙",
    questions: [
      { id: "q1", prompt: "3 quarters + 2 dimes + 1 nickel = ?", choices: ["95¢", "$1.00", "$1.05", "$1.10"], answer: 1, explanation: "75¢ + 20¢ + 5¢ = 100¢ = $1.00." },
      { id: "q2", prompt: "You have $1.00 and buy a snack for 65¢. How much change?", choices: ["25¢", "35¢", "45¢", "55¢"], answer: 1 },
      { id: "q3", prompt: "Which is the most money?", choices: ["4 dimes", "7 nickels", "1 quarter and 1 dime", "3 quarters"], answer: 3 },
      { id: "q4", prompt: "How many nickels make $1.00?", choices: ["10", "15", "20", "25"], answer: 2 },
      { id: "q5", prompt: "2 quarters + 4 dimes + 3 pennies = ?", choices: ["83¢", "90¢", "93¢", "$1.03"], answer: 2 },
      { id: "q6", prompt: "How many dimes make a dollar?", choices: ["5", "10", "20", "25"], answer: 1 },
      { id: "q7", prompt: "A quarter is worth how many cents?", choices: ["5", "10", "20", "25"], answer: 3 },
      { id: "q8", prompt: "5 dimes + 3 nickels = ?", choices: ["55¢", "60¢", "65¢", "75¢"], answer: 2 },
      { id: "q9", prompt: "Lily has $2.00. She buys a toy for $1.25. How much change?", choices: ["50¢", "75¢", "$1.00", "$1.25"], answer: 1 },
      { id: "q10", prompt: "4 quarters equal...", choices: ["50¢", "75¢", "$1.00", "$1.25"], answer: 2 },
      { id: "q11", prompt: "How many pennies are in a dime?", choices: ["5", "10", "25", "100"], answer: 1 },
      { id: "q12", prompt: "Which is LESS than $1.00?", choices: ["3 quarters and 2 dimes", "5 quarters", "10 dimes and 1 nickel", "4 quarters"], answer: 0 },
    ],
  },
  {
    id: "math-compare",
    subjectId: "math",
    title: "Bigger or Smaller",
    description: "Compare and order 3-digit numbers.",
    emoji: "⚖️",
    questions: [
      { id: "q1", prompt: "Which is greatest?", choices: ["389", "398", "399", "389"], answer: 2 },
      { id: "q2", prompt: "Pick the right sign: 504 ___ 540", choices: [">", "<", "="], answer: 1 },
      { id: "q3", prompt: "Order from smallest to largest: 217, 271, 172", choices: ["172, 217, 271", "217, 172, 271", "271, 217, 172", "172, 271, 217"], answer: 0 },
      { id: "q4", prompt: "Which number is between 450 and 500?", choices: ["405", "449", "487", "512"], answer: 2 },
      { id: "q5", prompt: "Pick the right sign: 67 + 30 ___ 100", choices: [">", "<", "="], answer: 1, explanation: "67 + 30 = 97, which is less than 100." },
      { id: "q6", prompt: "Which is smallest?", choices: ["612", "621", "126", "162"], answer: 2 },
      { id: "q7", prompt: "Pick the right sign: 250 ___ 250", choices: [">", "<", "="], answer: 2 },
      { id: "q8", prompt: "Order from largest to smallest: 305, 350, 503", choices: ["305, 350, 503", "503, 350, 305", "350, 503, 305", "503, 305, 350"], answer: 1 },
      { id: "q9", prompt: "Which number is just MORE than 599?", choices: ["589", "598", "600", "690"], answer: 2 },
      { id: "q10", prompt: "Pick the right sign: 99 ___ 101", choices: [">", "<", "="], answer: 1 },
      { id: "q11", prompt: "Which number is closest to 500?", choices: ["430", "475", "560", "610"], answer: 1 },
      { id: "q12", prompt: "Which is greatest?", choices: ["707", "770", "677", "767"], answer: 1 },
    ],
  },
  {
    id: "math-shapes",
    subjectId: "math",
    title: "Shape Hunt",
    description: "2D and 3D shapes and their parts.",
    emoji: "🔷",
    questions: [
      { id: "q1", prompt: "How many sides does an octagon have?", choices: ["6", "7", "8", "10"], answer: 2 },
      { id: "q2", prompt: "A square is also a special kind of...", choices: ["triangle", "rectangle", "circle", "pentagon"], answer: 1, explanation: "Squares are rectangles with all sides equal." },
      { id: "q3", prompt: "How many faces does a cube have?", choices: ["4", "5", "6", "8"], answer: 2 },
      { id: "q4", prompt: "A 3D shape that rolls and has no flat faces is a...", choices: ["cube", "cone", "sphere", "pyramid"], answer: 2 },
      { id: "q5", prompt: "How many vertices (corners) does a triangle have?", choices: ["2", "3", "4", "6"], answer: 1 },
      { id: "q6", prompt: "How many sides does a hexagon have?", choices: ["4", "5", "6", "8"], answer: 2 },
      { id: "q7", prompt: "How many sides does a pentagon have?", choices: ["4", "5", "6", "7"], answer: 1 },
      { id: "q8", prompt: "A 3D shape with one flat face and a pointy top is a...", choices: ["cube", "cylinder", "cone", "sphere"], answer: 2 },
      { id: "q9", prompt: "How many edges does a cube have?", choices: ["6", "8", "10", "12"], answer: 3 },
      { id: "q10", prompt: "A shape with 4 equal sides and 4 right angles is a...", choices: ["rectangle", "square", "rhombus", "trapezoid"], answer: 1 },
      { id: "q11", prompt: "A circle has how many corners?", choices: ["0", "1", "2", "infinite"], answer: 0 },
      { id: "q12", prompt: "A soup can is shaped like a...", choices: ["cube", "cylinder", "cone", "pyramid"], answer: 1 },
      { id: "q13", prompt: "How many sides does a quadrilateral have?", choices: ["3", "4", "5", "6"], answer: 1 },
    ],
  },
  {
    id: "math-skip",
    subjectId: "math",
    title: "Skip Counting & Groups",
    description: "Skip count and meet multiplication.",
    emoji: "🐣",
    questions: [
      { id: "q1", prompt: "Count by 3s: 3, 6, 9, 12, ?", choices: ["13", "14", "15", "18"], answer: 2 },
      { id: "q2", prompt: "Count by 4s: 4, 8, 12, ?", choices: ["14", "15", "16", "20"], answer: 2 },
      { id: "q3", prompt: "4 groups of 5 is the same as...", choices: ["4 + 5", "5 × 4", "4 − 5", "5 ÷ 4"], answer: 1, explanation: "4 groups of 5 = 5 + 5 + 5 + 5 = 20 = 5 × 4." },
      { id: "q4", prompt: "Count by 25s: 25, 50, 75, ?", choices: ["80", "95", "100", "125"], answer: 2 },
      { id: "q5", prompt: "6 × 2 = ?", choices: ["8", "10", "12", "14"], answer: 2 },
      { id: "q6", prompt: "Count by 5s: 15, 20, 25, ?", choices: ["26", "30", "35", "40"], answer: 1 },
      { id: "q7", prompt: "Count by 10s: 30, 40, 50, ?", choices: ["55", "60", "65", "70"], answer: 1 },
      { id: "q8", prompt: "3 groups of 4 = ?", choices: ["7", "10", "12", "15"], answer: 2 },
      { id: "q9", prompt: "5 × 5 = ?", choices: ["10", "20", "25", "30"], answer: 2 },
      { id: "q10", prompt: "Count by 2s: 14, 16, 18, ?", choices: ["19", "20", "22", "24"], answer: 1 },
      { id: "q11", prompt: "Skip count by 100s: 200, 300, 400, ?", choices: ["401", "410", "500", "550"], answer: 2 },
      { id: "q12", prompt: "2 + 2 + 2 + 2 + 2 = ?", choices: ["5", "8", "10", "12"], answer: 2 },
      { id: "q13", prompt: "How many wheels are on 4 bicycles?", choices: ["6", "8", "10", "12"], answer: 1 },
    ],
  },

  // -------- SCIENCE --------
  {
    id: "sci-animals",
    subjectId: "science",
    title: "Animal Habitats",
    description: "How animals fit their habitats.",
    emoji: "🦊",
    questions: [
      { id: "q1", prompt: "An animal that eats only plants is called a...", choices: ["carnivore", "herbivore", "omnivore", "predator"], answer: 1 },
      { id: "q2", prompt: "Which adaptation helps a polar bear stay warm?", choices: ["thin fur", "thick fur and fat", "feathers", "scales"], answer: 1 },
      { id: "q3", prompt: "A young frog before it grows legs is called a...", choices: ["caterpillar", "tadpole", "chick", "larva"], answer: 1 },
      { id: "q4", prompt: "Camels store fat for energy in their...", choices: ["feet", "hump", "tail", "ears"], answer: 1 },
      { id: "q5", prompt: "Animals that hunt other animals for food are called...", choices: ["prey", "predators", "plants", "decomposers"], answer: 1 },
      { id: "q6", prompt: "A group of fish swimming together is called a...", choices: ["flock", "herd", "school", "pack"], answer: 2 },
      { id: "q7", prompt: "Animals that eat both plants and meat are called...", choices: ["herbivores", "omnivores", "carnivores", "insectivores"], answer: 1 },
      { id: "q8", prompt: "Which animal lives in the desert?", choices: ["penguin", "polar bear", "camel", "whale"], answer: 2 },
      { id: "q9", prompt: "Bears sleep through the cold winter. This is called...", choices: ["migration", "hibernation", "camouflage", "adaptation"], answer: 1 },
      { id: "q10", prompt: "Birds fly south for the winter. This is called...", choices: ["migration", "hibernation", "germination", "evaporation"], answer: 0 },
      { id: "q11", prompt: "A baby kangaroo is called a...", choices: ["calf", "cub", "joey", "pup"], answer: 2 },
      { id: "q12", prompt: "Which animal is a mammal?", choices: ["shark", "dolphin", "snake", "frog"], answer: 1 },
      { id: "q13", prompt: "An animal blending in with its surroundings uses...", choices: ["migration", "camouflage", "hibernation", "echolocation"], answer: 1 },
    ],
  },
  {
    id: "sci-plants",
    subjectId: "science",
    title: "How Plants Grow",
    description: "Plant parts and photosynthesis.",
    emoji: "🌱",
    questions: [
      { id: "q1", prompt: "The way plants make food using sunlight is called...", choices: ["hibernation", "photosynthesis", "evaporation", "germination"], answer: 1 },
      { id: "q2", prompt: "Which gas do plants take in to make food?", choices: ["oxygen", "carbon dioxide", "helium", "nitrogen"], answer: 1 },
      { id: "q3", prompt: "What is it called when a seed starts to sprout?", choices: ["pollination", "germination", "hibernation", "migration"], answer: 1 },
      { id: "q4", prompt: "Bees help plants by carrying...", choices: ["water", "pollen", "sunlight", "sugar"], answer: 1, explanation: "Bees move pollen from flower to flower — this is pollination." },
      { id: "q5", prompt: "Which part of the plant carries water from the roots up to the leaves?", choices: ["flower", "stem", "seed", "petal"], answer: 1 },
      { id: "q6", prompt: "Which part of a plant holds it in the ground?", choices: ["leaves", "flower", "roots", "stem"], answer: 2 },
      { id: "q7", prompt: "Plants give off which gas that animals breathe in?", choices: ["carbon dioxide", "oxygen", "helium", "nitrogen"], answer: 1 },
      { id: "q8", prompt: "A plant that loses its leaves in fall is called...", choices: ["evergreen", "deciduous", "tropical", "desert"], answer: 1 },
      { id: "q9", prompt: "Plants need 3 things to grow: water, sunlight, and...", choices: ["sugar", "air", "music", "salt"], answer: 1 },
      { id: "q10", prompt: "Which part of the plant makes seeds?", choices: ["roots", "stem", "flower", "leaves"], answer: 2 },
      { id: "q11", prompt: "A baby plant inside a seed is called the...", choices: ["sprout", "embryo", "sapling", "bud"], answer: 1 },
      { id: "q12", prompt: "Trees grow a new ring every...", choices: ["day", "week", "month", "year"], answer: 3 },
      { id: "q13", prompt: "Cactus plants store ___ in their stems.", choices: ["food", "water", "sand", "sunlight"], answer: 1 },
    ],
  },
  {
    id: "sci-weather",
    subjectId: "science",
    title: "Wonderful Weather",
    description: "Clouds, the water cycle, and storms.",
    emoji: "⛅",
    questions: [
      { id: "q1", prompt: "Water turning into a gas in the air is called...", choices: ["condensation", "evaporation", "precipitation", "freezing"], answer: 1 },
      { id: "q2", prompt: "Tall, fluffy clouds that can bring thunderstorms are called...", choices: ["cirrus", "stratus", "cumulonimbus", "fog"], answer: 2 },
      { id: "q3", prompt: "Rain, snow, sleet, and hail are all forms of...", choices: ["evaporation", "precipitation", "climate", "humidity"], answer: 1 },
      { id: "q4", prompt: "You see lightning, then hear thunder later because...", choices: ["thunder is shy", "light travels faster than sound", "sound is louder", "clouds block sound"], answer: 1 },
      { id: "q5", prompt: "A scientist who studies the weather is called a...", choices: ["geologist", "meteorologist", "biologist", "astronomer"], answer: 1 },
      { id: "q6", prompt: "A spinning storm with strong winds over land is a...", choices: ["hurricane", "tornado", "blizzard", "flood"], answer: 1 },
      { id: "q7", prompt: "A huge spinning storm that forms over the ocean is a...", choices: ["tornado", "hurricane", "snowstorm", "thunderstorm"], answer: 1 },
      { id: "q8", prompt: "Thin, wispy clouds high in the sky are called...", choices: ["cumulus", "cirrus", "stratus", "nimbus"], answer: 1 },
      { id: "q9", prompt: "Frozen rain that falls in balls is called...", choices: ["sleet", "hail", "snow", "mist"], answer: 1 },
      { id: "q10", prompt: "A tool that measures temperature is a...", choices: ["barometer", "thermometer", "anemometer", "compass"], answer: 1 },
      { id: "q11", prompt: "The water cycle includes evaporation, condensation, and...", choices: ["germination", "precipitation", "hibernation", "migration"], answer: 1 },
      { id: "q12", prompt: "A colorful arc that appears after rain is a...", choices: ["sunset", "rainbow", "fog", "halo"], answer: 1 },
      { id: "q13", prompt: "Which season is usually the coldest in the U.S.?", choices: ["spring", "summer", "fall", "winter"], answer: 3 },
    ],
  },
  {
    id: "sci-states",
    subjectId: "science",
    title: "States of Matter",
    description: "Solids, liquids, gases, and changes.",
    emoji: "🧊",
    questions: [
      { id: "q1", prompt: "When a liquid turns into a gas, it is called...", choices: ["melting", "freezing", "evaporating", "condensing"], answer: 2 },
      { id: "q2", prompt: "At what temperature does water freeze?", choices: ["0°C / 32°F", "50°C / 100°F", "100°C / 212°F", "-10°C / 14°F"], answer: 0 },
      { id: "q3", prompt: "Gases take the shape of...", choices: ["only a square", "whatever container they are in", "only a tall shape", "only a flat shape"], answer: 1 },
      { id: "q4", prompt: "Tiny pieces that everything is made of are called...", choices: ["atoms", "crystals", "germs", "cells"], answer: 0 },
      { id: "q5", prompt: "Water droplets forming on a cold cup is called...", choices: ["evaporation", "condensation", "melting", "boiling"], answer: 1 },
      { id: "q6", prompt: "At what temperature does water boil?", choices: ["0°C / 32°F", "50°C / 122°F", "100°C / 212°F", "150°C / 300°F"], answer: 2 },
      { id: "q7", prompt: "Ice is water in its ___ state.", choices: ["liquid", "solid", "gas", "plasma"], answer: 1 },
      { id: "q8", prompt: "Steam is water in its ___ state.", choices: ["liquid", "solid", "gas", "plasma"], answer: 2 },
      { id: "q9", prompt: "A solid has a definite...", choices: ["shape", "smell", "taste", "color"], answer: 0 },
      { id: "q10", prompt: "When ice changes to water, this is called...", choices: ["freezing", "melting", "boiling", "condensing"], answer: 1 },
      { id: "q11", prompt: "Which of these is a liquid?", choices: ["rock", "chair", "juice", "helium"], answer: 2 },
      { id: "q12", prompt: "Which is NOT a state of matter?", choices: ["solid", "liquid", "gas", "energy"], answer: 3 },
      { id: "q13", prompt: "When water vapor cools and turns back into a liquid, it is called...", choices: ["evaporation", "condensation", "melting", "freezing"], answer: 1 },
    ],
  },
  {
    id: "sci-body",
    subjectId: "science",
    title: "My Body",
    description: "Organs, systems, and the senses.",
    emoji: "🦴",
    questions: [
      { id: "q1", prompt: "Which body system pumps blood?", choices: ["digestive", "circulatory", "nervous", "skeletal"], answer: 1 },
      { id: "q2", prompt: "Your lungs are part of which system?", choices: ["respiratory", "muscular", "digestive", "nervous"], answer: 0 },
      { id: "q3", prompt: "About how many bones does an adult human skeleton have?", choices: ["100", "150", "206", "500"], answer: 2 },
      { id: "q4", prompt: "The brain sends messages through your...", choices: ["veins", "nerves", "muscles", "ribs"], answer: 1 },
      { id: "q5", prompt: "Your tongue is mostly used for the sense of...", choices: ["smell", "sight", "taste", "hearing"], answer: 2 },
      { id: "q6", prompt: "Which organ pumps blood through your body?", choices: ["brain", "heart", "liver", "lungs"], answer: 1 },
      { id: "q7", prompt: "Which organ helps you think and learn?", choices: ["heart", "stomach", "brain", "kidney"], answer: 2 },
      { id: "q8", prompt: "How many senses do humans normally have?", choices: ["3", "4", "5", "6"], answer: 2 },
      { id: "q9", prompt: "Your stomach is part of which system?", choices: ["digestive", "respiratory", "nervous", "skeletal"], answer: 0 },
      { id: "q10", prompt: "Muscles are connected to bones by...", choices: ["veins", "tendons", "skin", "nerves"], answer: 1 },
      { id: "q11", prompt: "Your eyes are mostly used for the sense of...", choices: ["taste", "smell", "sight", "touch"], answer: 2 },
      { id: "q12", prompt: "Baby teeth that fall out are replaced by...", choices: ["more baby teeth", "adult teeth", "plastic teeth", "no teeth"], answer: 1 },
      { id: "q13", prompt: "The skin's main jobs include protecting the body and...", choices: ["making blood", "helping you smell", "keeping the body warm", "thinking"], answer: 2 },
    ],
  },
  {
    id: "sci-space",
    subjectId: "science",
    title: "Out in Space",
    description: "Sun, moon, planets, and orbits.",
    emoji: "🚀",
    questions: [
      { id: "q1", prompt: "Which planet is the largest in our solar system?", choices: ["Earth", "Saturn", "Jupiter", "Neptune"], answer: 2 },
      { id: "q2", prompt: "How long does it take Earth to orbit the Sun?", choices: ["1 day", "1 month", "1 year", "10 years"], answer: 2 },
      { id: "q3", prompt: "Day and night happen because Earth...", choices: ["orbits the Sun", "spins on its axis", "changes size", "moves the Moon"], answer: 1 },
      { id: "q4", prompt: "Which planet is famous for its bright rings?", choices: ["Mars", "Saturn", "Mercury", "Venus"], answer: 1 },
      { id: "q5", prompt: "A rocky object orbiting the Sun, smaller than a planet, is a...", choices: ["galaxy", "comet", "asteroid", "satellite"], answer: 2 },
      { id: "q6", prompt: "Which planet is closest to the Sun?", choices: ["Mercury", "Venus", "Earth", "Mars"], answer: 0 },
      { id: "q7", prompt: "How many planets are in our solar system?", choices: ["6", "8", "9", "12"], answer: 1 },
      { id: "q8", prompt: "The Moon orbits...", choices: ["the Sun", "Earth", "Jupiter", "itself"], answer: 1 },
      { id: "q9", prompt: "Which planet is called the 'Red Planet'?", choices: ["Mars", "Venus", "Mercury", "Saturn"], answer: 0 },
      { id: "q10", prompt: "The Sun is a...", choices: ["planet", "moon", "star", "comet"], answer: 2 },
      { id: "q11", prompt: "An icy object with a long tail that orbits the Sun is a...", choices: ["comet", "asteroid", "star", "moon"], answer: 0 },
      { id: "q12", prompt: "The first person to walk on the Moon was...", choices: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Sally Ride"], answer: 1 },
      { id: "q13", prompt: "Our galaxy is called the...", choices: ["Andromeda", "Milky Way", "Orion", "Big Dipper"], answer: 1 },
    ],
  },
  {
    id: "sci-magnet",
    subjectId: "science",
    title: "Magnets & Forces",
    description: "Pushes, pulls, and magnetic poles.",
    emoji: "🧲",
    questions: [
      { id: "q1", prompt: "Which metal is most strongly attracted to a magnet?", choices: ["copper", "iron", "aluminum", "gold"], answer: 1 },
      { id: "q2", prompt: "What are the two ends of a magnet called?", choices: ["sides", "poles", "corners", "tips"], answer: 1 },
      { id: "q3", prompt: "Two NORTH poles placed together will...", choices: ["attract (pull together)", "repel (push apart)", "melt", "do nothing"], answer: 1 },
      { id: "q4", prompt: "The pull of Earth that keeps us on the ground is called...", choices: ["magnetism", "gravity", "friction", "electricity"], answer: 1 },
      { id: "q5", prompt: "Which is NOT a force?", choices: ["push", "pull", "gravity", "color"], answer: 3 },
      { id: "q6", prompt: "A NORTH pole and a SOUTH pole will...", choices: ["repel", "attract", "melt", "explode"], answer: 1 },
      { id: "q7", prompt: "Which is NOT attracted to a magnet?", choices: ["iron nail", "plastic spoon", "steel paper clip", "refrigerator door"], answer: 1 },
      { id: "q8", prompt: "The force that slows things sliding against each other is...", choices: ["gravity", "friction", "magnetism", "motion"], answer: 1 },
      { id: "q9", prompt: "Earth itself is a giant...", choices: ["battery", "magnet", "crystal", "motor"], answer: 1 },
      { id: "q10", prompt: "A compass needle points to magnetic...", choices: ["east", "south", "north", "west"], answer: 2 },
      { id: "q11", prompt: "Pushing a swing is an example of a...", choices: ["pull force", "push force", "gravity force", "no force"], answer: 1 },
      { id: "q12", prompt: "Opening a door by tugging it toward you uses a...", choices: ["push", "pull", "twist", "bend"], answer: 1 },
    ],
  },
  {
    id: "sci-recycle",
    subjectId: "science",
    title: "Caring for Earth",
    description: "Resources, recycling, and ecosystems.",
    emoji: "♻️",
    questions: [
      { id: "q1", prompt: "A resource that will not run out, like sunlight or wind, is...", choices: ["nonrenewable", "renewable", "recycled", "reused"], answer: 1 },
      { id: "q2", prompt: "Coal and oil are examples of...", choices: ["renewable energy", "fossil fuels", "recycled goods", "compost"], answer: 1 },
      { id: "q3", prompt: "Banana peels and apple cores are best put in the...", choices: ["recycle bin", "compost", "trash can", "freezer"], answer: 1 },
      { id: "q4", prompt: "All the living and nonliving things in one area form an...", choices: ["orbit", "ecosystem", "atmosphere", "island"], answer: 1 },
      { id: "q5", prompt: "Which item takes the LONGEST to break down in nature?", choices: ["banana peel", "paper", "plastic bottle", "leaf"], answer: 2 },
      { id: "q6", prompt: "The 3 Rs of caring for Earth are reduce, reuse, and...", choices: ["refresh", "recycle", "replace", "recover"], answer: 1 },
      { id: "q7", prompt: "Which is renewable energy?", choices: ["oil", "coal", "solar", "gasoline"], answer: 2 },
      { id: "q8", prompt: "Most of the trash that ends up in oceans is...", choices: ["paper", "glass", "plastic", "food"], answer: 2 },
      { id: "q9", prompt: "Trees help the air by giving off...", choices: ["carbon dioxide", "oxygen", "smoke", "nitrogen"], answer: 1 },
      { id: "q10", prompt: "Turning off the lights when you leave a room helps to...", choices: ["waste energy", "save energy", "make heat", "cause storms"], answer: 1 },
      { id: "q11", prompt: "Which is a way to reuse something?", choices: ["throw it away", "burn it", "use a jar as a pencil holder", "crush it"], answer: 2 },
      { id: "q12", prompt: "Which would you put in the recycle bin?", choices: ["old banana", "empty soda can", "food scraps", "used napkin"], answer: 1 },
    ],
  },

  // -------- HISTORY --------
  {
    id: "hist-presidents",
    subjectId: "history",
    title: "American Leaders",
    description: "Presidents and the U.S. government.",
    emoji: "🏛️",
    questions: [
      { id: "q1", prompt: "Who was president during the Civil War?", choices: ["George Washington", "Abraham Lincoln", "Theodore Roosevelt", "John Adams"], answer: 1 },
      { id: "q2", prompt: "How many years long is one presidential term?", choices: ["2", "4", "6", "8"], answer: 1 },
      { id: "q3", prompt: "The U.S. government has three branches: executive, legislative, and...", choices: ["royal", "military", "judicial", "financial"], answer: 2 },
      { id: "q4", prompt: "Who was the first U.S. president?", choices: ["Adams", "Jefferson", "Washington", "Madison"], answer: 2 },
      { id: "q5", prompt: "Congress meets in which building?", choices: ["the White House", "the Capitol", "the Pentagon", "the Supreme Court"], answer: 1 },
      { id: "q6", prompt: "The president of the U.S. lives in the...", choices: ["Capitol", "White House", "Pentagon", "Statue of Liberty"], answer: 1 },
      { id: "q7", prompt: "Which president is on the $1 bill?", choices: ["Lincoln", "Jefferson", "Washington", "Roosevelt"], answer: 2 },
      { id: "q8", prompt: "Which president is on the penny?", choices: ["Washington", "Lincoln", "Jefferson", "Roosevelt"], answer: 1 },
      { id: "q9", prompt: "The vice president becomes president if the president...", choices: ["is on vacation", "cannot serve", "is busy", "travels abroad"], answer: 1 },
      { id: "q10", prompt: "The Supreme Court is part of which branch of government?", choices: ["executive", "legislative", "judicial", "federal"], answer: 2 },
      { id: "q11", prompt: "Congress is made of the Senate and the House of...", choices: ["Lords", "Representatives", "Commons", "Governors"], answer: 1 },
      { id: "q12", prompt: "How many U.S. senators come from each state?", choices: ["1", "2", "3", "4"], answer: 1 },
    ],
  },
  {
    id: "hist-rosa",
    subjectId: "history",
    title: "Brave Voices",
    description: "Leaders of the Civil Rights Movement.",
    emoji: "✊",
    questions: [
      { id: "q1", prompt: "Rosa Parks refused to give up her seat in which city?", choices: ["Atlanta", "Selma", "Montgomery", "Birmingham"], answer: 2 },
      { id: "q2", prompt: "Dr. Martin Luther King Jr. led people using...", choices: ["violence", "peaceful protest", "secret armies", "silence"], answer: 1 },
      { id: "q3", prompt: "Ruby Bridges helped end segregation in...", choices: ["factories", "buses", "schools", "hospitals"], answer: 2 },
      { id: "q4", prompt: "Harriet Tubman led people to freedom along the...", choices: ["Oregon Trail", "Underground Railroad", "Mississippi River", "Silk Road"], answer: 1 },
      { id: "q5", prompt: "Dr. King gave his famous \"I Have a Dream\" speech in...", choices: ["New York", "Atlanta", "Washington, D.C.", "Selma"], answer: 2 },
      { id: "q6", prompt: "Rosa Parks refused to give up her seat on a...", choices: ["plane", "bus", "train", "boat"], answer: 1 },
      { id: "q7", prompt: "Cesar Chavez worked to help...", choices: ["farm workers", "astronauts", "teachers", "sailors"], answer: 0 },
      { id: "q8", prompt: "Frederick Douglass was famous for speaking out against...", choices: ["taxes", "slavery", "war", "voting"], answer: 1 },
      { id: "q9", prompt: "Susan B. Anthony fought for the right of women to...", choices: ["drive cars", "vote", "own pets", "travel"], answer: 1 },
      { id: "q10", prompt: "Jackie Robinson broke the color barrier in which sport?", choices: ["basketball", "football", "baseball", "hockey"], answer: 2 },
      { id: "q11", prompt: "Dr. King's birthday is honored as a holiday in which month?", choices: ["January", "February", "June", "December"], answer: 0 },
      { id: "q12", prompt: "Civil rights are the rights that protect a person's...", choices: ["jokes", "freedom and equality", "hobbies", "pets"], answer: 1 },
    ],
  },
  {
    id: "hist-holidays",
    subjectId: "history",
    title: "Holidays in History",
    description: "Why we celebrate certain days.",
    emoji: "🎉",
    questions: [
      { id: "q1", prompt: "July 4th, 1776 is the day the U.S. signed the...", choices: ["Constitution", "Bill of Rights", "Declaration of Independence", "Emancipation Proclamation"], answer: 2 },
      { id: "q2", prompt: "Thanksgiving celebrates a feast shared by Pilgrims and the...", choices: ["British army", "Wampanoag people", "French settlers", "Vikings"], answer: 1 },
      { id: "q3", prompt: "Memorial Day honors people who...", choices: ["won elections", "died serving in the military", "discovered new lands", "invented things"], answer: 1 },
      { id: "q4", prompt: "Juneteenth celebrates the end of...", choices: ["World War II", "slavery in the U.S.", "the Great Depression", "the Civil War"], answer: 1 },
      { id: "q5", prompt: "Veterans Day in November honors...", choices: ["all who served in the military", "only soldiers who died", "presidents", "explorers"], answer: 0 },
      { id: "q6", prompt: "Labor Day honors...", choices: ["farmers only", "workers and their contributions", "presidents", "teachers only"], answer: 1 },
      { id: "q7", prompt: "Independence Day is celebrated on...", choices: ["July 1", "July 4", "July 14", "August 4"], answer: 1 },
      { id: "q8", prompt: "Presidents' Day honors which two presidents in particular?", choices: ["Washington and Jefferson", "Washington and Lincoln", "Lincoln and Roosevelt", "Adams and Jefferson"], answer: 1 },
      { id: "q9", prompt: "Earth Day is a day to celebrate...", choices: ["the moon", "caring for our planet", "space travel", "national parks only"], answer: 1 },
      { id: "q10", prompt: "Columbus Day is in which month?", choices: ["September", "October", "November", "December"], answer: 1 },
      { id: "q11", prompt: "Martin Luther King Jr. Day is on a...", choices: ["Sunday", "Monday", "Friday", "Saturday"], answer: 1 },
      { id: "q12", prompt: "Flag Day celebrates the adoption of the U.S. flag in...", choices: ["June", "July", "August", "September"], answer: 0 },
    ],
  },
  {
    id: "hist-explorers",
    subjectId: "history",
    title: "Explorers",
    description: "Voyages that changed the world.",
    emoji: "🧭",
    questions: [
      { id: "q1", prompt: "Lewis and Clark were sent to explore by which president?", choices: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "James Madison"], answer: 1 },
      { id: "q2", prompt: "Sacagawea was a member of which Native American nation?", choices: ["Cherokee", "Shoshone", "Apache", "Sioux"], answer: 1 },
      { id: "q3", prompt: "Neil Armstrong walked on the Moon in what year?", choices: ["1959", "1969", "1979", "1989"], answer: 1 },
      { id: "q4", prompt: "Amelia Earhart was famous for being the first woman to...", choices: ["sail around the world", "fly solo across the Atlantic", "climb Mount Everest", "reach the South Pole"], answer: 1 },
      { id: "q5", prompt: "Sally Ride was the first American woman to travel to...", choices: ["Antarctica", "the Moon", "space", "the deep sea"], answer: 2 },
      { id: "q6", prompt: "Christopher Columbus sailed across the Atlantic in...", choices: ["1392", "1492", "1592", "1692"], answer: 1 },
      { id: "q7", prompt: "Magellan's crew was the first to do what?", choices: ["reach the Moon", "sail around the world", "reach Antarctica", "discover Australia"], answer: 1 },
      { id: "q8", prompt: "Marco Polo traveled from Europe to...", choices: ["Africa", "Asia", "South America", "Australia"], answer: 1 },
      { id: "q9", prompt: "Jacques Cousteau is famous for exploring the...", choices: ["jungles", "deserts", "oceans", "mountains"], answer: 2 },
      { id: "q10", prompt: "Sir Edmund Hillary was the first known person to climb...", choices: ["Kilimanjaro", "Mount Everest", "Mount McKinley", "K2"], answer: 1 },
      { id: "q11", prompt: "The Apollo 11 mission landed humans on the...", choices: ["Mars", "Moon", "Sun", "Venus"], answer: 1 },
      { id: "q12", prompt: "Mae Jemison was the first African American woman in...", choices: ["Congress", "space", "Antarctica", "the Olympics"], answer: 1 },
    ],
  },
  {
    id: "hist-helpers",
    subjectId: "history",
    title: "Citizens & Communities",
    description: "How communities work together.",
    emoji: "🚒",
    questions: [
      { id: "q1", prompt: "A rule made by a government that everyone must follow is a...", choices: ["law", "chore", "hobby", "recipe"], answer: 0 },
      { id: "q2", prompt: "Money paid to the government to fund schools, roads, and parks is called...", choices: ["allowance", "taxes", "tips", "savings"], answer: 1 },
      { id: "q3", prompt: "The leader of a city is usually called a...", choices: ["governor", "mayor", "senator", "king"], answer: 1 },
      { id: "q4", prompt: "Voting in an election is a right and responsibility of a...", choices: ["tourist", "citizen", "reporter", "chef"], answer: 1 },
      { id: "q5", prompt: "The leader of a U.S. state is called the...", choices: ["president", "mayor", "governor", "prince"], answer: 2 },
      { id: "q6", prompt: "People who put out fires in a community are called...", choices: ["firefighters", "police", "librarians", "doctors"], answer: 0 },
      { id: "q7", prompt: "A person who helps run a school is called a...", choices: ["governor", "principal", "general", "mayor"], answer: 1 },
      { id: "q8", prompt: "Which is NOT a community helper?", choices: ["doctor", "firefighter", "librarian", "dragon"], answer: 3 },
      { id: "q9", prompt: "A group of people who live near each other is called a...", choices: ["crowd", "community", "factory", "forest"], answer: 1 },
      { id: "q10", prompt: "In an election, the person with the most votes usually...", choices: ["loses", "ties", "wins", "is disqualified"], answer: 2 },
      { id: "q11", prompt: "Being kind, fair, and helpful are examples of being a good...", choices: ["president", "citizen", "tourist", "thief"], answer: 1 },
      { id: "q12", prompt: "Volunteers are people who help...", choices: ["for money", "without being paid", "only their family", "only at school"], answer: 1 },
    ],
  },
  {
    id: "hist-flag",
    subjectId: "history",
    title: "Symbols of the U.S.",
    description: "The flag, the eagle, and more.",
    emoji: "🇺🇸",
    questions: [
      { id: "q1", prompt: "The 13 stripes on the U.S. flag stand for the...", choices: ["50 states", "first 13 colonies", "original presidents", "founding fathers"], answer: 1 },
      { id: "q2", prompt: "The Statue of Liberty was a gift to the U.S. from...", choices: ["England", "France", "Spain", "Mexico"], answer: 1 },
      { id: "q3", prompt: "The Liberty Bell is in which city?", choices: ["Boston", "Philadelphia", "New York", "Washington, D.C."], answer: 1 },
      { id: "q4", prompt: "The U.S. national bird is the...", choices: ["hawk", "bald eagle", "turkey", "robin"], answer: 1 },
      { id: "q5", prompt: "The Pledge of Allegiance is a promise to the...", choices: ["president", "flag and country", "Congress", "army"], answer: 1 },
      { id: "q6", prompt: "The 50 stars on the U.S. flag stand for the...", choices: ["50 founding fathers", "50 states", "50 years", "50 presidents"], answer: 1 },
      { id: "q7", prompt: "The colors of the U.S. flag are...", choices: ["red, white, blue", "red, white, green", "blue, white, gold", "red, blue, yellow"], answer: 0 },
      { id: "q8", prompt: "The U.S. national anthem is...", choices: ["America the Beautiful", "The Star-Spangled Banner", "God Bless America", "Yankee Doodle"], answer: 1 },
      { id: "q9", prompt: "The Statue of Liberty stands in which city's harbor?", choices: ["Boston", "Philadelphia", "New York", "Washington, D.C."], answer: 2 },
      { id: "q10", prompt: "The bald eagle holds an olive branch and arrows on the U.S. seal to show...", choices: ["peace and strength", "food and water", "war only", "peace only"], answer: 0 },
      { id: "q11", prompt: "The Great Seal of the United States is on which dollar bill?", choices: ["$1", "$5", "$10", "$20"], answer: 0 },
      { id: "q12", prompt: "'Old Glory' is a nickname for the...", choices: ["Liberty Bell", "U.S. flag", "Statue of Liberty", "White House"], answer: 1 },
    ],
  },
  {
    id: "hist-inventors",
    subjectId: "history",
    title: "Big Inventions",
    description: "Inventors who changed the world.",
    emoji: "💡",
    questions: [
      { id: "q1", prompt: "The Wright Brothers made their first flight in what year?", choices: ["1803", "1903", "1953", "2003"], answer: 1 },
      { id: "q2", prompt: "Alexander Graham Bell invented the...", choices: ["radio", "telephone", "airplane", "camera"], answer: 1 },
      { id: "q3", prompt: "Thomas Edison is best known for improving the...", choices: ["light bulb", "telephone", "steam engine", "airplane"], answer: 0 },
      { id: "q4", prompt: "George Washington Carver was famous for studying...", choices: ["electricity", "peanuts and plants", "airplanes", "computers"], answer: 1 },
      { id: "q5", prompt: "Henry Ford made cars cheaper to build by using a...", choices: ["steam engine", "assembly line", "horse and cart", "flying factory"], answer: 1 },
      { id: "q6", prompt: "Benjamin Franklin's kite experiment helped study...", choices: ["weather", "electricity", "sound", "plants"], answer: 1 },
      { id: "q7", prompt: "Marie Curie discovered new things about...", choices: ["germs", "radioactivity", "airplanes", "electricity"], answer: 1 },
      { id: "q8", prompt: "The first telephone call was made by...", choices: ["Edison", "Bell", "Ford", "Tesla"], answer: 1 },
      { id: "q9", prompt: "Garrett Morgan invented an early version of the...", choices: ["radio", "traffic signal", "airplane", "telephone"], answer: 1 },
      { id: "q10", prompt: "Nikola Tesla helped develop the use of...", choices: ["steam", "electric power", "airplanes", "telephones"], answer: 1 },
      { id: "q11", prompt: "Eli Whitney invented the cotton...", choices: ["loom", "gin", "plow", "engine"], answer: 1 },
      { id: "q12", prompt: "The Wright Brothers' first flight took off in which state?", choices: ["Ohio", "North Carolina", "Florida", "Virginia"], answer: 1 },
    ],
  },
  {
    id: "hist-timeline",
    subjectId: "history",
    title: "Putting Time in Order",
    description: "Timelines, decades, and centuries.",
    emoji: "⏳",
    questions: [
      { id: "q1", prompt: "A century is how many years?", choices: ["10", "50", "100", "1,000"], answer: 2 },
      { id: "q2", prompt: "A decade is how many years?", choices: ["5", "10", "20", "100"], answer: 1 },
      { id: "q3", prompt: "Which event happened FIRST?", choices: ["the first airplane flight", "the moon landing", "the invention of the smartphone", "the first email"], answer: 0 },
      { id: "q4", prompt: "Which is in the correct order from oldest to newest?", choices: ["smartphone, radio, light bulb", "light bulb, radio, smartphone", "radio, smartphone, light bulb", "smartphone, light bulb, radio"], answer: 1 },
      { id: "q5", prompt: "The year 1850 is part of which century?", choices: ["18th", "19th", "20th", "21st"], answer: 1, explanation: "The 1800s are the 19th century — we count from year 1 onward." },
      { id: "q6", prompt: "A millennium is how many years?", choices: ["100", "500", "1,000", "10,000"], answer: 2 },
      { id: "q7", prompt: "What year is part of the 21st century?", choices: ["1899", "1950", "1999", "2024"], answer: 3 },
      { id: "q8", prompt: "The American Revolution began in...", choices: ["1675", "1775", "1865", "1965"], answer: 1 },
      { id: "q9", prompt: "World War II ended in...", choices: ["1918", "1945", "1965", "1989"], answer: 1 },
      { id: "q10", prompt: "How many decades are in a century?", choices: ["5", "10", "50", "100"], answer: 1 },
      { id: "q11", prompt: "What comes between B.C. and A.D. on a timeline?", choices: ["year 0", "year 100", "year 1000", "year 1500"], answer: 0 },
      { id: "q12", prompt: "Which event happened most recently?", choices: ["first airplane flight", "first smartphone", "moon landing", "invention of TV"], answer: 1 },
    ],
  },

  // -------- GEOGRAPHY --------
  {
    id: "geo-continents",
    subjectId: "geography",
    title: "Seven Continents",
    description: "Find your way around the world.",
    emoji: "🌎",
    questions: [
      { id: "q1", prompt: "Which is the LARGEST continent?", choices: ["Africa", "Asia", "North America", "Antarctica"], answer: 1 },
      { id: "q2", prompt: "Which is the SMALLEST continent?", choices: ["Europe", "Australia", "Antarctica", "South America"], answer: 1 },
      { id: "q3", prompt: "The Amazon rainforest is on which continent?", choices: ["Africa", "Asia", "South America", "Australia"], answer: 2 },
      { id: "q4", prompt: "Which two continents does the Ural Mountains divide?", choices: ["Europe and Asia", "Africa and Asia", "North and South America", "Asia and Australia"], answer: 0 },
      { id: "q5", prompt: "Which continent has no countries, only research stations?", choices: ["Australia", "Antarctica", "Africa", "Europe"], answer: 1 },
      { id: "q6", prompt: "How many continents are there?", choices: ["5", "6", "7", "8"], answer: 2 },
      { id: "q7", prompt: "The Sahara Desert is on which continent?", choices: ["Africa", "Asia", "Australia", "South America"], answer: 0 },
      { id: "q8", prompt: "Which continent is the United States on?", choices: ["South America", "North America", "Europe", "Asia"], answer: 1 },
      { id: "q9", prompt: "Kangaroos are native to which continent?", choices: ["Africa", "Asia", "Australia", "South America"], answer: 2 },
      { id: "q10", prompt: "Which continent is the coldest?", choices: ["Europe", "Asia", "Antarctica", "North America"], answer: 2 },
      { id: "q11", prompt: "Egypt is on which continent?", choices: ["Asia", "Africa", "Europe", "Australia"], answer: 1 },
      { id: "q12", prompt: "Which continent is home to China and India?", choices: ["Africa", "Europe", "Asia", "Australia"], answer: 2 },
    ],
  },
  {
    id: "geo-oceans",
    subjectId: "geography",
    title: "Five Oceans",
    description: "The big blue waters.",
    emoji: "🌊",
    questions: [
      { id: "q1", prompt: "Which is the largest AND deepest ocean?", choices: ["Atlantic", "Pacific", "Indian", "Arctic"], answer: 1 },
      { id: "q2", prompt: "The ocean around Antarctica is called the...", choices: ["Arctic", "Indian", "Southern", "Atlantic"], answer: 2 },
      { id: "q3", prompt: "The ocean between North America and Europe is the...", choices: ["Pacific", "Atlantic", "Indian", "Arctic"], answer: 1 },
      { id: "q4", prompt: "About what fraction of Earth is covered by oceans?", choices: ["about 1/4", "about 1/2", "about 3/4", "all of it"], answer: 2 },
      { id: "q5", prompt: "A very large area of saltwater that is smaller than an ocean is called a...", choices: ["river", "lake", "sea", "pond"], answer: 2 },
      { id: "q6", prompt: "How many oceans are there?", choices: ["3", "4", "5", "7"], answer: 2 },
      { id: "q7", prompt: "The ocean at the North Pole is the...", choices: ["Atlantic", "Arctic", "Indian", "Pacific"], answer: 1 },
      { id: "q8", prompt: "India is bordered to the south by which ocean?", choices: ["Atlantic", "Pacific", "Indian", "Arctic"], answer: 2 },
      { id: "q9", prompt: "Ocean water is mostly...", choices: ["fresh", "salty", "sweet", "sour"], answer: 1 },
      { id: "q10", prompt: "The U.S. west coast borders which ocean?", choices: ["Atlantic", "Pacific", "Indian", "Arctic"], answer: 1 },
      { id: "q11", prompt: "Daily rise and fall of the ocean is called the...", choices: ["current", "tide", "wave", "breeze"], answer: 1 },
      { id: "q12", prompt: "The Great Barrier Reef is in which ocean?", choices: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: 2 },
    ],
  },
  {
    id: "geo-states",
    subjectId: "geography",
    title: "State Stars",
    description: "U.S. states, regions, and trivia.",
    emoji: "⭐",
    questions: [
      { id: "q1", prompt: "Which state is the largest by area?", choices: ["Texas", "California", "Alaska", "Montana"], answer: 2 },
      { id: "q2", prompt: "Which state is the smallest by area?", choices: ["Delaware", "Rhode Island", "Connecticut", "Vermont"], answer: 1 },
      { id: "q3", prompt: "Which state is NOT connected to the other 48 states?", choices: ["Florida", "Hawaii", "Maine", "Texas"], answer: 1 },
      { id: "q4", prompt: "Which state is famous for the Grand Canyon?", choices: ["Nevada", "Utah", "Arizona", "New Mexico"], answer: 2 },
      { id: "q5", prompt: "The Mississippi River runs through how many states?", choices: ["about 3", "about 5", "about 10", "about 20"], answer: 2 },
      { id: "q6", prompt: "How many states are in the United States?", choices: ["48", "49", "50", "52"], answer: 2 },
      { id: "q7", prompt: "Which state is known as the 'Sunshine State'?", choices: ["California", "Florida", "Arizona", "Texas"], answer: 1 },
      { id: "q8", prompt: "Which state is shaped like a mitten?", choices: ["Florida", "Michigan", "Texas", "Maine"], answer: 1 },
      { id: "q9", prompt: "Hollywood is in which state?", choices: ["New York", "California", "Nevada", "Florida"], answer: 1 },
      { id: "q10", prompt: "Yellowstone, the first national park, is mostly in...", choices: ["California", "Wyoming", "Alaska", "Colorado"], answer: 1 },
      { id: "q11", prompt: "Which state borders Mexico AND California?", choices: ["Texas", "New Mexico", "Arizona", "Oregon"], answer: 2 },
      { id: "q12", prompt: "The Statue of Liberty stands in which state?", choices: ["New Jersey", "New York", "Massachusetts", "Connecticut"], answer: 1 },
    ],
  },
  {
    id: "geo-capitals",
    subjectId: "geography",
    title: "Capital Cities",
    description: "Match places to their capitals.",
    emoji: "🏛️",
    questions: [
      { id: "q1", prompt: "Capital of Australia?", choices: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: 2 },
      { id: "q2", prompt: "Capital of Egypt?", choices: ["Cairo", "Giza", "Alexandria", "Luxor"], answer: 0 },
      { id: "q3", prompt: "Capital of Brazil?", choices: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"], answer: 2 },
      { id: "q4", prompt: "Capital of Germany?", choices: ["Munich", "Berlin", "Frankfurt", "Hamburg"], answer: 1 },
      { id: "q5", prompt: "Capital of California?", choices: ["Los Angeles", "San Francisco", "Sacramento", "San Diego"], answer: 2 },
      { id: "q6", prompt: "Capital of the United States?", choices: ["New York", "Los Angeles", "Washington, D.C.", "Boston"], answer: 2 },
      { id: "q7", prompt: "Capital of France?", choices: ["Paris", "Lyon", "Marseille", "Nice"], answer: 0 },
      { id: "q8", prompt: "Capital of Japan?", choices: ["Osaka", "Tokyo", "Kyoto", "Nagoya"], answer: 1 },
      { id: "q9", prompt: "Capital of Texas?", choices: ["Houston", "Austin", "Dallas", "San Antonio"], answer: 1 },
      { id: "q10", prompt: "Capital of Canada?", choices: ["Toronto", "Vancouver", "Ottawa", "Montreal"], answer: 2 },
      { id: "q11", prompt: "Capital of Italy?", choices: ["Milan", "Rome", "Venice", "Naples"], answer: 1 },
      { id: "q12", prompt: "Capital of New York state?", choices: ["New York City", "Buffalo", "Albany", "Rochester"], answer: 2 },
    ],
  },
  {
    id: "geo-landmarks",
    subjectId: "geography",
    title: "Wonderful Landmarks",
    description: "Famous places around the world.",
    emoji: "🗽",
    questions: [
      { id: "q1", prompt: "Machu Picchu is an ancient city in...", choices: ["Mexico", "Peru", "Egypt", "Greece"], answer: 1 },
      { id: "q2", prompt: "The Colosseum is in which city?", choices: ["Athens", "Rome", "Paris", "Madrid"], answer: 1 },
      { id: "q3", prompt: "The Taj Mahal is located in...", choices: ["Pakistan", "India", "Iran", "Nepal"], answer: 1 },
      { id: "q4", prompt: "Mount Rushmore shows the faces of how many U.S. presidents?", choices: ["2", "3", "4", "5"], answer: 2 },
      { id: "q5", prompt: "The Sydney Opera House is in which country?", choices: ["New Zealand", "Australia", "England", "Japan"], answer: 1 },
      { id: "q6", prompt: "The Eiffel Tower is in which city?", choices: ["London", "Paris", "Rome", "Berlin"], answer: 1 },
      { id: "q7", prompt: "The Great Wall is in which country?", choices: ["India", "China", "Japan", "Korea"], answer: 1 },
      { id: "q8", prompt: "The pyramids of Giza are in...", choices: ["Egypt", "Mexico", "Greece", "Sudan"], answer: 0 },
      { id: "q9", prompt: "Big Ben is a famous clock tower in...", choices: ["Paris", "London", "New York", "Berlin"], answer: 1 },
      { id: "q10", prompt: "Stonehenge is in which country?", choices: ["Ireland", "Scotland", "England", "France"], answer: 2 },
      { id: "q11", prompt: "Niagara Falls is on the border between the U.S. and...", choices: ["Mexico", "Canada", "Cuba", "Greenland"], answer: 1 },
      { id: "q12", prompt: "Christ the Redeemer statue stands in...", choices: ["Buenos Aires", "Rio de Janeiro", "Lima", "Bogotá"], answer: 1 },
    ],
  },
  {
    id: "geo-maps",
    subjectId: "geography",
    title: "Map Skills",
    description: "Compass, equator, and hemispheres.",
    emoji: "🧭",
    questions: [
      { id: "q1", prompt: "The imaginary line around the middle of Earth is called the...", choices: ["prime meridian", "equator", "axis", "horizon"], answer: 1 },
      { id: "q2", prompt: "Lines on a map that run east-west are called lines of...", choices: ["longitude", "latitude", "altitude", "attitude"], answer: 1 },
      { id: "q3", prompt: "Between North and East on a compass is...", choices: ["NW", "NE", "SE", "SW"], answer: 1 },
      { id: "q4", prompt: "The little box on a map that explains the symbols is called the...", choices: ["title", "legend (or key)", "compass", "scale"], answer: 1 },
      { id: "q5", prompt: "The U.S. is in which hemisphere?", choices: ["Southern", "Northern", "Eastern", "none"], answer: 1 },
      { id: "q6", prompt: "Lines on a map that run north-south are called lines of...", choices: ["longitude", "latitude", "altitude", "perimeter"], answer: 0 },
      { id: "q7", prompt: "The four main directions on a compass are N, E, S, and...", choices: ["W", "NW", "SE", "D"], answer: 0 },
      { id: "q8", prompt: "The North Pole is at the very top of...", choices: ["a mountain", "the Earth", "a building", "a tree"], answer: 1 },
      { id: "q9", prompt: "Australia is in the ___ Hemisphere.", choices: ["Northern", "Southern", "both", "neither"], answer: 1 },
      { id: "q10", prompt: "The line at 0° longitude is called the...", choices: ["equator", "prime meridian", "tropic of Cancer", "axis"], answer: 1 },
      { id: "q11", prompt: "A flat picture of Earth is called a...", choices: ["globe", "map", "chart", "photo"], answer: 1 },
      { id: "q12", prompt: "A round model of Earth is called a...", choices: ["globe", "map", "flag", "poster"], answer: 0 },
    ],
  },
  {
    id: "geo-mountains",
    subjectId: "geography",
    title: "Mighty Mountains",
    description: "Tall peaks around the world.",
    emoji: "⛰️",
    questions: [
      { id: "q1", prompt: "Mount Everest is in which mountain range?", choices: ["Andes", "Rockies", "Himalayas", "Alps"], answer: 2 },
      { id: "q2", prompt: "The longest mountain range on land is the...", choices: ["Andes", "Rockies", "Himalayas", "Atlas"], answer: 0 },
      { id: "q3", prompt: "A mountain that can erupt with lava is a...", choices: ["glacier", "volcano", "canyon", "plateau"], answer: 1 },
      { id: "q4", prompt: "Mount Kilimanjaro is in which continent?", choices: ["Asia", "South America", "Africa", "Europe"], answer: 2 },
      { id: "q5", prompt: "The Alps run through which group of countries?", choices: ["Spain & Portugal", "France, Switzerland, Italy & Austria", "India & China", "Mexico & Guatemala"], answer: 1 },
      { id: "q6", prompt: "Mount Everest is the tallest mountain. About how tall is it?", choices: ["about 1,000 ft", "about 10,000 ft", "about 29,000 ft", "about 50,000 ft"], answer: 2 },
      { id: "q7", prompt: "The Rocky Mountains are on which continent?", choices: ["Asia", "Europe", "North America", "Africa"], answer: 2 },
      { id: "q8", prompt: "Mauna Loa is a famous volcano in...", choices: ["Japan", "Italy", "Hawaii", "Iceland"], answer: 2 },
      { id: "q9", prompt: "A long, narrow valley with steep sides cut by a river is a...", choices: ["hill", "canyon", "plateau", "plain"], answer: 1 },
      { id: "q10", prompt: "The Grand Canyon was carved by which river?", choices: ["Mississippi", "Colorado", "Rio Grande", "Hudson"], answer: 1 },
      { id: "q11", prompt: "Mount Fuji is in which country?", choices: ["China", "Japan", "Korea", "Vietnam"], answer: 1 },
      { id: "q12", prompt: "Lava that comes out of a volcano was once...", choices: ["ice", "magma", "sand", "water"], answer: 1 },
    ],
  },
  {
    id: "geo-rivers",
    subjectId: "geography",
    title: "Rolling Rivers",
    description: "Famous rivers and where they flow.",
    emoji: "🏞️",
    questions: [
      { id: "q1", prompt: "Which is the longest river in the world?", choices: ["Amazon", "Nile", "Mississippi", "Yangtze"], answer: 1 },
      { id: "q2", prompt: "The Amazon River flows mostly through which country?", choices: ["Mexico", "Argentina", "Brazil", "Peru"], answer: 2 },
      { id: "q3", prompt: "The place where a river meets the sea is called its...", choices: ["source", "mouth", "bank", "bed"], answer: 1 },
      { id: "q4", prompt: "The Nile River flows through which two countries?", choices: ["Egypt and Sudan", "Kenya and Nigeria", "India and Pakistan", "Brazil and Peru"], answer: 0 },
      { id: "q5", prompt: "The Mississippi River empties into the...", choices: ["Atlantic Ocean", "Pacific Ocean", "Gulf of Mexico", "Great Lakes"], answer: 2 },
      { id: "q6", prompt: "A river begins at its...", choices: ["mouth", "source", "bank", "delta"], answer: 1 },
      { id: "q7", prompt: "The Yangtze River is in which country?", choices: ["India", "China", "Russia", "Japan"], answer: 1 },
      { id: "q8", prompt: "The Thames River runs through which city?", choices: ["Paris", "London", "Rome", "Madrid"], answer: 1 },
      { id: "q9", prompt: "Fresh water from rivers usually flows DOWNHILL because of...", choices: ["magnetism", "gravity", "wind", "sunlight"], answer: 1 },
      { id: "q10", prompt: "The Seine River flows through which capital city?", choices: ["London", "Paris", "Berlin", "Madrid"], answer: 1 },
      { id: "q11", prompt: "The Hudson River flows through which U.S. state?", choices: ["New York", "Texas", "Florida", "Oregon"], answer: 0 },
      { id: "q12", prompt: "A small river that flows into a larger river is called a...", choices: ["delta", "tributary", "canyon", "strait"], answer: 1 },
    ],
  },
];

/**
 * Tag every grade-2 activity with `level: "grade2"`, then merge with the
 * kindergarten activities to produce the canonical ACTIVITIES list.
 */
export const ACTIVITIES: Activity[] = [
  ...GRADE3_ACTIVITIES,
  ...GRADE2_ACTIVITIES.map((a) => ({ ...a, level: "grade2" as Level })),
  ...GRADE1_ACTIVITIES,
  ...KINDERGARTEN_ACTIVITIES,
  ...SIGHT_WORDS_ACTIVITIES,
];

/** Return all activities matching the given level (default: grade2). */
export function getActivitiesForLevel(level: Level): Activity[] {
  return ACTIVITIES.filter((a) => (a.level ?? "grade2") === level);
}

/** Subjects available at a given level (subjects without availableLevels are available everywhere). */
export function getSubjectsForLevel(level: Level): Subject[] {
  return SUBJECTS.filter((s) => !s.availableLevels || s.availableLevels.includes(level));
}


/** Count activities for a given subject + level combination. */
export function totalActivitiesForSubjectAndLevel(subjectId: SubjectId, level: Level): number {
  return ACTIVITIES.filter((a) => a.subjectId === subjectId && (a.level ?? "grade2") === level).length;
}

export const BADGES: Badge[] = [
  { id: "first-steps", name: "First Steps", description: "Complete your first activity!", emoji: "🎓", rule: { kind: "firstActivity" } },
  { id: "perfect-round", name: "Perfect Round", description: "Get every answer right in one activity.", emoji: "💯", rule: { kind: "perfectActivity" } },
  { id: "star-collector", name: "Star Collector", description: "Earn 25 stars in total.", emoji: "⭐", rule: { kind: "totalStars", amount: 25 } },
  { id: "super-star", name: "Super Star", description: "Earn 75 stars in total.", emoji: "🌟", rule: { kind: "totalStars", amount: 75 } },
  { id: "math-whiz", name: "Math Whiz", description: "Finish every Math activity.", emoji: "🧮", rule: { kind: "subjectComplete", subjectId: "math" } },
  { id: "science-explorer", name: "Science Explorer", description: "Finish every Science activity.", emoji: "🔬", rule: { kind: "subjectComplete", subjectId: "science" } },
  { id: "history-buff", name: "History Buff", description: "Finish every History activity.", emoji: "📜", rule: { kind: "subjectComplete", subjectId: "history" } },
  { id: "world-traveler", name: "World Traveler", description: "Finish every Geography activity.", emoji: "🌍", rule: { kind: "subjectComplete", subjectId: "geography" } },
  { id: "streak-3", name: "On a Roll", description: "Practice 3 days in a row.", emoji: "🔥", rule: { kind: "streakDays", days: 3 } },
  { id: "daily-champ", name: "Daily Champ", description: "Finish a Daily Challenge.", emoji: "🏅", rule: { kind: "dailyChallenge" } },
];

export const DAILY_CHALLENGE_ID = "daily-challenge";
export const DAILY_QUESTIONS_PER_SUBJECT = 3;

/** Get a date key (YYYY-MM-DD) for the given timestamp using the local timezone. */
export function dateKey(ts: number): string {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Fisher-Yates shuffle (returns a new array). */
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Pick `count` random items from `pool` without replacement. */
export function pickRandom<T>(pool: T[], count: number): T[] {
  return shuffle(pool).slice(0, Math.min(count, pool.length));
}

/**
 * Build a randomized round for a regular activity — picks
 * `QUESTIONS_PER_ROUND` questions from the activity's full pool.
 * Each call returns a different sample (good for re-doing activities).
 */
export function buildActivityRound(activity: Activity): Activity {
  return {
    ...activity,
    questions: pickRandom(activity.questions, QUESTIONS_PER_ROUND),
  };
}

/**
 * Build the daily challenge activity — picks DAILY_QUESTIONS_PER_SUBJECT
 * questions from each subject. Randomized each call so a retake gives a
 * fresh set of questions, while pulling from a much larger pool overall.
 */
export function buildDailyChallenge(today: string, level: Level = "grade2"): Activity {
  void today;
  const levelActivities = getActivitiesForLevel(level);
  const collected: Question[] = [];
  getSubjectsForLevel(level).forEach((subject) => {
    const pool: Question[] = [];
    levelActivities.filter((a) => a.subjectId === subject.id).forEach((a) => {
      a.questions.forEach((q) => pool.push({
        ...q,
        id: `${subject.id}-${a.id}-${q.id}`,
        prompt: `${subject.emoji} ${subject.name}: ${q.prompt}`,
      }));
    });
    collected.push(...pickRandom(pool, DAILY_QUESTIONS_PER_SUBJECT));
  });
  const questions = shuffle(collected);

  return {
    id: DAILY_CHALLENGE_ID,
    subjectId: "math", // placeholder — UI uses isDaily flag instead
    level,
    title: "Daily Challenge",
    description: `${DAILY_QUESTIONS_PER_SUBJECT} questions from each subject — ${questions.length} total!`,
    emoji: "\u{1F3C6}",
    questions,
  };
}
