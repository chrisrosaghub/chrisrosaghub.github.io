/**
 * Brainy Buddies — Memory Techniques activities.
 * Kid-friendly strategies for remembering things: acronyms, rhymes,
 * visualization, memory palaces, chunking, and the story/link method.
 * All activities are available at every grade level (allLevels: true).
 */
import type { Activity } from "@/lib/brainy-data";

export const MEMORY_ACTIVITIES: Activity[] = [

  // ── Acronyms & Acrostics ────────────────────────────────────────────────
  {
    id: "mem-acronyms",
    subjectId: "memory",
    title: "Acronyms & Acrostics",
    description: "Use first letters and silly sentences to remember lists.",
    emoji: "🔤",
    allLevels: true,
    questions: [
      { id: "q1", prompt: "An acronym is a word made from the ___ of other words.", choices: ["last letters", "first letters", "middle sounds", "colors"], answer: 1, explanation: "An acronym takes the FIRST letter of each word to make a new, easy-to-remember word." },
      { id: "q2", prompt: "The made-up name 'ROY G. BIV' helps you remember the colors of the...", choices: ["alphabet", "rainbow", "week", "planets"], answer: 1, explanation: "Red, Orange, Yellow, Green, Blue, Indigo, Violet — the colors of the rainbow in order!" },
      { id: "q3", prompt: "In ROY G. BIV, what color does the 'G' stand for?", choices: ["Gold", "Gray", "Green", "Glow"], answer: 2, explanation: "G = Green, right in the middle of the rainbow." },
      { id: "q4", prompt: "The word 'HOMES' helps you remember the five...", choices: ["Great Lakes", "oceans", "continents", "deserts"], answer: 0, explanation: "Huron, Ontario, Michigan, Erie, Superior — the five Great Lakes!" },
      { id: "q5", prompt: "An acrostic is a ___ where the first letters spell something to remember.", choices: ["song", "drawing", "sentence", "number"], answer: 2, explanation: "An acrostic is a sentence where each word's first letter reminds you of an item in a list." },
      { id: "q6", prompt: "'My Very Educated Mother Just Served Us Nachos' helps you remember the order of the...", choices: ["days", "letters", "planets", "months"], answer: 2, explanation: "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune — the planets in order!" },
      { id: "q7", prompt: "In 'My Very Educated Mother...', the first word 'My' reminds you of which planet?", choices: ["Mars", "Mercury", "Moon", "Mira"], answer: 1, explanation: "My → Mercury, the planet closest to the Sun." },
      { id: "q8", prompt: "Acronyms and acrostics work because they turn a long list into something...", choices: ["longer", "shorter and easier", "more boring", "invisible"], answer: 1, explanation: "They shrink a big list down to one word or sentence that's easy to recall." },
      { id: "q9", prompt: "Which of these is an acronym?", choices: ["Apple", "NASA", "Running", "Bluebird"], answer: 1, explanation: "NASA stands for National Aeronautics and Space Administration." },
      { id: "q10", prompt: "The math phrase 'PEMDAS' reminds you of the order of...", choices: ["spelling", "operations", "colors", "directions"], answer: 1, explanation: "Parentheses, Exponents, Multiply, Divide, Add, Subtract — the order of operations in math." },
      { id: "q11", prompt: "What makes a good acrostic sentence easier to remember?", choices: ["It is very long", "It is silly or funny", "It has no meaning", "It uses big words"], answer: 1, explanation: "Funny or silly sentences stick in your brain better than plain ones!" },
      { id: "q12", prompt: "To remember a grocery list of Bread, Eggs, and Apples, an acronym could be...", choices: ["BEA", "ABE", "EAB", "Any order is fine"], answer: 0, explanation: "BEA uses the first letters in order: Bread, Eggs, Apples." },
      { id: "q13", prompt: "'Every Good Boy Does Fine' is an acrostic that helps musicians remember...", choices: ["dance steps", "musical notes", "drum beats", "song titles"], answer: 1, explanation: "It names the lines of the treble clef in music: E, G, B, D, F." },
      { id: "q14", prompt: "Why do people make up acronyms?", choices: ["To make things harder", "To remember information more easily", "To confuse friends", "To write longer sentences"], answer: 1, explanation: "Acronyms are memory shortcuts that make lists easier to recall." },
      { id: "q15", prompt: "The best acronym or acrostic is one that you...", choices: ["copy from a book", "make up yourself", "never practice", "forget right away"], answer: 1, explanation: "Ones you create yourself are easiest to remember because they make sense to you!" },
      { id: "q16", prompt: "An acrostic for the points of a compass is 'Never Eat Soggy Waffles' — what does it spell?", choices: ["North, East, South, West", "Sizes of waffles", "Days of the week", "Types of food"], answer: 0, explanation: "North, East, South, West — the four main directions, clockwise!" },
    ],
  },

  // ── Rhymes & Songs ──────────────────────────────────────────────────────
  {
    id: "mem-rhymes",
    subjectId: "memory",
    title: "Rhymes & Songs",
    description: "Turn facts into catchy rhymes and tunes you can't forget.",
    emoji: "🎵",
    allLevels: true,
    questions: [
      { id: "q1", prompt: "Why are rhymes easier to remember than plain facts?", choices: ["They are longer", "The matching sounds stick in your brain", "They use no words", "They are always sad"], answer: 1, explanation: "Rhyming sounds create a pattern your brain loves to hold onto." },
      { id: "q2", prompt: "'Thirty days hath September, April, June, and November' helps you remember...", choices: ["birthdays", "how many days are in each month", "the seasons", "the planets"], answer: 1, explanation: "This famous rhyme tells you which months have 30 days!" },
      { id: "q3", prompt: "The rhyme 'In fourteen hundred ninety-two, Columbus sailed the ocean blue' helps you remember a...", choices: ["color", "date in history", "song title", "math fact"], answer: 1, explanation: "It locks in the year 1492 with a rhyme." },
      { id: "q4", prompt: "The spelling rule 'i before e, except after c' is an example of a...", choices: ["memory rhyme", "math trick", "song with dancing", "secret code"], answer: 0, explanation: "This little rhyme helps you spell words like 'piece' and 'receive'." },
      { id: "q5", prompt: "Which famous song helps young kids remember the order of letters?", choices: ["Happy Birthday", "The ABC Song", "Twinkle Twinkle", "Row Your Boat"], answer: 1, explanation: "The ABC Song puts all 26 letters to a tune so they're easy to recall." },
      { id: "q6", prompt: "Putting facts to music helps your brain because melodies are...", choices: ["hard to hear", "easy to remember", "always quiet", "never repeated"], answer: 1, explanation: "Our brains hold onto melodies really well — that's why songs get stuck in our heads!" },
      { id: "q7", prompt: "A good memory rhyme should be...", choices: ["short and catchy", "very long and serious", "in a foreign code", "impossible to sing"], answer: 0, explanation: "Short, catchy rhymes are the easiest to remember." },
      { id: "q8", prompt: "To remember a phone number, you could turn it into a...", choices: ["smell", "little song or beat", "drawing only", "math problem"], answer: 1, explanation: "Giving the numbers a rhythm or tune makes them stick." },
      { id: "q9", prompt: "The ABC Song uses the same tune as which other nursery song?", choices: ["Jingle Bells", "Twinkle Twinkle Little Star", "Happy Birthday", "Old MacDonald"], answer: 1, explanation: "Both share the same melody — that's why they feel familiar!" },
      { id: "q10", prompt: "Clapping or tapping a beat while you learn can help you...", choices: ["forget faster", "remember the rhythm of the words", "fall asleep", "lose your place"], answer: 1, explanation: "Adding movement and rhythm gives your memory another way to hold the information." },
      { id: "q11", prompt: "Rhymes work best when the ending words...", choices: ["sound the same", "are all different", "have no meaning", "are spelled wrong"], answer: 0, explanation: "Matching end sounds is what makes a rhyme — and what makes it memorable." },
      { id: "q12", prompt: "'Righty tighty, lefty loosey' is a rhyme that helps you remember how to...", choices: ["tie shoes", "turn a screw or lid", "ride a bike", "read a clock"], answer: 1, explanation: "Turn right to tighten, left to loosen — a handy rhyming reminder!" },
      { id: "q13", prompt: "Making up your OWN silly song about a fact helps because...", choices: ["it takes a long time", "your brain remembers things you create", "it has to rhyme perfectly", "songs are never useful"], answer: 1, explanation: "When you create the song yourself, it means more to you and sticks better." },
      { id: "q14", prompt: "Which is the BEST way to use a memory song before a test?", choices: ["Sing it once a year", "Hum or sing it a few times to practice", "Never sing it", "Sing it as slowly as possible"], answer: 1, explanation: "A little practice singing helps the facts stay fresh in your memory." },
    ],
  },

  // ── Picture Power (Visualization) ───────────────────────────────────────
  {
    id: "mem-visualize",
    subjectId: "memory",
    title: "Picture Power",
    description: "Make wild mental pictures so facts stick in your mind.",
    emoji: "🖼️",
    allLevels: true,
    questions: [
      { id: "q1", prompt: "Visualization means making a ___ in your mind.", choices: ["sound", "picture", "smell", "list"], answer: 1, explanation: "You imagine a clear mental picture of what you want to remember." },
      { id: "q2", prompt: "Which kind of mental picture is EASIEST to remember?", choices: ["A plain gray box", "A big, silly, colorful one", "An invisible one", "A tiny, blurry one"], answer: 1, explanation: "The bigger, sillier, and more colorful the picture, the better it sticks!" },
      { id: "q3", prompt: "To remember the word 'cat' next to 'cloud,' you could imagine a...", choices: ["cat napping on a fluffy cloud", "plain word on paper", "number 7", "quiet room"], answer: 0, explanation: "Linking the two with a funny picture makes the pair unforgettable." },
      { id: "q4", prompt: "Adding action or movement to a mental picture makes it...", choices: ["harder to remember", "easier to remember", "disappear", "boring"], answer: 1, explanation: "A picture that's DOING something is even stickier than a still one." },
      { id: "q5", prompt: "Why do exaggerated (super-sized) images help your memory?", choices: ["They are normal and calm", "They surprise your brain so it pays attention", "They are hard to see", "They are always true"], answer: 1, explanation: "Surprising, giant images grab your brain's attention and are easy to recall." },
      { id: "q6", prompt: "To remember that 'Rome' is in Italy, you might picture a...", choices: ["roaming gnome holding a pizza in Italy", "plain map", "blank page", "boring list"], answer: 0, explanation: "'Rome' sounds like 'roam' — a roaming gnome with pizza ties it to Italy!" },
      { id: "q7", prompt: "Using your other senses (smell, sound, touch) in a mental picture makes it...", choices: ["weaker", "stronger and more memorable", "invisible", "shorter"], answer: 1, explanation: "The more senses you imagine, the more 'hooks' your memory has." },
      { id: "q8", prompt: "Visualization works well for remembering...", choices: ["only numbers", "vocabulary words, facts, and lists", "nothing at all", "only your name"], answer: 1, explanation: "You can picture almost anything — words, facts, names, and lists!" },
      { id: "q9", prompt: "To remember a person named 'Mr. Baker,' you could picture him...", choices: ["baking a giant cake", "doing nothing", "as a blank face", "far away"], answer: 0, explanation: "Linking a name to a vivid picture (Baker → baking) helps you recall it." },
      { id: "q10", prompt: "The first step of visualization is to...", choices: ["close your eyes and imagine clearly", "write it 100 times", "say it backwards", "ignore it"], answer: 0, explanation: "Picture the scene clearly in your mind to lock it in." },
      { id: "q11", prompt: "A mental picture is more powerful when it is...", choices: ["dull and quiet", "colorful and a little crazy", "completely black", "very plain"], answer: 1, explanation: "Color and craziness make pictures memorable." },
      { id: "q12", prompt: "To remember 'photosynthesis,' you might picture a plant...", choices: ["taking a selfie in the sunshine", "sitting in the dark", "made of stone", "with no leaves"], answer: 0, explanation: "'Photo' = picture/light, so a plant taking a sunny selfie helps you recall it makes food from light!" },
      { id: "q13", prompt: "If two ideas are hard to connect, you should make the picture...", choices: ["even sillier so they link together", "smaller and plainer", "disappear", "into words only"], answer: 0, explanation: "A wild, funny connection glues two unrelated ideas together in your memory." },
      { id: "q14", prompt: "Picture Power is also sometimes called...", choices: ["mental imagery", "loud reading", "fast writing", "silent waiting"], answer: 0, explanation: "Making pictures in your mind is called mental imagery or visualization." },
    ],
  },

  // ── The Memory Palace ───────────────────────────────────────────────────
  {
    id: "mem-palace",
    subjectId: "memory",
    title: "The Memory Palace",
    description: "Store facts in rooms of a place you know by heart.",
    emoji: "🏰",
    allLevels: true,
    questions: [
      { id: "q1", prompt: "A Memory Palace is an imaginary walk through a...", choices: ["place you know well", "place you've never seen", "blank white room", "library you can't enter"], answer: 0, explanation: "You use a familiar place — like your home — so the route is easy to picture." },
      { id: "q2", prompt: "In a Memory Palace, you 'place' each thing you want to remember in a...", choices: ["different spot or room", "single tiny box", "computer", "stranger's house"], answer: 0, explanation: "Each item gets its own location, like the door, the couch, or the kitchen." },
      { id: "q3", prompt: "To recall your list, you take an imaginary ___ through the palace.", choices: ["nap", "walk", "test", "phone call"], answer: 1, explanation: "You mentally walk the same path and 'see' each item where you left it." },
      { id: "q4", prompt: "The Memory Palace is also called the method of...", choices: ["loci (places)", "loudness", "luck", "lines"], answer: 0, explanation: "'Loci' is an old word meaning 'places' — you store memories in places." },
      { id: "q5", prompt: "Why use a place you ALREADY know for your palace?", choices: ["It is brand new", "You can picture it easily without effort", "It is far away", "It is a secret"], answer: 1, explanation: "A familiar place is easy to walk through in your mind, so you can focus on the items." },
      { id: "q6", prompt: "To make items in your palace stick, you should imagine them...", choices: ["plain and tiny", "big, silly, and doing something", "invisible", "in a list"], answer: 1, explanation: "Vivid, silly images at each spot are much easier to remember." },
      { id: "q7", prompt: "If you put 'milk' at your front door, you might picture...", choices: ["a giant milk carton blocking the door", "an empty doorway", "nothing", "a quiet room"], answer: 0, explanation: "A huge milk carton at the door is unforgettable when you 'walk' past it." },
      { id: "q8", prompt: "The Memory Palace is great for remembering things...", choices: ["in a special ORDER", "with no order at all", "you want to forget", "that aren't real"], answer: 0, explanation: "Because you follow a path, the items come back in the right order." },
      { id: "q9", prompt: "Ancient Greek and Roman speakers used memory palaces to remember...", choices: ["long speeches", "phone numbers", "video games", "passwords"], answer: 0, explanation: "Long ago, speakers stored each part of a speech in a different room!" },
      { id: "q10", prompt: "What should your imaginary path through the palace be?", choices: ["The same every time", "Different every time", "Backwards only", "Random"], answer: 0, explanation: "Using the SAME route each time means you never miss a spot." },
      { id: "q11", prompt: "A good Memory Palace can be your home, your school, or even...", choices: ["the route you walk to class", "a place you imagine for the first time", "outer space", "nowhere"], answer: 0, explanation: "Any well-known route works — your walk to class, your bedroom, your backyard." },
      { id: "q12", prompt: "The Memory Palace works because your brain is very good at remembering...", choices: ["places and directions", "random numbers", "long lists of words", "tiny details only"], answer: 0, explanation: "Humans naturally remember places and how to move through them." },
      { id: "q13", prompt: "If you have 5 things to remember, how many spots do you need in your palace?", choices: ["1", "5", "10", "0"], answer: 1, explanation: "One memorable spot for each item — so 5 items need 5 places." },
      { id: "q14", prompt: "What is the FIRST step to building a Memory Palace?", choices: ["Pick a place you know and a path through it", "Forget everything", "Close the curtains", "Write a song"], answer: 0, explanation: "Choose a familiar place and decide the order you'll walk through it." },
    ],
  },

  // ── Chunking ────────────────────────────────────────────────────────────
  {
    id: "mem-chunking",
    subjectId: "memory",
    title: "Chunking",
    description: "Break big information into small, easy groups.",
    emoji: "🧩",
    allLevels: true,
    questions: [
      { id: "q1", prompt: "Chunking means breaking big information into...", choices: ["smaller groups", "one huge piece", "tiny single letters only", "nothing"], answer: 0, explanation: "You split a long string of information into small, bite-sized groups." },
      { id: "q2", prompt: "The phone number 8005551234 is easier to remember as...", choices: ["800-555-1234", "8005551234", "8 0 0 5 5 5 1 2 3 4", "one big number"], answer: 0, explanation: "Splitting it into 3 chunks (800, 555, 1234) makes it much easier!" },
      { id: "q3", prompt: "Chunking helps because our memory can only hold a few items...", choices: ["at a time", "for a year", "if they are loud", "if they rhyme"], answer: 0, explanation: "Our short-term memory holds about 4–7 items, so chunks make more fit." },
      { id: "q4", prompt: "Which is an example of chunking the letters F-B-I-N-A-S-A?", choices: ["FBI and NASA", "F B I N A S A", "one long word", "ASANIBF"], answer: 0, explanation: "Grouping them into FBI + NASA turns 7 letters into just 2 chunks." },
      { id: "q5", prompt: "To memorize a long number, a good chunk size is about...", choices: ["2 to 4 digits each", "20 digits each", "1 digit each", "100 digits each"], answer: 0, explanation: "Small chunks of 2–4 digits are easiest for your brain to hold." },
      { id: "q6", prompt: "Chunking a grocery list could mean grouping items by...", choices: ["type, like fruits and snacks", "color of the letters", "how heavy they are", "alphabet backwards"], answer: 0, explanation: "Grouping by category (fruits, snacks, drinks) makes the list easier to recall." },
      { id: "q7", prompt: "Reading a big word like 'butterfly' is easier when you chunk it into...", choices: ["but-ter-fly", "b-u-t-t-e-r-f-l-y", "one big sound", "fly-ter-but"], answer: 0, explanation: "Breaking it into syllables (but-ter-fly) makes it simpler to read and remember." },
      { id: "q8", prompt: "Chunking makes a long list feel...", choices: ["shorter and simpler", "much longer", "impossible", "invisible"], answer: 0, explanation: "Fewer, bigger groups feel easier than many tiny pieces." },
      { id: "q9", prompt: "Which is NOT a good chunk for the number 1947365?", choices: ["194-736-5", "1-9-4-7-3-6-5", "Both are fine", "194-73-65"], answer: 1, explanation: "Single digits aren't chunked at all — that's the hardest way to remember." },
      { id: "q10", prompt: "Studying spelling words in small chunks each day is better than...", choices: ["cramming them all at once", "never studying", "skipping them", "guessing"], answer: 0, explanation: "A few words at a time stick better than trying to learn all of them in one go." },
      { id: "q11", prompt: "Your brain treats each chunk as...", choices: ["one single item", "a hundred items", "nothing", "a color"], answer: 0, explanation: "A whole chunk counts as just one thing to remember, so you can hold more!" },
      { id: "q12", prompt: "Credit cards and ID numbers are often written in chunks to be...", choices: ["easier to read and remember", "harder to use", "more colorful", "longer"], answer: 0, explanation: "That's why they use spaces or dashes between groups of numbers." },
      { id: "q13", prompt: "Chunking the days of the year, you might group them into...", choices: ["12 months", "365 single days", "one big block", "letters"], answer: 0, explanation: "Thinking in 12 months is far easier than 365 separate days." },
    ],
  },

  // ── The Story Method ────────────────────────────────────────────────────
  {
    id: "mem-story",
    subjectId: "memory",
    title: "The Story Method",
    description: "Link items into a silly story to remember them in order.",
    emoji: "📖",
    allLevels: true,
    questions: [
      { id: "q1", prompt: "The Story Method links your items together into a...", choices: ["short story", "blank page", "single number", "quiet nap"], answer: 0, explanation: "You weave the items into one story so each part reminds you of the next." },
      { id: "q2", prompt: "The best memory stories are...", choices: ["silly and full of action", "boring and still", "very serious", "completely empty"], answer: 0, explanation: "Funny, action-packed stories stick in your memory the best!" },
      { id: "q3", prompt: "To remember 'dog, hat, banana,' you could imagine a...", choices: ["dog wearing a hat eating a banana", "list on paper", "blank wall", "math problem"], answer: 0, explanation: "Connecting them in one wacky scene makes all three easy to recall in order." },
      { id: "q4", prompt: "The Story Method is also called the ___ method.", choices: ["link", "luck", "loud", "line"], answer: 0, explanation: "It's called the link method because you LINK each item to the next." },
      { id: "q5", prompt: "Why does a story help you remember the ORDER of a list?", choices: ["Each event leads to the next", "Stories have no order", "It is random", "Order doesn't matter"], answer: 0, explanation: "One part of the story leads to the next, so the items come back in sequence." },
      { id: "q6", prompt: "If your list is 'sun, key, frog,' a good link is...", choices: ["the sun melts a key that a frog hops over", "three plain words", "an empty room", "a phone number"], answer: 0, explanation: "A vivid chain of actions ties sun → key → frog together." },
      { id: "q7", prompt: "To make a story stickier, you should add...", choices: ["lots of action and funny details", "nothing extra", "very small details", "silence"], answer: 0, explanation: "Action and humor make the story (and the items) unforgettable." },
      { id: "q8", prompt: "The Story Method works best for remembering...", choices: ["a list of items in order", "a single letter", "one color", "nothing"], answer: 0, explanation: "It shines when you need to recall several things in a certain order." },
      { id: "q9", prompt: "When building your story, each new item should connect to the...", choices: ["item right before it", "very last item only", "first item only", "no items"], answer: 0, explanation: "Link each item to the one before it to form an unbroken chain." },
      { id: "q10", prompt: "A weakness of a too-plain story is that it is...", choices: ["easy to forget", "too funny", "too colorful", "too active"], answer: 0, explanation: "Plain, boring stories don't stick — make them wild and exciting!" },
      { id: "q11", prompt: "The Story Method and Picture Power work well together because both use...", choices: ["vivid imagination", "loud noises", "lots of writing", "fast typing"], answer: 0, explanation: "Both rely on strong mental images to make memories stick." },
      { id: "q12", prompt: "If you forget the middle of your list, a story helps because...", choices: ["the story flows from one part to the next", "stories skip the middle", "it has no middle", "you start over"], answer: 0, explanation: "Following the story from the start leads you right to the part you forgot." },
      { id: "q13", prompt: "The first step of the Story Method is to...", choices: ["take your list and start a silly story", "erase your list", "close your book", "count to ten"], answer: 0, explanation: "Begin with the first item and build a funny story that adds each item in turn." },
    ],
  },
];
