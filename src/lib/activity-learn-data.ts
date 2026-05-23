/**
 * Learn-mode flashcard data for every activity across all grade levels.
 * Each entry maps an activity ID to an array of LearnItems shown before the quiz.
 * Science Grade-2 items are imported from science-learn-data.ts (unchanged).
 */
import { SCIENCE_LEARN_ITEMS } from "@/lib/science-learn-data";
export type { LearnItem } from "@/lib/science-learn-data";

const EXTRA: Record<string, { emoji: string; title: string; fact: string }[]> = {

  // ─── KINDERGARTEN MATH ────────────────────────────────────────────────────
  "k-math-count": [
    { emoji: "1️⃣", title: "Numbers 1–5", fact: "1 = one, 2 = two, 3 = three, 4 = four, 5 = five. Use your fingers to count!" },
    { emoji: "6️⃣", title: "Numbers 6–10", fact: "6 = six (bug legs!), 7 = seven (days in a week), 8 = eight (spider legs), 9 = nine, 10 = ten (all your fingers)!" },
    { emoji: "0️⃣", title: "Zero", fact: "Zero (0) means none at all. If you eat all your cookies, you have 0 left!" },
    { emoji: "👆", title: "One-to-One Matching", fact: "When counting objects, point to each one and say a number. Each object gets exactly ONE number." },
    { emoji: "🔢", title: "Counting Order", fact: "Numbers always go in the same order: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Never skip!" },
  ],

  "k-math-shapes": [
    { emoji: "⭕", title: "Circle", fact: "A circle is perfectly round with no corners and no straight sides — like a wheel or the sun!" },
    { emoji: "🟥", title: "Square", fact: "A square has 4 equal sides and 4 corners. All sides are the same length — like a cracker!" },
    { emoji: "🔺", title: "Triangle", fact: "A triangle has 3 sides and 3 corners. It looks like a mountain or a pizza slice!" },
    { emoji: "▬", title: "Rectangle", fact: "A rectangle has 4 sides and 4 corners, but the sides come in 2 long and 2 short pairs — like a door!" },
    { emoji: "👀", title: "Shapes Are Everywhere", fact: "Windows are rectangles, wheels are circles, and sandwich slices are triangles. Look around — shapes are everywhere!" },
  ],

  "k-math-add": [
    { emoji: "➕", title: "Adding Means Joining", fact: "When you add, you put two groups together to find the total. 2 apples + 3 apples = 5 apples!" },
    { emoji: "🎯", title: "The Sum", fact: "The answer when you add is called the SUM. 4 + 3 = 7. The sum is 7!" },
    { emoji: "0️⃣", title: "Adding Zero", fact: "Adding 0 doesn't change anything! 5 + 0 = 5. Zero adds nothing." },
    { emoji: "✋", title: "Count On", fact: "To add 3 + 4, start at 3 and count up 4 more: 4 … 5 … 6 … 7. The answer is 7!" },
    { emoji: "🔄", title: "Order Doesn't Matter", fact: "2 + 5 = 7 AND 5 + 2 = 7! You can add in any order and get the same answer." },
  ],

  "k-math-sub": [
    { emoji: "➖", title: "Subtracting Means Taking Away", fact: "5 cookies take away 2 cookies = 3 cookies left. Subtraction removes from a group." },
    { emoji: "🎯", title: "The Difference", fact: "The answer when you subtract is called the DIFFERENCE. 7 − 3 = 4. The difference is 4!" },
    { emoji: "0️⃣", title: "Subtracting Zero", fact: "Subtracting 0 doesn't change anything! 8 − 0 = 8." },
    { emoji: "✋", title: "Count Back", fact: "To subtract 8 − 3, start at 8 and count back 3: 7 … 6 … 5. The answer is 5!" },
    { emoji: "🔗", title: "Addition & Subtraction Are Partners", fact: "If 3 + 4 = 7, then 7 − 4 = 3 and 7 − 3 = 4. They undo each other!" },
  ],

  "k-math-colors": [
    { emoji: "🔄", title: "What Is a Pattern?", fact: "A pattern is something that repeats in a predictable way: red, blue, red, blue, red… what comes next? Blue!" },
    { emoji: "🔵🔴", title: "AB Pattern", fact: "An AB pattern uses two things that keep repeating: circle, square, circle, square…" },
    { emoji: "🔵🔴🟡", title: "ABC Pattern", fact: "An ABC pattern uses three things: big, small, medium, big, small, medium…" },
    { emoji: "🌈", title: "Colors of the Rainbow", fact: "Red, orange, yellow, green, blue, indigo, violet — remember with ROY G BIV!" },
    { emoji: "👀", title: "Patterns in Nature", fact: "Stripes on a zebra, spots on a leopard, petals on a flower — patterns are all around us!" },
  ],

  // ─── KINDERGARTEN SCIENCE ─────────────────────────────────────────────────
  "k-sci-animals2": [
    { emoji: "🐄", title: "Farm Animals", fact: "Cows, pigs, chickens, horses, and sheep live on farms and help provide food for people." },
    { emoji: "🐕", title: "Pets", fact: "Dogs, cats, fish, hamsters, and birds live with families as companions and friends." },
    { emoji: "🦁", title: "Wild Animals", fact: "Lions, elephants, bears, and wolves live in nature — forests, savannas, and mountains." },
    { emoji: "🐬", title: "Ocean Animals", fact: "Fish, dolphins, whales, sharks, and crabs live in the salt water of the ocean." },
    { emoji: "🌲", title: "Forest Animals", fact: "Deer, squirrels, owls, and foxes live among the trees of forests." },
    { emoji: "🏜️", title: "Desert Animals", fact: "Camels, lizards, and scorpions live in hot, dry deserts. They are great at saving water!" },
  ],

  "k-sci-animals": [
    { emoji: "🐮", title: "Cow & Calf", fact: "A cow says 'MOO!' A baby cow is called a calf." },
    { emoji: "🐕", title: "Dog & Puppy", fact: "A dog says 'WOOF!' A baby dog is called a puppy." },
    { emoji: "🐱", title: "Cat & Kitten", fact: "A cat says 'MEOW!' A baby cat is called a kitten." },
    { emoji: "🐤", title: "Hen & Chick", fact: "A chicken says 'CLUCK!' A baby chicken is called a chick." },
    { emoji: "🐑", title: "Sheep & Lamb", fact: "A sheep says 'BAA!' A baby sheep is called a lamb." },
    { emoji: "🐻", title: "Bear & Cub", fact: "A bear says 'GROWL!' A baby bear is called a cub." },
    { emoji: "🐸", title: "Frog & Tadpole", fact: "A frog says 'RIBBIT!' A baby frog starts as a tiny tadpole that swims in water." },
  ],

  "k-sci-weather": [
    { emoji: "☀️", title: "Sunny", fact: "On sunny days, the sun shines bright. It's warm and great for playing outside!" },
    { emoji: "🌧️", title: "Rainy", fact: "Rain comes from clouds and waters the plants. Wear your rain boots!" },
    { emoji: "❄️", title: "Snowy", fact: "Snow is frozen water that falls from clouds. It's cold and white — perfect for snowmen!" },
    { emoji: "🌬️", title: "Windy", fact: "Wind is air moving fast. It can fly your kite or blow your hat away!" },
    { emoji: "🍂", title: "Four Seasons", fact: "Spring (warm, flowers bloom), Summer (hot, sunny), Fall (cool, leaves fall), Winter (cold, snowy)." },
    { emoji: "🌡️", title: "Temperature", fact: "Temperature tells us how hot or cold it is. We use a thermometer to measure it!" },
  ],

  "k-sci-fivesenses": [
    { emoji: "👀", title: "Sight", fact: "Your EYES let you see colors, shapes, sizes, and how far away things are." },
    { emoji: "👂", title: "Hearing", fact: "Your EARS let you hear music, voices, thunder, and whispers." },
    { emoji: "👃", title: "Smell", fact: "Your NOSE lets you smell flowers, food cooking, rain, and so much more!" },
    { emoji: "👅", title: "Taste", fact: "Your TONGUE lets you taste sweet (candy), sour (lemon), salty (chips), and bitter (coffee)." },
    { emoji: "✋", title: "Touch", fact: "Your SKIN lets you feel rough, smooth, hot, cold, soft, and hard surfaces." },
    { emoji: "🧠", title: "Your Brain Is the Boss", fact: "Your brain receives messages from all 5 senses and helps you understand the world!" },
  ],

  "k-sci-plants": [
    { emoji: "🌱", title: "Plants Are Living Things", fact: "Plants grow, need food, and can make new plants. They are alive — just like you!" },
    { emoji: "☀️", title: "What Plants Need", fact: "Plants need sunlight, water, and air (carbon dioxide) to survive and grow." },
    { emoji: "🌿", title: "Parts of a Plant", fact: "Roots (hold the plant and drink water), stem (stands it up), leaves (catch sunlight), flower (makes seeds)." },
    { emoji: "🪨", title: "Non-Living Things", fact: "Rocks, water, and chairs are NOT alive. They don't grow or need food." },
    { emoji: "🌱", title: "From Seed to Plant", fact: "A tiny seed can grow into a big plant! It needs water and sunlight to start sprouting." },
  ],

  // ─── KINDERGARTEN HISTORY ─────────────────────────────────────────────────
  "k-hist-holidays2": [
    { emoji: "🎄", title: "Winter Holidays", fact: "Christmas (Dec 25), Hanukkah (8 nights of lights), and Kwanzaa (Dec 26–Jan 1) are all winter celebrations!" },
    { emoji: "🎃", title: "Fall Holidays", fact: "Halloween (Oct 31) is for costumes and candy. Thanksgiving (November) is for family and gratitude." },
    { emoji: "🇺🇸", title: "Summer & Spring", fact: "Independence Day (July 4th) has fireworks! Easter in spring celebrates new life." },
    { emoji: "💝", title: "February Fun", fact: "Valentine's Day (Feb 14) is a day to share kindness and cards with people you care about." },
    { emoji: "🎉", title: "Why We Celebrate", fact: "Holidays are special days where families come together to remember important events and have fun!" },
  ],

  "k-hist-helpers": [
    { emoji: "👮", title: "Police Officers", fact: "Police officers keep our neighborhoods safe and help people in emergencies." },
    { emoji: "🚒", title: "Firefighters", fact: "Firefighters put out fires and rescue people. They are very brave!" },
    { emoji: "🏥", title: "Doctors & Nurses", fact: "Doctors and nurses help sick or hurt people feel better and stay healthy." },
    { emoji: "📚", title: "Teachers", fact: "Teachers help children learn to read, write, do math, and understand the world." },
    { emoji: "📬", title: "Mail Carriers", fact: "Mail carriers deliver letters and packages to homes and businesses every day." },
    { emoji: "🤝", title: "Community Helpers", fact: "All these helpers work together to make our town safe, healthy, and a great place to live!" },
  ],

  "k-hist-family": [
    { emoji: "👨‍👩‍👧‍👦", title: "What Is a Family?", fact: "A family is a group of people who love and take care of each other. Families come in many shapes!" },
    { emoji: "📅", title: "Past, Present, Future", fact: "Past = long ago. Present = right now. Future = what will happen. Your grandparents lived in the past!" },
    { emoji: "📷", title: "Family Tree", fact: "A family tree shows how family members are connected — grandparents, parents, children, and more!" },
    { emoji: "🏠", title: "Life Long Ago", fact: "Long ago, there were no phones, cars, or computers. People wrote letters and traveled by horse!" },
    { emoji: "📖", title: "Learning from the Past", fact: "Stories from grandparents and great-grandparents help us understand where our family came from." },
  ],

  "k-hist-holidays": [
    { emoji: "🎃", title: "Halloween", fact: "October 31 — children wear costumes, go trick-or-treating, and carve pumpkins!" },
    { emoji: "🦃", title: "Thanksgiving", fact: "A fall holiday to give thanks and share a meal with family. We remember the Pilgrims and Native Americans." },
    { emoji: "🎄", title: "Christmas", fact: "December 25 — many families give gifts, sing carols, and decorate trees." },
    { emoji: "💝", title: "Valentine's Day", fact: "February 14 — a day to share hearts, cards, and kindness with friends and family." },
    { emoji: "🐰", title: "Easter", fact: "A spring holiday — kids hunt for Easter eggs and celebrate new beginnings!" },
    { emoji: "🇺🇸", title: "Independence Day", fact: "July 4th — America's birthday! We celebrate with fireworks and parades." },
  ],

  "k-hist-symbols": [
    { emoji: "🇺🇸", title: "The American Flag", fact: "50 stars (one for each state) and 13 stripes (for the first 13 colonies). Colors: red, white, and blue!" },
    { emoji: "🦅", title: "The Bald Eagle", fact: "The bald eagle is America's national bird. It stands for freedom, strength, and courage." },
    { emoji: "🗽", title: "The Statue of Liberty", fact: "Lady Liberty stands in New York Harbor. She was a gift from France and represents freedom." },
    { emoji: "🎵", title: "National Anthem", fact: "'The Star-Spangled Banner' is our national song. We sing it at sports games and special events!" },
    { emoji: "🏛️", title: "Washington D.C.", fact: "Washington D.C. is our nation's capital city — where the President lives and works!" },
  ],

  // ─── KINDERGARTEN GEOGRAPHY ───────────────────────────────────────────────
  "k-geo-maps": [
    { emoji: "🗺️", title: "What Is a Map?", fact: "A map is a drawing of a place seen from above — like a bird looking down at your neighborhood!" },
    { emoji: "🔑", title: "Map Key (Legend)", fact: "A map key explains what the symbols on a map mean. A small tree picture might mean a park." },
    { emoji: "🧭", title: "Compass Rose", fact: "The compass rose shows directions: N = North, S = South, E = East, W = West." },
    { emoji: "📍", title: "Map Symbols", fact: "Maps use symbols (tiny pictures) to represent real places like schools, parks, and roads." },
    { emoji: "🌎", title: "Maps Help Us", fact: "Maps help us find where we are and figure out how to get somewhere new!" },
  ],

  "k-geo-earth": [
    { emoji: "🌍", title: "Our Home Planet", fact: "Earth is our planet — the only one we know of with living things, air to breathe, and water to drink!" },
    { emoji: "🌊", title: "Lots of Water", fact: "About 71% of Earth is covered by oceans, lakes, and rivers. That's why Earth looks blue from space!" },
    { emoji: "🏔️", title: "Land", fact: "The rest of Earth is land — continents with mountains, forests, deserts, and plains." },
    { emoji: "🌍🌎🌏", title: "7 Continents", fact: "There are 7 big pieces of land called continents: Africa, Antarctica, Asia, Australia, Europe, North America, South America." },
    { emoji: "🔵", title: "Earth from Space", fact: "Astronauts who go to space say Earth looks like a beautiful blue marble because of all the water!" },
  ],

  "k-geo-directions": [
    { emoji: "⬆️", title: "Up & Down", fact: "Up is toward the sky or ceiling. Down is toward the ground or floor." },
    { emoji: "⬅️➡️", title: "Left & Right", fact: "Left is the side of your left hand. Right is the side of your right hand. (Make an L with your left hand!)" },
    { emoji: "🔼", title: "Above & Below", fact: "Above means something is over or higher up. Below means something is underneath." },
    { emoji: "🔛", title: "Next To & Between", fact: "Next to means right beside something. Between means in the middle of two things." },
    { emoji: "↕️", title: "Why Directions Matter", fact: "Directions help us describe where things are and help us find our way!" },
  ],

  "k-geo-water": [
    { emoji: "🌊", title: "Ocean", fact: "An ocean is the biggest body of salt water. Earth has 5 oceans — they cover most of our planet!" },
    { emoji: "🏞️", title: "Lake", fact: "A lake is a body of fresh water with land all around it. You can swim and fish in lakes!" },
    { emoji: "🌊", title: "River", fact: "A river is water that flows in a long path across the land, usually ending in an ocean or lake." },
    { emoji: "💧", title: "Pond & Stream", fact: "A pond is a small, calm body of water. A stream is a small, gentle flowing water — smaller than a river." },
    { emoji: "💦", title: "Water Is Essential", fact: "All plants, animals, and people need water to survive. We must protect our water!" },
  ],

  "k-geo-home": [
    { emoji: "🏠", title: "Home", fact: "Home is where your family lives — a house, apartment, or any place you feel safe and loved." },
    { emoji: "🏫", title: "School", fact: "School is where children go to learn — reading, math, science, and making friends!" },
    { emoji: "🏪", title: "Store", fact: "Stores are places where you buy food, clothes, toys, and other things you need." },
    { emoji: "🌳", title: "Park", fact: "A park is an outdoor space where people can play, exercise, and enjoy nature." },
    { emoji: "🏥", title: "Hospital", fact: "A hospital is where doctors and nurses take care of sick or hurt people." },
    { emoji: "🗺️", title: "Our Community", fact: "All these places together — homes, schools, stores, parks, hospitals — make up our community!" },
  ],

  // ─── KINDERGARTEN READING (SIGHT WORDS) ──────────────────────────────────
  "k-read-sw1": [
    { emoji: "📖", title: "the", fact: "'The' is used before a specific thing: 'the dog', 'the sun', 'the book'. It's the most common word in English!" },
    { emoji: "📖", title: "a / I / see", fact: "'A' means one of something ('a cat'). 'I' means yourself — always capitalize it! 'See' means to look at something." },
    { emoji: "📖", title: "is / go / to", fact: "'Is' shows something is true ('the sky is blue'). 'Go' means move. 'To' shows where or why ('go to school')." },
    { emoji: "📖", title: "and / my / like", fact: "'And' connects things ('cats and dogs'). 'My' means it belongs to you ('my toy'). 'Like' means enjoy ('I like pizza!')." },
    { emoji: "🌟", title: "Sight Words", fact: "Sight words are words you learn to recognize instantly — just by seeing them! Practice every day." },
  ],

  "k-read-sw2": [
    { emoji: "🏃", title: "run / jump / look", fact: "'Run' = move fast on your feet. 'Jump' = push off the ground. 'Look' = use your eyes to see something." },
    { emoji: "🎮", title: "play / come / here", fact: "'Play' = have fun! 'Come' = move toward someone. 'Here' = this place where you are right now." },
    { emoji: "💬", title: "said / do / you / can", fact: "'Said' = someone spoke in the past. 'Do' = perform an action. 'You' = the person being talked to. 'Can' = be able to." },
    { emoji: "✏️", title: "Using Action Words", fact: "These words describe actions — things you can DO! Can you run, jump, look, and play?" },
    { emoji: "🌟", title: "Practice Makes Perfect", fact: "Say each word out loud, write it, and use it in a sentence. Your brain will remember it faster!" },
  ],

  "k-read-sw3": [
    { emoji: "🔴", title: "Red, Blue, Yellow, Green", fact: "Red = stop sign. Blue = sky. Yellow = sun. Green = grass. These are some of the most common colors!" },
    { emoji: "1️⃣", title: "One, Two, Three", fact: "1 = one (one sun), 2 = two (two eyes), 3 = three (three wheels on a trike)." },
    { emoji: "4️⃣", title: "Four, Five", fact: "4 = four (four legs on a dog), 5 = five (five fingers on one hand)!" },
    { emoji: "🌈", title: "Color Words", fact: "Being able to READ color words helps you follow directions — 'draw a red circle' or 'find the blue box'." },
    { emoji: "🌟", title: "Number Words", fact: "Number words help you read stories and instructions: 'three little pigs' or 'five little ducks'!" },
  ],

  "k-read-sw4": [
    { emoji: "📦", title: "in / on / up", fact: "'In' = inside something ('in the box'). 'On' = on top of ('on the table'). 'Up' = toward a higher place." },
    { emoji: "🐘🐭", title: "big / little / it", fact: "'Big' = large ('a big elephant'). 'Little' = small ('a little mouse'). 'It' = a thing: 'It is sunny!'" },
    { emoji: "✅❌", title: "yes / no", fact: "'Yes' = agreement ('Yes, I want to play!'). 'No' = disagreement ('No, that is wrong.')." },
    { emoji: "👫", title: "we / are", fact: "'We' = you and me together ('We are friends!'). 'Are' shows something is happening ('The stars are bright')." },
    { emoji: "🌟", title: "Using Little Words", fact: "Small words like 'in', 'on', 'up', 'we', 'are' appear in almost every sentence you'll ever read!" },
  ],

  // ─── GRADE 1 MATH ─────────────────────────────────────────────────────────
  "g1-math-add20": [
    { emoji: "➕", title: "Adding Within 20", fact: "Adding means putting groups together. 7 + 8 = 15. You can add numbers up to 20 in your head!" },
    { emoji: "💡", title: "Make a Ten First", fact: "To add 7 + 5: give 3 to the 7 to make 10, then add the leftover 2. 10 + 2 = 12. Easy!" },
    { emoji: "🔄", title: "Turn-Around Facts", fact: "8 + 4 = 12 AND 4 + 8 = 12. You can flip the numbers and the answer stays the same!" },
    { emoji: "🎯", title: "Doubles", fact: "Doubles are easy to memorize: 6+6=12, 7+7=14, 8+8=16, 9+9=18. Learn these first!" },
    { emoji: "0️⃣", title: "Adding Zero", fact: "Adding 0 never changes a number. 15 + 0 = 15. Zero adds nothing at all!" },
  ],

  "g1-math-sub": [
    { emoji: "➖", title: "Subtraction Within 20", fact: "Subtraction means taking away. 15 − 7 = 8. Start with the big number and take away the small one." },
    { emoji: "🔗", title: "Fact Families", fact: "If 8 + 4 = 12, then 12 − 4 = 8 AND 12 − 8 = 4. Addition and subtraction are a team!" },
    { emoji: "🔢", title: "Count Back", fact: "To solve 14 − 3: start at 14 and count back 3: 13, 12, 11. The answer is 11!" },
    { emoji: "🎯", title: "Subtracting Doubles", fact: "If you know doubles addition, you know doubles subtraction: 14−7=7, 12−6=6, 10−5=5." },
    { emoji: "0️⃣", title: "Subtracting Zero", fact: "Subtracting 0 never changes a number. 17 − 0 = 17. You took away nothing!" },
  ],

  "g1-math-place": [
    { emoji: "🔟", title: "Tens", fact: "A TEN is a bundle of 10 ones. 10 ones = 1 ten. 20 = 2 tens. 30 = 3 tens!" },
    { emoji: "📊", title: "Place Value", fact: "In the number 47: the 4 is in the TENS place (worth 40) and the 7 is in the ONES place (worth 7)." },
    { emoji: "📝", title: "Expanded Form", fact: "47 = 40 + 7. Breaking a number apart shows how much each digit is really worth!" },
    { emoji: "🔢", title: "10 Tens = 100", fact: "10 tens make 100 (one hundred)! A hundred is a big bundle of 10 tens." },
    { emoji: "💡", title: "Comparing Numbers", fact: "Look at the tens digit first. 53 > 39 because 5 tens is more than 3 tens!" },
  ],

  "g1-math-time": [
    { emoji: "🕐", title: "Hour & Minute Hands", fact: "The short hand is the HOUR hand. The long hand is the MINUTE hand. Together they tell you the time!" },
    { emoji: "🕒", title: "O'Clock", fact: "When the minute hand points straight up to 12, it's 'o'clock'. 3:00 = three o'clock!" },
    { emoji: "🪙", title: "Penny = 1¢", fact: "The penny is the smallest value coin. It's copper colored and shows Abraham Lincoln." },
    { emoji: "🪙", title: "Nickel, Dime, Quarter", fact: "Nickel = 5¢. Dime = 10¢ (smallest coin, but worth the most of those three!). Quarter = 25¢." },
    { emoji: "💡", title: "Count Coins", fact: "Start with the biggest coin and count up: quarter (25), dime (35), nickel (40), penny (41) = 41¢!" },
  ],

  // ─── GRADE 1 SCIENCE ──────────────────────────────────────────────────────
  "g1-sci-habitats": [
    { emoji: "🏠", title: "What Is a Habitat?", fact: "A habitat is the natural home where an animal lives and finds food, water, and shelter." },
    { emoji: "🌊", title: "Ocean Habitat", fact: "Fish, whales, dolphins, sharks, and crabs live in the salty ocean water." },
    { emoji: "🌲", title: "Forest Habitat", fact: "Deer, bears, owls, squirrels, and foxes live among the trees of forests." },
    { emoji: "🌵", title: "Desert Habitat", fact: "Camels, lizards, snakes, and scorpions live in hot, dry deserts. They're great at saving water!" },
    { emoji: "❄️", title: "Arctic Habitat", fact: "Polar bears, penguins, walruses, and seals live in the freezing cold Arctic and Antarctic regions." },
    { emoji: "🌧️", title: "Rainforest Habitat", fact: "Parrots, monkeys, jaguars, and frogs live in warm, rainy tropical rainforests packed with life!" },
  ],

  "g1-sci-body": [
    { emoji: "🦴", title: "Skeleton", fact: "Your bones form a skeleton that holds your body up and protects your organs. Adults have 206 bones!" },
    { emoji: "💪", title: "Muscles", fact: "Muscles are connected to bones by tendons. They contract and relax to make you move!" },
    { emoji: "❤️", title: "Heart & Blood", fact: "Your heart is a muscle that pumps blood through your body, delivering oxygen to every cell." },
    { emoji: "🫁", title: "Lungs", fact: "You breathe in oxygen with your lungs, and breathe out carbon dioxide. You breathe about 20,000 times a day!" },
    { emoji: "🧠", title: "Brain", fact: "Your brain controls everything — thinking, moving, seeing, hearing, and feeling." },
    { emoji: "🦷", title: "Teeth", fact: "Baby teeth fall out to make room for adult teeth. Brush twice a day to keep them healthy!" },
  ],

  "g1-sci-matter": [
    { emoji: "🧊", title: "Solid", fact: "A solid keeps its own shape and doesn't flow. Examples: ice, rock, wood, a book." },
    { emoji: "💧", title: "Liquid", fact: "A liquid flows and takes the shape of whatever it's poured into. Examples: water, juice, honey." },
    { emoji: "💨", title: "Gas", fact: "A gas spreads out to fill any container. You can't usually see it! Examples: air, steam." },
    { emoji: "🔥", title: "Heat Changes Matter", fact: "Heat can melt ice (solid → liquid) or boil water (liquid → gas). Cold can freeze water (liquid → solid)!" },
    { emoji: "🌍", title: "Matter Is Everywhere", fact: "Everything you can touch, see, or breathe is matter — your desk, the air, your juice box — all matter!" },
  ],

  "g1-sci-space": [
    { emoji: "⭐", title: "The Sun Is a Star", fact: "The Sun is a giant star — our closest one! It gives us the light and warmth we need to live." },
    { emoji: "🌙", title: "The Moon", fact: "The Moon orbits Earth. It doesn't make its own light — it reflects sunlight. That's why it glows at night!" },
    { emoji: "🌀", title: "Day & Night", fact: "Earth spins once every 24 hours. When your side faces the Sun, it's day. When it faces away, it's night." },
    { emoji: "🌑", title: "Moon Phases", fact: "The Moon's shape seems to change over about a month: New Moon → half → Full Moon → half → New Moon again." },
    { emoji: "⭐", title: "Stars at Night", fact: "Stars are HUGE balls of fire very far away. They look tiny because they're so far from Earth!" },
    { emoji: "🌍", title: "Earth's Journey", fact: "Earth travels around (orbits) the Sun once every 365 days — that's one year!" },
  ],

  // ─── GRADE 1 HISTORY ──────────────────────────────────────────────────────
  "g1-hist-then-now": [
    { emoji: "📅", title: "Past, Present, Future", fact: "Past = long ago. Present = right now. Future = what is yet to come." },
    { emoji: "📺", title: "Communication Then", fact: "Long ago, there were no phones or internet. People sent letters that took weeks to arrive!" },
    { emoji: "🚗", title: "Transportation Then", fact: "Before cars, people walked or rode horses. Trains and ships were the fastest ways to travel!" },
    { emoji: "🏠", title: "Homes Then & Now", fact: "Long ago, homes had no electricity, running water, or indoor bathrooms. Life was very different!" },
    { emoji: "🔄", title: "Change Over Time", fact: "People have always found ways to improve life. Comparing then and now helps us understand progress!" },
  ],

  "g1-hist-presidents": [
    { emoji: "🎩", title: "George Washington", fact: "The 1st President of the United States! He led the army during the Revolutionary War and is called the 'Father of Our Country'." },
    { emoji: "🎩", title: "Abraham Lincoln", fact: "The 16th President, Lincoln led the country through the Civil War and signed the Emancipation Proclamation to free enslaved people." },
    { emoji: "✊", title: "Harriet Tubman", fact: "A brave woman who escaped slavery and then helped hundreds of others escape to freedom through the Underground Railroad." },
    { emoji: "✊", title: "Martin Luther King Jr.", fact: "Dr. King led peaceful marches and gave powerful speeches, including 'I Have a Dream', to fight for equal rights for all Americans." },
    { emoji: "📜", title: "Thomas Jefferson", fact: "The 3rd President and main author of the Declaration of Independence — the document that said America should be free!" },
  ],

  "g1-hist-symbols": [
    { emoji: "🇺🇸", title: "The American Flag", fact: "50 stars = 50 states. 13 stripes = the first 13 colonies. Colors: red (courage), white (purity), blue (justice)." },
    { emoji: "🦅", title: "Bald Eagle", fact: "The bald eagle is our national bird. It symbolizes freedom, strength, and independence." },
    { emoji: "🗽", title: "Statue of Liberty", fact: "A gift from France in 1886, Lady Liberty holds a torch of freedom and stands in New York Harbor." },
    { emoji: "🎵", title: "National Anthem", fact: "'The Star-Spangled Banner' was written by Francis Scott Key during the War of 1812. We sing it to honor our country." },
    { emoji: "📜", title: "Pledge of Allegiance", fact: "The Pledge is a promise of loyalty to the United States and to the values of liberty and justice for all." },
  ],

  "g1-hist-rules": [
    { emoji: "📋", title: "Why We Have Rules", fact: "Rules tell us what we should and should not do. They keep everyone safe and treat people fairly!" },
    { emoji: "🏫", title: "School Rules", fact: "School rules (raise your hand, listen, be kind) help everyone learn in a safe, happy environment." },
    { emoji: "🚦", title: "Community Laws", fact: "Laws are rules for the whole community — like stopping at red lights and not littering in parks." },
    { emoji: "🗳️", title: "Voting", fact: "In a democracy, people vote to choose their leaders. Your voice matters!" },
    { emoji: "🤝", title: "Good Citizens", fact: "A good citizen follows rules, helps neighbors, and takes care of the community. Even kids can be great citizens!" },
  ],

  // ─── GRADE 1 GEOGRAPHY ────────────────────────────────────────────────────
  "g1-geo-continents": [
    { emoji: "🌍", title: "7 Continents", fact: "Africa, Antarctica, Asia, Australia, Europe, North America, South America — seven big pieces of land!" },
    { emoji: "🌊", title: "5 Oceans", fact: "Pacific (largest), Atlantic, Indian, Southern, Arctic (smallest). Oceans cover most of Earth!" },
    { emoji: "🌎", title: "North America", fact: "Where the United States, Canada, Mexico, and many other countries are located." },
    { emoji: "🌍", title: "Africa & Asia", fact: "Africa is the second largest continent. Asia is the largest and has the most people!" },
    { emoji: "❄️", title: "Antarctica", fact: "The coldest and windiest continent. No one lives there permanently — only scientists visit!" },
  ],

  "g1-geo-maps": [
    { emoji: "🧭", title: "Compass Rose", fact: "The compass rose shows the 4 main directions: North (up), South (down), East (right), West (left)." },
    { emoji: "🔑", title: "Map Key / Legend", fact: "A map key explains what the symbols mean. A tiny tree = forest. A blue line = a river!" },
    { emoji: "📏", title: "Map Scale", fact: "A map scale tells you how big the real place is. '1 inch = 10 miles' means the map is much smaller than reality." },
    { emoji: "🗺️", title: "Types of Maps", fact: "Street maps show roads. World maps show countries. Weather maps show rain and sunshine." },
    { emoji: "🌐", title: "Grid Maps", fact: "Some maps use a grid (rows and columns labeled with letters and numbers) to help find exact locations." },
  ],

  "g1-geo-landforms": [
    { emoji: "⛰️", title: "Mountain", fact: "A mountain is a very tall, steep landform with a peak at the top. Mountains can have snow year-round!" },
    { emoji: "🏔️", title: "Hill & Valley", fact: "A hill is a raised landform, smaller than a mountain. A valley is the low land between hills or mountains." },
    { emoji: "🏜️", title: "Desert & Plain", fact: "A desert is very dry with little rain. A plain is flat, low land — great for farming!" },
    { emoji: "🏝️", title: "Island & Peninsula", fact: "An island is land completely surrounded by water. A peninsula is land with water on three sides." },
    { emoji: "🌊", title: "River & Lake", fact: "A river flows across the land. A lake is a body of water surrounded by land on all sides." },
  ],

  "g1-geo-weather": [
    { emoji: "☀️", title: "Weather vs Climate", fact: "Weather is what the sky is like TODAY. Climate is the typical weather of a PLACE over many years." },
    { emoji: "🌡️", title: "Temperature", fact: "Temperature measures how hot or cold the air is. We use a thermometer to measure it in degrees." },
    { emoji: "🌧️", title: "Precipitation", fact: "Any water that falls from the sky is precipitation: rain, snow, sleet, and hail all count!" },
    { emoji: "🌤️", title: "Climate Zones", fact: "Tropical = hot and rainy (near equator). Temperate = mild seasons. Polar = cold and icy (near poles)." },
    { emoji: "🌍", title: "Climate & Location", fact: "Places near the equator are warm year-round. Places near the poles are cold year-round." },
  ],

  // ─── GRADE 2 MATH ─────────────────────────────────────────────────────────
  "math-add-1": [
    { emoji: "➕", title: "Regrouping (Carrying)", fact: "When the ones digits add up to 10 or more, carry the extra ten to the tens column!" },
    { emoji: "💡", title: "Example: 27 + 38", fact: "7 + 8 = 15 → write 5, carry 1. Then 2 + 3 + 1 (carried) = 6. Answer: 65!" },
    { emoji: "📝", title: "Line Up Digits", fact: "Always line up ones with ones, and tens with tens before adding — otherwise you'll get the wrong answer!" },
    { emoji: "🎯", title: "Estimate First", fact: "Round both numbers, add the rounded versions, and check if your exact answer is close. 27≈30, 38≈40, so ≈70." },
    { emoji: "🔢", title: "Adding Three Numbers", fact: "Add two numbers first, then add the third. Look for pairs that make 10 to make it easier!" },
  ],

  "math-sub-1": [
    { emoji: "➖", title: "Regrouping (Borrowing)", fact: "When the top ones digit is smaller than the bottom ones, borrow 1 ten from the tens column!" },
    { emoji: "💡", title: "Example: 63 − 27", fact: "Can't do 3−7, so borrow: 13−7=6 ones. Then 5−2=3 tens (we used one ten for borrowing). Answer: 36!" },
    { emoji: "🔗", title: "Check with Addition", fact: "After subtracting, add your answer back to the number you subtracted. If you get the original number, you're right!" },
    { emoji: "💯", title: "Subtracting from 100", fact: "100 − 38: think 'what plus 38 equals 100?' Count up: 38 + 62 = 100, so the answer is 62." },
    { emoji: "📝", title: "Line Up Digits", fact: "Always subtract ones from ones and tens from tens. Keep your columns neat!" },
  ],

  "math-place": [
    { emoji: "🏢", title: "Three Places", fact: "Hundreds, Tens, Ones — in that order from left to right. Each place is worth 10 times the place to its right." },
    { emoji: "🔢", title: "Reading 472", fact: "4 in the hundreds place = 400. 7 in the tens place = 70. 2 in the ones place = 2. Together: 472!" },
    { emoji: "📝", title: "Expanded Form", fact: "365 = 300 + 60 + 5. Breaking a number into its parts shows the TRUE value of each digit." },
    { emoji: "💡", title: "10 More / 10 Less", fact: "Adding 10 changes only the tens digit. 396 + 10 = 406 (tens column goes from 9 to 10, so hundreds go up too)." },
    { emoji: "💯", title: "100 More / 100 Less", fact: "Adding or subtracting 100 changes only the hundreds digit: 568 + 100 = 668, 568 − 100 = 468." },
  ],

  "math-time": [
    { emoji: "🕐", title: "Clock Hands", fact: "The SHORT hand points to the HOUR. The LONG hand points to the MINUTES. Read the hour first!" },
    { emoji: "⏰", title: "Minutes", fact: "Each number on the clock = 5 minutes. The 3 = 15 min, the 6 = 30 min, the 9 = 45 min." },
    { emoji: "💡", title: "Quarter & Half", fact: "Quarter past = 15 minutes after the hour. Half past = 30 minutes after. Quarter to = 15 minutes before the NEXT hour." },
    { emoji: "⏱️", title: "Hours in a Day", fact: "There are 24 hours in a day: 12 AM (midnight to noon) and 12 PM (noon to midnight)." },
    { emoji: "📅", title: "Elapsed Time", fact: "To find how long something takes, count how many minutes or hours passed from start to end." },
  ],

  "math-money": [
    { emoji: "🪙", title: "The Four Coins", fact: "Penny = 1¢ (copper). Nickel = 5¢. Dime = 10¢ (smallest but worth the most of the small coins!). Quarter = 25¢." },
    { emoji: "💡", title: "Count Up", fact: "Start with the biggest value coin, then count up: Quarter (25¢) + Dime (35¢) + Nickel (40¢) + Penny (41¢) = 41¢." },
    { emoji: "💰", title: "Making a Dollar", fact: "4 quarters = $1.00. 10 dimes = $1.00. 20 nickels = $1.00. 100 pennies = $1.00." },
    { emoji: "💳", title: "Making Change", fact: "If something costs 35¢ and you pay 50¢, count up from 35¢ to 50¢ to find the change: 15¢." },
    { emoji: "📝", title: "Dollar Sign", fact: "$1.00 means one dollar. The dot (decimal point) separates dollars from cents: $1.25 = 1 dollar and 25 cents." },
  ],

  "math-compare": [
    { emoji: ">", title: "Greater Than (>)", fact: "The > symbol means the left number is BIGGER. Think of it as a hungry crocodile that always eats the bigger number!" },
    { emoji: "<", title: "Less Than (<)", fact: "The < symbol means the left number is SMALLER. The open side always faces the bigger number!" },
    { emoji: "=", title: "Equal To (=)", fact: "The = symbol means both sides have exactly the SAME value. 50 = 50." },
    { emoji: "🔢", title: "Comparing 3-Digit Numbers", fact: "Compare hundreds first. If equal, compare tens. If equal, compare ones. 348 vs 384 → same hundreds, 8>4 tens, so 384 > 348." },
    { emoji: "📊", title: "Number Line", fact: "On a number line, numbers increase from left to right. Any number to the RIGHT is greater!" },
  ],

  "math-shapes": [
    { emoji: "🔺", title: "2D Shapes", fact: "Triangle (3 sides), Square (4 equal sides), Rectangle (4 sides, 2 pairs), Circle (0 sides), Hexagon (6 sides)." },
    { emoji: "🎲", title: "3D Shapes", fact: "Cube (6 square faces), Sphere (round like a ball), Cylinder (like a can), Cone (pointed top, round base)." },
    { emoji: "💡", title: "Sides & Corners", fact: "A side is a straight edge. A corner (vertex) is where two sides meet. A triangle: 3 sides, 3 corners." },
    { emoji: "🔵", title: "Faces, Edges, Vertices", fact: "3D shapes have FACES (flat surfaces), EDGES (where faces meet), and VERTICES (corners). A cube has 6, 12, 8!" },
    { emoji: "👀", title: "Shapes in Real Life", fact: "Soccer ball = sphere. Dice = cube. Birthday hat = cone. Can of soup = cylinder. Shapes are everywhere!" },
  ],

  "math-skip": [
    { emoji: "2️⃣", title: "Skip Count by 2s", fact: "2, 4, 6, 8, 10, 12, 14, 16, 18, 20... Every other number! Great for counting pairs of things." },
    { emoji: "5️⃣", title: "Skip Count by 5s", fact: "5, 10, 15, 20, 25, 30... Every 5th number — perfect for counting nickels or minutes on a clock!" },
    { emoji: "🔟", title: "Skip Count by 10s", fact: "10, 20, 30, 40, 50, 60... Just change the tens digit! This leads directly to multiplication." },
    { emoji: "✖️", title: "Equal Groups", fact: "3 groups of 4 = 12. This IS multiplication: 3 × 4 = 12. Skip counting builds the foundation!" },
    { emoji: "📊", title: "Arrays", fact: "An array is objects arranged in rows and columns. 3 rows × 4 columns = 12 total objects!" },
  ],

  // ─── GRADE 2 HISTORY ──────────────────────────────────────────────────────
  "hist-presidents": [
    { emoji: "🎩", title: "George Washington", fact: "America's 1st president, called the 'Father of Our Country'. He is on the $1 bill and the quarter." },
    { emoji: "🎩", title: "Abraham Lincoln", fact: "The 16th president, Lincoln led the nation through the Civil War and signed the Emancipation Proclamation. On the penny and $5 bill." },
    { emoji: "🏛️", title: "Three Branches", fact: "Executive (President), Legislative (Congress), Judicial (Supreme Court). Each branch checks the others!" },
    { emoji: "🏛️", title: "Capitol & White House", fact: "Congress meets in the Capitol Building. The President lives and works in the White House." },
    { emoji: "🗳️", title: "Presidential Terms", fact: "The president serves 4-year terms and can be elected a maximum of twice (8 years total)." },
  ],

  "hist-rosa": [
    { emoji: "✊", title: "Civil Rights Movement", fact: "The Civil Rights Movement fought for equal rights for Black Americans in the 1950s and 1960s." },
    { emoji: "🚌", title: "Rosa Parks", fact: "On December 1, 1955, Rosa Parks refused to give up her bus seat in Montgomery, Alabama. Her act of courage sparked a movement." },
    { emoji: "🕊️", title: "Dr. Martin Luther King Jr.", fact: "Dr. King led peaceful marches, boycotts, and sit-ins. His 'I Have a Dream' speech inspired millions." },
    { emoji: "📜", title: "Civil Rights Act of 1964", fact: "This landmark law made it illegal to discriminate against people because of their race, color, or religion." },
    { emoji: "🏫", title: "School Integration", fact: "Brown v. Board of Education (1954) ruled that schools must be integrated — children of all races would learn together." },
  ],

  "hist-holidays": [
    { emoji: "🇺🇸", title: "Independence Day", fact: "July 4, 1776 — America declared independence from Britain! We celebrate with fireworks, parades, and patriotism." },
    { emoji: "🦃", title: "Thanksgiving", fact: "A harvest celebration remembering the 1621 feast between the Pilgrims and the Wampanoag people. We give thanks!" },
    { emoji: "🎖️", title: "Veterans Day & Memorial Day", fact: "Veterans Day (Nov 11) honors ALL who served in the military. Memorial Day (last Monday in May) honors those who died in service." },
    { emoji: "🎩", title: "Presidents' Day", fact: "Honors all U.S. presidents, especially George Washington and Abraham Lincoln, on the third Monday of February." },
    { emoji: "✊", title: "MLK Day", fact: "The third Monday of January honors Dr. Martin Luther King Jr. and his legacy of peaceful activism for civil rights." },
  ],

  "hist-explorers": [
    { emoji: "🌊", title: "Christopher Columbus", fact: "In 1492, Columbus sailed from Spain and landed in the Caribbean. He thought he'd reached Asia — he'd actually found the Americas!" },
    { emoji: "🗺️", title: "Why Explore?", fact: "European explorers were searching for new trade routes to Asia to get spices, silk, and other valuable goods." },
    { emoji: "🌎", title: "Amerigo Vespucci", fact: "The continents of North and South America are named after Amerigo Vespucci, who realized they were new continents." },
    { emoji: "🧭", title: "Navigation Tools", fact: "Explorers used stars, compasses, and hand-drawn maps to find their way across vast, uncharted oceans." },
    { emoji: "🤝", title: "Impact of Exploration", fact: "European exploration led to trade, the exchange of plants and animals, and — unfortunately — also to colonization and conflict." },
  ],

  "hist-helpers": [
    { emoji: "🏘️", title: "What Is a Community?", fact: "A community is a group of people who live, work, or learn together and depend on each other." },
    { emoji: "🤝", title: "Good Citizens", fact: "Good citizens follow laws, treat others fairly, volunteer, vote, and help take care of their community." },
    { emoji: "🗳️", title: "Civic Participation", fact: "Voting is one of the most important responsibilities of a citizen. It gives everyone a voice in decisions!" },
    { emoji: "♻️", title: "Caring for the Environment", fact: "Communities work together to keep parks clean, recycle, and protect natural resources for future generations." },
    { emoji: "🌟", title: "Everyone Has a Role", fact: "Teachers, firefighters, volunteers, students — everyone contributes to making a community strong!" },
  ],

  "hist-flag": [
    { emoji: "🇺🇸", title: "The Flag's Design", fact: "50 stars for 50 states. 13 stripes for the original 13 colonies. Red = courage, white = purity, blue = justice." },
    { emoji: "🦅", title: "Bald Eagle", fact: "Our national bird! It symbolizes freedom, strength, and independence. It appears on the Great Seal of the U.S." },
    { emoji: "🗽", title: "Statue of Liberty", fact: "A gift from France in 1886. She holds a torch representing enlightenment and a tablet with July 4, 1776." },
    { emoji: "🎵", title: "The Star-Spangled Banner", fact: "Written by Francis Scott Key after watching the American flag fly during the Battle of Baltimore in 1814." },
    { emoji: "📜", title: "Liberty Bell", fact: "The Liberty Bell in Philadelphia symbolizes American independence. It has a famous crack and is inscribed with a quote about freedom." },
  ],

  "hist-inventors": [
    { emoji: "💡", title: "Thomas Edison", fact: "Edison invented the lightbulb (1879), the phonograph (record player), and improved hundreds of other devices." },
    { emoji: "📞", title: "Alexander Graham Bell", fact: "Bell invented the telephone in 1876. He made the first call to his assistant, Thomas Watson." },
    { emoji: "✈️", title: "Wright Brothers", fact: "Wilbur and Orville Wright made the first powered airplane flight in Kitty Hawk, NC on December 17, 1903." },
    { emoji: "🖨️", title: "Gutenberg's Printing Press", fact: "Johannes Gutenberg's printing press (1440s) allowed books to be made quickly and cheaply, spreading knowledge everywhere." },
    { emoji: "💡", title: "Invention Process", fact: "Most inventions require many tries and failures before they work. Edison said, 'I have not failed — I've found 10,000 ways that won't work!'" },
  ],

  "hist-timeline": [
    { emoji: "📅", title: "What Is a Timeline?", fact: "A timeline shows events in order from the earliest to the most recent, usually displayed left to right." },
    { emoji: "🔢", title: "Decades & Centuries", fact: "A decade = 10 years. A century = 100 years. A millennium = 1,000 years. The 2000s are the 21st century!" },
    { emoji: "📜", title: "B.C. & A.D.", fact: "B.C. (Before Christ) counts backward — 500 B.C. is older than 100 B.C. A.D. counts forward from year 1." },
    { emoji: "🔄", title: "Sequence Words", fact: "Sequence words show order: first, then, next, after that, finally, before, after. They connect events in history!" },
    { emoji: "🔍", title: "Why Timelines Help", fact: "Timelines let you see how much time passed between events and how one event might have led to another." },
  ],

  // ─── GRADE 2 GEOGRAPHY ────────────────────────────────────────────────────
  "geo-continents": [
    { emoji: "🌍", title: "7 Continents", fact: "Africa, Antarctica, Asia, Australia, Europe, North America, South America. A memory trick: 'AAA ENA So' (first letters)!" },
    { emoji: "📊", title: "Size Order", fact: "Largest to smallest: Asia, Africa, North America, South America, Antarctica, Europe, Australia." },
    { emoji: "🌏", title: "Asia", fact: "The LARGEST continent with MORE people than all other continents combined. Home to China, India, and Japan." },
    { emoji: "🌍", title: "Africa", fact: "Second largest continent. Home to the Nile River (world's longest!), Sahara Desert, and incredible wildlife." },
    { emoji: "🌎", title: "The Americas", fact: "North America includes the USA, Canada, and Mexico. South America has the Amazon Rainforest and Andes Mountains." },
  ],

  "geo-oceans": [
    { emoji: "🌊", title: "5 Oceans", fact: "Pacific, Atlantic, Indian, Southern (Antarctic), Arctic — five oceans cover about 71% of Earth's surface!" },
    { emoji: "🌊", title: "Pacific Ocean", fact: "The LARGEST and DEEPEST ocean. It covers more area than all of Earth's land combined! It sits between America and Asia/Australia." },
    { emoji: "🌊", title: "Atlantic Ocean", fact: "Separates the Americas from Europe and Africa. The Titanic sank in the North Atlantic in 1912." },
    { emoji: "🌊", title: "Indian & Arctic Oceans", fact: "The Indian Ocean is the warmest. The Arctic Ocean is the smallest and shallowest — mostly frozen sea ice!" },
    { emoji: "💧", title: "Saltwater", fact: "Ocean water is salty because rivers carry minerals from land into the sea over millions of years." },
  ],

  "geo-states": [
    { emoji: "🗺️", title: "50 States", fact: "The United States of America has 50 states! Each state has its own capital city and government." },
    { emoji: "🌟", title: "5 Regions", fact: "Northeast, Southeast, Midwest, Southwest, and West — geographers divide the U.S. into 5 main regions." },
    { emoji: "🏔️", title: "Biggest & Smallest", fact: "Alaska is the LARGEST state by area. Rhode Island is the SMALLEST. Texas is the largest of the 48 connected states." },
    { emoji: "🌊", title: "Special States", fact: "Alaska is in the northwest corner of North America. Hawaii is a chain of islands in the Pacific Ocean!" },
    { emoji: "🏛️", title: "Nation's Capital", fact: "Washington D.C. (District of Columbia) is the capital of the U.S. — it's NOT a state, it's its own special district!" },
  ],

  "geo-capitals": [
    { emoji: "🏛️", title: "What Is a Capital?", fact: "A capital city is where a country or state's government is headquartered — where leaders work and make laws." },
    { emoji: "🇺🇸", title: "U.S. & Americas", fact: "USA = Washington D.C. Canada = Ottawa. Mexico = Mexico City. Brazil = Brasília." },
    { emoji: "🌍", title: "Europe", fact: "United Kingdom = London. France = Paris. Germany = Berlin. Italy = Rome. Spain = Madrid." },
    { emoji: "🌏", title: "Asia & Others", fact: "Japan = Tokyo. China = Beijing. India = New Delhi. Australia = Canberra (not Sydney!)." },
    { emoji: "💡", title: "Capital ≠ Largest City", fact: "The capital is NOT always the biggest city! New York City is huge, but Washington D.C. is the U.S. capital." },
  ],

  "geo-landmarks": [
    { emoji: "🗽", title: "Statue of Liberty (USA)", fact: "Stands on Liberty Island in New York Harbor. A gift from France in 1886 — she represents freedom and democracy." },
    { emoji: "🗼", title: "Eiffel Tower (France)", fact: "An iron tower built in 1889 in Paris. At 330 meters tall, it was the world's tallest structure for 41 years!" },
    { emoji: "🏯", title: "Great Wall of China", fact: "Built over centuries to protect China's northern borders. It stretches over 13,000 miles — the longest man-made structure!" },
    { emoji: "🛕", title: "Taj Mahal (India)", fact: "A stunning white marble mausoleum in Agra, India, built by emperor Shah Jahan in memory of his wife." },
    { emoji: "🏔️", title: "Great Pyramid of Giza (Egypt)", fact: "Built around 2560 BC for Pharaoh Khufu — one of the original Seven Wonders of the Ancient World, still standing!" },
  ],

  "geo-maps": [
    { emoji: "🧭", title: "Compass Rose", fact: "Shows N, S, E, W AND intermediate directions: NE (northeast), NW (northwest), SE (southeast), SW (southwest)." },
    { emoji: "📏", title: "Map Scale", fact: "A map scale lets you calculate real distances: '1 inch = 50 miles' means 2 inches on the map = 100 miles in real life." },
    { emoji: "🗺️", title: "Types of Maps", fact: "Physical map = landforms (mountains, rivers). Political map = country/state borders. Climate map = weather patterns." },
    { emoji: "🔑", title: "Map Key", fact: "Always check the legend/key first! It tells you what every symbol and color on the map means." },
    { emoji: "🌐", title: "Grid References", fact: "Many maps use grids — letters across the top and numbers down the side — to help you pinpoint exact locations." },
  ],

  "geo-mountains": [
    { emoji: "⛰️", title: "What Is a Mountain?", fact: "A mountain is a large landform that rises steeply above the land around it, usually with a peak at the top." },
    { emoji: "🏔️", title: "Himalayas", fact: "The world's tallest mountain range in Asia. Mount Everest (29,032 ft) is the highest peak on Earth!" },
    { emoji: "🏔️", title: "Rocky Mountains", fact: "A major North American mountain range stretching from Canada through the western United States." },
    { emoji: "📊", title: "Elevation", fact: "Elevation is how high a place is above sea level. Higher elevation = cooler temperatures and often more snow!" },
    { emoji: "🌨️", title: "Mountains & Weather", fact: "Mountains affect weather by blocking clouds. The side facing wind gets rain; the other side stays dry (rain shadow)." },
  ],

  "geo-rivers": [
    { emoji: "🌊", title: "What Is a River?", fact: "A river is a large, flowing body of fresh water that travels across the land, usually ending in an ocean or lake." },
    { emoji: "🌊", title: "Amazon River", fact: "In South America, the Amazon carries MORE water than any other river on Earth. Its basin holds 10% of all species!" },
    { emoji: "🌊", title: "The Nile", fact: "The Nile in Africa is one of the longest rivers in the world. Ancient Egyptian civilization grew along its banks." },
    { emoji: "🌊", title: "Mississippi River", fact: "One of North America's most important rivers, flowing from Minnesota south to the Gulf of Mexico." },
    { emoji: "🌿", title: "Why Rivers Matter", fact: "Rivers provide drinking water, transportation, farmland irrigation, and habitat for countless animals." },
  ],

  // ─── GRADE 3 MATH ─────────────────────────────────────────────────────────
  "g3-math-mult": [
    { emoji: "✖️", title: "Multiplication = Repeated Addition", fact: "4 × 3 means 4+4+4 = 12. It's a shortcut for adding the same number many times!" },
    { emoji: "📊", title: "Arrays", fact: "An array is objects in rows and columns. 3 rows × 4 columns = 12. Draw it to see it!" },
    { emoji: "0️⃣", title: "× 0 and × 1 Rules", fact: "Any number × 0 = 0 (zero groups of anything is nothing). Any number × 1 = itself (one group of any number = that number)." },
    { emoji: "🔄", title: "Commutative Property", fact: "6 × 7 = 7 × 6 = 42. The order of the factors doesn't change the product — so you only need to learn half the table!" },
    { emoji: "9️⃣", title: "Trick for × 9", fact: "For 9 × any number: the digits of the answer add up to 9! (9×4=36, 3+6=9). Or use the finger trick!" },
  ],

  "g3-math-div": [
    { emoji: "➗", title: "Division = Splitting into Equal Groups", fact: "12 ÷ 4 = 3 means: split 12 into 4 equal groups — each group has 3." },
    { emoji: "🔄", title: "Division Undoes Multiplication", fact: "If 4 × 3 = 12, then 12 ÷ 4 = 3 AND 12 ÷ 3 = 4. Fact families work for division too!" },
    { emoji: "📝", title: "Vocabulary", fact: "Dividend ÷ Divisor = Quotient. In 12 ÷ 4 = 3: 12 is the dividend, 4 is the divisor, 3 is the quotient." },
    { emoji: "1️⃣", title: "Division Rules", fact: "Any number ÷ 1 = itself. Any number ÷ itself = 1. 0 ÷ any number = 0. NEVER divide by zero!" },
    { emoji: "🚫", title: "Can't Divide by Zero", fact: "Division by zero is undefined — it has no answer! 5 ÷ 0 is impossible. We never do it." },
  ],

  "g3-math-fractions": [
    { emoji: "🍕", title: "Parts of a Whole", fact: "A fraction shows part of a whole. If a pizza is cut into 4 equal slices, each slice is 1/4 (one-fourth)." },
    { emoji: "📝", title: "Numerator & Denominator", fact: "Numerator (top) = how many parts you HAVE. Denominator (bottom) = total equal PARTS the whole is divided into." },
    { emoji: "½", title: "Common Fractions", fact: "1/2 = one half (2 equal parts). 1/3 = one third (3 equal parts). 1/4 = one quarter (4 equal parts)." },
    { emoji: "🔢", title: "Equivalent Fractions", fact: "1/2 = 2/4 = 4/8. These fractions look different but represent the SAME amount!" },
    { emoji: "📊", title: "Comparing Fractions", fact: "Same denominator: 3/4 > 1/4 (bigger numerator = more pieces). Same numerator: 1/3 > 1/4 (fewer bigger pieces)." },
  ],

  "g3-math-rounding": [
    { emoji: "🔟", title: "Rounding to Nearest 10", fact: "Look at the ONES digit. If it's 0–4, round DOWN (keep the tens). If it's 5–9, round UP (add 1 to tens)." },
    { emoji: "💯", title: "Rounding to Nearest 100", fact: "Look at the TENS digit. If it's 0–4, round DOWN. If it's 5–9, round UP the hundreds digit." },
    { emoji: "💡", title: "Examples", fact: "347 → nearest 10 → 350 (7≥5, round up). 347 → nearest 100 → 300 (4<5, round down)." },
    { emoji: "🎯", title: "Why Round?", fact: "Rounding helps you ESTIMATE! 398 + 212 ≈ 400 + 200 = 600. Close enough to check if your exact answer is reasonable." },
    { emoji: "📏", title: "The Number Line Trick", fact: "Picture a number line. Which round number is the target number closer to? That's the rounded value!" },
  ],

  "g3-math-area": [
    { emoji: "📏", title: "Perimeter", fact: "Perimeter is the TOTAL distance AROUND the outside of a shape. Add up ALL the side lengths!" },
    { emoji: "📐", title: "Area", fact: "Area is the amount of SPACE INSIDE a shape. Count the square units or use the formula!" },
    { emoji: "📐", title: "Rectangle Formulas", fact: "Perimeter = 2 × (length + width). Area = length × width. For a 5×4 room: P=18, A=20 square units." },
    { emoji: "🔢", title: "Units Matter", fact: "Perimeter uses regular units (cm, ft, m). Area uses SQUARE units (cm², ft², m²) — because it covers a flat space." },
    { emoji: "💡", title: "Real-Life Uses", fact: "Area helps you figure out how much carpet you need. Perimeter helps you figure out how much fence you need!" },
  ],

  // ─── GRADE 3 SCIENCE ──────────────────────────────────────────────────────
  "g3-sci-lifecycle": [
    { emoji: "🥚", title: "Complete Metamorphosis", fact: "Some insects go through 4 stages: Egg → Larva (caterpillar) → Pupa (chrysalis) → Adult (butterfly). Total transformation!" },
    { emoji: "🐛", title: "Incomplete Metamorphosis", fact: "Other insects: Egg → Nymph (looks like a tiny adult) → Adult. Grasshoppers and dragonflies go through this." },
    { emoji: "🐸", title: "Frog Life Cycle", fact: "Egg → Tadpole (swims, breathes water) → Froglet (grows legs) → Adult Frog (breathes air). Amazing change!" },
    { emoji: "🌱", title: "Plant Life Cycle", fact: "Seed → Seedling → Mature Plant → Flower → Fruit with Seeds → new seeds dispersed → new plants grow." },
    { emoji: "🔄", title: "All Living Things", fact: "Every living thing — from beetles to oak trees to humans — goes through a life cycle: born, grow, reproduce, die." },
  ],

  "g3-sci-ecosystems": [
    { emoji: "🌿", title: "Producers", fact: "Plants are producers — they use sunlight to make their own food (photosynthesis). They're the base of every food chain!" },
    { emoji: "🐛", title: "Consumers", fact: "Animals that eat plants or other animals are consumers. Herbivores eat plants; carnivores eat animals; omnivores eat both." },
    { emoji: "🐍", title: "Food Chain", fact: "A food chain shows who eats who. Energy flows from the sun → plants → plant-eaters → meat-eaters." },
    { emoji: "♻️", title: "Decomposers", fact: "Fungi and bacteria break down dead plants and animals, returning nutrients to the soil for new plants to use." },
    { emoji: "🌳", title: "Ecosystem Balance", fact: "All parts of an ecosystem — producers, consumers, decomposers, water, soil, air — depend on each other to stay healthy." },
  ],

  "g3-sci-matter": [
    { emoji: "🧊", title: "Solid Particles", fact: "In a solid, particles are packed tightly together and vibrate in place. Solids have a definite shape and volume." },
    { emoji: "💧", title: "Liquid Particles", fact: "In a liquid, particles are close together but can slide around. Liquids have a definite volume but no fixed shape." },
    { emoji: "💨", title: "Gas Particles", fact: "In a gas, particles are far apart and move freely in all directions. Gases have no fixed shape or volume." },
    { emoji: "🌀", title: "Physical vs Chemical Change", fact: "Physical change: matter changes form but stays the same substance (ice melts). Chemical change: a NEW substance forms (wood burns)." },
    { emoji: "⚗️", title: "Signs of Chemical Change", fact: "Color change, gas bubbles, heat or light produced, or a new smell are signs a chemical reaction may have occurred!" },
  ],

  "g3-sci-forces": [
    { emoji: "⚡", title: "What Is a Force?", fact: "A force is a push or pull that can cause an object to start moving, stop moving, or change direction." },
    { emoji: "🌍", title: "Gravity", fact: "Gravity is the force that pulls ALL objects toward Earth's center. It's why things fall down when you drop them!" },
    { emoji: "🛑", title: "Friction", fact: "Friction is a force that occurs when two surfaces rub against each other — it slows objects down. Brakes use friction!" },
    { emoji: "📏", title: "Speed & Motion", fact: "Speed = Distance ÷ Time. A faster object covers more distance in the same amount of time." },
    { emoji: "🔴", title: "Newton's Laws", fact: "1st Law: Objects keep doing what they're doing unless a force acts on them. 3rd Law: Every action has an equal opposite reaction (rockets!)." },
  ],

  // ─── GRADE 3 HISTORY ──────────────────────────────────────────────────────
  "g3-hist-america": [
    { emoji: "🇺🇸", title: "American Flag Symbolism", fact: "50 stars = 50 states. 13 stripes = the original 13 colonies. Red = courage, white = purity, blue = justice." },
    { emoji: "🦅", title: "Bald Eagle & Great Seal", fact: "The bald eagle on the Great Seal holds an olive branch (peace) and arrows (strength). It's America's national bird." },
    { emoji: "📜", title: "Declaration of Independence", fact: "Written in 1776 by Thomas Jefferson, it declared that 'all men are created equal' and that America was free from Britain." },
    { emoji: "🏛️", title: "Lincoln & Washington Memorials", fact: "Both are famous monuments in Washington D.C. honoring two of America's greatest presidents." },
    { emoji: "🎵", title: "Patriotic Songs", fact: "'The Star-Spangled Banner' (national anthem) and 'America the Beautiful' celebrate the country's history and landscape." },
  ],

  "g3-hist-communities": [
    { emoji: "🏙️", title: "Types of Communities", fact: "Urban = city (lots of people, tall buildings). Suburban = near a city (houses, yards). Rural = countryside (farms, open land)." },
    { emoji: "🏛️", title: "Three Levels of Government", fact: "Local (city/county), State (governor and legislature), Federal/National (president and Congress)." },
    { emoji: "🗳️", title: "Democracy", fact: "In a democracy, citizens vote to choose their leaders and have a say in how their community is governed." },
    { emoji: "📋", title: "Laws & Rules", fact: "Governments make laws to keep people safe and ensure fairness. Citizens are responsible for following them." },
    { emoji: "🤝", title: "Rights & Responsibilities", fact: "Citizens have RIGHTS (free speech, fair trial) AND RESPONSIBILITIES (pay taxes, jury duty, vote, follow laws)." },
  ],

  // ─── GRADE 3 GEOGRAPHY ────────────────────────────────────────────────────
  "g3-geo-usmap": [
    { emoji: "🗺️", title: "5 U.S. Regions", fact: "Northeast, Southeast, Midwest, Southwest, West. Each region has different geography, climate, and culture!" },
    { emoji: "🌲", title: "Northeast & Southeast", fact: "Northeast: densely populated, original 13 colonies, cold winters. Southeast: warm climate, gulf coast, includes Florida and Texas." },
    { emoji: "🌽", title: "Midwest", fact: "The 'heartland' — flat plains, the Great Lakes, and some of the world's most productive farmland." },
    { emoji: "🌵", title: "Southwest & West", fact: "Southwest: deserts, canyons (Grand Canyon!), hot climate. West: Rocky Mountains, Pacific Coast, diverse landscapes." },
    { emoji: "🏙️", title: "Major Cities", fact: "New York City, Los Angeles, Chicago, Houston, and Phoenix are among the most populated U.S. cities." },
  ],

  "g3-geo-world": [
    { emoji: "🌍", title: "7 Continents", fact: "Africa, Antarctica, Asia, Australia/Oceania, Europe, North America, South America. Asia is largest; Australia is smallest." },
    { emoji: "🌊", title: "5 Oceans", fact: "Pacific (largest — 30% of Earth's surface!), Atlantic, Indian, Southern, Arctic (smallest). Together they form one global ocean." },
    { emoji: "🌏", title: "Asia", fact: "Asia is the LARGEST continent and has MORE people than all other continents combined — over 4 billion people!" },
    { emoji: "🌎", title: "The Americas", fact: "North America and South America are connected at Panama. South America has the mighty Amazon Rainforest." },
    { emoji: "🌐", title: "Equator & Hemispheres", fact: "The equator divides Earth into Northern and Southern Hemispheres. Countries near the equator are warm year-round." },
  ],

  "g3-geo-maps": [
    { emoji: "🧭", title: "Compass Rose", fact: "Cardinal directions (N, S, E, W) plus intermediate: NE, NW, SE, SW. Helps you navigate any map!" },
    { emoji: "📏", title: "Map Scale", fact: "A scale lets you calculate real-world distances from a map. '1 cm = 100 km' means measure the map, multiply by 100." },
    { emoji: "🌐", title: "Latitude", fact: "Latitude lines run HORIZONTALLY (east-west) and measure distance NORTH or SOUTH of the equator (0°)." },
    { emoji: "🌐", title: "Longitude", fact: "Longitude lines run VERTICALLY (north-south) and measure distance EAST or WEST of the Prime Meridian (0°)." },
    { emoji: "📍", title: "Coordinates", fact: "Latitude + Longitude pinpoint any exact location on Earth! '40°N, 74°W' = New York City." },
  ],
};

export const ACTIVITY_LEARN_DATA: Record<string, { emoji: string; title: string; fact: string }[]> = {
  ...SCIENCE_LEARN_ITEMS,
  ...EXTRA,

  // ─── LANGUAGE ARTS ────────────────────────────────────────────────────────
  "lang-synonyms": [
    { emoji: "🟰", title: "What Is a Synonym?", fact: "A synonym is a word that means the same (or nearly the same) as another word. Happy and joyful are synonyms. Big and large are synonyms." },
    { emoji: "😊", title: "Synonyms for Happy", fact: "Happy, joyful, glad, cheerful, delighted, and pleased all mean a good, positive feeling. Use different ones to make your writing more interesting!" },
    { emoji: "🐢", title: "Synonyms for Slow", fact: "Slow, sluggish, gradual, and lazy can all mean moving without much speed. A turtle is slow. A snail is sluggish." },
    { emoji: "📣", title: "Synonyms for Big", fact: "Big, large, huge, enormous, gigantic, and massive all mean having a great size. An elephant is big. A mountain is enormous." },
    { emoji: "✍️", title: "Using Synonyms in Writing", fact: "Instead of saying 'the big, big dog,' try 'the enormous dog.' Synonyms help you avoid repeating the same word over and over." },
    { emoji: "📚", title: "The Thesaurus", fact: "A thesaurus is a special book (or online tool) that lists synonyms for any word you look up. Writers use it all the time!" },
  ],

  "lang-antonyms": [
    { emoji: "↔️", title: "What Is an Antonym?", fact: "An antonym is a word that means the OPPOSITE of another word. Hot and cold are antonyms. Day and night are antonyms." },
    { emoji: "🔥❄️", title: "Temperature Opposites", fact: "Hot ↔ Cold. Warm ↔ Cool. These are antonym pairs that describe opposite ends of temperature." },
    { emoji: "⬆️⬇️", title: "Direction Opposites", fact: "Up ↔ Down. Left ↔ Right. In ↔ Out. North ↔ South. Directions always have an opposite!" },
    { emoji: "😀😢", title: "Feeling Opposites", fact: "Happy ↔ Sad. Brave ↔ Cowardly. Calm ↔ Anxious. Love ↔ Hate. Feelings come in opposite pairs too." },
    { emoji: "🌅🌑", title: "More Opposite Pairs", fact: "Day ↔ Night. Light ↔ Dark. Fast ↔ Slow. Always ↔ Never. These common word pairs are classic antonyms." },
    { emoji: "✍️", title: "Antonyms in Writing", fact: "Antonyms help show contrast in writing. 'She was kind, but he was cruel' uses antonyms to show two opposite personalities." },
  ],

  "lang-prefixes": [
    { emoji: "⬅️", title: "What Is a Prefix?", fact: "A prefix is a group of letters added to the BEGINNING of a word to change its meaning. Pre + fix = prefix (fix at the beginning!)." },
    { emoji: "❌", title: "un- = Not", fact: "un- means NOT. Unhappy = not happy. Unkind = not kind. Unfair = not fair. Unlock = not locked. Add un- to reverse a word's meaning." },
    { emoji: "🔄", title: "re- = Again", fact: "re- means AGAIN. Redo = do again. Replay = play again. Reread = read again. Rebuild = build again." },
    { emoji: "📅", title: "pre- = Before", fact: "pre- means BEFORE. Preschool = school before kindergarten. Preheat = heat before cooking. Preview = see before the official showing." },
    { emoji: "🚫", title: "dis- = Not / Opposite", fact: "dis- means NOT or the OPPOSITE. Dislike = not like. Disagree = not agree. Disconnect = not connected. Dishonest = not honest." },
    { emoji: "⚠️", title: "mis- = Wrongly", fact: "mis- means WRONGLY or BADLY. Misspell = spell wrongly. Misread = read incorrectly. Misbehave = behave badly. Mistake = an action done wrong." },
    { emoji: "💡", title: "Why Prefixes Matter", fact: "Knowing one prefix unlocks dozens of words! If you know un- means NOT, you can figure out: unhelpful, unfinished, unexpected, unnecessary." },
  ],

  "lang-suffixes": [
    { emoji: "➡️", title: "What Is a Suffix?", fact: "A suffix is a group of letters added to the END of a word to change its meaning or its part of speech (noun, verb, adjective, adverb)." },
    { emoji: "✨", title: "-ful = Full Of", fact: "-ful means FULL OF. Joyful = full of joy. Colorful = full of color. Helpful = full of help. Powerful = full of power." },
    { emoji: "🚫", title: "-less = Without", fact: "-less means WITHOUT. Careless = without care. Hopeless = without hope. Sleeveless = without sleeves. Useless = without use." },
    { emoji: "📦", title: "-ness = State of Being", fact: "-ness turns an adjective into a noun: happy → happiness, kind → kindness, dark → darkness, sad → sadness." },
    { emoji: "🏃", title: "-ly = In a Way (Adverb)", fact: "-ly turns an adjective into an adverb: quick → quickly, slow → slowly, loud → loudly, careful → carefully." },
    { emoji: "🏆", title: "-er and -est = Comparing", fact: "-er compares two things (taller, faster, smarter). -est means the most of all (tallest, fastest, smartest of the whole group)." },
    { emoji: "✅", title: "-able = Can Be Done", fact: "-able means CAN BE DONE. Readable = can be read. Washable = can be washed. Breakable = can be broken. Lovable = can be loved." },
  ],

  "lang-greek-roots": [
    { emoji: "🏛️", title: "Greek Roots in English", fact: "Thousands of English words come from Ancient Greek! Once you learn a root, you can unlock the meaning of many words at once." },
    { emoji: "🌿", title: "bio = Life", fact: "Bio means LIFE. Biology = study of life. Biography = the life story of a person. Antibiotic = medicine that fights living bacteria." },
    { emoji: "🌍", title: "geo = Earth", fact: "Geo means EARTH. Geography = writing about Earth's features. Geology = study of Earth's rocks. Geometry = measuring Earth (shapes)." },
    { emoji: "💧", title: "hydro = Water", fact: "Hydro means WATER. Hydrogen = an element in water (H₂O). Hydroelectric = electricity made by water. Hydration = keeping water in your body." },
    { emoji: "📸", title: "photo = Light", fact: "Photo means LIGHT. Photography = capturing light to make images. Photosynthesis = plants using light to make food." },
    { emoji: "🔭", title: "tele = Far / Distance", fact: "Tele means FAR or DISTANCE. Telephone = sound from far away. Telescope = tool to see far away. Television = see things from a distance." },
    { emoji: "🔬", title: "micro = Small", fact: "Micro means SMALL. Microscope = tool to see tiny things. Microphone = amplifies small sounds. Microwave = very short (micro) waves of energy." },
  ],

  "lang-latin-roots": [
    { emoji: "📜", title: "Latin Roots in English", fact: "More than half of all English words come from Latin! Latin was the language of the ancient Roman Empire. Learning Latin roots is like having a secret decoder ring." },
    { emoji: "🌊", title: "aqua = Water", fact: "Aqua means WATER. Aquarium = a tank of water for fish. Aquatic = living in or near water. Aqueduct = an ancient Roman channel for carrying water." },
    { emoji: "🎒", title: "port = Carry", fact: "Port means CARRY. Portable = able to be carried. Transport = carry across. Import = carry goods into a country. Export = carry goods out of a country." },
    { emoji: "💥", title: "rupt = Break", fact: "Rupt means BREAK. Erupt = break out (volcano). Interrupt = break into a conversation. Corrupt = break down morally. Disrupt = break apart order." },
    { emoji: "🗣️", title: "dict = Say / Speak", fact: "Dict means SAY or SPEAK. Dictionary = book of word meanings. Dictate = speak aloud for someone to write. Predict = say what will happen before it does." },
    { emoji: "👂", title: "aud = Hear", fact: "Aud means HEAR. Audience = people who listen and watch. Auditorium = a large hall to hear performances. Audio = relating to sound." },
    { emoji: "👁️", title: "vis / vid = See", fact: "Vis/vid means SEE. Visible = able to be seen. Vision = the ability to see. Video = something you watch. Evidence = what you can see that proves something." },
  ],

  "lang-homophones": [
    { emoji: "👂", title: "What Are Homophones?", fact: "Homophones are words that SOUND the same when spoken but have different spellings and completely different meanings." },
    { emoji: "📍", title: "there / their / they're", fact: "THERE = a place ('over there'). THEIR = belongs to them ('their dog'). THEY'RE = they are ('they're running'). Tip: they're = they are — expand it to check!" },
    { emoji: "2️⃣", title: "to / too / two", fact: "TO = direction or purpose ('I go to school'). TOO = also or very ('me too!', 'too loud'). TWO = the number 2. Tip: two has a 'w' like the word 'twice'." },
    { emoji: "👂", title: "here / hear", fact: "HERE = a place ('come here'). HEAR = use your ears ('I hear music'). Tip: HEAR has the word EAR inside it — ears are for hearing!" },
    { emoji: "✏️", title: "right / write", fact: "RIGHT = correct, or the direction ('turn right'). WRITE = to put words on paper ('write your name'). Tip: WRITE has a W, like a pen's wiggling motion." },
    { emoji: "🏆", title: "won / one", fact: "WON = past tense of win ('we won!'). ONE = the number 1. Tip: WON sounds like 'fun' — winning IS fun!" },
    { emoji: "🍐", title: "pear / pair / pare", fact: "PEAR = a fruit 🍐. PAIR = two matching things ('a pair of shoes'). PARE = to peel or trim ('pare an apple'). Three words, one sound!" },
  ],

  // ─── AMERICAN PRESIDENTS ──────────────────────────────────────────────────
  "pres-founders": [
    { emoji: "🎩", title: "George Washington — 1st President", fact: "George Washington was America's first president, elected in 1789. He is called the 'Father of Our Country' and appears on the $1 bill and the quarter." },
    { emoji: "📜", title: "John Adams — 2nd President", fact: "John Adams was the first Vice President before becoming the 2nd President. He was the first to live in the White House, moving in during 1800." },
    { emoji: "✍️", title: "Thomas Jefferson — 3rd President", fact: "Thomas Jefferson wrote the Declaration of Independence. He was the 3rd President and his face is on the nickel. He also founded the University of Virginia." },
    { emoji: "📃", title: "James Madison — 4th President", fact: "James Madison is called the 'Father of the Constitution' because he did so much work writing it. He also helped create the Bill of Rights." },
    { emoji: "🌎", title: "James Monroe — 5th President", fact: "James Monroe issued the Monroe Doctrine in 1823, warning European countries to stay out of the Americas. He was the 5th President." },
    { emoji: "🏛️", title: "The White House", fact: "The White House at 1600 Pennsylvania Avenue has been the home of every president since John Adams in 1800. George Washington never lived there!" },
  ],

  "pres-famous": [
    { emoji: "🎩", title: "Abraham Lincoln — 16th President", fact: "Lincoln led the country through the Civil War and signed the Emancipation Proclamation in 1863, freeing enslaved people. He is on the penny and $5 bill." },
    { emoji: "🗒️", title: "The Gettysburg Address", fact: "Lincoln's Gettysburg Address (1863) is one of the most famous speeches in American history. He gave it to honor soldiers who died in the Battle of Gettysburg." },
    { emoji: "🐻", title: "Theodore Roosevelt — 26th President", fact: "Teddy Roosevelt was a conservation hero who protected 230 million acres of land and created 5 national parks. Teddy bears are named after him!" },
    { emoji: "🌊", title: "Franklin D. Roosevelt — 32nd President", fact: "FDR led America through the Great Depression and World War II. He was elected 4 times — the only president to serve more than 2 terms." },
    { emoji: "🕊️", title: "John F. Kennedy — 35th President", fact: "JFK was the 35th President. He inspired a nation with his famous words: 'Ask not what your country can do for you — ask what you can do for your country.'" },
    { emoji: "⭐", title: "Barack Obama — 44th President", fact: "Barack Obama was elected in 2008 as the first African American president of the United States. He served two terms until 2017." },
    { emoji: "🏔️", title: "Mount Rushmore", fact: "Mount Rushmore in South Dakota features the carved faces of four great presidents: George Washington, Thomas Jefferson, Theodore Roosevelt, and Abraham Lincoln." },
  ],

  "pres-facts": [
    { emoji: "⏱️", title: "Presidential Terms", fact: "A presidential term is 4 years long. Thanks to the 22nd Amendment (1951), presidents can only be elected twice — a maximum of 8 years in office." },
    { emoji: "🎂", title: "Age Requirement", fact: "To become president, you must be at least 35 years old, born in the United States, and have lived in the U.S. for at least 14 years." },
    { emoji: "🐻", title: "The Teddy Bear", fact: "In 1902, Teddy Roosevelt refused to shoot a captive bear on a hunting trip. A toymaker created a stuffed 'Teddy's Bear' — the original teddy bear!" },
    { emoji: "📅", title: "Amazing Coincidence", fact: "On July 4, 1826 — the 50th anniversary of the Declaration of Independence — both John Adams (2nd) AND Thomas Jefferson (3rd) died on the SAME day!" },
    { emoji: "🚀", title: "NASA", fact: "President Dwight D. Eisenhower created NASA in 1958. Shortly after, President Kennedy challenged the nation to land on the Moon — and we did, in 1969!" },
    { emoji: "👆", title: "Line of Succession", fact: "If the president cannot serve, the Vice President takes over. This has happened 9 times in U.S. history." },
    { emoji: "📺", title: "Commander-in-Chief", fact: "The U.S. Constitution makes the president the Commander-in-Chief of the armed forces. They have the authority to lead the military." },
  ],

  "pres-order": [
    { emoji: "1️⃣", title: "1st — George Washington", fact: "George Washington was inaugurated as the 1st President on April 30, 1789. He served two terms and set many traditions still followed today." },
    { emoji: "2️⃣", title: "2nd — John Adams", fact: "John Adams was the 2nd President (1797–1801). He was the first president to live in the White House." },
    { emoji: "3️⃣", title: "3rd — Thomas Jefferson", fact: "Thomas Jefferson was the 3rd President (1801–1809). He doubled the size of the U.S. with the Louisiana Purchase in 1803!" },
    { emoji: "1️⃣6️⃣", title: "16th — Abraham Lincoln", fact: "Abraham Lincoln was the 16th President (1861–1865). He led the country through the Civil War and helped end slavery." },
    { emoji: "2️⃣6️⃣", title: "26th — Theodore Roosevelt", fact: "Theodore Roosevelt was the 26th President (1901–1909). He was the youngest person to become president, at age 42." },
    { emoji: "3️⃣2️⃣", title: "32nd — Franklin D. Roosevelt", fact: "Franklin D. Roosevelt was the 32nd President, serving from 1933 to 1945. He was elected 4 times — more than any other president." },
    { emoji: "3️⃣5️⃣", title: "35th — John F. Kennedy", fact: "John F. Kennedy was the 35th President (1961–1963). He was the youngest person ever elected president, at 43 years old." },
    { emoji: "4️⃣4️⃣", title: "44th — Barack Obama", fact: "Barack Obama was the 44th President (2009–2017) and the first African American to hold the office." },
  ],
};
