import { ChatInterface } from "@/components/chat/ChatInterface";

export default function AssessmentPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-4 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assessment & Quizzes</h1>
        <p className="text-muted-foreground">Test your knowledge with personalized quizzes and get instant feedback on your performance.</p>
      </div>
      <ChatInterface defaultAgent="Assessment Agent" />
    </div>
  );
}
