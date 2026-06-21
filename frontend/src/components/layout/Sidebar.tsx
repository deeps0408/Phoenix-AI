import Link from 'next/link';
import { BookOpen, Map, GraduationCap, LayoutDashboard, BrainCircuit, Heart, CloudOff, Library, Settings, Globe2, ClipboardCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'AI Teacher', href: '/teacher', icon: BookOpen },
  { name: 'Language Translation', href: '/language', icon: Globe2 },
  { name: 'Assessment & Quizzes', href: '/assessment', icon: ClipboardCheck },
  { name: 'Catch-Up Planner', href: '/catch-up', icon: Map },
  { name: 'Mentor', href: '/mentor', icon: GraduationCap },
  { name: 'Career Guidance', href: '/career', icon: BrainCircuit },
  { name: 'Parent Portal', href: '/parent', icon: Heart },
  { name: 'Resources', href: '/resources', icon: Library },
  { name: 'Offline Sync', href: '/offline', icon: CloudOff },
];

export function Sidebar() {
  return (
    <div className="w-64 flex flex-col h-screen border-r border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="p-6 flex items-center gap-3">
        <div className="size-8 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white font-bold shadow-lg shadow-brand-purple/20">
          P
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-orange">
          Phoenix AI
        </span>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200"
            >
              <Icon className="size-5" />
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border/40">
        <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200">
          <Settings className="size-5" />
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </div>
  );
}
