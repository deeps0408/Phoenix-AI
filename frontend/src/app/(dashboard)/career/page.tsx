import { ChatInterface } from "@/components/chat/ChatInterface";

export default function CareerPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-4 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Career Guidance</h1>
        <p className="text-muted-foreground">Discover career paths, get college recommendations, and explore your future.</p>
      </div>
      <ChatInterface defaultAgent="Career Guidance Agent" />
    </div>
  );
}
