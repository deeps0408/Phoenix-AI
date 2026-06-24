import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Globe2, BookOpen, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar Simple */}
      <nav className="flex items-center justify-between p-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="text-xl font-bold text-brand-blue">Phoenix AI</span>
        </div>
        <Link href="/">
          <Button variant="ghost">Back to Home</Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-brand-orange/10 text-brand-orange mb-4">
            <Heart className="w-4 h-4 mr-2" /> Agents for Good
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-brand-purple">
            No child should fall behind because life got in the way.
          </h1>
          <p className="text-xl text-muted-foreground">
            Phoenix AI is a multilingual multi-agent learning companion helping students overcome barriers like missed school, lack of teachers, language differences, and poor internet access.
          </p>
        </div>

        {/* Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="p-6 rounded-2xl bg-card border shadow-sm">
            <Globe2 className="w-10 h-10 text-brand-blue mb-4" />
            <h3 className="text-xl font-bold mb-2">Multilingual Access</h3>
            <p className="text-muted-foreground">Breaking language barriers by translating lessons into 7+ regional languages natively.</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border shadow-sm">
            <BookOpen className="w-10 h-10 text-brand-purple mb-4" />
            <h3 className="text-xl font-bold mb-2">Catch-up Learning</h3>
            <p className="text-muted-foreground">Smart recovery roadmaps for students who missed school due to illness or disasters.</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border shadow-sm">
            <ShieldCheck className="w-10 h-10 text-brand-orange mb-4" />
            <h3 className="text-xl font-bold mb-2">Always Available</h3>
            <p className="text-muted-foreground">Low-bandwidth modes and AI agents acting as teachers, mentors, and counselors 24/7.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
