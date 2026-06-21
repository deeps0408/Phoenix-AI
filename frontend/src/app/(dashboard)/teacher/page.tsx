import { ChatInterface } from "@/components/chat/ChatInterface";

export default function TeacherPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-4 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Teacher</h1>
        <p className="text-muted-foreground">Ask me anything, and I'll explain it to you simply and clearly.</p>
      </div>
      <ChatInterface defaultAgent="AI Teacher" />
    </div>
  );
}
