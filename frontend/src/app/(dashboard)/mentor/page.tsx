import { ChatInterface } from "@/components/chat/ChatInterface";

export default function MentorPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-4 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mentor & Planner</h1>
        <p className="text-muted-foreground">Let's build a study schedule, track habits, and achieve your goals.</p>
      </div>
      <ChatInterface defaultAgent="Mentor Agent" />
    </div>
  );
}
