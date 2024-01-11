const initialData = {
  boards: {
    "board-1": {
      id: "board-1",
      name: "Platform Launch",
      columnIds: ["column-1", "column-2", "column-3"],
    },
    "board-2": {
      id: "board-2",
      name: "Marketing Plan",
      columnIds: ["column-4", "column-5", "column-6"],
    },
    "board-3": {
      id: "board-3",
      name: "Roadmap",
      columnIds: ["column-7", "column-8", "column-9"],
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      name: "Todo",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      name: "Doing",
      taskIds: [
        "task-5",
        "task-6",
        "task-7",
        "task-8",
        "task-9",
        "task-10",
        "task-11",
        "task-12",
        "task-13",
        "task-14",
        "task-15",
        "task-16",
      ],
    },
    "column-3": {
      id: "column-3",
      name: "Done",
      taskIds: [
        "task-17",
        "task-18",
        "task-19",
        "task-20",
        "task-21",
        "task-22",
        "task-23",
      ],
    },
    "column-4": {
      id: "column-4",
      name: "Todo",
      taskIds: ["task-24", "task-25", "task-26"],
    },
    "column-5": {
      id: "column-5",
      name: "Doing",
      taskIds: [],
    },
    "column-6": {
      id: "column-6",
      name: "Done",
      taskIds: [],
    },
    "column-7": {
      id: "column-7",
      name: "Now",
      taskIds: ["task-27", "task-28"],
    },
    "column-8": {
      id: "column-8",
      name: "Next",
      taskIds: [],
    },
    "column-9": {
      id: "column-9",
      name: "Later",
      taskIds: [],
    },
  },
  tasks: {
    "task-1": {
      id: "task-1",
      title: "Build UI for onboarding flow",
      description: "",
      statusId: "column-1",
      subtaskIds: ["subtask-1", "subtask-2", "subtask-3"],
    },
    "task-2": {
      id: "task-2",
      title: "Build UI for search",
      description: "",
      statusId: "column-1",
      subtaskIds: ["subtask-4"],
    },
    "task-3": {
      id: "task-3",
      title: "Build settings UI",
      description: "",
      statusId: "column-1",
      subtaskIds: ["subtask-5", "subtask-6"],
    },
    "task-4": {
      id: "task-4",
      title: "QA and test all major user journeys",
      description:
        "Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.",
      statusId: "column-1",
      subtaskIds: ["subtask-7", "subtask-8"],
    },
    "task-5": {
      id: "task-5",
      title: "Design settings and search pages",
      description: "",
      statusId: "column-2",
      subtaskIds: ["subtask-9", "subtask-10", "subtask-11"],
    },
    "task-6": {
      id: "task-6",
      title: "Add account management endpoints",
      description: "",
      statusId: "column-2",
      subtaskIds: ["subtask-12", "subtask-13", "subtask-14"],
    },
    "task-7": {
      id: "task-7",
      title: "Design onboarding flow",
      description: "",
      statusId: "column-2",
      subtaskIds: ["subtask-15", "subtask-16", "subtask-17"],
    },
    "task-8": {
      id: "task-8",
      title: "Add search enpoints",
      description: "",
      statusId: "column-2",
      subtaskIds: ["subtask-18", "subtask-19"],
    },
    "task-9": {
      id: "task-9",
      title: "Add authentication endpoints",
      description: "",
      statusId: "column-2",
      subtaskIds: ["subtask-20", "subtask-21"],
    },
    "task-10": {
      id: "task-10",
      title:
        "Research pricing points of various competitors and trial different business models",
      description:
        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
      statusId: "column-2",
      subtaskIds: ["subtask-22", "subtask-23", "subtask-24"],
    },
    "task-11": {
      id: "task-11",
      title: "Design settings and search pages",
      description: "",
      statusId: "column-2",
      subtaskIds: ["subtask-25", "subtask-26", "subtask-27"],
    },
    "task-12": {
      id: "task-12",
      title: "Add account management endpoints",
      description: "",
      statusId: "column-2",
      subtaskIds: ["subtask-28", "subtask-29", "subtask-30"],
    },
    "task-13": {
      id: "task-13",
      title: "Design onboarding flow",
      description: "",
      statusId: "column-2",
      subtaskIds: ["subtask-31", "subtask-32", "subtask-33"],
    },
    "task-14": {
      id: "task-14",
      title: "Add search enpoints",
      description: "",
      statusId: "column-2",
      subtaskIds: ["subtask-34", "subtask-35"],
    },
    "task-15": {
      id: "task-15",
      title: "Add authentication endpoints",
      description: "",
      statusId: "column-2",
      subtaskIds: ["subtask-36", "subtask-37"],
    },
    "task-16": {
      id: "task-16",
      title:
        "Research pricing points of various competitors and trial different business models",
      description:
        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
      statusId: "column-2",
      subtaskIds: ["subtask-38", "subtask-39", "subtask-40"],
    },
    "task-17": {
      id: "task-17",
      title: "Conduct 5 wireframe tests",
      description:
        "Ensure the layout continues to make sense and we have strong buy-in from potential users.",
      statusId: "column-3",
      subtaskIds: ["subtask-41"],
    },
    "task-18": {
      id: "task-18",
      title: "Create wireframe prototype",
      description:
        "Create a greyscale clickable wireframe prototype to test our asssumptions so far.",
      statusId: "column-3",
      subtaskIds: ["subtask-42"],
    },
    "task-19": {
      id: "task-19",
      title: "Review results of usability tests and iterate",
      description:
        "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
      statusId: "column-3",
      subtaskIds: ["subtask-43", "subtask-44", "subtask-45"],
    },
    "task-20": {
      id: "task-20",
      title:
        "Create paper prototypes and conduct 10 usability tests with potential customers",
      description: "",
      statusId: "column-3",
      subtaskIds: ["subtask-46", "subtask-47"],
    },
    "task-21": {
      id: "task-21",
      title: "Market discovery",
      description:
        "We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.",
      statusId: "column-3",
      subtaskIds: ["subtask-48"],
    },
    "task-22": {
      id: "task-22",
      title: "Competitor analysis",
      description: "",
      statusId: "column-3",
      subtaskIds: ["subtask-49", "subtask-50"],
    },
    "task-23": {
      id: "task-23",
      title: "Research the market",
      description:
        "We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.",
      statusId: "column-3",
      subtaskIds: ["subtask-51", "subtask-52"],
    },
    "task-24": {
      id: "task-24",
      title: "Plan Product Hunt launch",
      description: "",
      statusId: "column-4",
      subtaskIds: [
        "subtask-53",
        "subtask-54",
        "subtask-55",
        "subtask-56",
        "subtask-57",
        "subtask-58",
      ],
    },
    "task-25": {
      id: "task-25",
      title: "Share on Show HN",
      description: "",
      statusId: "column-4",
      subtaskIds: ["subtask-59", "subtask-60", "subtask-61"],
    },
    "task-26": {
      id: "task-26",
      title: "Write launch article to publish on multiple channels",
      description: "",
      statusId: "column-4",
      subtaskIds: ["subtask-62", "subtask-63", "subtask-64", "subtask-65"],
    },
    "task-27": {
      id: "task-27",
      title: "Launch version one",
      description: "",
      statusId: "column-7",
      subtaskIds: ["subtask-66", "subtask-67"],
    },
    "task-28": {
      id: "task-28",
      title: "Review early feedback and plan next steps for roadmap",
      description:
        "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
      statusId: "column-7",
      subtaskIds: ["subtask-68", "subtask-69", "subtask-70"],
    },
  },
  subtasks: {
    "subtask-1": { id: "subtask-1", title: "Sign up page", isCompleted: true },
    "subtask-2": { id: "subtask-2", title: "Sign in page", isCompleted: false },
    "subtask-3": { id: "subtask-3", title: "Welcome page", isCompleted: false },
    "subtask-4": { id: "subtask-4", title: "Search page", isCompleted: false },
    "subtask-5": { id: "subtask-5", title: "Account page", isCompleted: false },
    "subtask-6": { id: "subtask-6", title: "Billing page", isCompleted: false },
    "subtask-7": {
      id: "subtask-7",
      title: "Internal testing",
      isCompleted: false,
    },
    "subtask-8": {
      id: "subtask-8",
      title: "External testing",
      isCompleted: false,
    },
    "subtask-9": {
      id: "subtask-9",
      title: "Settings - Account page",
      isCompleted: true,
    },
    "subtask-10": {
      id: "subtask-10",
      title: "Settings - Billing page",
      isCompleted: true,
    },
    "subtask-11": {
      id: "subtask-11",
      title: "Search page",
      isCompleted: false,
    },
    "subtask-12": {
      id: "subtask-12",
      title: "Upgrade plan",
      isCompleted: true,
    },
    "subtask-13": { id: "subtask-13", title: "Cancel plan", isCompleted: true },
    "subtask-14": {
      id: "subtask-14",
      title: "Update payment method",
      isCompleted: false,
    },
    "subtask-15": {
      id: "subtask-15",
      title: "Sign up page",
      isCompleted: true,
    },
    "subtask-16": {
      id: "subtask-16",
      title: "Sign in page",
      isCompleted: false,
    },
    "subtask-17": {
      id: "subtask-17",
      title: "Welcome page",
      isCompleted: false,
    },
    "subtask-18": {
      id: "subtask-18",
      title: "Add search endpoint",
      isCompleted: true,
    },
    "subtask-19": {
      id: "subtask-19",
      title: "Define search filters",
      isCompleted: false,
    },
    "subtask-20": {
      id: "subtask-20",
      title: "Define user model",
      isCompleted: true,
    },
    "subtask-21": {
      id: "subtask-21",
      title: "Add auth endpoints",
      isCompleted: false,
    },
    "subtask-22": {
      id: "subtask-22",
      title: "Research competitor pricing and business models",
      isCompleted: true,
    },
    "subtask-23": {
      id: "subtask-23",
      title: "Outline a business model that works for our solution",
      isCompleted: false,
    },
    "subtask-24": {
      id: "subtask-24",
      title:
        "Talk to potential customers about our proposed solution and ask for fair price expectancy",
      isCompleted: false,
    },
    "subtask-25": {
      id: "subtask-25",
      title: "Settings - Account page",
      isCompleted: true,
    },
    "subtask-26": {
      id: "subtask-26",
      title: "Settings - Billing page",
      isCompleted: true,
    },
    "subtask-27": {
      id: "subtask-27",
      title: "Search page",
      isCompleted: false,
    },
    "subtask-28": {
      id: "subtask-28",
      title: "Upgrade plan",
      isCompleted: true,
    },
    "subtask-29": { id: "subtask-29", title: "Cancel plan", isCompleted: true },
    "subtask-30": {
      id: "subtask-30",
      title: "Update payment method",
      isCompleted: false,
    },
    "subtask-31": {
      id: "subtask-31",
      title: "Sign up page",
      isCompleted: true,
    },
    "subtask-32": {
      id: "subtask-32",
      title: "Sign in page",
      isCompleted: false,
    },
    "subtask-33": {
      id: "subtask-33",
      title: "Welcome page",
      isCompleted: false,
    },
    "subtask-34": {
      id: "subtask-34",
      title: "Add search endpoint",
      isCompleted: true,
    },
    "subtask-35": {
      id: "subtask-35",
      title: "Define search filters",
      isCompleted: false,
    },
    "subtask-36": {
      id: "subtask-36",
      title: "Define user model",
      isCompleted: true,
    },
    "subtask-37": {
      id: "subtask-37",
      title: "Add auth endpoints",
      isCompleted: false,
    },
    "subtask-38": {
      id: "subtask-38",
      title: "Research competitor pricing and business models",
      isCompleted: true,
    },
    "subtask-39": {
      id: "subtask-39",
      title: "Outline a business model that works for our solution",
      isCompleted: false,
    },
    "subtask-40": {
      id: "subtask-40",
      title:
        "Talk to potential customers about our proposed solution and ask for fair price expectancy",
      isCompleted: false,
    },
    "subtask-41": {
      id: "subtask-41",
      title: "Complete 5 wireframe prototype tests",
      isCompleted: true,
    },
    "subtask-42": {
      id: "subtask-42",
      title: "Create clickable wireframe prototype in Balsamiq",
      isCompleted: true,
    },
    "subtask-43": {
      id: "subtask-43",
      title: "Meet to review notes from previous tests and plan changes",
      isCompleted: true,
    },
    "subtask-44": {
      id: "subtask-44",
      title: "Make changes to paper prototypes",
      isCompleted: true,
    },
    "subtask-45": {
      id: "subtask-45",
      title: "Conduct 5 usability tests",
      isCompleted: true,
    },
    "subtask-46": {
      id: "subtask-46",
      title: "Create paper prototypes for version one",
      isCompleted: true,
    },
    "subtask-47": {
      id: "subtask-47",
      title: "Complete 10 usability tests",
      isCompleted: true,
    },
    "subtask-48": {
      id: "subtask-48",
      title: "Interview 10 prospective customers",
      isCompleted: true,
    },
    "subtask-49": {
      id: "subtask-49",
      title: "Find direct and indirect competitors",
      isCompleted: true,
    },
    "subtask-50": {
      id: "subtask-50",
      title: "SWOT analysis for each competitor",
      isCompleted: true,
    },
    "subtask-51": {
      id: "subtask-51",
      title: "Write up research analysis",
      isCompleted: true,
    },
    "subtask-52": {
      id: "subtask-52",
      title: "Calculate TAM",
      isCompleted: true,
    },
    "subtask-53": {
      id: "subtask-53",
      title: "Find hunter",
      isCompleted: false,
    },
    "subtask-54": {
      id: "subtask-54",
      title: "Gather assets",
      isCompleted: false,
    },
    "subtask-55": {
      id: "subtask-55",
      title: "Draft product page",
      isCompleted: false,
    },
    "subtask-56": {
      id: "subtask-56",
      title: "Notify customers",
      isCompleted: false,
    },
    "subtask-57": {
      id: "subtask-57",
      title: "Notify network",
      isCompleted: false,
    },
    "subtask-58": { id: "subtask-58", title: "Launch!", isCompleted: false },
    "subtask-59": {
      id: "subtask-59",
      title: "Draft out HN post",
      isCompleted: false,
    },
    "subtask-60": {
      id: "subtask-60",
      title: "Get feedback and refine",
      isCompleted: false,
    },
    "subtask-61": {
      id: "subtask-61",
      title: "Publish post",
      isCompleted: false,
    },
    "subtask-62": {
      id: "subtask-62",
      title: "Write article",
      isCompleted: false,
    },
    "subtask-63": {
      id: "subtask-63",
      title: "Publish on LinkedIn",
      isCompleted: false,
    },
    "subtask-64": {
      id: "subtask-64",
      title: "Publish on Inndie Hackers",
      isCompleted: false,
    },
    "subtask-65": {
      id: "subtask-65",
      title: "Publish on Medium",
      isCompleted: false,
    },
    "subtask-66": {
      id: "subtask-66",
      title: "Launch privately to our waitlist",
      isCompleted: false,
    },
    "subtask-67": {
      id: "subtask-67",
      title: "Launch publicly on PH, HN, etc.",
      isCompleted: false,
    },
    "subtask-68": {
      id: "subtask-68",
      title: "Interview 10 customers",
      isCompleted: false,
    },
    "subtask-69": {
      id: "subtask-69",
      title: "Review common customer pain points and suggestions",
      isCompleted: false,
    },
    "subtask-70": {
      id: "subtask-70",
      title: "Outline next steps for our roadmap",
      isCompleted: false,
    },
  },
};

export default initialData;
