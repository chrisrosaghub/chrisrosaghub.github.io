import type { LearnItem } from "@/lib/science-learn-data";

/** One immediate practice question for each concept card, in card order. */
export const PYTHON_PRACTICE_QUESTION_IDS: Record<string, string[]> = {
  "g2-python-commands": ["q3", "q1", "q5", "q6"],
  "g2-python-values": ["q1", "q5", "q6", "q4"],
  "g3-python-variables": ["q1", "q3", "q4", "q5"],
  "g3-python-turtle-loops": ["q2", "q4", "q6", "q3"],
  "g4-python-conditionals": ["q1", "q2", "q3", "q6"],
  "g4-python-loops": ["q1", "q3", "q5", "q6"],
  "g5-python-lists": ["q1", "q2", "q3", "q4"],
  "g5-python-functions": ["q6", "q1", "q2", "q4"],
  "g6-python-dictionaries": ["q1", "q2", "q5", "q6"],
  "g6-python-debugging": ["q1", "q5", "q3", "q6"],
  "g7-python-algorithms": ["q1", "q6", "q2", "q5"],
  "g7-python-comprehensions": ["q1", "q2", "q4", "q6"],
};

export const PYTHON_LEARN_DATA: Record<string, LearnItem[]> = {
  "g2-python-commands": [
    { emoji: "🐍", title: "Python Follows Instructions", fact: "A program is a list of instructions. Python starts at the top and follows each line in order." },
    { emoji: "💬", title: "Print a Message", fact: "print(\"Hello!\") shows Hello! on the screen. Put words inside matching quotation marks." },
    { emoji: "📚", title: "A String of Words", fact: "Programmers call text a string. In Python, strings wear quotation marks so the computer knows they are words." },
    { emoji: "🔍", title: "Tiny Marks Matter", fact: "Parentheses and quotation marks come in matching pairs. Check both ends when a command does not look right." },
  ],
  "g2-python-values": [
    { emoji: "➕", title: "Python Can Calculate", fact: "Python uses + to add, - to subtract, and * to multiply. print(4 + 3) shows 7." },
    { emoji: "🔢", title: "Numbers Need No Quotes", fact: "8 is a number Python can calculate with. \"8\" is a string made from the text character 8." },
    { emoji: "⚖️", title: "Ask If Values Match", fact: "Two equal signs, ==, ask a question. 5 == 5 is True, while 5 == 6 is False." },
    { emoji: "🧠", title: "Predict, Then Check", fact: "Before reading the choices, work out what the code should show. This is called tracing code." },
  ],
  "g3-python-variables": [
    { emoji: "📦", title: "A Named Box", fact: "A variable is like a labeled box. score = 5 stores the value 5 in a box named score." },
    { emoji: "🏷️", title: "Use Clear Names", fact: "Names like student_name and total_stars tell readers what a value means. Variable names cannot contain spaces." },
    { emoji: "🔄", title: "Values Can Change", fact: "If score starts at 3 and later runs score = 4, the newest value is 4." },
    { emoji: "➕", title: "Calculate with Variables", fact: "If age = 8, then age + 1 is 9. Python uses the value stored in the variable." },
  ],
  "g3-python-turtle-loops": [
    { emoji: "🔁", title: "Repeat with a Loop", fact: "A loop repeats a group of instructions. for step in range(3): repeats its indented code three times." },
    { emoji: "🐢", title: "Imagine a Drawing Turtle", fact: "turtle.forward(50) moves ahead. turtle.right(90) turns right. Repeating both can draw a square." },
    { emoji: "0️⃣", title: "Range Starts at Zero", fact: "range(3) produces 0, 1, 2. That is three values, even though the last value is 2." },
    { emoji: "↪️", title: "Indent the Repeated Step", fact: "Indented lines belong to the loop. Python uses these spaces to see which instructions should repeat." },
  ],
  "g4-python-conditionals": [
    { emoji: "🚦", title: "Code Can Choose", fact: "An if statement runs its indented block only when its condition is True." },
    { emoji: "⚖️", title: "Comparison Tools", fact: "> means greater than, < means less than, >= means at least, and == means equal to." },
    { emoji: "🛤️", title: "Otherwise, Use Else", fact: "else provides another path. If the condition is False, Python skips the if block and runs the else block." },
    { emoji: "↪️", title: "Blocks Are Indented", fact: "Every instruction belonging to an if or else block must line up with the same indentation." },
  ],
  "g4-python-loops": [
    { emoji: "🔁", title: "Count Repetitions", fact: "for n in range(4) runs four times with n equal to 0, 1, 2, and 3." },
    { emoji: "🎯", title: "Choose a Starting Number", fact: "range(1, 4) starts at 1 and stops before 4, producing 1, 2, 3." },
    { emoji: "🧮", title: "Build a Running Total", fact: "A loop can update a variable each time. Adding 2 three times changes total from 0 to 2, then 4, then 6." },
    { emoji: "🛑", title: "Break Stops Early", fact: "The break keyword immediately leaves the current loop when a goal has been reached." },
  ],
  "g5-python-lists": [
    { emoji: "📋", title: "One Name, Many Values", fact: "A list stores an ordered collection: colors = [\"red\", \"blue\", \"green\"]." },
    { emoji: "0️⃣", title: "Indexes Start at Zero", fact: "colors[0] is the first item and colors[1] is the second. An index is an item's position." },
    { emoji: "➕", title: "Append an Item", fact: "colors.append(\"yellow\") adds yellow to the end of the existing list." },
    { emoji: "📏", title: "Measure with Len", fact: "len(colors) returns the number of items. An index of -1 selects the final item." },
  ],
  "g5-python-functions": [
    { emoji: "🧰", title: "A Reusable Tool", fact: "A function groups instructions under a name. Define it once, then call it whenever those steps are needed." },
    { emoji: "🏗️", title: "Define with Def", fact: "def greet(name): creates a function. The indented lines underneath are its body." },
    { emoji: "📥", title: "Parameters Receive Values", fact: "In greet(\"Ava\"), the argument \"Ava\" is stored in the parameter name while the function runs." },
    { emoji: "📤", title: "Return a Result", fact: "return sends a value back to the caller. A double function can return n * 2." },
  ],
  "g6-python-dictionaries": [
    { emoji: "🗂️", title: "Look Up by Key", fact: "A dictionary connects keys to values: {\"name\": \"Ava\", \"grade\": 6}. Use a key to find its value." },
    { emoji: "🔑", title: "Keys Are Unique", fact: "student[\"name\"] looks up the value paired with name. Assigning to a key adds or updates that pair." },
    { emoji: "🛟", title: "Get a Safe Default", fact: "data.get(\"score\", 0) returns 0 when score is missing instead of stopping with a KeyError." },
    { emoji: "🔁", title: "Visit Dictionary Data", fact: "for key in data visits each key. data.items() can provide each key and value together." },
  ],
  "g6-python-debugging": [
    { emoji: "🛠️", title: "Bugs Are Clues", fact: "A bug is a mistake in code. Debugging means finding the cause, changing it, and testing again." },
    { emoji: "📍", title: "Read the Error", fact: "Python error messages name the error and usually point near the problem line. Read them before changing code." },
    { emoji: "↪️", title: "Check Structure", fact: "SyntaxError can mean a missing quote or parenthesis. IndentationError means a block's spaces do not line up." },
    { emoji: "🧪", title: "Test Small Examples", fact: "Use one small, known input and predict its result. This makes the first wrong step easier to spot." },
  ],
  "g7-python-algorithms": [
    { emoji: "🧭", title: "Plan Clear Steps", fact: "An algorithm is a precise sequence of steps for solving a problem. Good steps have a clear start, order, and result." },
    { emoji: "🔎", title: "Search One by One", fact: "A linear search checks values in order. In the worst case, finding an item among 1,000 values can take 1,000 checks." },
    { emoji: "⚙️", title: "Use the Right Tool", fact: "max finds the largest value, sum adds values, and a set keeps unique values for fast membership checks." },
    { emoji: "⏱️", title: "Efficiency Matters", fact: "Two algorithms can give the same answer but take different amounts of work. Compare both correctness and effort." },
  ],
  "g7-python-comprehensions": [
    { emoji: "⚙️", title: "Transform a Collection", fact: "[n * 2 for n in nums] creates a new list by doubling every value in nums." },
    { emoji: "🔎", title: "Filter with If", fact: "[n for n in nums if n > 0] creates a list containing only positive values." },
    { emoji: "🔗", title: "Combine Conditions", fact: "and requires both conditions to be True. or requires at least one. not reverses True and False." },
    { emoji: "📖", title: "Choose Readability", fact: "Comprehensions are best for one clear transformation. Use a normal loop when several steps make the logic easier to read." },
  ],
};