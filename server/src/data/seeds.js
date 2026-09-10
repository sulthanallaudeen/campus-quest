export const defaultChallenges = [
  {
    title: "Level 1: Starter Spark",
    description: "Begin your Campus Quest by learning the core ideas behind software, AI, and coding with assistance.",
    category: "Software",
    difficulty: "Easy",
    points: 10,
    requirements: "Answer all 5 quiz questions correctly to complete Starter Spark.",
    quiz_questions: [
      { question: "What is software?", options: ["Instructions that tell a computer what to do", "Only the physical parts of a computer", "A type of battery", "A network cable"], correctIndex: 0 },
      { question: "Which language is commonly used to build interactive web pages?", options: ["JavaScript", "HTML Battery", "PaintScript", "Cable++"], correctIndex: 0 },
      { question: "What does a bug mean in software?", options: ["A mistake or problem in the code", "A new feature", "A project folder", "A computer screen"], correctIndex: 0 },
      { question: "What is a frontend?", options: ["The part of an app users see and use", "Only the database", "Only the server room", "A password manager"], correctIndex: 0 },
      { question: "Why do developers test code?", options: ["To check that it behaves correctly", "To make files larger", "To hide errors", "To delete documentation"], correctIndex: 0 }
    ]
  },
  {
    title: "Level 2: Web Builder",
    description: "Explore the building blocks of websites and how browsers turn code into interfaces.",
    category: "Software",
    difficulty: "Easy",
    points: 15,
    requirements: "Answer all 5 quiz questions correctly to complete Web Builder.",
    quiz_questions: [
      { question: "What does HTML mainly describe?", options: ["Page structure", "Database backups", "Server memory", "Image compression only"], correctIndex: 0 },
      { question: "What does CSS mainly control?", options: ["Visual styling and layout", "SQL passwords", "API hosting bills", "Keyboard hardware"], correctIndex: 0 },
      { question: "What is React used for?", options: ["Building user interfaces with components", "Replacing electricity", "Designing CPUs", "Storing SQLite files only"], correctIndex: 0 },
      { question: "What is a component?", options: ["A reusable piece of UI", "A broken link", "A secret token", "A browser error only"], correctIndex: 0 },
      { question: "What does responsive design mean?", options: ["The UI works well on different screen sizes", "The app answers emails", "The database talks loudly", "The server changes color"], correctIndex: 0 }
    ]
  },
  {
    title: "Level 3: API Adventurer",
    description: "Learn how clients and servers communicate through REST APIs.",
    category: "Node.js",
    difficulty: "Easy",
    points: 20,
    requirements: "Answer all 5 quiz questions correctly to complete API Adventurer.",
    quiz_questions: [
      { question: "What is an API?", options: ["A way for programs to communicate", "A laptop charger", "A design color", "A screen size"], correctIndex: 0 },
      { question: "Which HTTP method is commonly used to read data?", options: ["GET", "PUSH", "MAKE", "DRAW"], correctIndex: 0 },
      { question: "Which HTTP method is commonly used to create data?", options: ["POST", "VIEW", "OPEN", "STYLE"], correctIndex: 0 },
      { question: "What format do many REST APIs return?", options: ["JSON", "Chalk", "Plastic", "Binary posters only"], correctIndex: 0 },
      { question: "What does Express help you build?", options: ["Node.js web servers and APIs", "Phone screens", "Vector logos only", "Laptop keyboards"], correctIndex: 0 }
    ]
  },
  {
    title: "Level 4: Data Keeper",
    description: "Understand how applications store real data in databases instead of only in the browser.",
    category: "Software",
    difficulty: "Medium",
    points: 25,
    requirements: "Answer all 5 quiz questions correctly to complete Data Keeper.",
    quiz_questions: [
      { question: "What is a database used for?", options: ["Storing and organizing app data", "Only changing button colors", "Making speakers louder", "Charging a phone"], correctIndex: 0 },
      { question: "What kind of database is SQLite?", options: ["A lightweight file-based SQL database", "A paid AI model", "A CSS framework", "A browser tab"], correctIndex: 0 },
      { question: "What is a table?", options: ["Rows and columns for one type of data", "A React animation", "A network cable", "A browser plugin"], correctIndex: 0 },
      { question: "What does SQL help you do?", options: ["Query and change database data", "Draw icons", "Record audio", "Compile CSS only"], correctIndex: 0 },
      { question: "Why should Campus Quest store points in the backend database?", options: ["So real app data is shared and persistent", "So each browser invents its own score", "So data disappears on refresh", "So APIs are unnecessary"], correctIndex: 0 }
    ]
  },
  {
    title: "Level 5: AI Explorer",
    description: "Learn what AI can do, where it helps, and why human judgment still matters.",
    category: "AI",
    difficulty: "Medium",
    points: 30,
    requirements: "Answer all 5 quiz questions correctly to complete AI Explorer.",
    quiz_questions: [
      { question: "What is generative AI good at?", options: ["Creating text, code, images, or ideas from prompts", "Reading minds perfectly", "Guaranteeing every answer is true", "Replacing all databases"], correctIndex: 0 },
      { question: "What is a prompt?", options: ["The instruction or request given to an AI model", "A CSS class", "A database row", "A server port"], correctIndex: 0 },
      { question: "Why should AI answers be checked?", options: ["AI can make mistakes or miss context", "AI is always offline", "AI cannot write text", "AI only works on paper"], correctIndex: 0 },
      { question: "Which prompt is usually better?", options: ["One with clear goal, context, and constraints", "One with no details", "One with only punctuation", "One that hides the task"], correctIndex: 0 },
      { question: "What is one responsible use of AI in coding?", options: ["Ask for help, review output, and understand changes", "Paste anything without reading", "Ignore bugs", "Delete tests"], correctIndex: 0 }
    ]
  },
  {
    title: "Level 6: Prompt Crafter",
    description: "Practice turning rough ideas into useful prompts for coding and learning.",
    category: "Vibe Coding",
    difficulty: "Medium",
    points: 35,
    requirements: "Answer all 5 quiz questions correctly to complete Prompt Crafter.",
    quiz_questions: [
      { question: "What makes a coding prompt stronger?", options: ["Specific task, files, constraints, and expected result", "No context", "Only saying fix it", "Random emojis only"], correctIndex: 0 },
      { question: "In vibe coding, what should you still do yourself?", options: ["Review, test, and understand the code", "Avoid reading code", "Skip running the app", "Never ask questions"], correctIndex: 0 },
      { question: "What is a useful follow-up after AI writes code?", options: ["Ask it to explain the changes and run tests", "Close the editor", "Delete package.json", "Rename every file"], correctIndex: 0 },
      { question: "Why give the AI error messages?", options: ["They provide clues for debugging", "They are decorative", "They slow down fixing", "They replace source code"], correctIndex: 0 },
      { question: "What is iteration?", options: ["Improving through repeated feedback and changes", "Never changing the first answer", "Only writing CSS", "Turning off the server"], correctIndex: 0 }
    ]
  },
  {
    title: "Level 7: Agent Navigator",
    description: "Meet AI agents and learn how they plan, use tools, and complete multi-step tasks.",
    category: "AI Agents",
    difficulty: "Medium",
    points: 40,
    requirements: "Answer all 5 quiz questions correctly to complete Agent Navigator.",
    quiz_questions: [
      { question: "What is an AI agent?", options: ["AI that can plan steps and use tools toward a goal", "Only a calculator", "A CSS file", "A database table"], correctIndex: 0 },
      { question: "Why do agents need clear goals?", options: ["To choose useful actions and know when done", "To make responses longer", "To avoid using context", "To ignore tools"], correctIndex: 0 },
      { question: "What is a tool call?", options: ["When an agent uses an external capability like files or APIs", "A button color", "A laptop fan", "A table heading"], correctIndex: 0 },
      { question: "What should you do before letting an agent make big changes?", options: ["Review the plan and understand the risk", "Never read anything", "Delete backups", "Disable tests"], correctIndex: 0 },
      { question: "Which task fits an AI coding agent?", options: ["Read code, edit files, run tests, and report results", "Physically replace a monitor", "Print certificates", "Install furniture"], correctIndex: 0 }
    ]
  },
  {
    title: "Level 8: Debug Champion",
    description: "Build debugging instincts for reading errors, finding causes, and validating fixes.",
    category: "Debugging",
    difficulty: "Hard",
    points: 45,
    requirements: "Answer all 5 quiz questions correctly to complete Debug Champion.",
    quiz_questions: [
      { question: "What is the first useful step when you see an error?", options: ["Read the exact error message", "Guess randomly", "Delete the project", "Change every file"], correctIndex: 0 },
      { question: "What does a stack trace often show?", options: ["Where the error happened", "The weather", "The app logo", "Battery percentage"], correctIndex: 0 },
      { question: "Why fix one thing at a time?", options: ["It helps identify what actually solved the problem", "It makes bugs invisible", "It removes all tests", "It changes the database type"], correctIndex: 0 },
      { question: "What does regression mean?", options: ["A change accidentally breaks something that worked before", "A new badge", "A color palette", "A database seed"], correctIndex: 0 },
      { question: "How do tests help debugging?", options: ["They prove expected behavior still works", "They replace all thinking", "They only style the page", "They hide failures"], correctIndex: 0 }
    ]
  },
  {
    title: "Level 9: Product Shaper",
    description: "Think like a builder by connecting user needs, UI decisions, and working features.",
    category: "Vibe Coding",
    difficulty: "Hard",
    points: 50,
    requirements: "Answer all 5 quiz questions correctly to complete Product Shaper.",
    quiz_questions: [
      { question: "What makes a feature useful?", options: ["It solves a real user problem", "It only looks complex", "It has no clear purpose", "It is impossible to test"], correctIndex: 0 },
      { question: "Why keep workshop code simple?", options: ["Students can read, run, and modify it", "To hide all logic", "To require paid APIs", "To block local development"], correctIndex: 0 },
      { question: "What is a user flow?", options: ["The steps a user takes to complete a goal", "A CSS gradient", "A database password", "A server crash"], correctIndex: 0 },
      { question: "Why is feedback important in UI?", options: ["Users know what happened after an action", "Users become confused", "It slows every click", "It deletes state"], correctIndex: 0 },
      { question: "What should a good README help with?", options: ["Understanding, installing, running, and modifying the app", "Hiding commands", "Replacing source code", "Removing setup steps"], correctIndex: 0 }
    ]
  },
  {
    title: "Level 10: Campus Champion",
    description: "Complete the final level by combining software, AI, agents, testing, and product thinking.",
    category: "AI Agents",
    difficulty: "Hard",
    points: 60,
    requirements: "Answer all 5 quiz questions correctly to become a Campus Champion.",
    quiz_questions: [
      { question: "What is the best way to use AI while learning code?", options: ["Collaborate with it and understand the result", "Let it replace all learning", "Never test output", "Ignore explanations"], correctIndex: 0 },
      { question: "What should production secrets use?", options: ["Environment variables", "Hardcoded public code", "Screenshots", "CSS comments"], correctIndex: 0 },
      { question: "Why separate frontend and backend?", options: ["The UI and data/API logic have different jobs", "It prevents all styling", "It removes routing", "It makes databases impossible"], correctIndex: 0 },
      { question: "What makes an app workshop-ready?", options: ["Clear setup, simple code, local database, and useful exercises", "Only paid services", "No README", "No local run command"], correctIndex: 0 },
      { question: "What does level up mean in Campus Quest?", options: ["Learn, build, compete, and improve through practice", "Stop after one click", "Avoid teamwork", "Never try challenges"], correctIndex: 0 }
    ]
  }
];

export const defaultBadges = defaultChallenges.map((challenge, index) => ({
  name: challenge.title.replace(/^Level \d+: /, ""),
  description: `Complete ${challenge.title.replace(/^Level \d+: /, "")} to unlock this level badge.`,
  icon: ["🚀", "🧱", "🔌", "🗄️", "🤖", "✨", "🧭", "🐛", "🛠️", "🏆"][index],
  requirement_type: "challenge_completion",
  requirement_value: challenge.title
}));
