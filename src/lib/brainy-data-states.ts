/**
 * Brainy Buddies — States & Capitals activities.
 *
 * Five activities: Northeast (11), Southeast (13), Midwest (13), West (13),
 * and All 50 States (50). All 50 states are covered across the four regions.
 *
 * Each state generates TWO question types:
 *   1. "What is the capital of [State]?"          (state → capital)
 *   2. "[Capital] is the capital of which state?" (capital → state)
 *
 * Wrong answer choices are drawn from other states in the same pool,
 * so regional quizzes keep distractors contextually relevant,
 * while the All 50 quiz draws from the full national pool (hardest).
 *
 * questionsPerRound = number of states in that region, so every state
 * appears exactly once per play-through (one of the two directions chosen
 * at random via the pool shuffle in buildActivityRound).
 */
import type { Activity, Question } from "@/lib/brainy-data";

// ─── Types & helpers ─────────────────────────────────────────────────────────

export interface StateEntry {
    name: string;
    capital: string;
    explanation: string;
}

/** Wikimedia Commons Special:FilePath redirect — SVG of state highlighted on US map. */
export function stateImg(name: string): string {
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${name.replace(/ /g, "_")}_in_United_States.svg`;
}

/** Insert item at position pos into a copy of arr. */
function insertAt<T>(arr: T[], pos: number, item: T): T[] {
    return [...arr.slice(0, pos), item, ...arr.slice(pos)];
}

/**
 * Generate both question types for every state in the list.
 * Wrong choices are deterministically drawn from other entries in the
 * same list (spread evenly to avoid clustering).
 */
function buildStateQuestions(entries: StateEntry[]): Question[] {
    const capitals = entries.map(e => e.capital);
    const names = entries.map(e => e.name);
    const qs: Question[] = [];

    entries.forEach((entry, i) => {
        const img = stateImg(entry.name);
        const capPool = capitals.filter((_, j) => j !== i);
        const namePool = names.filter((_, j) => j !== i);
        const n = capPool.length; // entries.length - 1

        // Pick 3 wrong choices spread across the pool
        const step1 = Math.max(1, Math.floor(n / 3));
        const step2 = Math.max(2, Math.floor(2 * n / 3));
        const wc: [string, string, string] = [
            capPool[i % n],
            capPool[(i + step1) % n],
            capPool[(i + step2) % n],
        ];
        const wn: [string, string, string] = [
            namePool[i % n],
            namePool[(i + step1) % n],
            namePool[(i + step2) % n],
        ];

        // Spread answer positions across 0–3 for variety
        const capPos = i % 4;
        const statePos = (i + 2) % 4;

        const group = `state-${entry.name.toLowerCase().replace(/ /g, "-")}`;
        qs.push({
            id: `q-${entry.name.toLowerCase().replace(/ /g, "-")}-cap`,
            prompt: `What is the capital of ${entry.name}?`,
            image: img,
            choices: insertAt(wc, capPos, entry.capital),
            answer: capPos,
            explanation: entry.explanation,
            group,
        });
        qs.push({
            id: `q-${entry.name.toLowerCase().replace(/ /g, "-")}-state`,
            prompt: `${entry.capital} is the capital of which state?`,
            image: img,
            choices: insertAt(wn, statePos, entry.name),
            answer: statePos,
            explanation: entry.explanation,
            group,
        });
    });

    return qs;
}

// ─── State data by region ─────────────────────────────────────────────────────

export const NORTHEAST_STATES: StateEntry[] = [
    { name: "Maine", capital: "Augusta", explanation: "Augusta is Maine's capital. Portland is the largest city, but not the capital!" },
    { name: "New Hampshire", capital: "Concord", explanation: "Concord is New Hampshire's capital — short and easy to remember!" },
    { name: "Vermont", capital: "Montpelier", explanation: "Montpelier is Vermont's capital and the smallest state capital in the entire U.S.!" },
    { name: "Massachusetts", capital: "Boston", explanation: "Boston is Massachusetts' capital — one of America's oldest and most famous cities!" },
    { name: "Rhode Island", capital: "Providence", explanation: "Providence is Rhode Island's capital. Rhode Island is the smallest state!" },
    { name: "Connecticut", capital: "Hartford", explanation: "Hartford is Connecticut's capital — sometimes called the 'Insurance Capital of the World'!" },
    { name: "New York", capital: "Albany", explanation: "Albany is New York's capital — not New York City! Albany sits along the Hudson River." },
    { name: "New Jersey", capital: "Trenton", explanation: "Trenton is New Jersey's capital, located along the Delaware River." },
    { name: "Pennsylvania", capital: "Harrisburg", explanation: "Harrisburg is Pennsylvania's capital — Philadelphia and Pittsburgh are larger but not the capital!" },
    { name: "Maryland", capital: "Annapolis", explanation: "Annapolis is Maryland's capital and home to the U.S. Naval Academy!" },
    { name: "Delaware", capital: "Dover", explanation: "Dover is Delaware's capital. Delaware was the first state to join the United States!" },
];

export const SOUTHEAST_STATES: StateEntry[] = [
    { name: "Virginia", capital: "Richmond", explanation: "Richmond is Virginia's capital — it was also the capital of the Confederacy during the Civil War." },
    { name: "West Virginia", capital: "Charleston", explanation: "Charleston is West Virginia's capital and its largest city!" },
    { name: "North Carolina", capital: "Raleigh", explanation: "Raleigh is North Carolina's capital. Charlotte is larger, but Raleigh rules!" },
    { name: "South Carolina", capital: "Columbia", explanation: "Columbia is South Carolina's capital — right in the center of the state!" },
    { name: "Georgia", capital: "Atlanta", explanation: "Atlanta is Georgia's capital and one of the biggest cities in the South!" },
    { name: "Florida", capital: "Tallahassee", explanation: "Tallahassee is Florida's capital — not Miami or Orlando, which are much bigger!" },
    { name: "Tennessee", capital: "Nashville", explanation: "Nashville is Tennessee's capital — and the home of country music! 🎸" },
    { name: "Kentucky", capital: "Frankfort", explanation: "Frankfort is Kentucky's capital — one of the smaller state capitals in the country." },
    { name: "Alabama", capital: "Montgomery", explanation: "Montgomery is Alabama's capital — an important city in the Civil Rights movement." },
    { name: "Mississippi", capital: "Jackson", explanation: "Jackson is Mississippi's capital and its largest city!" },
    { name: "Arkansas", capital: "Little Rock", explanation: "Little Rock is Arkansas's capital — named after a small rock formation on the riverbank!" },
    { name: "Louisiana", capital: "Baton Rouge", explanation: "'Baton Rouge' means 'Red Stick' in French — Louisiana's colorful capital!" },
    { name: "Texas", capital: "Austin", explanation: "Austin is Texas's capital — not Houston or Dallas, which are larger! Austin is famous for live music. 🎸" },
];

export const MIDWEST_STATES: StateEntry[] = [
    { name: "Ohio", capital: "Columbus", explanation: "Columbus is Ohio's capital and its largest city!" },
    { name: "Michigan", capital: "Lansing", explanation: "Lansing is Michigan's capital — not Detroit, even though Detroit is much bigger!" },
    { name: "Indiana", capital: "Indianapolis", explanation: "Indianapolis is Indiana's capital — home to the famous Indianapolis 500 race! 🏎️" },
    { name: "Illinois", capital: "Springfield", explanation: "Springfield is Illinois's capital — not Chicago! It was also Abraham Lincoln's home." },
    { name: "Wisconsin", capital: "Madison", explanation: "Madison is Wisconsin's capital and home to the University of Wisconsin!" },
    { name: "Minnesota", capital: "Saint Paul", explanation: "Saint Paul is Minnesota's capital. Minneapolis and Saint Paul are the 'Twin Cities'!" },
    { name: "Iowa", capital: "Des Moines", explanation: "Des Moines is Iowa's capital and largest city!" },
    { name: "Missouri", capital: "Jefferson City", explanation: "Jefferson City is Missouri's capital — named after President Thomas Jefferson!" },
    { name: "Nebraska", capital: "Lincoln", explanation: "Lincoln is Nebraska's capital — named after President Abraham Lincoln!" },
    { name: "Kansas", capital: "Topeka", explanation: "Topeka is Kansas's capital. Wichita is bigger, but Topeka is the capital!" },
    { name: "North Dakota", capital: "Bismarck", explanation: "Bismarck is North Dakota's capital — named after German Chancellor Otto von Bismarck!" },
    { name: "South Dakota", capital: "Pierre", explanation: "Pierre (say it like 'peer') is South Dakota's capital — one of the smallest in the U.S.!" },
    { name: "Oklahoma", capital: "Oklahoma City", explanation: "Oklahoma City is both the capital and largest city of Oklahoma — the only state whose capital shares the state's name!" },
];

export const WEST_STATES: StateEntry[] = [
    { name: "Montana", capital: "Helena", explanation: "Helena is Montana's capital. Billings is the largest city, but Helena is the capital!" },
    { name: "Wyoming", capital: "Cheyenne", explanation: "Cheyenne is Wyoming's capital and largest city — known for its Wild West rodeo!" },
    { name: "Colorado", capital: "Denver", explanation: "Denver is Colorado's capital — the 'Mile High City' sits exactly 1 mile above sea level! 🏔️" },
    { name: "New Mexico", capital: "Santa Fe", explanation: "Santa Fe is New Mexico's capital — the oldest state capital in the U.S., founded in 1610!" },
    { name: "Arizona", capital: "Phoenix", explanation: "Phoenix is Arizona's capital and its largest city — one of the hottest cities in America! ☀️" },
    { name: "Utah", capital: "Salt Lake City", explanation: "Salt Lake City is Utah's capital — named after the Great Salt Lake nearby!" },
    { name: "Nevada", capital: "Carson City", explanation: "Carson City is Nevada's capital — not Las Vegas, which is the most famous city!" },
    { name: "California", capital: "Sacramento", explanation: "Sacramento is California's capital — not Los Angeles or San Francisco, which are much bigger!" },
    { name: "Oregon", capital: "Salem", explanation: "Salem is Oregon's capital — Portland is the largest city but not the capital!" },
    { name: "Washington", capital: "Olympia", explanation: "Olympia is Washington's capital — Seattle is much bigger, but Olympia is the capital!" },
    { name: "Idaho", capital: "Boise", explanation: "Boise is Idaho's capital and largest city — home to the Boise State Broncos!" },
    { name: "Alaska", capital: "Juneau", explanation: "Juneau is Alaska's capital — it can only be reached by boat or plane, not by road! 🛥️" },
    { name: "Hawaii", capital: "Honolulu", explanation: "Honolulu is Hawaii's capital — on Oahu island, the only U.S. state capital outside North America!" },
];

export const ALL_STATES: StateEntry[] = [
    ...NORTHEAST_STATES,
    ...SOUTHEAST_STATES,
    ...MIDWEST_STATES,
    ...WEST_STATES,
];

// ─── Learn groups (used by the Learn Mode page) ───────────────────────────────

export interface StateInfo extends StateEntry {
    img: string;
}

export interface LearnGroup {
    id: string;
    title: string;
    emoji: string;
    description: string;
    states: StateInfo[];
    /** Activity ID to navigate to after studying. */
    quizActivityId: string;
}

function toInfoList(entries: StateEntry[]): StateInfo[] {
    return entries.map(e => ({ ...e, img: stateImg(e.name) }));
}

export const LEARN_GROUPS: LearnGroup[] = [
    {
        id: "northeast",
        title: "Northeast",
        emoji: "🗽",
        description: "11 states — New England & Mid-Atlantic",
        states: toInfoList(NORTHEAST_STATES),
        quizActivityId: "states-northeast",
    },
    {
        id: "southeast",
        title: "Southeast",
        emoji: "🌴",
        description: "13 states — Atlantic coast to Texas",
        states: toInfoList(SOUTHEAST_STATES),
        quizActivityId: "states-southeast",
    },
    {
        id: "midwest",
        title: "Midwest",
        emoji: "🌽",
        description: "13 states — The heartland",
        states: toInfoList(MIDWEST_STATES),
        quizActivityId: "states-midwest",
    },
    {
        id: "west",
        title: "West",
        emoji: "🏔️",
        description: "13 states — Mountains & Pacific",
        states: toInfoList(WEST_STATES),
        quizActivityId: "states-west",
    },
    {
        id: "alpha",
        title: "A to Z",
        emoji: "🔤",
        description: "All 50 states in alphabetical order",
        states: toInfoList([...ALL_STATES].sort((a, b) => a.name.localeCompare(b.name))),
        quizActivityId: "states-all50",
    },
];

// ─── Activities ───────────────────────────────────────────────────────────────

export const STATES_ACTIVITIES: Activity[] = [
    {
        id: "states-northeast",
        subjectId: "states",
        allLevels: true,
        questionsPerRound: NORTHEAST_STATES.length, // 11
        title: "Northeast States & Capitals",
        description: "New England and the Mid-Atlantic — 11 states.",
        emoji: "🗽",
        questions: buildStateQuestions(NORTHEAST_STATES),
    },
    {
        id: "states-southeast",
        subjectId: "states",
        allLevels: true,
        questionsPerRound: SOUTHEAST_STATES.length, // 13
        title: "Southeast States & Capitals",
        description: "Southern states from the Atlantic coast to the Lone Star State — 13 states.",
        emoji: "🌴",
        questions: buildStateQuestions(SOUTHEAST_STATES),
    },
    {
        id: "states-midwest",
        subjectId: "states",
        allLevels: true,
        questionsPerRound: MIDWEST_STATES.length, // 13
        title: "Midwest States & Capitals",
        description: "The heartland states from Ohio to Oklahoma — 13 states.",
        emoji: "🌽",
        questions: buildStateQuestions(MIDWEST_STATES),
    },
    {
        id: "states-west",
        subjectId: "states",
        allLevels: true,
        questionsPerRound: WEST_STATES.length, // 13
        title: "West States & Capitals",
        description: "Rocky Mountain, Pacific Coast, and non-contiguous states — 13 states.",
        emoji: "🏔️",
        questions: buildStateQuestions(WEST_STATES),
    },
    {
        id: "states-all50",
        subjectId: "states",
        allLevels: true,
        questionsPerRound: ALL_STATES.length, // 50
        title: "All 50 States",
        description: "The ultimate challenge — all 50 U.S. states and their capitals!",
        emoji: "🦅",
        questions: buildStateQuestions(ALL_STATES),
    },
];

