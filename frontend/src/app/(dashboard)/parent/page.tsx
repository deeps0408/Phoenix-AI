import { ChatInterface } from "@/components/chat/ChatInterface";

export default function ParentPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-4 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Parent Portal</h1>
        <p className="text-muted-foreground">Get easy-to-understand updates on your child's progress and attendance.</p>
      </div>
      <ChatInterface defaultAgent="Parent Agent" />
    </div>
  );
}
