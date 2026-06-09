import { notify } from "./notifications";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  hint: string;
  secret?: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "welcome",
    title: "Hello, World",
    description: "Booted up AryaOS",
    icon: "💻",
    hint: "Just show up.",
  },
  {
    id: "terminal",
    title: "Shell Yeah",
    description: "Opened the Terminal",
    icon: "🐚",
    hint: "Every hacker's favourite app lives in the dock.",
  },
  {
    id: "neofetch",
    title: "Show-Off",
    description: "Ran neofetch",
    icon: "🖼️",
    hint: "How do terminal people flex their setup?",
  },
  {
    id: "spotlight",
    title: "Searchlight",
    description: "Summoned the Command Centre",
    icon: "🔍",
    hint: "⌘K on desktop, or the grid icon in the menu bar.",
  },
  {
    id: "minimize",
    title: "Down to the Dock",
    description: "Minimized a window",
    icon: "🪄",
    hint: "The yellow traffic light does something now.",
  },
  {
    id: "all-apps",
    title: "Tour Guide",
    description: "Opened every app",
    icon: "🗺️",
    hint: "Visit all five apps in the dock.",
  },
  {
    id: "wallpaper",
    title: "Redecorator",
    description: "Changed the wallpaper",
    icon: "🎨",
    hint: "Right-click the desktop, or ask the terminal nicely.",
  },
  {
    id: "snake",
    title: "Snake Charmer",
    description: "Scored 10+ in Snake",
    icon: "🐍",
    hint: "There's a game hiding in the Terminal.",
  },
  {
    id: "secrets",
    title: "Snooper",
    description: "Read secrets.txt",
    icon: "🕵️",
    hint: "ls, then look closer.",
  },
  {
    id: "shutdown",
    title: "Power Trip",
    description: "Shut the machine down",
    icon: "🔌",
    hint: "Every computer has an off switch.",
  },
  {
    id: "konami",
    title: "30 Extra Lives",
    description: "Entered the Konami code",
    icon: "🕹️",
    hint: "↑ ↑ ↓ ↓ ...you know the rest.",
    secret: true,
  },
  {
    id: "matrix",
    title: "Red Pill",
    description: "Entered the Matrix",
    icon: "💊",
    hint: "The terminal knows the way. Or wait long enough...",
    secret: true,
  },
  {
    id: "forbidden",
    title: "Told You So",
    description: "Clicked the thing you were told not to click",
    icon: "🚫",
    hint: "Some menu items are labelled for a reason.",
    secret: true,
  },
];

const STORAGE_KEY = "aryaos-achievements";
const APPS_KEY = "aryaos-apps-opened";
export const ACHIEVEMENT_EVENT = "aryaos-achievement";

function readSet(key: string): Set<string> {
  try {
    const raw = window.localStorage.getItem(key);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeSet(key: string, value: Set<string>): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(Array.from(value)));
  } catch {
    // Storage unavailable; achievements simply won't persist.
  }
}

export function getUnlocked(): Set<string> {
  return readSet(STORAGE_KEY);
}

export function isUnlocked(id: string): boolean {
  return getUnlocked().has(id);
}

export function getProgress(): { unlocked: number; total: number } {
  return { unlocked: getUnlocked().size, total: ACHIEVEMENTS.length };
}

export function unlock(id: string): void {
  const achievement = ACHIEVEMENTS.find(a => a.id === id);
  if (!achievement) return;

  const unlocked = getUnlocked();
  if (unlocked.has(id)) return;

  unlocked.add(id);
  writeSet(STORAGE_KEY, unlocked);

  const { unlocked: count, total } = getProgress();
  notify({
    title: `Trophy unlocked ${achievement.icon}`,
    message: `${achievement.title} — ${achievement.description} (${count}/${total})`,
    icon: "🏆",
    duration: 6000,
  });

  window.dispatchEvent(new CustomEvent(ACHIEVEMENT_EVENT, { detail: id }));
}

export function trackAppOpened(windowId: string, totalApps: number): void {
  const opened = readSet(APPS_KEY);
  if (opened.has(windowId)) return;
  opened.add(windowId);
  writeSet(APPS_KEY, opened);
  if (opened.size >= totalApps) {
    unlock("all-apps");
  }
}
