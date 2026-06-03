/**
 * Learn-mode fact cards for each Science activity.
 * Shown before the quiz so kids study the concepts first.
 */

export interface ElementCard {
    symbol: string;
    name: string;
    number: number;
    /** Tailwind gradient classes for the card background */
    gradient: string;
}

export interface LearnItem {
    emoji: string;
    title: string;
    fact: string;
    /** Optional periodic table element card shown above the fact */
    elementCard?: ElementCard;
}

export const SCIENCE_LEARN_ITEMS: Record<string, LearnItem[]> = {
    "sci-animals": [
        { emoji: "🥗", title: "Herbivore", fact: "An animal that eats only plants. Examples: cows, rabbits, and deer." },
        { emoji: "🥩", title: "Carnivore", fact: "An animal that eats only other animals. Examples: lions, sharks, and eagles." },
        { emoji: "🍽️", title: "Omnivore", fact: "An animal that eats both plants and animals. Examples: bears, pigs, and humans!" },
        { emoji: "🐻", title: "Hibernation", fact: "Some animals sleep through the cold winter to save energy — like bears and groundhogs." },
        { emoji: "🐦", title: "Migration", fact: "Some animals travel to warmer places each winter and return in spring, like many birds." },
        { emoji: "🦎", title: "Camouflage", fact: "When an animal's color or pattern blends into its surroundings to hide from predators." },
        { emoji: "🦁", title: "Predator & Prey", fact: "Predators hunt other animals for food. The animal being hunted is called prey." },
        { emoji: "🐬", title: "Mammals", fact: "Mammals are warm-blooded, have hair or fur, and feed milk to their young. Dolphins and bats are mammals!" },
    ],
    "sci-plants": [
        { emoji: "☀️", title: "Photosynthesis", fact: "Plants make their own food using sunlight, water, and carbon dioxide — and release oxygen as a bonus!" },
        { emoji: "🌱", title: "Germination", fact: "When a seed gets water and warmth, it starts to sprout and grow into a new plant." },
        { emoji: "🌸", title: "Pollination", fact: "Bees and other insects carry pollen between flowers, helping plants produce seeds." },
        { emoji: "🌿", title: "Plant Parts", fact: "Roots absorb water. Stems carry water up. Leaves make food using sunlight. Flowers produce seeds." },
        { emoji: "💨", title: "Oxygen & CO₂", fact: "Plants absorb carbon dioxide from the air and release oxygen — the gas we breathe!" },
        { emoji: "🍂", title: "Deciduous vs Evergreen", fact: "Deciduous trees lose their leaves in fall. Evergreen trees keep their leaves all year long." },
        { emoji: "🌵", title: "Desert Plants", fact: "Cactus plants store water in their thick stems to survive long, dry periods in the desert." },
    ],
    "sci-weather": [
        { emoji: "🔄", title: "The Water Cycle", fact: "Water evaporates from oceans and lakes, forms clouds, then falls back to Earth as precipitation — an endless cycle!" },
        { emoji: "♨️", title: "Evaporation", fact: "Heat turns liquid water into water vapor (a gas) that rises invisibly into the air." },
        { emoji: "🫧", title: "Condensation", fact: "Water vapor cools and turns back into tiny liquid droplets — like the drops on the outside of a cold glass." },
        { emoji: "🌧️", title: "Precipitation", fact: "Water falling from clouds is called precipitation. It can be rain, snow, sleet, or hail." },
        { emoji: "☁️", title: "Types of Clouds", fact: "Cumulus = big and puffy. Cirrus = thin and wispy, very high up. Cumulonimbus = giant thunderstorm clouds." },
        { emoji: "🌪️", title: "Tornado vs Hurricane", fact: "Tornadoes are spinning funnels that form over land. Hurricanes are massive storms that form over warm ocean water." },
        { emoji: "🌡️", title: "Meteorologist", fact: "A meteorologist is a scientist who studies weather patterns and makes forecasts." },
    ],
    "sci-states": [
        { emoji: "🧊", title: "Solid", fact: "A solid has a definite shape and size that doesn't change on its own. Example: ice." },
        { emoji: "💧", title: "Liquid", fact: "A liquid has a definite volume but takes the shape of whatever container it's in. Example: water." },
        { emoji: "💨", title: "Gas", fact: "A gas has no fixed shape or volume — it spreads to fill any container. Example: steam." },
        { emoji: "🔥", title: "Melting & Freezing", fact: "Melting: solid → liquid (add heat). Freezing: liquid → solid (remove heat). Water freezes and melts at 0°C / 32°F." },
        { emoji: "☁️", title: "Evaporation & Condensation", fact: "Evaporation: liquid → gas (needs heat). Condensation: gas → liquid (when cooled). Both are part of the water cycle!" },
        { emoji: "⚗️", title: "Boiling Point", fact: "Water boils at 100°C (212°F), turning into steam (gas). Heating up causes particles to move faster." },
        { emoji: "⚛️", title: "Atoms", fact: "Everything is made of tiny particles called atoms — far too small to see without a special microscope." },
    ],
    "sci-body": [
        { emoji: "❤️", title: "Circulatory System", fact: "Your heart pumps blood through a network of blood vessels, delivering oxygen and nutrients to every part of your body." },
        { emoji: "🫁", title: "Respiratory System", fact: "Your lungs breathe in oxygen and breathe out carbon dioxide. You breathe about 20,000 times a day!" },
        { emoji: "🦴", title: "Skeletal System", fact: "Your bones support your body, protect your organs, and help you move. Adults have 206 bones!" },
        { emoji: "🧠", title: "Nervous System", fact: "Your brain and nerves control everything — thinking, moving, and all your senses." },
        { emoji: "🫃", title: "Digestive System", fact: "Your stomach and intestines break food down into nutrients that your body uses for energy and growth." },
        { emoji: "👀", title: "The 5 Senses", fact: "Sight (eyes), Hearing (ears), Smell (nose), Taste (tongue), Touch (skin). Your senses help you experience the world!" },
        { emoji: "💪", title: "Muscles & Tendons", fact: "Muscles make you move by pulling on your bones. Tendons are the tough cords that connect muscles to bones." },
    ],
    "sci-space": [
        { emoji: "🌍", title: "Our Solar System", fact: "8 planets orbit our Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune — in that order." },
        { emoji: "⭐", title: "The Sun", fact: "The Sun is a giant star — our closest one! It's so big that over 1 million Earths could fit inside it." },
        { emoji: "🌀", title: "Day & Night", fact: "Earth spins on its axis once every 24 hours. The side facing the Sun has day; the other side has night." },
        { emoji: "🌕", title: "The Moon", fact: "The Moon is Earth's natural satellite. It orbits Earth about once a month and reflects sunlight — it doesn't glow on its own!" },
        { emoji: "🪐", title: "Famous Planets", fact: "Jupiter = largest planet. Saturn = beautiful rings. Mars = the Red Planet. Mercury = closest to the Sun." },
        { emoji: "☄️", title: "Comets & Asteroids", fact: "Comets are icy chunks with long glowing tails. Asteroids are rocky. Both orbit the Sun." },
        { emoji: "🌌", title: "The Milky Way", fact: "Our galaxy is called the Milky Way — a huge spiral of billions of stars. The Sun is just one of them!" },
    ],
    "sci-magnet": [
        { emoji: "🧲", title: "Magnets", fact: "Magnets attract iron and steel. Every magnet has two ends called poles: a north pole and a south pole." },
        { emoji: "🔄", title: "Magnetic Poles", fact: "Opposite poles attract each other (N+S pull together). Same poles repel each other (N+N push apart)." },
        { emoji: "🌍", title: "Gravity", fact: "Gravity is the invisible force that pulls everything toward Earth. It's why objects fall down when you drop them!" },
        { emoji: "🛑", title: "Friction", fact: "Friction is a force that slows things down when two surfaces rub against each other — like brakes on a bicycle." },
        { emoji: "👐", title: "Push & Pull", fact: "A push moves an object away from you. A pull moves an object toward you. Both are examples of forces." },
        { emoji: "🧭", title: "Earth's Magnetic Field", fact: "Earth itself acts like a giant magnet! A compass needle always points toward Earth's magnetic north pole." },
    ],
    "sci-recycle": [
        { emoji: "☀️", title: "Renewable Energy", fact: "Energy sources that won't run out: solar (sun), wind, and water power. They don't pollute the air!" },
        { emoji: "⛽", title: "Fossil Fuels", fact: "Coal, oil, and natural gas formed from ancient living things over millions of years. They pollute and will eventually run out." },
        { emoji: "♻️", title: "The 3 Rs", fact: "Reduce (use less stuff), Reuse (use something again), Recycle (turn old materials into new ones)." },
        { emoji: "🌱", title: "Composting", fact: "Food scraps and yard waste can be turned into rich soil called compost — it's nature's own recycling system!" },
        { emoji: "🌿", title: "Ecosystem", fact: "An ecosystem is all the living things (plants, animals) and nonliving things (water, soil, air) working together in one area." },
        { emoji: "🐢", title: "Plastic Pollution", fact: "Plastic can take 500+ years to break down in nature and harms ocean animals. Reducing plastic use really helps!" },
        { emoji: "🌳", title: "Trees & Clean Air", fact: "Trees absorb carbon dioxide and release fresh oxygen. Protecting forests is one of the best things we can do for Earth." },
    ],
};
