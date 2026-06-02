/**
 * Brainy Buddies — European Countries & Capitals activities.
 *
 * Four regional activities: Western (10), Northern (7), Eastern (9),
 * Southern (8), plus an All Europe (34) activity.
 *
 * Each country generates TWO question types:
 *   1. "What is the capital of [Country]?"           (country → capital)
 *   2. "[Capital] is the capital of which country?"  (capital → country)
 *
 * Wrong answer choices are drawn from other countries in the same pool.
 * questionsPerRound = number of countries in that region so every country
 * appears exactly once per play-through (one direction chosen at random).
 */
import type { Activity, Question } from "@/lib/brainy-data";

// ─── Types & helpers ──────────────────────────────────────────────────────────

export interface CountryEntry {
    name: string;
    capital: string;
    explanation: string;
}

/** Insert item at position pos into a copy of arr. */
function insertAt<T>(arr: T[], pos: number, item: T): T[] {
    return [...arr.slice(0, pos), item, ...arr.slice(pos)];
}

/**
 * Generate both question types for every country in the list.
 * Wrong choices are deterministically drawn from other entries in the
 * same list (spread evenly to avoid clustering).
 */
function buildCountryQuestions(entries: CountryEntry[]): Question[] {
    const capitals = entries.map(e => e.capital);
    const names = entries.map(e => e.name);
    const qs: Question[] = [];

    entries.forEach((entry, i) => {
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
        const countryPos = (i + 2) % 4;

        const slug = entry.name.toLowerCase().replace(/ /g, "-");
        const group = `euro-${slug}`;
        qs.push({
            id: `q-euro-${slug}-cap`,
            prompt: `What is the capital of ${entry.name}?`,
            choices: insertAt(wc, capPos, entry.capital),
            answer: capPos,
            explanation: entry.explanation,
            group,
        });
        qs.push({
            id: `q-euro-${slug}-country`,
            prompt: `${entry.capital} is the capital of which country?`,
            choices: insertAt(wn, countryPos, entry.name),
            answer: countryPos,
            explanation: entry.explanation,
            group,
        });
    });

    return qs;
}

// ─── Country data by region ───────────────────────────────────────────────────

export const WESTERN_EUROPE: CountryEntry[] = [
    { name: "France", capital: "Paris", explanation: "Paris is one of the most visited cities in the world — home to the Eiffel Tower! 🗼" },
    { name: "Germany", capital: "Berlin", explanation: "Berlin is Germany's capital and largest city — rebuilt after World War II! 🧱" },
    { name: "United Kingdom", capital: "London", explanation: "London is the UK's capital, home to Big Ben and Buckingham Palace! 👑" },
    { name: "Spain", capital: "Madrid", explanation: "Madrid is Spain's capital and largest city — right in the center of the country! 🌞" },
    { name: "Portugal", capital: "Lisbon", explanation: "Lisbon is Portugal's capital and one of the oldest cities in Europe! ⚓" },
    { name: "Netherlands", capital: "Amsterdam", explanation: "Amsterdam is the Netherlands' capital, famous for its canals and bicycles! 🚲" },
    { name: "Belgium", capital: "Brussels", explanation: "Brussels is Belgium's capital and home to the headquarters of the European Union! 🇪🇺" },
    { name: "Switzerland", capital: "Bern", explanation: "Bern is Switzerland's capital — not the largest city (that's Zurich), but the seat of government! 🏔️" },
    { name: "Austria", capital: "Vienna", explanation: "Vienna is Austria's capital and was once the center of one of Europe's most powerful empires! 🎶" },
    { name: "Ireland", capital: "Dublin", explanation: "Dublin is Ireland's capital — a vibrant city on the eastern coast of the Emerald Isle! ☘️" },
];

export const NORTHERN_EUROPE: CountryEntry[] = [
    { name: "Sweden", capital: "Stockholm", explanation: "Stockholm is Sweden's capital — built on 14 islands where Lake Mälaren meets the Baltic Sea! 🦩" },
    { name: "Norway", capital: "Oslo", explanation: "Oslo is Norway's capital, famous for fjords and being home to the Nobel Peace Prize! 🏆" },
    { name: "Denmark", capital: "Copenhagen", explanation: "Copenhagen is Denmark's capital and home to The Little Mermaid statue! 🧜" },
    { name: "Finland", capital: "Helsinki", explanation: "Helsinki is Finland's capital, sitting on a peninsula along the Baltic Sea! 🌊" },
    { name: "Iceland", capital: "Reykjavik", explanation: "Reykjavik is Iceland's capital and the world's northernmost capital of a sovereign state! 🌋" },
    { name: "Estonia", capital: "Tallinn", explanation: "Tallinn is Estonia's capital — it has one of the best-preserved medieval old towns in Europe! 🏰" },
    { name: "Latvia", capital: "Riga", explanation: "Riga is Latvia's capital and largest city, famous for its Art Nouveau architecture! 🎨" },
];

export const EASTERN_EUROPE: CountryEntry[] = [
    { name: "Poland", capital: "Warsaw", explanation: "Warsaw is Poland's capital. It was almost completely destroyed in WWII and heroically rebuilt! 🏙️" },
    { name: "Czech Republic", capital: "Prague", explanation: "Prague is the Czech Republic's capital — often called the 'City of a Hundred Spires'! 🏯" },
    { name: "Slovakia", capital: "Bratislava", explanation: "Bratislava is Slovakia's capital, sitting right on the Danube River near Austria and Hungary! 🌉" },
    { name: "Hungary", capital: "Budapest", explanation: "Budapest is Hungary's capital — it's actually two cities, Buda and Pest, joined together! 🌉" },
    { name: "Romania", capital: "Bucharest", explanation: "Bucharest is Romania's capital — sometimes called 'Little Paris' for its elegant buildings! 🌹" },
    { name: "Bulgaria", capital: "Sofia", explanation: "Sofia is Bulgaria's capital and one of the oldest cities in Europe! ⛪" },
    { name: "Serbia", capital: "Belgrade", explanation: "Belgrade is Serbia's capital, located at the meeting point of the Sava and Danube rivers! 🏛️" },
    { name: "Croatia", capital: "Zagreb", explanation: "Zagreb is Croatia's capital, a beautiful city of historic architecture and parks! 🌿" },
    { name: "Lithuania", capital: "Vilnius", explanation: "Vilnius is Lithuania's capital — its baroque old town is a UNESCO World Heritage Site! 🏰" },
];

export const SOUTHERN_EUROPE: CountryEntry[] = [
    { name: "Italy", capital: "Rome", explanation: "Rome is Italy's capital — called the 'Eternal City', it's over 2,700 years old! 🏛️" },
    { name: "Greece", capital: "Athens", explanation: "Athens is Greece's capital — the birthplace of democracy and the Olympic Games! 🏛️" },
    { name: "Slovenia", capital: "Ljubljana", explanation: "Ljubljana is Slovenia's capital — a charming city with a castle on the hill above it! 🏰" },
    { name: "Albania", capital: "Tirana", explanation: "Tirana is Albania's capital — known for its colorful buildings and vibrant street art! 🎨" },
    { name: "North Macedonia", capital: "Skopje", explanation: "Skopje is North Macedonia's capital — a city full of impressive statues and monuments! 🗿" },
    { name: "Montenegro", capital: "Podgorica", explanation: "Podgorica is Montenegro's capital — a growing city surrounded by dramatic mountain scenery! 🌄" },
    { name: "Bosnia and Herzegovina", capital: "Sarajevo", explanation: "Sarajevo is Bosnia and Herzegovina's capital — a city where Eastern and Western cultures beautifully meet! 🕌" },
    { name: "Malta", capital: "Valletta", explanation: "Valletta is Malta's capital and the smallest national capital in the European Union! ⚓" },
];

export const ALL_EUROPE: CountryEntry[] = [
    ...WESTERN_EUROPE,
    ...NORTHERN_EUROPE,
    ...EASTERN_EUROPE,
    ...SOUTHERN_EUROPE,
];

// ─── Activities ───────────────────────────────────────────────────────────────

export const EUROPE_ACTIVITIES: Activity[] = [
    {
        id: "europe-western",
        subjectId: "geography",
        allLevels: true,
        questionsPerRound: WESTERN_EUROPE.length, // 10
        title: "Western Europe Capitals",
        description: "France, Germany, UK, Spain, Portugal, and more — 10 countries.",
        emoji: "🗼",
        questions: buildCountryQuestions(WESTERN_EUROPE),
    },
    {
        id: "europe-northern",
        subjectId: "geography",
        allLevels: true,
        questionsPerRound: NORTHERN_EUROPE.length, // 7
        title: "Northern Europe Capitals",
        description: "Scandinavia and the Baltic states — 7 countries.",
        emoji: "🌍",
        questions: buildCountryQuestions(NORTHERN_EUROPE),
    },
    {
        id: "europe-eastern",
        subjectId: "geography",
        allLevels: true,
        questionsPerRound: EASTERN_EUROPE.length, // 9
        title: "Eastern Europe Capitals",
        description: "Poland, Czech Republic, Hungary, Romania, and more — 9 countries.",
        emoji: "🏯",
        questions: buildCountryQuestions(EASTERN_EUROPE),
    },
    {
        id: "europe-southern",
        subjectId: "geography",
        allLevels: true,
        questionsPerRound: SOUTHERN_EUROPE.length, // 8
        title: "Southern Europe Capitals",
        description: "Italy, Greece, the Balkans, and more — 8 countries.",
        emoji: "🏛️",
        questions: buildCountryQuestions(SOUTHERN_EUROPE),
    },
    {
        id: "europe-all",
        subjectId: "geography",
        allLevels: true,
        questionsPerRound: ALL_EUROPE.length, // 34
        title: "All European Capitals",
        description: "All 34 countries across Western, Northern, Eastern & Southern Europe.",
        emoji: "🌍",
        questions: buildCountryQuestions(ALL_EUROPE),
    },
];
