"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChatInterface } from "@/components/chat/ChatInterface";
import {
  Timer, Play, Pause, RotateCcw, Plus, CheckCircle2,
  Circle, Flame, Target, TrendingUp, Coffee
} from "lucide-react";
import { getProfile } from "@/lib/gamification";

type PomodoroState = "idle" | "study" | "break";

interface Goal {
  id: string;
  text: string;
  done: boolean;
}

export default function MentorPage() {
  const [tab, setTab] = useState<"planner" | "chat">("planner");
  // Pomodoro
  const [pomState, setPomState] = useState<PomodoroState>("idle");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [cycle, setCycle] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Goals
  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", text: "Complete Math Chapter 5", done: false },
    { id: "2", text: "Read Science notes for 30 min", done: false },
    { id: "3", text: "Practice 10 English grammar exercises", done: false },
  ]);
  const [newGoal, setNewGoal] = useState("");
  // Streak
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const p = getProfile();
    setStreak(p.streak);
  }, []);

  // Pomodoro timer
  useEffect(() => {
    if (pomState === "idle") {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (pomState === "study") {
            setCycle((c) => c + 1);
            setPomState("break");
            return 5 * 60;
          } else {
            setPomState("study");
            return 25 * 60;
          }
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [pomState]);

  const startPomodoro = () => { setPomState("study"); setTimeLeft(25 * 60); };
  const pausePomodoro = () => setPomState("idle");
  const resetPomodoro = () => { setPomState("idle"); setTimeLeft(25 * 60); };

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const toggleGoal = (id: string) =>
    setGoals((prev) => prev.map((g) => g.id === id ? { ...g, done: !g.done } : g));

  const addGoal = () => {
    if (!newGoal.trim()) return;
    setGoals((prev) => [...prev, { id: Date.now().toString(), text: newGoal.trim(), done: false }]);
    setNewGoal("");
  };

  const doneCount = goals.filter((g) => g.done).length;
  const pomProgress = pomState === "study"
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  const STUDY_TIPS = [
    "🧠 Active recall beats re-reading. Quiz yourself after each topic.",
    "⏰ Study in 25-min focused blocks with 5-min breaks (Pomodoro).",
    "📝 Write summaries in your own words — don't just highlight.",
    "🌙 Sleep consolidates memory. Don't sacrifice sleep to study.",
    "🎯 Start with the hardest task when your energy is highest.",
  ];
  const tip = STUDY_TIPS[new Date().getDay() % STUDY_TIPS.length];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-purple">Mentor & Study Planner</h1>
          <p className="text-muted-foreground mt-1">Build habits, track goals, and study smarter.</p>
        </div>
        <div className="flex gap-2">
          <Button variant={tab === "planner" ? "default" : "outline"} size="sm"
            onClick={() => setTab("planner")}
            className={tab === "planner" ? "bg-brand-purple text-white" : ""}>
            <Timer className="w-4 h-4 mr-1" /> Planner
          </Button>
          <Button variant={tab === "chat" ? "default" : "outline"} size="sm"
            onClick={() => setTab("chat")}
            className={tab === "chat" ? "bg-brand-purple text-white" : ""}>
            AI Mentor
          </Button>
        </div>
      </div>

      {tab === "planner" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="space-y-4">
            {/* Streak card */}
            <Card className="border-0 shadow-md bg-gradient-to-br from-brand-orange/10 to-red-500/5">
              <CardContent className="pt-5 flex items-center gap-4">
                <div className="size-14 rounded-2xl bg-brand-orange/10 flex items-center justify-center">
                  <Flame className="w-7 h-7 text-brand-orange" />
                </div>
                <div>
                  <p className="text-3xl font-black text-brand-orange">{streak}</p>
                  <p className="text-sm text-muted-foreground">Day Study Streak 🔥</p>
                </div>
              </CardContent>
            </Card>

            {/* Daily tip */}
            <Card className="border-0 shadow-sm bg-card/60">
              <CardContent className="pt-4 pb-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Today's Tip</p>
                <p className="text-sm leading-relaxed">{tip}</p>
              </CardContent>
            </Card>

            {/* Goal Progress */}
            <Card className="border-0 shadow-md bg-card/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-brand-purple" /> Today's Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">{doneCount} / {goals.length} goals</span>
                  <span className="font-bold">{Math.round((doneCount / Math.max(goals.length, 1)) * 100)}%</span>
                </div>
                <Progress value={(doneCount / Math.max(goals.length, 1)) * 100} className="h-2" />
              </CardContent>
            </Card>
          </div>

          {/* Center: Pomodoro */}
          <div className="space-y-4">
            <Card className="border-0 shadow-lg bg-card/60 backdrop-blur-sm">
              <CardHeader className="pb-2 text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  {pomState === "break" ? <Coffee className="w-5 h-5 text-green-500" /> : <Timer className="w-5 h-5 text-brand-purple" />}
                  {pomState === "break" ? "Break Time!" : "Pomodoro Timer"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                {/* Circle timer */}
                <div className="relative size-40 mx-auto">
                  <svg className="size-40 -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" className="text-muted/30" strokeWidth="8" />
                    <circle
                      cx="60" cy="60" r="54" fill="none"
                      stroke={pomState === "break" ? "#22c55e" : "#8b5cf6"}
                      strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 54}`}
                      strokeDashoffset={`${2 * Math.PI * 54 * (1 - pomProgress / 100)}`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black tabular-nums">{formatTime(timeLeft)}</span>
                    <span className="text-xs text-muted-foreground capitalize">{pomState === "idle" ? "Ready" : pomState}</span>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  {pomState === "idle" ? (
                    <Button onClick={startPomodoro} className="bg-brand-purple hover:bg-brand-purple/90 text-white gap-2">
                      <Play className="w-4 h-4" /> Start Focus
                    </Button>
                  ) : (
                    <Button onClick={pausePomodoro} variant="outline" className="gap-2">
                      <Pause className="w-4 h-4" /> Pause
                    </Button>
                  )}
                  <Button onClick={resetPomodoro} variant="ghost" size="icon">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex justify-center gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className={`size-3 rounded-full ${i < cycle % 4 ? "bg-brand-purple" : "bg-muted"}`} />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{cycle} sessions completed today</p>
              </CardContent>
            </Card>
          </div>

          {/* Right: Goals */}
          <div className="space-y-4">
            <Card className="border-0 shadow-md bg-card/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Target className="w-4 h-4 text-brand-blue" /> Today's Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent/50 transition-colors text-left"
                  >
                    {goal.done
                      ? <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      : <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
                    }
                    <span className={`text-sm ${goal.done ? "line-through text-muted-foreground" : ""}`}>{goal.text}</span>
                  </button>
                ))}
                <div className="flex gap-2 pt-2">
                  <input
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addGoal()}
                    placeholder="Add a goal..."
                    className="flex-1 text-sm px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-brand-purple"
                  />
                  <Button size="sm" onClick={addGoal} className="bg-brand-purple text-white hover:bg-brand-purple/90 px-3">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Weekly targets */}
            <Card className="border-0 shadow-sm bg-card/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Weekly Targets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Study Hours", current: 8, target: 20, color: "bg-brand-blue" },
                  { label: "Quizzes", current: 3, target: 5, color: "bg-brand-purple" },
                  { label: "Notes Saved", current: 2, target: 7, color: "bg-brand-orange" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.current}/{item.target}</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full">
                      <div
                        className={`h-1.5 ${item.color} rounded-full transition-all`}
                        style={{ width: `${(item.current / item.target) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <ChatInterface defaultAgent="Mentor Agent" />
        </div>
      )}
    </div>
  );
}
