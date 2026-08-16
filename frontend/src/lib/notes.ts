export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  agentName?: string;
  timestamp: number;
}

export interface SmartNote {
  id: string;
  title: string;
  topic: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
  agentUsed: string;
}

const STORAGE_KEY = "phoenix_smart_notes";

export function getAllNotes(): SmartNote[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveNote(note: SmartNote): void {
  if (typeof window === "undefined") return;
  const notes = getAllNotes();
  const idx = notes.findIndex((n) => n.id === note.id);
  if (idx >= 0) {
    notes[idx] = note;
  } else {
    notes.unshift(note);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function deleteNote(id: string): void {
  if (typeof window === "undefined") return;
  const notes = getAllNotes().filter((n) => n.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function generateNoteId(): string {
  return `note_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

/** Derive a short title from the first user message */
export function deriveTitleFromMessages(messages: ChatMessage[]): string {
  const firstUser = messages.find((m) => m.role === "user");
  if (!firstUser) return "Study Session";
  const words = firstUser.content.trim().split(/\s+/).slice(0, 8).join(" ");
  return words.length > 60 ? words.slice(0, 57) + "..." : words;
}
