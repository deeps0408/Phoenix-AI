"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChatInterface } from "@/components/chat/ChatInterface";
import {
  Calendar, CheckCircle2, Circle, Clock, BookOpen,
  Zap, Target, AlertTriangle
} from "lucide-react";

const SUBJECTS = ["Mathematics", "Science", "English", "History", "Geography", "Hindi", "Computer Science"];

interface Task {
  id: string;
  day: number;
  subject: string;
  task: string;
  done: boolean;
}

const SAMPLE_TASKS: Task[] = [
  { id: "1", day: 1, subject: "Mathematics", task: "Revise Chapter 3: Fractions (NCERT)", done: false },
  { id: "2", day: 1, subject: "Mathematics", task: "Solve 15 practice problems", done: false },
  { id: "3", day: 1, subject: "Science", task: "Read notes on Photosynthesis", done: false },
  { id: "4", day: 2, subject: "English", task: "Complete grammar exercises (Page 45-48)", done: false },
  { id: "5", day: 2, subject: "Science", task: "Watch 3Blue1Brown video on Cell Division", done: false },
  { id: "6", day: 3, subject: "History", task: "Summarise WWI causes in your own words", done: false },
  { id: "7", day: 3, subject: "Mathematics", task: "Practice 20 algebra equations", done: false },
];

export default function CatchUpPage() {
  const [missedDays, setMissedDays] = useState(3);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(["Mathematics", "Science"]);
  const [tasks, setTasks] = useState<Task[]>(SAMPLE_TASKS);
  const [activeTab, setActiveTab] = useState<"planner" | "chat">("planner");

  const completedCount = tasks.filter((t) => t.done).length;
  const progress = Math.round((completedCount / tasks.length) * 100);

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  };

  const toggleSubject = (s: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const tasksByDay = Array.from({ length: missedDays }, (_, i) =>
    tasks.filter((t) => t.day === i + 1)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-blue">Catch-Up Planner</h1>
          <p className="text-muted-foreground mt-1">Recover missed learning with a personalised roadmap.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={activeTab === "planner" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("planner")}
            className={activeTab === "planner" ? "bg-brand-blue text-white" : ""}
          >
            <Calendar className="w-4 h-4 mr-1" /> Recovery Plan
          </Button>
          <Button
            variant={activeTab === "chat" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("chat")}
            className={activeTab === "chat" ? "bg-brand-blue text-white" : ""}
          >
            <BookOpen className="w-4 h-4 mr-1" /> AI Planner
          </Button>
        </div>
      </div>

      {activeTab === "planner" ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Config panel */}
          <div className="space-y-4">
            <Card className="border-0 shadow-md bg-card/60 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-brand-orange" /> Recovery Setup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Days Missed: <span className="text-brand-orange font-bold">{missedDays}</span></label>
                  <input
                    type="range" min={1} max={30} value={missedDays}
                    onChange={(e) => setMissedDays(+e.target.value)}
                    className="w-full accent-brand-orange"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1 day</span><span>30 days</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Affected Subjects</label>
                  <div className="flex flex-wrap gap-2">
                    {SUBJECTS.map((s) => (
                      <button
                        key={s}
                        onClick={() => toggleSubject(s)}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                          selectedSubjects.includes(s)
                            ? "bg-brand-blue text-white border-brand-blue"
                            : "border-border hover:border-brand-blue/50 text-muted-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress card */}
            <Card className="border-0 shadow-md bg-gradient-to-br from-brand-blue/10 to-brand-purple/10">
              <CardContent className="pt-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm">Recovery Progress</span>
                  <Badge className="bg-brand-blue/10 text-brand-blue border-brand-blue/20">{progress}%</Badge>
                </div>
                <Progress value={progress} className="h-3 mb-2" />
                <p className="text-xs text-muted-foreground">{completedCount} of {tasks.length} tasks done</p>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-brand-orange" />
                  <span className="text-muted-foreground">Est. completion: <strong>{missedDays} days</strong></span>
                </div>
              </CardContent>
            </Card>

            {/* Priority topics */}
            <Card className="border-0 shadow-md bg-card/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Target className="w-4 h-4 text-brand-purple" /> Priority Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {selectedSubjects.slice(0, 4).map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-brand-orange" />
                      <span>{s} — Core Concepts</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Recovery roadmap */}
          <div className="xl:col-span-2 space-y-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-blue" />
              {missedDays}-Day Recovery Roadmap
            </h2>
            {tasksByDay.map((dayTasks, di) => (
              <motion.div
                key={di}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: di * 0.1 }}
              >
                <Card className="border-0 shadow-sm bg-card/60 backdrop-blur-sm">
                  <CardHeader className="pb-2 pt-4">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                      <div className="size-6 rounded-full bg-brand-blue text-white flex items-center justify-center text-xs font-bold">
                        {di + 1}
                      </div>
                      Day {di + 1} Plan
                      {dayTasks.every((t) => t.done) && dayTasks.length > 0 && (
                        <Badge className="ml-auto bg-green-500/10 text-green-600 border-green-500/20 text-xs">✓ Complete</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {dayTasks.length > 0 ? dayTasks.map((task) => (
                      <button
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-accent/50 transition-colors text-left group"
                      >
                        {task.done
                          ? <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          : <Circle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5 group-hover:text-brand-blue" />
                        }
                        <div>
                          <p className={`text-sm font-medium ${task.done ? "line-through text-muted-foreground" : ""}`}>{task.task}</p>
                          <p className="text-xs text-muted-foreground">{task.subject}</p>
                        </div>
                      </button>
                    )) : (
                      <p className="text-sm text-muted-foreground italic py-2">
                        Click "AI Planner" tab to generate a custom plan for Day {di + 1}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <ChatInterface defaultAgent="Catch-Up Agent" />
        </div>
      )}
    </div>
  );
}
