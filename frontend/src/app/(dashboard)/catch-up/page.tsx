import { ChatInterface } from "@/components/chat/ChatInterface";

export default function CatchUpPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-4 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Catch-Up Planner</h1>
        <p className="text-muted-foreground">Tell me what you missed, and I'll generate a personalized roadmap to get you back on track.</p>
      </div>
      <ChatInterface defaultAgent="Catch-Up Agent" />
    </div>
  );
}
