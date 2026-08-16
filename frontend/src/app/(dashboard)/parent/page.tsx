"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChatInterface } from "@/components/chat/ChatInterface";
import {
  Users, BookOpen, TrendingUp, Calendar, Bell,
  CheckCircle2, AlertCircle, BarChart2, Star
} from "lucide-react";

const SUBJECTS = [
  { name: "Mathematics", score: 78, trend: "+5%", color: "bg-brand-blue" },
  { name: "Science", score: 85, trend: "+8%", color: "bg-green-500" },
  { name: "English", score: 92, trend: "+2%", color: "bg-brand-purple" },
  { name: "History", score: 65, trend: "-3%", color: "bg-brand-orange" },
  { name: "Hindi", score: 88, trend: "+4%", color: "bg-teal-500" },
];

const WEEKLY_ACTIVITY = [
  { day: "Mon", sessions: 3 }, { day: "Tue", sessions: 5 },
  { day: "Wed", sessions: 2 }, { day: "Thu", sessions: 4 },
  { day: "Fri", sessions: 6 }, { day: "Sat", sessions: 1 }, { day: "Sun", sessions: 0 },
];

const NOTIFICATIONS = [
  { type: "success", msg: "Quiz completed: Science — 90% score! 🎉", time: "2h ago" },
  { type: "warning", msg: "History score dropped. Needs revision.", time: "1d ago" },
  { type: "info", msg: "New Smart Note saved: Photosynthesis", time: "2d ago" },
];

export default function ParentPage() {
  const [tab, setTab] = useState<"dashboard" | "chat">("dashboard");
  const [lang, setLang] = useState<"en" | "hi">("en");

  const labels = {
    en: {
      title: "Parent Portal",
      subtitle: "Monitor your child's education progress at a glance.",
      attendance: "Attendance",
      avgScore: "Avg. Score",
      streak: "Study Streak",
      quizzes: "Quizzes Done",
      overview: "Performance Overview",
      weeklyActivity: "Weekly Study Activity",
      notifications: "Recent Alerts",
      advice: "Your Action Plan",
    },
    hi: {
      title: "अभिभावक पोर्टल",
      subtitle: "अपने बच्चे की शिक्षा प्रगति एक नजर में देखें।",
      attendance: "उपस्थिति",
      avgScore: "औसत अंक",
      streak: "अध्ययन क्रम",
      quizzes: "क्विज़ पूर्ण",
      overview: "विषय प्रदर्शन",
      weeklyActivity: "साप्ताहिक गतिविधि",
      notifications: "हाल की सूचनाएं",
      advice: "आपकी कार्य योजना",
    },
  }[lang];

  const maxSessions = Math.max(...WEEKLY_ACTIVITY.map((d) => d.sessions));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-blue">{labels.title}</h1>
          <p className="text-muted-foreground mt-1">{labels.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${lang === "en" ? "bg-brand-blue text-white border-brand-blue" : "border-border"}`}
          >EN</button>
          <button
            onClick={() => setLang("hi")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${lang === "hi" ? "bg-brand-blue text-white border-brand-blue" : "border-border"}`}
          >हिंदी</button>
          <Button
            variant={tab === "chat" ? "default" : "outline"} size="sm"
            onClick={() => setTab(tab === "chat" ? "dashboard" : "chat")}
            className={tab === "chat" ? "bg-brand-blue text-white" : ""}
          >
            💬 {lang === "hi" ? "AI सहायक" : "Ask AI"}
          </Button>
        </div>
      </div>

      {tab === "chat" ? (
        <div className="max-w-4xl mx-auto">
          <ChatInterface defaultAgent="Parent Agent" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: labels.attendance, value: "87%", icon: Calendar, color: "text-brand-blue", bg: "bg-brand-blue/10", note: "3 days missed" },
              { label: labels.avgScore, value: "82%", icon: BarChart2, color: "text-green-500", bg: "bg-green-500/10", note: "+4% this week" },
              { label: labels.streak, value: "5 days", icon: Star, color: "text-brand-orange", bg: "bg-brand-orange/10", note: "Keep it up! 🔥" },
              { label: labels.quizzes, value: "12", icon: CheckCircle2, color: "text-brand-purple", bg: "bg-brand-purple/10", note: "Avg: 78%" },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Card className="border-0 shadow-md bg-card/60 backdrop-blur-sm">
                  <CardContent className="pt-5">
                    <div className={`size-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <p className="text-2xl font-black">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-xs mt-1 text-brand-blue">{stat.note}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Subject performance */}
            <Card className="border-0 shadow-md bg-card/60 lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-brand-purple" />{labels.overview}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {SUBJECTS.map((sub) => (
                  <div key={sub.name}>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="font-medium">{sub.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${sub.trend.startsWith("+") ? "text-green-500" : "text-red-500"}`}>{sub.trend}</span>
                        <span className="font-bold w-8 text-right">{sub.score}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full">
                      <div className={`h-2 ${sub.color} rounded-full transition-all`} style={{ width: `${sub.score}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Notifications */}
            <div className="space-y-4">
              <Card className="border-0 shadow-md bg-card/60">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Bell className="w-4 h-4 text-brand-orange" />{labels.notifications}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {NOTIFICATIONS.map((n, i) => (
                    <div key={i} className="flex gap-2.5 items-start">
                      {n.type === "success" && <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />}
                      {n.type === "warning" && <AlertCircle className="w-4 h-4 text-brand-orange mt-0.5 shrink-0" />}
                      {n.type === "info" && <BookOpen className="w-4 h-4 text-brand-blue mt-0.5 shrink-0" />}
                      <div>
                        <p className="text-xs leading-snug">{n.msg}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Action advice */}
              <Card className="border-0 shadow-sm bg-gradient-to-br from-brand-blue/5 to-brand-purple/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">💡 {labels.advice}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="text-muted-foreground">• Encourage 30 min daily revision of History</p>
                  <p className="text-muted-foreground">• Celebrate the 5-day streak milestone</p>
                  <p className="text-muted-foreground">• Ask about Science — great progress!</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Weekly activity bar chart */}
          <Card className="border-0 shadow-md bg-card/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-brand-blue" />{labels.weeklyActivity}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3 h-24">
                {WEEKLY_ACTIVITY.map((d) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-brand-blue/80 rounded-t-md transition-all"
                      style={{ height: `${maxSessions ? (d.sessions / maxSessions) * 80 : 0}px` }}
                    />
                    <span className="text-[10px] text-muted-foreground">{d.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
