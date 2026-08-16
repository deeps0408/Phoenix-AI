"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { PlayCircle, BookOpen, Globe, GraduationCap, ExternalLink } from "lucide-react";

const SUBJECTS = ["All", "Mathematics", "Science", "English", "History", "Computer Science", "Hindi"];

const RESOURCES = [
  { type: "youtube", subject: "Mathematics", title: "3Blue1Brown — Essence of Calculus", desc: "Beautiful visual explanations of calculus.", tag: "Series", url: "https://youtube.com/@3blue1brown" },
  { type: "course", subject: "Mathematics", title: "NPTEL — Intro to Algebra", desc: "Free IIT course on algebra fundamentals.", tag: "Free", url: "https://nptel.ac.in" },
  { type: "website", subject: "Mathematics", title: "Khan Academy — Math", desc: "Comprehensive exercises from basic to advanced.", tag: "Interactive", url: "https://khanacademy.org" },
  { type: "youtube", subject: "Science", title: "Kurzgesagt — Science Videos", desc: "Animated science explainers on complex topics.", tag: "Animated", url: "https://youtube.com/@kurzgesagt" },
  { type: "course", subject: "Science", title: "SWAYAM — Physics for Engineers", desc: "Govt. of India free online course platform.", tag: "Free", url: "https://swayam.gov.in" },
  { type: "book", subject: "Science", title: "NCERT Textbooks (Free PDF)", desc: "Official school textbooks, freely available online.", tag: "PDF", url: "https://ncert.nic.in" },
  { type: "youtube", subject: "Computer Science", title: "CS50 by Harvard — CS Fundamentals", desc: "World's best intro to Computer Science.", tag: "Full Course", url: "https://youtube.com/@cs50" },
  { type: "course", subject: "Computer Science", title: "Coursera — Python for Everybody", desc: "University of Michigan. Free to audit.", tag: "Audit Free", url: "https://coursera.org" },
  { type: "website", subject: "Computer Science", title: "GeeksForGeeks", desc: "DSA, CS fundamentals, coding practice.", tag: "Practice", url: "https://geeksforgeeks.org" },
  { type: "youtube", subject: "English", title: "English Addict with Mr Steve", desc: "Improve English conversation and vocabulary.", tag: "Daily", url: "https://youtube.com" },
  { type: "website", subject: "History", title: "Britannica Encyclopedia", desc: "Authoritative articles on all historical events.", tag: "Reference", url: "https://britannica.com" },
  { type: "book", subject: "Hindi", title: "NCERT Hindi Textbooks", desc: "Free Hindi language textbooks for all grades.", tag: "PDF", url: "https://ncert.nic.in" },
];

const TYPE_CONFIG: Record<string, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  youtube: { icon: PlayCircle, color: "text-red-500", bg: "bg-red-500/10", label: "YouTube" },
  course: { icon: GraduationCap, color: "text-brand-purple", bg: "bg-brand-purple/10", label: "Course" },
  website: { icon: Globe, color: "text-brand-blue", bg: "bg-brand-blue/10", label: "Website" },
  book: { icon: BookOpen, color: "text-brand-orange", bg: "bg-brand-orange/10", label: "Book" },
};

export default function ResourcesPage() {
  const [subject, setSubject] = useState("All");
  const [tab, setTab] = useState<"browse" | "chat">("browse");

  const filtered = subject === "All" ? RESOURCES : RESOURCES.filter((r) => r.subject === subject);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-blue">Learning Resources</h1>
          <p className="text-muted-foreground mt-1">Free YouTube, courses, books & websites — curated for you.</p>
        </div>
        <div className="flex gap-2">
          <Button variant={tab === "browse" ? "default" : "outline"} size="sm"
            onClick={() => setTab("browse")}
            className={tab === "browse" ? "bg-brand-blue text-white" : ""}>
            📚 Browse
          </Button>
          <Button variant={tab === "chat" ? "default" : "outline"} size="sm"
            onClick={() => setTab("chat")}
            className={tab === "chat" ? "bg-brand-blue text-white" : ""}>
            🤖 AI Recommend
          </Button>
        </div>
      </div>

      {tab === "chat" ? (
        <div className="max-w-4xl mx-auto">
          <ChatInterface defaultAgent="Resource Recommendation Agent" />
        </div>
      ) : (
        <>
          {/* Subject filter tabs */}
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map((s) => (
              <button
                key={s}
                onClick={() => setSubject(s)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  subject === s
                    ? "bg-brand-blue text-white border-brand-blue"
                    : "border-border text-muted-foreground hover:border-brand-blue/40"
                }`}
              >{s}</button>
            ))}
          </div>

          {/* Resource grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((res, i) => {
              const cfg = TYPE_CONFIG[res.type];
              const Icon = cfg.icon;
              return (
                <motion.a
                  key={i} href={res.url} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="block p-4 rounded-xl border border-border bg-card/60 hover:border-brand-blue/40 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className={`size-9 rounded-lg ${cfg.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-4 h-4 ${cfg.color}`} />
                    </div>
                    <div className="flex gap-1.5">
                      <Badge className={`text-[10px] ${cfg.bg} ${cfg.color} border-0`}>{cfg.label}</Badge>
                      <Badge variant="outline" className="text-[10px]">{res.tag}</Badge>
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm leading-snug mb-1 group-hover:text-brand-blue transition-colors">{res.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">{res.desc}</p>
                  <div className="flex items-center gap-1 text-xs text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity">
                    Open resource <ExternalLink className="w-3 h-3" />
                  </div>
                </motion.a>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No resources found for this subject yet.</p>
              <p className="text-sm mt-1">Try the AI Recommend tab for personalised suggestions!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
