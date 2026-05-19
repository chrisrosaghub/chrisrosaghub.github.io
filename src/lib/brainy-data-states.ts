/**
 * Brainy Buddies — States & Capitals activities.
 * Four activities, one per U.S. region. Each question shows a Wikimedia
 * Commons location map (state highlighted in the U.S.) and asks for the capital.
 */
import type { Activity } from "@/lib/brainy-data";

/** Wikimedia Commons Special:FilePath redirect — serves the SVG location map
 *  showing the given state highlighted in red on the U.S. outline. */
function stateImg(name: string): string {
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${name.replace(/ /g, "_")}_in_United_States.svg`;
}

export const STATES_ACTIVITIES: Activity[] = [
    // ── NORTHEAST ──────────────────────────────────────────────────────────────
    {
        id: "states-northeast",
        subjectId: "states",
        allLevels: true,
        title: "Northeast States & Capitals",
        description: "New England and the Mid-Atlantic states.",
        emoji: "🗽",
        questions: [
            {
                id: "q-me", prompt: "What is the capital of Maine?",
                image: stateImg("Maine"),
                choices: ["Portland", "Augusta", "Bangor", "Concord"], answer: 1,
                explanation: "Augusta is Maine's capital. Portland is the largest city, but not the capital!",
            },
            {
                id: "q-nh", prompt: "What is the capital of New Hampshire?",
                image: stateImg("New Hampshire"),
                choices: ["Manchester", "Nashua", "Concord", "Portsmouth"], answer: 2,
                explanation: "Concord is New Hampshire's capital — short and easy to remember!",
            },
            {
                id: "q-vt", prompt: "What is the capital of Vermont?",
                image: stateImg("Vermont"),
                choices: ["Burlington", "Montpelier", "Rutland", "Brattleboro"], answer: 1,
                explanation: "Montpelier is Vermont's capital and the smallest state capital in the entire U.S.!",
            },
            {
                id: "q-ma", prompt: "What is the capital of Massachusetts?",
                image: stateImg("Massachusetts"),
                choices: ["Boston", "Springfield", "Worcester", "Cambridge"], answer: 0,
                explanation: "Boston is Massachusetts' capital — and one of America's oldest and most famous cities!",
            },
            {
                id: "q-ri", prompt: "What is the capital of Rhode Island?",
                image: stateImg("Rhode Island"),
                choices: ["Warwick", "Newport", "Providence", "Cranston"], answer: 2,
                explanation: "Providence is Rhode Island's capital. Rhode Island is the smallest state!",
            },
            {
                id: "q-ct", prompt: "What is the capital of Connecticut?",
                image: stateImg("Connecticut"),
                choices: ["Hartford", "Bridgeport", "Stamford", "New Haven"], answer: 0,
                explanation: "Hartford is Connecticut's capital — sometimes called the 'Insurance Capital of the World'!",
            },
            {
                id: "q-ny", prompt: "What is the capital of New York?",
                image: stateImg("New York"),
                choices: ["New York City", "Buffalo", "Albany", "Syracuse"], answer: 2,
                explanation: "Albany is the capital of New York — not New York City! Albany sits along the Hudson River.",
            },
            {
                id: "q-nj", prompt: "What is the capital of New Jersey?",
                image: stateImg("New Jersey"),
                choices: ["Newark", "Jersey City", "Trenton", "Atlantic City"], answer: 2,
                explanation: "Trenton is New Jersey's capital, located along the Delaware River.",
            },
            {
                id: "q-pa", prompt: "What is the capital of Pennsylvania?",
                image: stateImg("Pennsylvania"),
                choices: ["Philadelphia", "Pittsburgh", "Harrisburg", "Allentown"], answer: 2,
                explanation: "Harrisburg is Pennsylvania's capital — Philadelphia and Pittsburgh are larger but not the capital!",
            },
            {
                id: "q-md", prompt: "What is the capital of Maryland?",
                image: stateImg("Maryland"),
                choices: ["Baltimore", "Annapolis", "Rockville", "Bethesda"], answer: 1,
                explanation: "Annapolis is Maryland's capital and home to the U.S. Naval Academy!",
            },
            {
                id: "q-de", prompt: "What is the capital of Delaware?",
                image: stateImg("Delaware"),
                choices: ["Wilmington", "Newark", "Dover", "Rehoboth"], answer: 2,
                explanation: "Dover is Delaware's capital. Delaware was the first state to join the United States!",
            },
        ],
    },

    // ── SOUTHEAST ──────────────────────────────────────────────────────────────
    {
        id: "states-southeast",
        subjectId: "states",
        allLevels: true,
        title: "Southeast States & Capitals",
        description: "States and capitals of the Southeast region.",
        emoji: "🌴",
        questions: [
            {
                id: "q-va", prompt: "What is the capital of Virginia?",
                image: stateImg("Virginia"),
                choices: ["Richmond", "Virginia Beach", "Norfolk", "Arlington"], answer: 0,
                explanation: "Richmond is Virginia's capital — it was also the capital of the Confederacy during the Civil War.",
            },
            {
                id: "q-wv", prompt: "What is the capital of West Virginia?",
                image: stateImg("West Virginia"),
                choices: ["Morgantown", "Huntington", "Parkersburg", "Charleston"], answer: 3,
                explanation: "Charleston is West Virginia's capital — the largest city in the state!",
            },
            {
                id: "q-nc", prompt: "What is the capital of North Carolina?",
                image: stateImg("North Carolina"),
                choices: ["Charlotte", "Raleigh", "Greensboro", "Durham"], answer: 1,
                explanation: "Raleigh is North Carolina's capital. Charlotte is larger, but Raleigh rules!",
            },
            {
                id: "q-sc", prompt: "What is the capital of South Carolina?",
                image: stateImg("South Carolina"),
                choices: ["Greenville", "Charleston", "Columbia", "Myrtle Beach"], answer: 2,
                explanation: "Columbia is South Carolina's capital — right in the center of the state!",
            },
            {
                id: "q-ga", prompt: "What is the capital of Georgia?",
                image: stateImg("Georgia"),
                choices: ["Savannah", "Augusta", "Atlanta", "Columbus"], answer: 2,
                explanation: "Atlanta is Georgia's capital and one of the biggest cities in the South!",
            },
            {
                id: "q-fl", prompt: "What is the capital of Florida?",
                image: stateImg("Florida"),
                choices: ["Miami", "Orlando", "Tampa", "Tallahassee"], answer: 3,
                explanation: "Tallahassee is Florida's capital — not Miami or Orlando, which are much bigger!",
            },
            {
                id: "q-tn", prompt: "What is the capital of Tennessee?",
                image: stateImg("Tennessee"),
                choices: ["Memphis", "Nashville", "Knoxville", "Chattanooga"], answer: 1,
                explanation: "Nashville is Tennessee's capital — and the home of country music! 🎸",
            },
            {
                id: "q-ky", prompt: "What is the capital of Kentucky?",
                image: stateImg("Kentucky"),
                choices: ["Louisville", "Lexington", "Frankfort", "Bowling Green"], answer: 2,
                explanation: "Frankfort is Kentucky's capital — one of the smaller state capitals in the country.",
            },
            {
                id: "q-al", prompt: "What is the capital of Alabama?",
                image: stateImg("Alabama"),
                choices: ["Mobile", "Birmingham", "Huntsville", "Montgomery"], answer: 3,
                explanation: "Montgomery is Alabama's capital — an important city in the Civil Rights movement.",
            },
            {
                id: "q-ms", prompt: "What is the capital of Mississippi?",
                image: stateImg("Mississippi"),
                choices: ["Jackson", "Biloxi", "Gulfport", "Hattiesburg"], answer: 0,
                explanation: "Jackson is Mississippi's capital and its largest city!",
            },
            {
                id: "q-ar", prompt: "What is the capital of Arkansas?",
                image: stateImg("Arkansas"),
                choices: ["Fort Smith", "Fayetteville", "Little Rock", "Jonesboro"], answer: 2,
                explanation: "Little Rock is Arkansas's capital — named after a small rock formation on the river bank!",
            },
            {
                id: "q-la", prompt: "What is the capital of Louisiana?",
                image: stateImg("Louisiana"),
                choices: ["New Orleans", "Shreveport", "Baton Rouge", "Lafayette"], answer: 2,
                explanation: "'Baton Rouge' means 'Red Stick' in French — Louisiana's colorful capital!",
            },
        ],
    },

    // ── MIDWEST ────────────────────────────────────────────────────────────────
    {
        id: "states-midwest",
        subjectId: "states",
        allLevels: true,
        title: "Midwest States & Capitals",
        description: "States and capitals of the Midwest region.",
        emoji: "🌽",
        questions: [
            {
                id: "q-oh", prompt: "What is the capital of Ohio?",
                image: stateImg("Ohio"),
                choices: ["Cleveland", "Cincinnati", "Columbus", "Toledo"], answer: 2,
                explanation: "Columbus is Ohio's capital and its largest city!",
            },
            {
                id: "q-mi", prompt: "What is the capital of Michigan?",
                image: stateImg("Michigan"),
                choices: ["Detroit", "Grand Rapids", "Lansing", "Ann Arbor"], answer: 2,
                explanation: "Lansing is Michigan's capital — not Detroit, even though Detroit is much bigger!",
            },
            {
                id: "q-in", prompt: "What is the capital of Indiana?",
                image: stateImg("Indiana"),
                choices: ["Fort Wayne", "Evansville", "South Bend", "Indianapolis"], answer: 3,
                explanation: "Indianapolis is Indiana's capital — and home to the famous Indianapolis 500 race! 🏎️",
            },
            {
                id: "q-il", prompt: "What is the capital of Illinois?",
                image: stateImg("Illinois"),
                choices: ["Chicago", "Springfield", "Rockford", "Peoria"], answer: 1,
                explanation: "Springfield is Illinois's capital — not Chicago! It was also Abraham Lincoln's home.",
            },
            {
                id: "q-wi", prompt: "What is the capital of Wisconsin?",
                image: stateImg("Wisconsin"),
                choices: ["Milwaukee", "Green Bay", "Madison", "Kenosha"], answer: 2,
                explanation: "Madison is Wisconsin's capital and home to the University of Wisconsin!",
            },
            {
                id: "q-mn", prompt: "What is the capital of Minnesota?",
                image: stateImg("Minnesota"),
                choices: ["Minneapolis", "Duluth", "Rochester", "Saint Paul"], answer: 3,
                explanation: "Saint Paul is Minnesota's capital. Minneapolis and Saint Paul are called the 'Twin Cities'!",
            },
            {
                id: "q-ia", prompt: "What is the capital of Iowa?",
                image: stateImg("Iowa"),
                choices: ["Cedar Rapids", "Davenport", "Des Moines", "Sioux City"], answer: 2,
                explanation: "Des Moines is Iowa's capital and largest city!",
            },
            {
                id: "q-mo", prompt: "What is the capital of Missouri?",
                image: stateImg("Missouri"),
                choices: ["Kansas City", "St. Louis", "Springfield", "Jefferson City"], answer: 3,
                explanation: "Jefferson City is Missouri's capital — named after President Thomas Jefferson!",
            },
            {
                id: "q-ne", prompt: "What is the capital of Nebraska?",
                image: stateImg("Nebraska"),
                choices: ["Omaha", "Lincoln", "Bellevue", "Grand Island"], answer: 1,
                explanation: "Lincoln is Nebraska's capital — named after President Abraham Lincoln!",
            },
            {
                id: "q-ks", prompt: "What is the capital of Kansas?",
                image: stateImg("Kansas"),
                choices: ["Wichita", "Overland Park", "Topeka", "Kansas City"], answer: 2,
                explanation: "Topeka is Kansas's capital. Wichita is bigger, but Topeka is the capital!",
            },
            {
                id: "q-nd", prompt: "What is the capital of North Dakota?",
                image: stateImg("North Dakota"),
                choices: ["Fargo", "Grand Forks", "Bismarck", "Minot"], answer: 2,
                explanation: "Bismarck is North Dakota's capital — named after German Chancellor Otto von Bismarck!",
            },
            {
                id: "q-sd", prompt: "What is the capital of South Dakota?",
                image: stateImg("South Dakota"),
                choices: ["Sioux Falls", "Rapid City", "Aberdeen", "Pierre"], answer: 3,
                explanation: "Pierre (say it like 'peer') is South Dakota's capital — one of the smallest in the U.S.!",
            },
        ],
    },

    // ── WEST ───────────────────────────────────────────────────────────────────
    {
        id: "states-west",
        subjectId: "states",
        allLevels: true,
        title: "West States & Capitals",
        description: "States and capitals of the West region.",
        emoji: "🏔️",
        questions: [
            {
                id: "q-mt", prompt: "What is the capital of Montana?",
                image: stateImg("Montana"),
                choices: ["Billings", "Missoula", "Great Falls", "Helena"], answer: 3,
                explanation: "Helena is Montana's capital. Billings is the largest city, but Helena is the capital!",
            },
            {
                id: "q-wy", prompt: "What is the capital of Wyoming?",
                image: stateImg("Wyoming"),
                choices: ["Casper", "Laramie", "Cheyenne", "Gillette"], answer: 2,
                explanation: "Cheyenne is Wyoming's capital and largest city — known for its Wild West rodeo!",
            },
            {
                id: "q-co", prompt: "What is the capital of Colorado?",
                image: stateImg("Colorado"),
                choices: ["Colorado Springs", "Denver", "Boulder", "Aurora"], answer: 1,
                explanation: "Denver is Colorado's capital — called the 'Mile High City' because it's exactly 1 mile above sea level! 🏔️",
            },
            {
                id: "q-nm", prompt: "What is the capital of New Mexico?",
                image: stateImg("New Mexico"),
                choices: ["Albuquerque", "Las Cruces", "Santa Fe", "Roswell"], answer: 2,
                explanation: "Santa Fe is New Mexico's capital — it's the oldest state capital in the U.S., founded in 1610!",
            },
            {
                id: "q-az", prompt: "What is the capital of Arizona?",
                image: stateImg("Arizona"),
                choices: ["Tucson", "Mesa", "Scottsdale", "Phoenix"], answer: 3,
                explanation: "Phoenix is Arizona's capital and its largest city — one of the hottest cities in America! ☀️",
            },
            {
                id: "q-ut", prompt: "What is the capital of Utah?",
                image: stateImg("Utah"),
                choices: ["Provo", "Salt Lake City", "Ogden", "Sandy"], answer: 1,
                explanation: "Salt Lake City is Utah's capital — named after the Great Salt Lake nearby!",
            },
            {
                id: "q-nv", prompt: "What is the capital of Nevada?",
                image: stateImg("Nevada"),
                choices: ["Las Vegas", "Reno", "Carson City", "Henderson"], answer: 2,
                explanation: "Carson City is Nevada's capital — not Las Vegas, which is the most famous city!",
            },
            {
                id: "q-ca", prompt: "What is the capital of California?",
                image: stateImg("California"),
                choices: ["Los Angeles", "San Francisco", "San Diego", "Sacramento"], answer: 3,
                explanation: "Sacramento is California's capital — not Los Angeles or San Francisco, which are much bigger!",
            },
            {
                id: "q-or", prompt: "What is the capital of Oregon?",
                image: stateImg("Oregon"),
                choices: ["Portland", "Eugene", "Salem", "Bend"], answer: 2,
                explanation: "Salem is Oregon's capital — Portland is the largest city but not the capital!",
            },
            {
                id: "q-wa", prompt: "What is the capital of Washington?",
                image: stateImg("Washington"),
                choices: ["Seattle", "Spokane", "Olympia", "Tacoma"], answer: 2,
                explanation: "Olympia is Washington's capital — Seattle is much bigger, but Olympia is the capital!",
            },
            {
                id: "q-id", prompt: "What is the capital of Idaho?",
                image: stateImg("Idaho"),
                choices: ["Nampa", "Meridian", "Idaho Falls", "Boise"], answer: 3,
                explanation: "Boise is Idaho's capital and largest city — home to the Boise State Broncos!",
            },
            {
                id: "q-ak", prompt: "What is the capital of Alaska?",
                image: stateImg("Alaska"),
                choices: ["Anchorage", "Fairbanks", "Juneau", "Nome"], answer: 2,
                explanation: "Juneau is Alaska's capital — it can only be reached by boat or plane, not by road! 🛥️",
            },
            {
                id: "q-hi", prompt: "What is the capital of Hawaii?",
                image: stateImg("Hawaii"),
                choices: ["Maui", "Kauai", "Hilo", "Honolulu"], answer: 3,
                explanation: "Honolulu is Hawaii's capital — it's on the island of Oahu and is the only U.S. state capital outside North America!",
            },
        ],
    },
];
