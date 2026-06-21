import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Topbar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-10">
      <div className="w-96 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input 
          placeholder="Ask Phoenix anything..." 
          className="w-full pl-9 bg-accent/30 border-none focus-visible:ring-brand-blue" 
        />
      </div>
      
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-full hover:bg-accent/50 cursor-pointer text-muted-foreground transition-colors">
          <Bell className="size-5" />
        </div>
        
        <Avatar className="size-8 cursor-pointer ring-2 ring-brand-purple/20">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>ST</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
