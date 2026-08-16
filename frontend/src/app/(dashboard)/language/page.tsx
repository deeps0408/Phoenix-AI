import { ChatInterface } from "@/components/chat/ChatInterface";

export default function LanguagePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-4 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Language Translation</h1>
        <p className="text-muted-foreground">Translate lessons into your native language. Supports Hindi, Bengali, Tamil, Telugu, and more.</p>
      </div>
      <ChatInterface defaultAgent="Language Agent" />
    </div>
  );
}
