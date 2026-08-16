"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  saveNote, generateNoteId, deriveTitleFromMessages,
  type ChatMessage, type SmartNote,
} from "@/lib/notes";
import { awardXP } from "@/lib/gamification";
import { showXPToast } from "@/components/ui/XPToast";

export function ChatInterface({ defaultAgent = "Phoenix Orchestrator" }: { defaultAgent?: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Hello! I'm your ${defaultAgent}. How can I help you learn today?`,
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const noteIdRef = useRef<string>(generateNoteId());
  const agentUsedRef = useRef<string>("orchestrator");

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Auto-save note whenever messages change (after first user message)
  useEffect(() => {
    const hasUser = messages.some((m) => m.role === "user");
    if (!hasUser) return;

    const note: SmartNote = {
      id: noteIdRef.current,
      title: deriveTitleFromMessages(messages),
      topic: defaultAgent,
      messages,
      createdAt: messages[0]?.timestamp ?? Date.now(),
      updatedAt: Date.now(),
      agentUsed: agentUsedRef.current,
    };
    saveNote(note);
  }, [messages, defaultAgent]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          user_id: "demo-user-123",
        }),
      });

      if (!response.ok) throw new Error(`Server responded with status ${response.status}`);

      const data = await response.json();
      agentUsedRef.current = data.agent_used ?? "orchestrator";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
          agentName: data.agent_used,
          timestamp: Date.now(),
        },
      ]);

      // Award XP for interacting with an AI agent
      const result = awardXP("message_sent");
      showXPToast({
        xp: result.xpEarned,
        reason: "Chat",
        levelUp: result.levelUp,
        newLevel: result.newLevel,
        badgeName: result.newBadges[0]?.name,
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Unable to connect to the backend. Please make sure the FastAPI server is running at http://localhost:8000.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNote = () => {
    const hasUser = messages.some((m) => m.role === "user");
    if (!hasUser) return;
    const note: SmartNote = {
      id: noteIdRef.current,
      title: deriveTitleFromMessages(messages),
      topic: defaultAgent,
      messages,
      createdAt: messages[0]?.timestamp ?? Date.now(),
      updatedAt: Date.now(),
      agentUsed: agentUsedRef.current,
    };
    saveNote(note);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] rounded-xl border border-border/40 bg-card/50 backdrop-blur-xl shadow-lg shadow-brand-blue/5 overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-border/40 bg-background/50 flex items-center gap-3">
        <div className="size-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white">
          <Bot className="size-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold">{defaultAgent}</h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="size-2 rounded-full bg-green-500 animate-pulse" /> Online
          </p>
        </div>
        {/* Save to Notes button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleSaveNote}
          className="gap-2 text-xs"
          title="Save this session as a Smart Note"
        >
          <BookmarkCheck className="size-3.5" />
          {savedToast ? "Saved! ✓" : "Save Note"}
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "max-w-[80%] ml-auto flex-row-reverse" : "max-w-[80%]"}`}>
            <Avatar className="size-8 shrink-0">
              {msg.role === "user" ? (
                <>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>ST</AvatarFallback>
                </>
              ) : (
                <div className="size-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white">
                  <Bot className="size-4" />
                </div>
              )}
            </Avatar>

            <div className="space-y-1 flex-1 min-w-0">
              <div className={`p-3 rounded-2xl ${msg.role === "user" ? "bg-brand-blue text-white rounded-tr-sm" : "bg-accent/50 text-foreground rounded-tl-sm"}`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
              </div>
              {msg.agentName && (
                <p className="text-[10px] text-muted-foreground ml-1">Routed by: {msg.agentName}</p>
              )}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-[80%]">
            <Avatar className="size-8 shrink-0">
              <div className="size-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white">
                <Bot className="size-4" />
              </div>
            </Avatar>
            <div className="p-3 rounded-2xl bg-accent/50 text-foreground rounded-tl-sm flex items-center gap-2 h-10">
              <div className="size-2 rounded-full bg-brand-blue animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="size-2 rounded-full bg-brand-purple animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="size-2 rounded-full bg-brand-orange animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border/40 bg-background/50">
        <form
          onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question or request a study plan..."
            className="flex-1 bg-accent/30 border-white/10"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-brand-blue hover:bg-brand-blue/90 text-white"
          >
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
