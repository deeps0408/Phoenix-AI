"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, Zap, Medal, Star, Crown } from "lucide-react";
import {
  getProfile, getBadgesWithStatus, getLeaderboard,
  levelFromXP, levelTitle, xpForNextLevel, XP_PER_LEVEL,
  type GameProfile, type LeaderEntry, type Badge as BadgeType,
} from "@/lib/gamification";

export default function AchievementsPage() {
  const [profile, setProfile] = useState<GameProfile | null>(null);
  const [badges, setBadges] = useState<BadgeType[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderEntry[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "badges" | "leaderboard">("overview");

  useEffect(() => {
    setProfile(getProfile());
    setBadges(getBadgesWithStatus());
    setLeaderboard(getLeaderboard());
  }, []);

  if (!profile) return null;

  const level = levelFromXP(profile.xp);
  const nextLevelXP = xpForNextLevel(profile.xp);
  const xpInCurrentLevel = profile.xp % XP_PER_LEVEL;
  const xpPct = Math.round((xpInCurrentLevel / XP_PER_LEVEL) * 100);
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  const myRank = leaderboard.findIndex((e) => e.name === "You") + 1;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-purple">Achievements</h1>
        <p className="text-muted-foreground mt-1">Your XP, badges, streaks, and leaderboard ranking.</p>
      </div>

      {/* Hero XP card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-0 shadow-xl bg-gradient-to-br from-brand-purple via-brand-blue to-brand-orange text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10" />
          <CardContent className="pt-8 pb-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Level badge */}
              <div className="relative shrink-0">
                <div className="size-24 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center shadow-xl">
                  <div className="text-center">
                    <p className="text-2xl font-black">{level}</p>
                    <p className="text-[10px] uppercase tracking-widest opacity-80">Level</p>
                  </div>
                </div>
                {profile.streak >= 3 && (
                  <div className="absolute -top-1 -right-1 size-7 rounded-full bg-brand-orange flex items-center justify-center text-sm">
                    🔥
                  </div>
                )}
              </div>
              {/* Stats */}
              <div className="flex-1 text-center md:text-left space-y-3">
                <div>
                  <h2 className="text-2xl font-black">{levelTitle(level)}</h2>
                  <p className="text-white/70 text-sm">Rank #{myRank} on Leaderboard</p>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{xpInCurrentLevel} XP</span>
                    <span className="opacity-70">{XP_PER_LEVEL} XP to Level {level + 1}</span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${xpPct}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-white/80 rounded-full"
                    />
                  </div>
                </div>
              </div>
              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3 text-center shrink-0">
                {[
                  { label: "Total XP", value: profile.xp.toLocaleString(), icon: "⚡" },
                  { label: "Streak", value: `${profile.streak}d`, icon: "🔥" },
                  { label: "Quizzes", value: profile.totalQuizzes, icon: "🎯" },
                  { label: "Badges", value: `${unlockedCount}/${badges.length}`, icon: "🏅" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/10 rounded-xl px-3 py-2">
                    <p className="text-lg font-black">{s.icon} {s.value}</p>
                    <p className="text-[10px] opacity-70 uppercase tracking-wide">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border/40 pb-0">
        {(["overview", "badges", "leaderboard"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-all ${
              activeTab === t
                ? "border-brand-purple text-brand-purple"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >{t}</button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Zap, label: "Total XP", value: profile.xp.toLocaleString(), color: "text-brand-orange", bg: "bg-brand-orange/10" },
              { icon: Flame, label: "Best Streak", value: `${profile.streak} days`, color: "text-red-500", bg: "bg-red-500/10" },
              { icon: Star, label: "Messages Sent", value: profile.totalMessages, color: "text-brand-blue", bg: "bg-brand-blue/10" },
              { icon: Trophy, label: "Notes Saved", value: profile.notesSaved, color: "text-brand-purple", bg: "bg-brand-purple/10" },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}>
                <Card className="border-0 shadow-sm bg-card/60">
                  <CardContent className="pt-5">
                    <div className={`size-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <p className="text-xl font-black">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Level progression */}
          <Card className="border-0 shadow-sm bg-card/60">
            <CardHeader className="pb-2"><CardTitle className="text-sm">Level Progression</CardTitle></CardHeader>
            <CardContent>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[1,2,3,4,5,6,7,8,9,10].map((lvl) => (
                  <div key={lvl} className={`shrink-0 size-12 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all ${
                    lvl < level ? "border-brand-purple bg-brand-purple text-white" :
                    lvl === level ? "border-brand-orange bg-brand-orange/10 text-brand-orange animate-pulse" :
                    "border-border text-muted-foreground"
                  }`}>
                    {lvl < level ? "✓" : lvl}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Badges */}
      {activeTab === "badges" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className={`border-0 shadow-sm transition-all ${
                badge.unlocked
                  ? "bg-card/80 hover:shadow-md"
                  : "bg-muted/20 opacity-50 grayscale"
              }`}>
                <CardContent className="pt-5 flex items-start gap-3">
                  <div className={`size-12 rounded-xl ${badge.bg} flex items-center justify-center text-2xl shrink-0`}>
                    {badge.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{badge.name}</h3>
                      {badge.unlocked
                        ? <Badge className="text-[10px] bg-green-500/10 text-green-600 border-green-500/20">Unlocked</Badge>
                        : <Badge variant="outline" className="text-[10px]">Locked</Badge>
                      }
                    </div>
                    <p className="text-xs text-muted-foreground leading-snug">{badge.description}</p>
                    <p className="text-xs text-brand-orange mt-1">+{badge.xpReward} XP</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Leaderboard */}
      {activeTab === "leaderboard" && (
        <div className="space-y-2">
          {leaderboard.map((entry, i) => {
            const isMe = entry.name === "You";
            return (
              <motion.div
                key={entry.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className={`border-0 shadow-sm transition-all ${isMe ? "bg-brand-purple/10 border border-brand-purple/30" : "bg-card/60"}`}>
                  <CardContent className="py-3 px-4 flex items-center gap-3">
                    {/* Rank */}
                    <div className={`size-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${
                      i === 0 ? "bg-yellow-400 text-white" :
                      i === 1 ? "bg-gray-300 text-gray-700" :
                      i === 2 ? "bg-amber-600 text-white" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {i === 0 ? <Crown className="w-4 h-4" /> : i + 1}
                    </div>
                    {/* Avatar */}
                    <div className="text-2xl">{entry.avatar}</div>
                    {/* Name */}
                    <div className="flex-1">
                      <p className={`font-semibold text-sm ${isMe ? "text-brand-purple" : ""}`}>
                        {entry.name} {isMe && <span className="text-xs">(You)</span>}
                      </p>
                      <p className="text-xs text-muted-foreground">Level {entry.level} · 🔥 {entry.streak} day streak</p>
                    </div>
                    {/* XP */}
                    <div className="text-right">
                      <p className="font-black text-sm">{entry.xp.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">XP</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
