"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, PlayCircle, BookOpen, Globe2, Sparkles, ShieldCheck, BrainCircuit, Users, Zap, Trophy, ChevronDown, ChevronUp, GraduationCap, Map, Heart, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

// ── Animated counter ─────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 50;
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.round(start));
    }, 30);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const AGENTS = [
  { name: "AI Teacher", icon: BookOpen, color: "bg-brand-blue", desc: "Adaptive multilingual explanations" },
  { name: "Catch-Up", icon: Map, color: "bg-green-500", desc: "Recovery roadmaps for missed school" },
  { name: "Mentor", icon: GraduationCap, color: "bg-brand-purple", desc: "Pomodoro, goals & habit tracking" },
  { name: "Translator", icon: Globe2, color: "bg-teal-500", desc: "Real-time multilingual translation" },
  { name: "Quiz AI", icon: ClipboardCheck, color: "bg-brand-orange", desc: "MCQ generation from your notes" },
  { name: "Career Guide", icon: BrainCircuit, color: "bg-pink-500", desc: "Career paths & scholarship finder" },
  { name: "Parent Agent", icon: Heart, color: "bg-red-500", desc: "Simple progress reports for parents" },
  { name: "Resources", icon: Sparkles, color: "bg-indigo-500", desc: "Free YouTube, courses & books" },
];

const FEATURES = [
  { title: "AI Teacher Agent", desc: "Adaptive explanations in multiple languages tailored to your learning pace.", icon: BookOpen, color: "text-brand-blue" },
  { title: "Multilingual Support", desc: "Learn in your native tongue. Real-time translation for 16+ languages.", icon: Globe2, color: "text-teal-500" },
  { title: "Catch-Up Planner", desc: "Missed school? We generate a personalised day-by-day roadmap to recover.", icon: Map, color: "text-green-500" },
  { title: "Smart Notes + PDF", desc: "Chat sessions auto-saved as beautiful notes. Download as PDF anytime.", icon: Sparkles, color: "text-brand-purple" },
  { title: "MCQ Quiz Generator", desc: "AI generates quizzes from your own study notes for active recall.", icon: ClipboardCheck, color: "text-brand-orange" },
  { title: "Gamification", desc: "Earn XP, unlock badges, maintain streaks, climb the leaderboard.", icon: Trophy, color: "text-yellow-500" },
  { title: "Career Guidance", desc: "Personalised career paths, skill-gap analysis, scholarship finder.", icon: BrainCircuit, color: "text-pink-500" },
  { title: "Offline Support", desc: "Poor internet? Study offline and sync automatically when back online.", icon: ShieldCheck, color: "text-indigo-500" },
];

const TESTIMONIALS = [
  { name: "Priya S.", role: "Class 10 Student, Bihar", avatar: "👩‍🎓", quote: "I missed 2 weeks of school during floods. Phoenix AI's Catch-Up Planner helped me recover in just 10 days. I got 89% in my exams!" },
  { name: "Rajesh K.", role: "Parent, Rajasthan", avatar: "👨‍👧", quote: "मेरी बेटी की प्रगति अब बहुत आसानी से समझ में आती है। Parent Portal ने सब कुछ सरल कर दिया।" },
  { name: "Arjun M.", role: "Class 12, Maharashtra", avatar: "🧑‍💻", quote: "The Career Guidance agent helped me discover Data Science. Now I'm on NPTEL courses and have a clear 3-year plan." },
];

const FAQS = [
  { q: "Is Phoenix AI completely free?", a: "Yes! Phoenix AI is free to use. All AI agents, quizzes, notes, and resources are available without any cost." },
  { q: "Does it work with poor internet?", a: "Yes. The Offline Sync agent stores lessons locally and syncs when internet is restored. It also supports slow 2G networks." },
  { q: "What languages does it support?", a: "The translator supports 16+ languages including Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Urdu, and more." },
  { q: "How does the Catch-Up Planner work?", a: "You tell it how many days you missed and which subjects. It generates a day-by-day recovery roadmap with micro-tasks you can check off." },
  { q: "Can parents track their child's progress?", a: "Absolutely. The Parent Portal provides attendance stats, subject-wise scores, weekly activity, and action advice — in simple language." },
  { q: "How is the quiz generated?", a: "The AI generates MCQ questions from your saved study notes or any topic you specify. You get 4 options, correct answers, and explanations." },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background overflow-hidden selection:bg-brand-blue/30">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/70 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white font-bold shadow-lg">🔥</div>
            <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-orange">Phoenix AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#architecture" className="hover:text-foreground transition-colors">Agents</Link>
            <Link href="#metrics" className="hover:text-foreground transition-colors">Impact</Link>
            <Link href="#testimonials" className="hover:text-foreground transition-colors">Stories</Link>
            <Link href="#faq" className="hover:text-foreground transition-colors">FAQ</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-muted-foreground">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="bg-brand-blue hover:bg-brand-blue/90 text-white rounded-full px-5">
                Get Started <ArrowRight className="ml-1.5 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-24 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-blue/15 blur-[140px] rounded-full -z-10" />
        <div className="absolute top-40 right-0 w-80 h-80 bg-brand-purple/15 blur-[100px] rounded-full -z-10" />
        <div className="absolute top-60 left-0 w-80 h-80 bg-brand-orange/10 blur-[100px] rounded-full -z-10" />

        <div className="container mx-auto max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center rounded-full border border-brand-blue/30 bg-brand-blue/10 px-4 py-1.5 text-sm font-medium text-brand-blue mb-8 gap-2">
              <Sparkles className="w-4 h-4" /> Built for the Agents for Good Hackathon · 2026
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          >
            Education That Never <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-purple to-brand-orange">
              Leaves Anyone Behind.
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          >
            Phoenix AI is a multilingual multi-agent learning companion helping students overcome barriers like missed school, lack of teachers, language differences, and poor internet access.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          >
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 rounded-full h-14 px-8 text-base font-bold shadow-xl">
                Start Learning Free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full h-14 px-8 text-base border-white/10 hover:bg-white/5">
                <PlayCircle className="mr-2 w-5 h-5" /> Watch Demo
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Metrics ── */}
      <section id="metrics" className="py-16 px-6 bg-gradient-to-r from-brand-blue/5 to-brand-purple/5 border-y border-white/5">
        <div className="container mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 50000, suffix: "+", label: "Students Helped" },
            { value: 16, suffix: "+", label: "Languages Supported" },
            { value: 8, suffix: "", label: "AI Agents" },
            { value: 94, suffix: "%", label: "Recovery Success Rate" },
          ].map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="text-4xl md:text-5xl font-black text-foreground">
                <Counter to={m.value} suffix={m.suffix} />
              </p>
              <p className="text-muted-foreground mt-2 text-sm">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything a Student Needs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">8 intelligent agents working together to remove every barrier to quality education.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="p-5 rounded-2xl bg-card border border-white/5 hover:border-brand-blue/30 hover:shadow-md transition-all group"
                >
                  <div className={`size-11 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 ${f.color}`} />
                  </div>
                  <h3 className="font-bold mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Agent Architecture ── */}
      <section id="architecture" className="py-24 px-6 bg-gradient-to-b from-transparent to-brand-blue/5">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Multi-Agent Architecture</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-14">Your request flows to a smart Orchestrator that routes it to the best specialist agent instantly.</p>

          {/* Orchestrator node */}
          <div className="relative flex flex-col items-center">
            <div className="size-20 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white shadow-xl shadow-brand-purple/30 z-10 relative">
              <BrainCircuit className="w-9 h-9" />
            </div>
            <div className="text-sm font-bold mt-2 text-brand-purple">Orchestrator Agent</div>
            <div className="text-xs text-muted-foreground">Routes to the right specialist</div>

            {/* Connector line */}
            <div className="w-0.5 h-8 bg-gradient-to-b from-brand-purple to-transparent mt-3" />

            {/* Agent nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2 w-full max-w-3xl">
              {AGENTS.map((agent, i) => {
                const Icon = agent.icon;
                return (
                  <motion.div
                    key={agent.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-white/5 hover:border-brand-blue/30 transition-all"
                  >
                    <div className={`size-10 rounded-xl ${agent.color} flex items-center justify-center text-white`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold">{agent.name}</p>
                    <p className="text-[10px] text-muted-foreground text-center leading-tight">{agent.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Gamification highlight ── */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="rounded-3xl bg-gradient-to-r from-brand-purple/20 via-brand-blue/10 to-brand-orange/10 border border-white/10 p-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-5xl mb-4">🏆</div>
              <h2 className="text-3xl font-bold mb-3">Learning is More Fun with Points</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">Earn XP for every chat, quiz, and note. Unlock 12 badges. Build study streaks. Compete on the leaderboard.</p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { icon: "⚡", label: "XP Points" }, { icon: "🏅", label: "12 Badges" },
                  { icon: "🔥", label: "Daily Streaks" }, { icon: "👑", label: "Leaderboard" },
                  { icon: "📈", label: "Level Up" }, { icon: "🎯", label: "Achievements" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 bg-background/50 border border-white/10 px-4 py-2 rounded-full text-sm font-medium">
                    {item.icon} {item.label}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Real Stories, Real Impact</h2>
            <p className="text-muted-foreground">Students and parents from across India sharing their experience.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-white/5 hover:border-brand-blue/20 transition-all"
              >
                <div className="text-3xl mb-4">{t.avatar}</div>
                <p className="text-muted-foreground leading-relaxed mb-5 text-sm italic">"{t.quote}"</p>
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 px-6 bg-gradient-to-b from-transparent to-brand-purple/5">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="rounded-xl border border-white/5 bg-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-sm hover:bg-accent/30 transition-colors"
                >
                  {faq.q}
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0 ml-2" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 ml-2" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-5">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-orange">Rise Again?</span>
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">Join thousands of students who never let barriers stop their education.</p>
            <Link href="/dashboard">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full h-14 px-10 text-base font-bold shadow-xl">
                Start Learning Free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white text-sm font-bold">🔥</div>
              <span className="font-black text-lg bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-orange">Phoenix AI</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
              <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
              <Link href="#faq" className="hover:text-foreground transition-colors">FAQ</Link>
            </div>
            <p className="text-muted-foreground text-sm text-center">
              © 2026 Phoenix AI · Built for the <strong>Agents for Good Hackathon</strong> 🏆
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
