function question(id, prompt, correctAnswer, wrongAnswers) {
  return { id, question: prompt, correctAnswer, options: [correctAnswer, ...wrongAnswers] };
}

const levelDefinitions = [
  {
    title: "Level 1: Starter Spark",
    description: "Start with basic software and web development ideas.",
    category: "Software",
    difficulty: "Easy",
    points: 10,
    icon: "🚀",
    questions: [
      question("l1-q1", "What is software?", "Instructions that tell a computer what to do", ["Only wires inside a computer", "A type of monitor", "A Wi-Fi password"]),
      question("l1-q2", "What is a bug in code?", "A mistake that causes wrong behavior", ["A new feature", "A design color", "A project deadline"]),
      question("l1-q3", "What does a developer usually do first when an app breaks?", "Read the error message", ["Delete every file", "Guess without checking", "Ignore the problem"]),
      question("l1-q4", "Which file often explains how to run a project?", "README.md", ["photo.png", "music.mp3", "desktop.ini"]),
      question("l1-q5", "Why do we save app data in a database?", "So data can be stored and found later", ["To make buttons bigger", "To hide the UI", "To remove all tests"]),
      question("l1-q6", "What does local development mean?", "Running the app on your own machine", ["Only running in space", "Deleting the server", "Never opening a browser"]),
      question("l1-q7", "What is a variable?", "A named place to store a value", ["A database table only", "A CSS animation", "A broken route"]),
      question("l1-q8", "What is a function?", "Reusable code that performs a task", ["A folder icon", "A database password", "A browser brand"]),
      question("l1-q9", "Why keep beginner code simple?", "So students can read and change it", ["So nobody can understand it", "So setup becomes harder", "So tests cannot run"]),
      question("l1-q10", "What does npm help manage?", "JavaScript packages and scripts", ["Only classroom chairs", "Laptop brightness", "Wi-Fi cables"])
    ]
  },
  {
    title: "Level 2: Web Builder",
    description: "Learn how websites are structured, styled, and made interactive.",
    category: "Software",
    difficulty: "Easy",
    points: 15,
    icon: "🧱",
    questions: [
      question("l2-q1", "What does HTML describe?", "The structure of a web page", ["Database backups", "Server pricing", "Keyboard speed"]),
      question("l2-q2", "What does CSS control?", "Visual style and layout", ["API secrets", "Database indexes", "Hard drive size"]),
      question("l2-q3", "What does JavaScript add to web pages?", "Interactivity and logic", ["Electricity", "Only images", "Printer ink"]),
      question("l2-q4", "What is React mainly used for?", "Building user interfaces with components", ["Replacing SQL", "Creating passwords", "Formatting hard drives"]),
      question("l2-q5", "What is responsive design?", "Design that works on different screen sizes", ["A server that talks", "A database shortcut", "A hidden API key"]),
      question("l2-q6", "What is a component in React?", "A reusable piece of UI", ["A network plug", "A database error", "A Git branch only"]),
      question("l2-q7", "What does a route do in a frontend app?", "Shows the right screen for a URL", ["Changes laptop volume", "Deletes test files", "Stores passwords"]),
      question("l2-q8", "What is Vite?", "A fast frontend development tool", ["A SQL table", "A browser cookie", "A paid API"]),
      question("l2-q9", "What is a prop in React?", "Data passed into a component", ["A database engine", "A command prompt error", "A CSS reset only"]),
      question("l2-q10", "Why use reusable components?", "To avoid repeating UI code", ["To make every page slower", "To hide all content", "To remove navigation"])
    ]
  },
  {
    title: "Level 3: API Adventurer",
    description: "Understand how frontend apps talk to backend APIs.",
    category: "Node.js",
    difficulty: "Easy",
    points: 20,
    icon: "🔌",
    questions: [
      question("l3-q1", "What is an API?", "A way for programs to communicate", ["A monitor cable", "A color palette", "A laptop sticker"]),
      question("l3-q2", "Which HTTP method usually reads data?", "GET", ["PAINT", "MAKE", "STYLE"]),
      question("l3-q3", "Which HTTP method usually creates data?", "POST", ["DRAW", "VIEW", "COLOR"]),
      question("l3-q4", "What format do many APIs return?", "JSON", ["Cardboard", "Chalk", "Wallpaper"]),
      question("l3-q5", "What is Express?", "A Node.js framework for web servers and APIs", ["A design font", "A database file", "A browser theme"]),
      question("l3-q6", "What does a status code like 404 mean?", "The requested resource was not found", ["The quiz is perfect", "The server is painting", "The browser is charging"]),
      question("l3-q7", "What does Axios help with?", "Making HTTP requests from JavaScript", ["Drawing icons", "Installing chairs", "Writing SQL tables automatically"]),
      question("l3-q8", "Why should API errors return messages?", "So the frontend can explain what happened", ["So users stay confused", "So tests cannot read them", "So buttons disappear"]),
      question("l3-q9", "What is request body data?", "Data sent to an API with a request", ["Only CSS classes", "The laptop case", "A database backup"]),
      question("l3-q10", "What is CORS related to?", "Which browser origins can call an API", ["Button shadows", "Database rows", "Screen brightness"])
    ]
  },
  {
    title: "Level 4: Data Keeper",
    description: "Practice the database ideas that power real application state.",
    category: "Software",
    difficulty: "Medium",
    points: 25,
    icon: "🗄️",
    questions: [
      question("l4-q1", "What is SQLite?", "A lightweight file-based SQL database", ["A CSS library", "An image format", "A paid AI API"]),
      question("l4-q2", "What is PostgreSQL?", "A production-ready relational database", ["A React hook", "A browser shortcut", "A design icon"]),
      question("l4-q3", "What is a database table?", "Rows and columns for one kind of data", ["A button animation", "A Vite plugin", "A GitHub profile"]),
      question("l4-q4", "What does INSERT do in SQL?", "Adds a new row", ["Deletes all CSS", "Starts Vite", "Changes a route"]),
      question("l4-q5", "What does SELECT do in SQL?", "Reads data", ["Builds JavaScript", "Draws gradients", "Installs npm"]),
      question("l4-q6", "What is a primary key?", "A unique id for a table row", ["A Tailwind color", "A browser tab", "A React page"]),
      question("l4-q7", "Why use environment variables?", "To configure apps without hardcoding secrets", ["To make code unreadable", "To remove setup", "To disable APIs"]),
      question("l4-q8", "What does a migration usually change?", "Database structure or seed data", ["Monitor brightness", "Student typing speed", "The GitHub logo"]),
      question("l4-q9", "Why not use localStorage as the main database?", "It is browser-specific and easy to lose or change", ["It is a production SQL server", "It runs Express", "It stores all users safely"]),
      question("l4-q10", "What does UNIQUE help prevent?", "Duplicate values where they should not exist", ["Page styling", "API routing", "React rendering"])
    ]
  },
  {
    title: "Level 5: AI Explorer",
    description: "Learn what AI can help with and where careful review matters.",
    category: "AI",
    difficulty: "Medium",
    points: 30,
    icon: "🤖",
    questions: [
      question("l5-q1", "What is generative AI good at?", "Creating text, code, images, or ideas from prompts", ["Guaranteeing every answer is true", "Reading minds", "Replacing all databases"]),
      question("l5-q2", "What is a prompt?", "The instruction or request given to an AI model", ["A CSS class", "A database row", "A server port"]),
      question("l5-q3", "Why should AI output be reviewed?", "AI can make mistakes or miss context", ["AI is always perfect", "AI cannot write code", "AI never changes"]),
      question("l5-q4", "Which prompt is stronger?", "One with clear goal, context, and constraints", ["One with no details", "One with only punctuation", "One that hides the task"]),
      question("l5-q5", "What is hallucination in AI?", "A confident answer that may be false", ["A database backup", "A CSS gradient", "A React route"]),
      question("l5-q6", "What should students do with AI-written code?", "Run it, test it, and understand it", ["Never read it", "Delete the README", "Skip all checks"]),
      question("l5-q7", "What is context in prompting?", "Background information the AI needs", ["A button radius", "A hard drive cable", "A browser logo"]),
      question("l5-q8", "What is one safe AI habit?", "Do not paste private secrets into prompts", ["Share every password", "Ignore licenses", "Never verify facts"]),
      question("l5-q9", "Why ask AI for explanations?", "To learn how the solution works", ["To avoid learning", "To hide bugs", "To remove tests"]),
      question("l5-q10", "What is an AI model?", "A system trained to make predictions or generate outputs", ["A database table only", "A Tailwind class", "A USB cable"])
    ]
  },
  {
    title: "Level 6: Prompt Crafter",
    description: "Write better prompts for coding, debugging, and product building.",
    category: "Vibe Coding",
    difficulty: "Medium",
    points: 35,
    icon: "✨",
    questions: [
      question("l6-q1", "What makes a coding prompt stronger?", "Specific task, files, constraints, and expected result", ["No context", "Only saying fix it", "Random symbols only"]),
      question("l6-q2", "What is iteration?", "Improving through repeated feedback and changes", ["Never changing the first answer", "Only styling text", "Turning off the server"]),
      question("l6-q3", "Why include error messages in a prompt?", "They provide clues for debugging", ["They are decorative", "They hide context", "They replace source code"]),
      question("l6-q4", "What should you ask after AI writes code?", "Explain the changes and how to test them", ["Delete all files", "Hide the output", "Skip reading it"]),
      question("l6-q5", "What does vibe coding still require from the student?", "Judgment, testing, and understanding", ["No thinking", "No review", "No goals"]),
      question("l6-q6", "Which is a useful constraint?", "Use JavaScript, not TypeScript", ["Do anything randomly", "Ignore the repo", "Never run tests"]),
      question("l6-q7", "Why mention the audience in a prompt?", "It helps shape the design and explanation", ["It breaks npm", "It deletes routes", "It hides requirements"]),
      question("l6-q8", "What is a good debugging prompt?", "Includes expected behavior, actual behavior, and errors", ["Only says broken", "Only includes a screenshot name", "Only says hurry"]),
      question("l6-q9", "Why ask for small changes?", "They are easier to review and test", ["They make bugs impossible", "They remove planning", "They hide differences"]),
      question("l6-q10", "What is a useful final request to AI?", "Summarize changes and tests run", ["Forget the work", "Delete README", "Avoid verification"])
    ]
  },
  {
    title: "Level 7: Agent Navigator",
    description: "Understand AI agents, tools, plans, and multi-step work.",
    category: "AI Agents",
    difficulty: "Medium",
    points: 40,
    icon: "🧭",
    questions: [
      question("l7-q1", "What is an AI agent?", "AI that can plan steps and use tools toward a goal", ["Only a calculator", "A CSS file", "A database row"]),
      question("l7-q2", "Why do agents need clear goals?", "To choose useful actions and know when done", ["To make responses longer", "To ignore context", "To avoid tools"]),
      question("l7-q3", "What is a tool call?", "Using an external capability like files, APIs, or commands", ["A button color", "A laptop fan", "A table heading"]),
      question("l7-q4", "What should you review before big agent changes?", "The plan, risk, and files being changed", ["Nothing", "Only the logo", "Only the font size"]),
      question("l7-q5", "Which task fits a coding agent?", "Read code, edit files, run tests, and report results", ["Physically replace a monitor", "Print certificates", "Move classroom desks"]),
      question("l7-q6", "Why should agents report tests?", "So you know what was verified", ["So failures are hidden", "So code is slower", "So docs disappear"]),
      question("l7-q7", "What is autonomy in an agent?", "Ability to take steps without asking for every tiny action", ["Ignoring the user", "Deleting context", "Avoiding goals"]),
      question("l7-q8", "What makes agent work safer?", "Small commits, tests, and clear summaries", ["Huge hidden changes", "No verification", "Secret edits"]),
      question("l7-q9", "Why can agents still make mistakes?", "They may misunderstand context or tool output", ["They are always perfect", "They cannot read text", "They never use files"]),
      question("l7-q10", "What is a good agent instruction?", "Specific, scoped, and testable", ["Vague and huge", "Contradictory", "Missing the goal"])
    ]
  },
  {
    title: "Level 8: Debug Champion",
    description: "Build deeper debugging habits for real development problems.",
    category: "Debugging",
    difficulty: "Hard",
    points: 45,
    icon: "🐛",
    questions: [
      question("l8-q1", "What does a stack trace often show?", "Where an error happened", ["The weather", "The app logo", "Battery percentage"]),
      question("l8-q2", "Why fix one thing at a time?", "It helps identify what solved the problem", ["It hides bugs", "It removes tests", "It changes the database type"]),
      question("l8-q3", "What is a regression?", "A change accidentally breaks something that worked", ["A new badge", "A color palette", "A seed file"]),
      question("l8-q4", "How do tests help debugging?", "They prove expected behavior still works", ["They replace all thinking", "They only style pages", "They hide failures"]),
      question("l8-q5", "What is a minimal reproduction?", "The smallest example that shows the bug", ["A full unrelated app", "A hidden password", "A random color"]),
      question("l8-q6", "Why read logs?", "Logs often reveal what happened before failure", ["Logs are always decoration", "Logs delete bugs", "Logs replace source code"]),
      question("l8-q7", "What is an edge case?", "An unusual input or situation that may break code", ["A page title", "A Git username", "A normal button"]),
      question("l8-q8", "What should happen after a fix?", "Run tests and verify the app", ["Assume it works", "Delete the issue", "Skip the browser"]),
      question("l8-q9", "What does HTTP 500 usually mean?", "The server had an internal error", ["Everything is perfect", "The page is styled", "The user won a badge"]),
      question("l8-q10", "What is a useful debugging note?", "Cause, fix, and verification", ["Only vibes", "Only file names", "Only colors"])
    ]
  },
  {
    title: "Level 9: Product Shaper",
    description: "Connect user needs, interface choices, and useful features.",
    category: "Vibe Coding",
    difficulty: "Hard",
    points: 50,
    icon: "🛠️",
    questions: [
      question("l9-q1", "What makes a feature useful?", "It solves a real user problem", ["It only looks complex", "It has no purpose", "It cannot be tested"]),
      question("l9-q2", "What is a user flow?", "Steps a user takes to complete a goal", ["A CSS gradient", "A database password", "A server crash"]),
      question("l9-q3", "Why is UI feedback important?", "Users know what happened after an action", ["Users become confused", "It slows every click", "It deletes state"]),
      question("l9-q4", "What should a README help with?", "Understanding, installing, running, and modifying the app", ["Hiding commands", "Replacing source code", "Removing setup steps"]),
      question("l9-q5", "Why design for a projector in workshops?", "Text and states must be clear from far away", ["To make text tiny", "To hide contrast", "To avoid spacing"]),
      question("l9-q6", "What is a good empty state?", "Helpful feedback when no data exists", ["A broken screen", "Invisible text", "A server error"]),
      question("l9-q7", "Why keep navigation predictable?", "Users can find features quickly", ["Users get lost", "Routes break", "APIs disappear"]),
      question("l9-q8", "What is polish in UI?", "Clear spacing, readable text, and consistent states", ["Only adding random effects", "Making buttons overlap", "Removing labels"]),
      question("l9-q9", "Why add workshop exercises?", "Students can customize and learn by doing", ["To prevent edits", "To hide source files", "To remove creativity"]),
      question("l9-q10", "What is product thinking?", "Balancing user value, feasibility, and clarity", ["Only adding colors", "Ignoring users", "Never shipping"])
    ]
  },
  {
    title: "Level 10: Campus Champion",
    description: "Finish with advanced questions that combine software, AI, agents, and delivery.",
    category: "AI Agents",
    difficulty: "Hard",
    points: 60,
    icon: "🏆",
    questions: [
      question("l10-q1", "What is the best way to use AI while learning code?", "Collaborate with it and understand the result", ["Let it replace all learning", "Never test output", "Ignore explanations"]),
      question("l10-q2", "Where should production secrets go?", "Environment variables", ["Hardcoded public code", "Screenshots", "CSS comments"]),
      question("l10-q3", "Why separate frontend and backend?", "The UI and data/API logic have different jobs", ["It prevents styling", "It removes routing", "It makes databases impossible"]),
      question("l10-q4", "What makes an app workshop-ready?", "Clear setup, simple code, local database, and useful exercises", ["Only paid services", "No README", "No local run command"]),
      question("l10-q5", "What does level up mean in Campus Quest?", "Learn, build, compete, and improve through practice", ["Stop after one click", "Avoid teamwork", "Never try challenges"]),
      question("l10-q6", "What is a full-stack app?", "An app with frontend and backend parts", ["Only one CSS file", "A single image", "A database without UI"]),
      question("l10-q7", "Why run tests before pushing?", "To catch problems before others pull the code", ["To create bugs", "To delete commits", "To hide failures"]),
      question("l10-q8", "What is deployment?", "Putting an app online for others to use", ["Deleting local files", "Changing only font size", "Turning off APIs"]),
      question("l10-q9", "Why should backend grade quiz answers?", "So users cannot simply award themselves points in the browser", ["So grading is invisible forever", "So questions cannot load", "So CSS is faster"]),
      question("l10-q10", "What is a strong final project habit?", "Document setup, decisions, tests, and limitations", ["Hide instructions", "Skip verification", "Avoid commits"])
    ]
  }
];

export const defaultChallenges = levelDefinitions.map((level) => ({
  title: level.title,
  description: level.description,
  category: level.category,
  difficulty: level.difficulty,
  points: level.points,
  requirements: `Answer 5 randomly selected questions correctly to complete ${level.title.replace(/^Level \d+: /, "")}.`,
  quiz_questions: level.questions
}));

export const defaultBadges = levelDefinitions.map((level) => ({
  name: level.title.replace(/^Level \d+: /, ""),
  description: `Complete ${level.title.replace(/^Level \d+: /, "")} to unlock this level badge.`,
  icon: level.icon,
  requirement_type: "challenge_completion",
  requirement_value: level.title
}));
