"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, BookOpen, Globe2, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "AI Teacher Agent",
    description: "Adaptive explanations in multiple languages tailored to your learning pace.",
    icon: BookOpen,
  },
  {
    title: "Multilingual Support",
    description: "Learn in your native tongue. Real-time translation for 7+ languages.",
    icon: Globe2,
  },
  {
    title: "Catch-Up Planner",
    description: "Missed school? We generate a personalized roadmap to help you catch up.",
    icon: Sparkles,
  },
  {
    title: "Offline Sync",
    description: "Poor internet? Download lessons and sync your progress automatically.",
    icon: ShieldCheck,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden selection:bg-brand-blue/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white font-bold shadow-lg shadow-brand-purple/20">
              P
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-orange">
              Phoenix AI
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#architecture" className="hover:text-foreground transition-colors">Architecture</Link>
            <Link href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white rounded-full px-6">
                Get Started <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-brand-blue/20 blur-[120px] rounded-full -z-10" />
        <div className="absolute top-40 left-0 w-96 h-96 bg-brand-purple/20 blur-[100px] rounded-full -z-10" />
        
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3 py-1 text-sm font-medium text-brand-blue mb-8">
              <Sparkles className="mr-2 size-4" />
              Agents for Good Hackathon Winner
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Education That Never <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-purple to-brand-orange">
              Leaves Anyone Behind.
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Phoenix AI is a multilingual multi-agent learning companion helping students overcome barriers like missed school, lack of teachers, language differences, and poor internet access.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 rounded-full h-14 px-8 text-base">
                Start Learning Now <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full h-14 px-8 text-base border-white/10 hover:bg-white/5">
              <PlayCircle className="mr-2 size-5" /> Watch Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powered by 10+ Intelligent Agents</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Our orchestrator agent seamlessly routes your needs to specialized experts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-white/5 hover:border-brand-blue/30 transition-colors"
                >
                  <div className="size-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-6">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CTA Footer */}
      <footer className="border-t border-white/5 mt-20 py-12 px-6">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white text-xs font-bold">
              P
            </div>
            <span className="font-bold">Phoenix AI</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2026 Phoenix AI. Built for the Agents for Good Hackathon.
          </p>
        </div>
      </footer>
    </div>
  );
}
