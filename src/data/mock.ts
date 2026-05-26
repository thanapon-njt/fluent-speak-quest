export type ChapterStatus = "locked" | "available" | "in-progress" | "completed";

export type Chapter = {
  id: string;
  title: string;
  emoji: string;
  category: string;
  difficulty: 1 | 2 | 3;
  minutes: number;
  status: ChapterStatus;
  progress: number; // 0-100
  xp: number;
  vocabulary: VocabularyWord[];
  grammar: string[];
  objective: string;
};

export type VocabularyWord = {
  word: string;
  ipa: string;
  meaning: string;
  example: string;
};

export type Scenario = {
  id: string;
  title: string;
  category: "travel" | "work" | "casual" | "interview";
  difficulty: "Easy" | "Medium" | "Hard";
  duration: number;
  tutor: { name: string; emoji: string; accent: string };
  objective: string;
  hints: string[];
};

export const user = {
  name: "Alex Chen",
  level: 12,
  xp: 2840,
  xpToNext: 3200,
  streak: 24,
  speakingMinutes: 187,
  goal: "Work fluency",
  avatar: "🦊",
};

export const chapters: Chapter[] = [
  {
    id: "coffee-shop",
    title: "Coffee Shop",
    emoji: "☕",
    category: "Daily",
    difficulty: 1,
    minutes: 12,
    status: "completed",
    progress: 100,
    xp: 120,
    objective: "Order drinks, ask about the menu, and chat with baristas confidently.",
    vocabulary: [
      { word: "barista", ipa: "/bəˈriːstə/", meaning: "a person who makes coffee", example: "The barista recommended a flat white." },
      { word: "to-go", ipa: "/tuː ɡoʊ/", meaning: "for taking away", example: "I'll have a latte to-go, please." },
      { word: "refill", ipa: "/ˈriːfɪl/", meaning: "additional serving", example: "Can I get a refill on my coffee?" },
      { word: "decaf", ipa: "/ˈdiːkæf/", meaning: "without caffeine", example: "I'd like a decaf cappuccino." },
    ],
    grammar: ["Polite requests with 'Could I...'", "Quantifiers: some, any, a little"],
  },
  {
    id: "airport",
    title: "Airport",
    emoji: "✈️",
    category: "Travel",
    difficulty: 2,
    minutes: 18,
    status: "in-progress",
    progress: 45,
    xp: 180,
    objective: "Navigate check-in, security, and boarding with confidence.",
    vocabulary: [
      { word: "boarding pass", ipa: "/ˈbɔːrdɪŋ pæs/", meaning: "ticket to board the plane", example: "May I see your boarding pass?" },
      { word: "carry-on", ipa: "/ˈkæri ɒn/", meaning: "small bag taken onboard", example: "This is my only carry-on." },
      { word: "gate", ipa: "/ɡeɪt/", meaning: "boarding area", example: "Boarding starts at gate 24." },
      { word: "layover", ipa: "/ˈleɪˌoʊvər/", meaning: "stop between flights", example: "I have a 3-hour layover in Tokyo." },
    ],
    grammar: ["Future with 'will' vs 'going to'", "Modal verbs for permission"],
  },
  {
    id: "office",
    title: "The Office",
    emoji: "💼",
    category: "Work",
    difficulty: 2,
    minutes: 22,
    status: "available",
    progress: 0,
    xp: 220,
    objective: "Lead meetings, give updates, and collaborate with colleagues.",
    vocabulary: [
      { word: "deadline", ipa: "/ˈdɛdlaɪn/", meaning: "due date", example: "The deadline is on Friday." },
      { word: "follow up", ipa: "/ˈfɒloʊ ʌp/", meaning: "to check back", example: "I'll follow up next week." },
      { word: "agenda", ipa: "/əˈdʒɛndə/", meaning: "meeting plan", example: "What's on today's agenda?" },
      { word: "stakeholder", ipa: "/ˈsteɪkˌhoʊldər/", meaning: "person with interest in project", example: "Let's align with the stakeholders." },
    ],
    grammar: ["Present perfect for updates", "Conditional 'if' statements"],
  },
  {
    id: "shopping",
    title: "Shopping Spree",
    emoji: "🛍️",
    category: "Daily",
    difficulty: 1,
    minutes: 15,
    status: "available",
    progress: 0,
    xp: 150,
    objective: "Ask about sizes, prices, and bargain like a local.",
    vocabulary: [
      { word: "fitting room", ipa: "/ˈfɪtɪŋ ruːm/", meaning: "try-on area", example: "Where's the fitting room?" },
      { word: "discount", ipa: "/ˈdɪskaʊnt/", meaning: "price reduction", example: "Is there a discount on these?" },
      { word: "receipt", ipa: "/rɪˈsiːt/", meaning: "proof of purchase", example: "Could I have a receipt?" },
      { word: "in stock", ipa: "/ɪn stɒk/", meaning: "available", example: "Do you have this in stock?" },
    ],
    grammar: ["Comparatives: bigger, more expensive", "Question tags"],
  },
  {
    id: "hotel",
    title: "Hotel Stay",
    emoji: "🏨",
    category: "Travel",
    difficulty: 2,
    minutes: 16,
    status: "locked",
    progress: 0,
    xp: 200,
    objective: "Check in, request services, and resolve issues at hotels.",
    vocabulary: [],
    grammar: [],
  },
  {
    id: "interview",
    title: "Job Interview",
    emoji: "🎯",
    category: "Work",
    difficulty: 3,
    minutes: 30,
    status: "locked",
    progress: 0,
    xp: 350,
    objective: "Answer behavioral questions and showcase your experience.",
    vocabulary: [],
    grammar: [],
  },
  {
    id: "restaurant",
    title: "Restaurant",
    emoji: "🍝",
    category: "Daily",
    difficulty: 1,
    minutes: 14,
    status: "locked",
    progress: 0,
    xp: 140,
    objective: "Order food, ask about ingredients, and pay the bill.",
    vocabulary: [],
    grammar: [],
  },
  {
    id: "doctor",
    title: "At the Doctor",
    emoji: "🩺",
    category: "Daily",
    difficulty: 3,
    minutes: 20,
    status: "locked",
    progress: 0,
    xp: 260,
    objective: "Describe symptoms and understand medical advice.",
    vocabulary: [],
    grammar: [],
  },
];

export const scenarios: Scenario[] = [
  {
    id: "coffee-order",
    title: "Morning Coffee Run",
    category: "casual",
    difficulty: "Easy",
    duration: 5,
    tutor: { name: "Mia", emoji: "👩🏻‍🦰", accent: "American" },
    objective: "Order your favorite drink and chat about the weather.",
    hints: ["Could I get a...?", "Make it to-go, please.", "Have a great day!"],
  },
  {
    id: "airport-checkin",
    title: "Airport Check-in",
    category: "travel",
    difficulty: "Medium",
    duration: 8,
    tutor: { name: "James", emoji: "🧑🏼", accent: "British" },
    objective: "Check in for your flight and handle baggage questions.",
    hints: ["I'd like to check in for...", "Just a carry-on, thanks.", "Window seat, please."],
  },
  {
    id: "standup-meeting",
    title: "Daily Stand-up",
    category: "work",
    difficulty: "Medium",
    duration: 10,
    tutor: { name: "Priya", emoji: "👩🏽", accent: "Indian" },
    objective: "Share your progress, blockers, and next steps.",
    hints: ["Yesterday I...", "Today I'm focusing on...", "I'm blocked on..."],
  },
  {
    id: "job-interview",
    title: "Tech Interview",
    category: "interview",
    difficulty: "Hard",
    duration: 15,
    tutor: { name: "Marcus", emoji: "🧑🏾", accent: "American" },
    objective: "Answer behavioral and experience questions for a software role.",
    hints: ["Tell me about a time when...", "My strength is...", "I'd approach this by..."],
  },
  {
    id: "hotel-checkin",
    title: "Hotel Check-in",
    category: "travel",
    difficulty: "Easy",
    duration: 6,
    tutor: { name: "Sofia", emoji: "👩🏼", accent: "Australian" },
    objective: "Check in, ask about amenities, and request a wake-up call.",
    hints: ["I have a reservation under...", "Is breakfast included?", "Could I get a wake-up call?"],
  },
  {
    id: "small-talk",
    title: "Small Talk at a Party",
    category: "casual",
    difficulty: "Medium",
    duration: 8,
    tutor: { name: "Leo", emoji: "🧑🏻", accent: "Canadian" },
    objective: "Introduce yourself and keep a friendly conversation going.",
    hints: ["How do you know the host?", "What do you do?", "Nice to meet you!"],
  },
];

export const dailyMissions = [
  { id: "m1", title: "Practice 10 minutes of speaking", progress: 6, total: 10, xp: 50, icon: "🎤" },
  { id: "m2", title: "Learn 5 new words", progress: 5, total: 5, xp: 30, icon: "📚", done: true },
  { id: "m3", title: "Complete 1 chapter", progress: 0, total: 1, xp: 80, icon: "🏆" },
  { id: "m4", title: "Have an AI conversation", progress: 0, total: 1, xp: 60, icon: "💬" },
];

export const achievements = [
  { id: "a1", title: "First Words", desc: "Complete your first lesson", emoji: "🌱", earned: true },
  { id: "a2", title: "Streak Master", desc: "Maintain a 7-day streak", emoji: "🔥", earned: true },
  { id: "a3", title: "Chatterbox", desc: "100 minutes of speaking", emoji: "🗣️", earned: true },
  { id: "a4", title: "Globe Trotter", desc: "Complete all travel chapters", emoji: "🌍", earned: false },
  { id: "a5", title: "Word Wizard", desc: "Learn 500 words", emoji: "🪄", earned: false },
  { id: "a6", title: "Fluent Mind", desc: "Reach level 25", emoji: "👑", earned: false },
];

export const reviewItems = {
  words: [
    { word: "deadline", meaning: "due date", lastSeen: "2d ago" },
    { word: "follow up", meaning: "to check back", lastSeen: "3d ago" },
    { word: "agenda", meaning: "meeting plan", lastSeen: "1d ago" },
  ],
  grammar: [
    { topic: "Present perfect", desc: "have/has + past participle", lastSeen: "2d ago" },
    { topic: "Conditional sentences", desc: "If + present, will + verb", lastSeen: "5d ago" },
  ],
  speaking: [
    { scenario: "Daily Stand-up", score: 72, lastSeen: "yesterday" },
    { scenario: "Coffee Order", score: 88, lastSeen: "3d ago" },
  ],
};

export function getChapter(id: string): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}
export function getScenario(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id);
}
