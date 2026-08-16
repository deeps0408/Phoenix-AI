"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  BookOpen, Map, GraduationCap, LayoutDashboard, BrainCircuit,
  Heart, CloudOff, Library, Settings, Globe2, ClipboardCheck,
  Trophy, BarChart2, Zap, Flame,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProfile, levelFromXP, levelTitle, XP_PER_LEVEL } from '@/lib/gamification';

const NAV_GROUPS = [
  {
    label: "Learn",
    links: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'AI Teacher', href: '/teacher', icon: BookOpen },
      { name: 'Language Translator', href: '/translator', icon: Globe2 },
      { name: 'Quiz Center', href: '/quiz', icon: ClipboardCheck },
      { name: 'Smart Notes', href: '/notes', icon: Library },
    ],
  },
  {
    label: "Support",
    links: [
      { name: 'Catch-Up Planner', href: '/catch-up', icon: Map },
      { name: 'Mentor & Planner', href: '/mentor', icon: GraduationCap },
      { name: 'Career Guidance', href: '/career', icon: BrainCircuit },
      { name: 'Parent Portal', href: '/parent', icon: Heart },
      { name: 'Resources', href: '/resources', icon: Library },
    ],
  },
  {
    label: "Progress",
    links: [
      { name: 'Achievements', href: '/achievements', icon: Trophy },
      { name: 'Analytics', href: '/analytics', icon: BarChart2 },
      { name: 'Offline Sync', href: '/offline', icon: CloudOff },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const load = () => {
      const p = getProfile();
      setXp(p.xp);
      setStreak(p.streak);
      setLevel(levelFromXP(p.xp));
    };
    load();
    window.addEventListener('storage', load);
    // Poll every 5s for XP updates from same-tab actions
    const t = setInterval(load, 5000);
    return () => { window.removeEventListener('storage', load); clearInterval(t); };
  }, []);

  const xpInLevel = xp % XP_PER_LEVEL;
  const xpPct = Math.round((xpInLevel / XP_PER_LEVEL) * 100);

  return (
    <div className="w-64 flex flex-col h-screen border-r border-border/40 bg-background/80 backdrop-blur-xl overflow-hidden">
      {/* Logo */}
      <div className="p-5 flex items-center gap-3 shrink-0">
        <div className="size-9 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white font-bold shadow-lg shadow-brand-purple/20 text-base">
          🔥
        </div>
        <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-orange">
          Phoenix AI
        </span>
      </div>

      {/* XP widget */}
      <div className="mx-4 mb-3 p-3 rounded-xl bg-gradient-to-br from-brand-purple/15 to-brand-blue/10 border border-brand-purple/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <div className="size-5 rounded-full bg-brand-purple/20 flex items-center justify-center text-[10px] font-black text-brand-purple">{level}</div>
            <span className="text-[11px] font-semibold text-brand-purple truncate">{levelTitle(level)}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-brand-orange font-bold">
            <Flame className="w-3 h-3" />{streak}
          </div>
        </div>
        <div className="h-1.5 bg-brand-purple/20 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-brand-purple to-brand-blue rounded-full transition-all duration-700" style={{ width: `${xpPct}%` }} />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-muted-foreground flex items-center gap-0.5"><Zap className="w-2.5 h-2.5 text-brand-orange" />{xp.toLocaleString()} XP</span>
          <span className="text-[10px] text-muted-foreground">{xpPct}% to Lv.{level + 1}</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 overflow-y-auto space-y-4 pb-2">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-semibold px-2 mb-1">{group.label}</p>
            <div className="space-y-0.5">
              {group.links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 text-sm",
                      isActive
                        ? "bg-brand-blue/15 text-brand-blue border border-brand-blue/20 font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    <Icon className={cn("size-4 shrink-0", isActive && "text-brand-blue")} />
                    <span className="truncate">{link.name}</span>
                    {isActive && <div className="ml-auto size-1.5 rounded-full bg-brand-blue shrink-0" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Settings */}
      <div className="p-3 border-t border-border/40 shrink-0">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 text-sm",
            pathname === "/settings"
              ? "bg-brand-blue/15 text-brand-blue border border-brand-blue/20"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
          )}
        >
          <Settings className="size-4 shrink-0" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
}
