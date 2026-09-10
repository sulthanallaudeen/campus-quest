export const defaultChallenges = [
  {
    title: "Build Your First React Component",
    description: "Create a reusable React component that displays a student name, department, and quest level.",
    category: "React",
    difficulty: "Easy",
    points: 10,
    requirements: "Use props, render at least three fields, and style the component so it looks clean."
  },
  {
    title: "Create a Responsive Student Card",
    description: "Design a student profile card that adapts nicely from mobile screens to projector displays.",
    category: "UI/UX",
    difficulty: "Easy",
    points: 15,
    requirements: "Include name, department, points, and a visual accent. Test it at small and large widths."
  },
  {
    title: "Fix the JavaScript Bug",
    description: "Find and fix a broken JavaScript function that calculates total challenge points.",
    category: "JavaScript",
    difficulty: "Medium",
    points: 20,
    requirements: "Explain the bug, fix the function, and test it with at least three inputs."
  },
  {
    title: "Create Your First REST API",
    description: "Build an Express route that returns JSON data for a simple campus resource.",
    category: "Node.js",
    difficulty: "Medium",
    points: 30,
    requirements: "Create a GET endpoint, return valid JSON, and test it in the browser or API client."
  },
  {
    title: "Improve an AI Prompt",
    description: "Rewrite a vague prompt into a clearer prompt that gives better coding assistance.",
    category: "AI",
    difficulty: "Easy",
    points: 15,
    requirements: "Include context, goal, constraints, and the desired output format."
  },
  {
    title: "Add Dark Mode",
    description: "Add a polished dark theme to a small interface without hurting readability.",
    category: "UI/UX",
    difficulty: "Medium",
    points: 20,
    requirements: "Use accessible contrast, consistent colors, and visible focus states."
  },
  {
    title: "Connect React to an API",
    description: "Fetch data from an Express endpoint and render it inside a React page.",
    category: "React",
    difficulty: "Medium",
    points: 30,
    requirements: "Use Axios, handle loading and error states, and render the returned data."
  },
  {
    title: "Create a SQLite Table",
    description: "Write SQL that creates a table for storing workshop ideas.",
    category: "Node.js",
    difficulty: "Medium",
    points: 25,
    requirements: "Include an id, title, description, and created_at field."
  },
  {
    title: "Fix a Node API Error",
    description: "Debug an Express endpoint that returns the wrong status code or payload.",
    category: "Debugging",
    difficulty: "Medium",
    points: 25,
    requirements: "Identify the cause, fix it, and show the corrected response."
  },
  {
    title: "Build Your Own Feature",
    description: "Invent and implement one small feature that would make Campus Quest more exciting.",
    category: "JavaScript",
    difficulty: "Hard",
    points: 50,
    requirements: "Plan the feature, build it, and explain how another student can try it."
  }
];

export const defaultBadges = [
  {
    name: "First Launch",
    description: "Complete your first challenge.",
    icon: "🚀",
    requirement_type: "completed_count",
    requirement_value: "1"
  },
  {
    name: "On Fire",
    description: "Complete 3 challenges.",
    icon: "🔥",
    requirement_type: "completed_count",
    requirement_value: "3"
  },
  {
    name: "Code Warrior",
    description: "Complete 5 coding challenges.",
    icon: "💻",
    requirement_type: "coding_count",
    requirement_value: "5"
  },
  {
    name: "AI Explorer",
    description: "Complete at least 1 AI challenge.",
    icon: "🤖",
    requirement_type: "category",
    requirement_value: "AI"
  },
  {
    name: "Bug Hunter",
    description: "Complete at least 1 debugging challenge.",
    icon: "🐛",
    requirement_type: "category",
    requirement_value: "Debugging"
  },
  {
    name: "Campus Champion",
    description: "Reach 100 points.",
    icon: "🏆",
    requirement_type: "points",
    requirement_value: "100"
  }
];
