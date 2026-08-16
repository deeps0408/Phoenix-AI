// ─────────────────────────────────────────────────────────────
//  Phoenix AI — Gamification Engine
//  XP, Levels, Badges, Streaks, Achievements  (localStorage)
// ─────────────────────────────────────────────────────────────

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;         // emoji
  color: string;        // tailwind color class
  bg: string;
  unlocked: boolean;
  unlockedAt?: number;
  xpReward: number;
}

export interface GameProfile {
  xp: number;
  level: number;
  streak: number;       // consecutive study days
  lastStudyDate: string; // YYYY-MM-DD
  totalMessages: number;
  totalQuizzes: number;
  quizCorrect: number;
  notesSaved: number;
  translationsDone: number;
  badges: Record<string, boolean>; // badgeId → unlocked
  xpHistory: { date: string; xp: number; reason: string }[];
}

const STORAGE_KEY = "phoenix_game_profile";

// ── XP required per level ─────────────────────────────────────
export const XP_PER_LEVEL = 500;

export function levelFromXP(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function xpForNextLevel(xp: number): number {
  const level = levelFromXP(xp);
  return level * XP_PER_LEVEL;
}

export function xpProgress(xp: number): number {
  return (xp % XP_PER_LEVEL) / XP_PER_LEVEL;
}

export const LEVEL_TITLES: Record<number, string> = {
  1: "Curious Spark",
  2: "Eager Learner",
  3: "Knowledge Seeker",
  4: "Scholar",
  5: "Bright Mind",
  6: "Rising Star",
  7: "Trailblazer",
  8: "Champion",
  9: "Luminary",
  10: "Phoenix Master",
};

export function levelTitle(level: number): string {
  return LEVEL_TITLES[Math.min(level, 10)] ?? "Phoenix Legend";
}

// ── Default profile ───────────────────────────────────────────
function defaultProfile(): GameProfile {
  return {
    xp: 0,
    level: 1,
    streak: 0,
    lastStudyDate: "",
    totalMessages: 0,
    totalQuizzes: 0,
    quizCorrect: 0,
    notesSaved: 0,
    translationsDone: 0,
    badges: {},
    xpHistory: [],
  };
}

// ── Read / Write ──────────────────────────────────────────────
export function getProfile(): GameProfile {
  if (typeof window === "undefined") return defaultProfile();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultProfile(), ...JSON.parse(raw) } : defaultProfile();
  } catch {
    return defaultProfile();
  }
}

function saveProfile(p: GameProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

// ── Update study streak ───────────────────────────────────────
function updateStreak(p: GameProfile): GameProfile {
  const today = new Date().toISOString().slice(0, 10);
  if (p.lastStudyDate === today) return p;

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const newStreak = p.lastStudyDate === yesterday ? p.streak + 1 : 1;

  return { ...p, streak: newStreak, lastStudyDate: today };
}

// ── Award XP ──────────────────────────────────────────────────
export type XPReason =
  | "message_sent"
  | "quiz_correct"
  | "quiz_completed"
  | "note_saved"
  | "translation_done"
  | "streak_bonus"
  | "badge_unlock";

const XP_VALUES: Record<XPReason, number> = {
  message_sent: 10,
  quiz_correct: 20,
  quiz_completed: 50,
  note_saved: 5,
  translation_done: 8,
  streak_bonus: 15,
  badge_unlock: 25,
};

export interface XPResult {
  xpEarned: number;
  newBadges: Badge[];
  levelUp: boolean;
  newLevel: number;
  profile: GameProfile;
}

export function awardXP(reason: XPReason, multiplier = 1): XPResult {
  let p = getProfile();
  const prevLevel = levelFromXP(p.xp);
  const xpEarned = XP_VALUES[reason] * multiplier;

  p = updateStreak(p);
  p.xp += xpEarned;
  p.level = levelFromXP(p.xp);

  // Track counts
  if (reason === "message_sent") p.totalMessages++;
  if (reason === "quiz_completed") p.totalQuizzes++;
  if (reason === "note_saved") p.notesSaved++;
  if (reason === "translation_done") p.translationsDone++;
  if (reason === "quiz_correct") p.quizCorrect++;

  // Streak bonus
  if (reason === "message_sent" && p.streak > 1) {
    p.xp += XP_VALUES.streak_bonus;
  }

  p.xpHistory = [
    ...p.xpHistory.slice(-49),
    { date: new Date().toISOString(), xp: xpEarned, reason },
  ];

  // Check badges
  const newBadges = checkAndUnlockBadges(p);
  newBadges.forEach((b) => {
    p.badges[b.id] = true;
    p.xp += b.xpReward;
  });

  p.level = levelFromXP(p.xp);
  saveProfile(p);

  return {
    xpEarned,
    newBadges,
    levelUp: p.level > prevLevel,
    newLevel: p.level,
    profile: p,
  };
}

// ── Badges definition ─────────────────────────────────────────
export const ALL_BADGES: Badge[] = [
  {
    id: "first_message",
    name: "Hello World",
    description: "Send your first message to an AI agent",
    icon: "👋",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    unlocked: false,
    xpReward: 25,
  },
  {
    id: "quiz_master",
    name: "Quiz Master",
    description: "Complete 5 quizzes",
    icon: "🎯",
    color: "text-brand-purple",
    bg: "bg-purple-500/10",
    unlocked: false,
    xpReward: 50,
  },
  {
    id: "perfect_score",
    name: "Perfect Score",
    description: "Get 100% on a quiz",
    icon: "⭐",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    unlocked: false,
    xpReward: 75,
  },
  {
    id: "note_taker",
    name: "Note Taker",
    description: "Save 3 Smart Notes",
    icon: "📝",
    color: "text-green-500",
    bg: "bg-green-500/10",
    unlocked: false,
    xpReward: 30,
  },
  {
    id: "streak_3",
    name: "On a Roll",
    description: "Maintain a 3-day study streak",
    icon: "🔥",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    unlocked: false,
    xpReward: 40,
  },
  {
    id: "streak_7",
    name: "Week Warrior",
    description: "Maintain a 7-day study streak",
    icon: "⚡",
    color: "text-brand-orange",
    bg: "bg-orange-500/10",
    unlocked: false,
    xpReward: 100,
  },
  {
    id: "polyglot",
    name: "Polyglot",
    description: "Use the translator 5 times",
    icon: "🌍",
    color: "text-teal-500",
    bg: "bg-teal-500/10",
    unlocked: false,
    xpReward: 35,
  },
  {
    id: "chatterbox",
    name: "Chatterbox",
    description: "Send 50 messages to AI agents",
    icon: "💬",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    unlocked: false,
    xpReward: 60,
  },
  {
    id: "level_5",
    name: "Bright Mind",
    description: "Reach Level 5",
    icon: "🧠",
    color: "text-brand-blue",
    bg: "bg-blue-500/10",
    unlocked: false,
    xpReward: 100,
  },
  {
    id: "level_10",
    name: "Phoenix Master",
    description: "Reach Level 10",
    icon: "🏆",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    unlocked: false,
    xpReward: 250,
  },
  {
    id: "early_bird",
    name: "Early Bird",
    description: "Study before 8 AM",
    icon: "🌅",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    unlocked: false,
    xpReward: 45,
  },
  {
    id: "resilient",
    name: "Resilient",
    description: "Maintain a 14-day streak",
    icon: "🛡️",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    unlocked: false,
    xpReward: 200,
  },
];

function checkAndUnlockBadges(p: GameProfile): Badge[] {
  const newlyUnlocked: Badge[] = [];
  const hour = new Date().getHours();

  const checks: Array<[string, boolean]> = [
    ["first_message", p.totalMessages >= 1],
    ["quiz_master", p.totalQuizzes >= 5],
    ["perfect_score", p.quizCorrect > 0 && p.totalQuizzes > 0 && (p.quizCorrect / Math.max(p.totalMessages, 1)) >= 0.5],
    ["note_taker", p.notesSaved >= 3],
    ["streak_3", p.streak >= 3],
    ["streak_7", p.streak >= 7],
    ["resilient", p.streak >= 14],
    ["polyglot", p.translationsDone >= 5],
    ["chatterbox", p.totalMessages >= 50],
    ["level_5", levelFromXP(p.xp) >= 5],
    ["level_10", levelFromXP(p.xp) >= 10],
    ["early_bird", hour < 8 && p.totalMessages >= 1],
  ];

  for (const [id, condition] of checks) {
    if (condition && !p.badges[id]) {
      const badge = ALL_BADGES.find((b) => b.id === id);
      if (badge) {
        newlyUnlocked.push({ ...badge, unlocked: true, unlockedAt: Date.now() });
      }
    }
  }

  return newlyUnlocked;
}

export function getBadgesWithStatus(): Badge[] {
  const p = getProfile();
  return ALL_BADGES.map((b) => ({ ...b, unlocked: !!p.badges[b.id] }));
}

// ── Simulated leaderboard ─────────────────────────────────────
export interface LeaderEntry { name: string; xp: number; level: number; streak: number; avatar: string }

export function getLeaderboard(): LeaderEntry[] {
  const p = getProfile();
  const entries: LeaderEntry[] = [
    { name: "You", xp: p.xp, level: p.level, streak: p.streak, avatar: "🧑‍🎓" },
    { name: "Priya S.", xp: 3200, level: 7, streak: 14, avatar: "👩‍🎓" },
    { name: "Arjun K.", xp: 2800, level: 6, streak: 9,  avatar: "🧑‍💻" },
    { name: "Meera T.", xp: 2500, level: 6, streak: 7,  avatar: "👩‍🏫" },
    { name: "Rohan M.", xp: 2100, level: 5, streak: 5,  avatar: "🧑‍🔬" },
    { name: "Ananya P.", xp: 1800, level: 4, streak: 3, avatar: "👩‍🎨" },
    { name: "Dev S.", xp: 1200, level: 3, streak: 2,    avatar: "🧑‍🚀" },
  ].sort((a, b) => b.xp - a.xp);

  return entries.map((e, i) => ({ ...e, rank: i + 1 })) as LeaderEntry[];
}
