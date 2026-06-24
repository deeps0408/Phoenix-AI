"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Award, Zap, Star, Shield } from "lucide-react";

export default function AchievementsPage() {
  const badges = [
    { name: "Early Bird", desc: "Complete 5 lessons before 8 AM", icon: Zap, color: "text-brand-orange", bg: "bg-brand-orange/10", unlocked: true },
    { name: "Scholar", desc: "Score 100% on 3 quizzes", icon: Star, color: "text-brand-purple", bg: "bg-brand-purple/10", unlocked: true },
    { name: "Resilient", desc: "Maintain a 14-day streak", icon: Shield, color: "text-brand-blue", bg: "bg-brand-blue/10", unlocked: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-purple">Achievements</h1>
        <p className="text-muted-foreground mt-2">
          Track your XP, badges, and level progression.
        </p>
      </div>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-brand-purple to-brand-blue text-white">
        <CardContent className="pt-6 pb-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/40">
            <Award className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h2 className="text-2xl font-bold">Level 5 Explorer</h2>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <span className="text-sm font-medium">XP: 2,450 / 3,000</span>
            </div>
            <Progress value={81} className="h-2 bg-white/20 [&>div]:bg-brand-orange" />
          </div>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mt-8 mb-4">Your Badges</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {badges.map((badge, i) => {
          const Icon = badge.icon;
          return (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Card className={`border-0 shadow-sm ${badge.unlocked ? "bg-card/60" : "bg-muted/30 opacity-60"} backdrop-blur-sm`}>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className={`p-3 rounded-full ${badge.bg}`}>
                    <Icon className={`w-6 h-6 ${badge.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{badge.name}</CardTitle>
                    {badge.unlocked ? (
                      <Badge variant="outline" className="text-xs border-green-500 text-green-500 bg-green-500/10">Unlocked</Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">Locked</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{badge.desc}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
