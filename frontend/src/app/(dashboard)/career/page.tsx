"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChatInterface } from "@/components/chat/ChatInterface";
import {
  Briefcase, Code2, Stethoscope, Calculator, Palette,
  Globe, ChevronRight, Zap, BookOpen, GraduationCap
} from "lucide-react";

const CAREER_PATHS = [
  { icon: Code2, name: "Software Engineering", tag: "High Demand", color: "text-brand-blue", bg: "bg-brand-blue/10", skills: ["Python", "DSA", "System Design"], salary: "₹8–40 LPA" },
  { icon: Stethoscope, name: "Medicine (MBBS)", tag: "Prestigious", color: "text-red-500", bg: "bg-red-500/10", skills: ["Biology", "Chemistry", "NEET prep"], salary: "₹10–60 LPA" },
  { icon: Calculator, name: "Data Science", tag: "Fastest Growing", color: "text-green-500", bg: "bg-green-500/10", skills: ["Statistics", "ML", "Python"], salary: "₹6–35 LPA" },
  { icon: Globe, name: "Civil Services (IAS)", tag: "Impactful", color: "text-brand-purple", bg: "bg-brand-purple/10", skills: ["GS", "CSAT", "Essay"], salary: "₹60k–2.5L/mo" },
  { icon: Palette, name: "Design & UX", tag: "Creative", color: "text-brand-orange", bg: "bg-brand-orange/10", skills: ["Figma", "UI Principles", "Portfolio"], salary: "₹5–25 LPA" },
  { icon: Briefcase, name: "Business & MBA", tag: "Leadership", color: "text-teal-500", bg: "bg-teal-500/10", skills: ["Quant", "GK", "CAT prep"], salary: "₹12–50 LPA" },
];

const SKILLS = [
  { name: "Critical Thinking", level: 70 },
  { name: "Communication", level: 60 },
  { name: "Mathematics", level: 80 },
  { name: "Digital Literacy", level: 50 },
  { name: "Research Skills", level: 65 },
];

const SCHOLARSHIPS = [
  { name: "National Scholarship Portal (NSP)", link: "#", type: "Government" },
  { name: "INSPIRE Scholarship (DST)", link: "#", type: "Science" },
  { name: "Merit-cum-Means (MCM)", link: "#", type: "University" },
  { name: "PM Scholarship Scheme", link: "#", type: "Government" },
  { name: "Tata Trust Scholarships", link: "#", type: "Private" },
];

export default function CareerPage() {
  const [tab, setTab] = useState<"explore" | "chat">("explore");
  const [selected, setSelected] = useState<string | null>(null);

  const selectedPath = CAREER_PATHS.find((c) => c.name === selected);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-orange">Career Guidance</h1>
          <p className="text-muted-foreground mt-1">Discover your path, close skill gaps, unlock your future.</p>
        </div>
        <div className="flex gap-2">
          <Button variant={tab === "explore" ? "default" : "outline"} size="sm"
            onClick={() => setTab("explore")}
            className={tab === "explore" ? "bg-brand-orange text-white" : ""}>
            <Briefcase className="w-4 h-4 mr-1" /> Explore Careers
          </Button>
          <Button variant={tab === "chat" ? "default" : "outline"} size="sm"
            onClick={() => setTab("chat")}
            className={tab === "chat" ? "bg-brand-orange text-white" : ""}>
            🤖 AI Advisor
          </Button>
        </div>
      </div>

      {tab === "chat" ? (
        <div className="max-w-4xl mx-auto">
          <ChatInterface defaultAgent="Career Guidance Agent" />
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Career path cards */}
          <div className="xl:col-span-2 space-y-4">
            <h2 className="font-semibold text-base">🎯 Explore Career Paths</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CAREER_PATHS.map((path, i) => (
                <motion.button
                  key={path.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setSelected(selected === path.name ? null : path.name)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    selected === path.name
                      ? "border-brand-orange/60 bg-brand-orange/5 shadow-md"
                      : "border-border hover:border-brand-orange/30 bg-card/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className={`size-10 rounded-xl ${path.bg} flex items-center justify-center shrink-0`}>
                      <path.icon className={`w-5 h-5 ${path.color}`} />
                    </div>
                    <Badge className="text-[10px] bg-muted text-muted-foreground border-0 shrink-0">{path.tag}</Badge>
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{path.name}</h3>
                  <p className="text-xs text-muted-foreground">{path.salary}</p>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {path.skills.map((s) => (
                      <span key={s} className="text-[10px] bg-accent px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Expanded detail */}
            {selectedPath && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-brand-orange/30 bg-brand-orange/5 shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <selectedPath.icon className={`w-5 h-5 ${selectedPath.color}`} />
                      {selectedPath.name} — AI Roadmap
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <p className="text-muted-foreground">
                      Use the <strong>AI Advisor</strong> tab for a personalised roadmap, or explore these steps:
                    </p>
                    <div className="space-y-2">
                      {["Master the core skills", "Build 2-3 projects or portfolio", "Prepare for entrance exams", "Apply for scholarships", "Connect with mentors"].map((step, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <div className="size-5 rounded-full bg-brand-orange text-white flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</div>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                    <Button size="sm" className="bg-brand-orange text-white hover:bg-brand-orange/90 gap-2 mt-2"
                      onClick={() => setTab("chat")}>
                      Get Personalised Plan <ChevronRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Right panel */}
          <div className="space-y-4">
            {/* Skill gap */}
            <Card className="border-0 shadow-md bg-card/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4 text-brand-orange" /> Your Skill Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {SKILLS.map((sk) => (
                  <div key={sk.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{sk.name}</span>
                      <span className="text-muted-foreground">{sk.level}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full">
                      <div className="h-1.5 bg-brand-orange rounded-full" style={{ width: `${sk.level}%` }} />
                    </div>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground pt-1">
                  Based on your activity. Chat with AI to get a detailed gap analysis.
                </p>
              </CardContent>
            </Card>

            {/* Scholarships */}
            <Card className="border-0 shadow-md bg-card/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-brand-purple" /> Scholarships
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {SCHOLARSHIPS.map((s) => (
                  <div key={s.name} className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-foreground leading-snug">{s.name}</span>
                    <Badge variant="outline" className="text-[10px] shrink-0">{s.type}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Free courses */}
            <Card className="border-0 shadow-sm bg-card/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-brand-blue" /> Free Platforms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["SWAYAM", "NPTEL", "Khan Academy", "Coursera (Audit)", "MIT OCW", "edX (Audit)"].map((p) => (
                    <span key={p} className="text-xs bg-brand-blue/10 text-brand-blue px-2.5 py-1 rounded-full">{p}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
