"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Flame, Clock, Brain, Target, Activity, BookOpen, Zap,
  Trophy, Map, GraduationCap, Globe2, ClipboardCheck, ArrowRight,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getProfile, levelFromXP, levelTitle, XP_PER_LEVEL, getBadgesWithStatus } from "@/lib/gamification";
import { getAllNotes } from "@/lib/notes";

const chartData = [
  { name: "Week 1", score: 45 }, { name: "Week 2", score: 52 },
  { name: "Week 3", score: 68 }, { name: "Week 4", score: 74 },
  { name: "Week 5", score: 85 },
];

const QUICK_ACTIONS = [
  { label: "AI Teacher", href: "/teacher", icon: BookOpen, color: "from-brand-blue to-brand-purple", desc: "Ask anything" },
  { label: "Quiz Center", href: "/quiz", icon: ClipboardCheck, color: "from-brand-purple to-pink-500", desc: "Test yourself" },
  { label: "Catch-Up", href: "/catch-up", icon: Map, color: "from-green-500 to-teal-500", desc: "Recovery plan" },
  { label: "Translator", href: "/translator", icon: Globe2, color: "from-teal-500 to-brand-blue", desc: "16+ languages" },
  { label: "Mentor", href: "/mentor", icon: GraduationCap, color: "from-brand-orange to-red-500", desc: "Pomodoro & goals" },
  { label: "Career", href: "/career", icon: Trophy, color: "from-yellow-500 to-brand-orange", desc: "Find your path" },
];

export default function DashboardPage() {
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [noteCount, setNoteCount] = useState(0);
  const [unlockedBadges, setUnlockedBadges] = useState(0);
  const [quizCount, setQuizCount] = useState(0);

  useEffect(() => {
    const load = () => {
      const p = getProfile();
      setXp(p.xp);
      setStreak(p.streak);
      setLevel(levelFromXP(p.xp));
      setNoteCount(getAllNotes().length);
      setUnlockedBadges(getBadgesWithStatus().filter((b) => b.unlocked).length);
      setQuizCount(p.totalQuizzes);
    };
    load();
    const t = setInterval(load, 4000);
    return () => clearInterval(t);
  }, []);

  const xpInLevel = xp % XP_PER_LEVEL;
  const xpPct = Math.round((xpInLevel / XP_PER_LEVEL) * 100);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Student! 👋</h1>
          <p className="text-muted-foreground mt-1">Here's your learning progress at a glance.</p>
        </div>
        <Link href="/achievements">
          <Button variant="outline" size="sm" className="gap-2">
            <Trophy className="w-4 h-4 text-brand-orange" />
            Level {level} · {xp.toLocaleString()} XP
          </Button>
        </Link>
      </div>

      {/* XP hero bar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-0 shadow-lg bg-gradient-to-r from-brand-purple/20 via-brand-blue/10 to-brand-orange/10">
          <CardContent className="py-4 px-5 flex flex-col sm:flex-row items-center gap-4">
            <div className="size-14 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0">
              {level}
            </div>
            <div className="flex-1 w-full">
              <div className="flex justify-between items-center mb-1.5">
                <div>
                  <span className="font-bold">{levelTitle(level)}</span>
                  <Badge className="ml-2 bg-brand-orange/10 text-brand-orange border-brand-orange/20 text-xs">Level {level}</Badge>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1 text-brand-orange font-bold"><Flame className="w-4 h-4" />{streak}d streak</span>
                  <span className="flex items-center gap-1 text-brand-blue font-bold"><Zap className="w-4 h-4" />{xp.toLocaleString()} XP</span>
                </div>
              </div>
              <Progress value={xpPct} className="h-2.5" />
              <p className="text-xs text-muted-foreground mt-1">{xpInLevel} / {XP_PER_LEVEL} XP to Level {level + 1}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Study Streak", value: `${streak} Days`, icon: Flame, color: "text-brand-orange", bg: "bg-brand-orange/10", sub: streak > 0 ? "Keep it going! 🔥" : "Start today!" },
          { label: "XP Earned", value: xp.toLocaleString(), icon: Zap, color: "text-brand-blue", bg: "bg-brand-blue/10", sub: `Level ${level} · ${xpPct}% to next` },
          { label: "Smart Notes", value: noteCount, icon: BookOpen, color: "text-brand-purple", bg: "bg-brand-purple/10", sub: "Saved sessions" },
          { label: "Badges Earned", value: `${unlockedBadges}/12`, icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-500/10", sub: "Achievements unlocked" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="bg-card/50 backdrop-blur-xl border-white/5 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <div className={`size-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`size-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-semibold text-base mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_ACTIONS.map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.06 }}>
                <Link href={action.href}>
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:border-brand-blue/40 bg-card/60 hover:shadow-md transition-all group cursor-pointer text-center">
                    <div className={`size-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white shadow group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold">{action.label}</p>
                    <p className="text-[10px] text-muted-foreground">{action.desc}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Charts + Focus areas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-card/50 backdrop-blur-xl border-white/5 shadow-md">
          <CardHeader>
            <CardTitle>Quiz Performance</CardTitle>
            <CardDescription>Your assessment scores over the last 5 weeks.</CardDescription>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#ffffff10', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-card/50 backdrop-blur-xl border-white/5 shadow-md">
          <CardHeader>
            <CardTitle>Focus Areas</CardTitle>
            <CardDescription>Topics needing more attention.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { subject: "Algebra: Quadratic Eq.", score: 45, color: "bg-red-500", icon: Brain, iconColor: "text-red-500", iconBg: "bg-red-500/10" },
              { subject: "Physics: Kinematics", score: 60, color: "bg-yellow-500", icon: Activity, iconColor: "text-yellow-500", iconBg: "bg-yellow-500/10" },
              { subject: "History: WWI Causes", score: 72, color: "bg-brand-blue", icon: BookOpen, iconColor: "text-brand-blue", iconBg: "bg-brand-blue/10" },
            ].map((item) => (
              <div key={item.subject} className="flex items-center gap-3">
                <div className={`size-8 p-1.5 ${item.iconBg} ${item.iconColor} rounded-lg shrink-0`}>
                  <item.icon className="w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.subject}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-muted rounded-full">
                      <div className={`h-1.5 ${item.color} rounded-full`} style={{ width: `${item.score}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{item.score}%</span>
                  </div>
                </div>
              </div>
            ))}
            <Link href="/quiz">
              <Button size="sm" className="w-full mt-2 gap-2 bg-brand-purple/10 text-brand-purple hover:bg-brand-purple/20 border-0">
                Practice These Topics <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
