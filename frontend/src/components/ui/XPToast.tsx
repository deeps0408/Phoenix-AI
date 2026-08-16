"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Trophy } from "lucide-react";

interface XPToastProps {
  xp: number;
  reason?: string;
  levelUp?: boolean;
  newLevel?: number;
  badgeName?: string;
  onDone?: () => void;
}

export function XPToast({ xp, reason, levelUp, newLevel, badgeName, onDone }: XPToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDone?.(), 300);
    }, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-[999] flex flex-col gap-2 pointer-events-none"
        >
          {/* XP pill */}
          <motion.div
            initial={{ x: 40 }}
            animate={{ x: 0 }}
            className="flex items-center gap-2 bg-brand-orange text-white px-4 py-2 rounded-full shadow-lg shadow-orange-500/30 font-bold text-sm"
          >
            <Zap className="w-4 h-4" />
            +{xp} XP {reason ? `· ${reason}` : ""}
          </motion.div>

          {/* Level up */}
          {levelUp && (
            <motion.div
              initial={{ x: 40, delay: 0.1 }}
              animate={{ x: 0 }}
              className="flex items-center gap-2 bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-full shadow-lg font-bold text-sm"
            >
              <Trophy className="w-4 h-4" />
              Level Up! You're now Level {newLevel} 🎉
            </motion.div>
          )}

          {/* Badge unlock */}
          {badgeName && (
            <motion.div
              initial={{ x: 40 }}
              animate={{ x: 0 }}
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg font-bold text-sm"
            >
              🏅 Badge Unlocked: {badgeName}!
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Toast Queue Manager ────────────────────────────────────────
interface ToastItem {
  id: string;
  xp: number;
  reason?: string;
  levelUp?: boolean;
  newLevel?: number;
  badgeName?: string;
}

let _listeners: Array<(items: ToastItem[]) => void> = [];
let _queue: ToastItem[] = [];

export function showXPToast(item: Omit<ToastItem, "id">) {
  const newItem = { ...item, id: Math.random().toString(36).slice(2) };
  _queue = [..._queue, newItem];
  _listeners.forEach((l) => l([..._queue]));
}

export function XPToastContainer() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const listener = (q: ToastItem[]) => setItems([...q]);
    _listeners.push(listener);
    return () => { _listeners = _listeners.filter((l) => l !== listener); };
  }, []);

  const remove = (id: string) => {
    _queue = _queue.filter((i) => i.id !== id);
    setItems([..._queue]);
  };

  // Show only the latest item
  const current = items[0];
  if (!current) return null;

  return (
    <XPToast
      key={current.id}
      xp={current.xp}
      reason={current.reason}
      levelUp={current.levelUp}
      newLevel={current.newLevel}
      badgeName={current.badgeName}
      onDone={() => remove(current.id)}
    />
  );
}
