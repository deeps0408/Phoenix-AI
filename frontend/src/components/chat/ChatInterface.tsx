"use client";

import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  role: "user" | "assistant";
  content: string;
  agentName?: string;
}

export function ChatInterface({ defaultAgent = "Phoenix Orchestrator" }: { defaultAgent?: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: `Hello! I'm your ${defaultAgent}. How can I help you learn today?` }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          user_id: "demo-user-123",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: data.response,
          agentName: data.agent_used
        }
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting to the server right now. Make sure the FastAPI backend is running!" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] rounded-xl border border-border/40 bg-card/50 backdrop-blur-xl shadow-lg shadow-brand-blue/5 overflow-hidden">
      <div className="p-4 border-b border-border/40 bg-background/50 flex items-center gap-3">
        <div className="size-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white">
          <Bot className="size-5" />
        </div>
        <div>
          <h3 className="font-bold">{defaultAgent}</h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="size-2 rounded-full bg-green-500 animate-pulse" /> Online
          </p>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 max-w-[80%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}>
              <Avatar className="size-8">
                {msg.role === "user" ? (
                  <>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>ST</AvatarFallback>
                  </>
                ) : (
                  <>
                    <div className="size-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white">
                      <Bot className="size-4" />
                    </div>
                  </>
                )}
              </Avatar>
              
              <div className="space-y-1 flex-1">
                <div className={`p-3 rounded-2xl ${msg.role === "user" ? "bg-brand-blue text-white rounded-tr-sm" : "bg-accent/50 text-foreground rounded-tl-sm"}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.agentName && (
                  <p className="text-[10px] text-muted-foreground ml-1">Routed by: {msg.agentName}</p>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 max-w-[80%]">
               <Avatar className="size-8">
                  <div className="size-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white">
                    <Bot className="size-4" />
                  </div>
              </Avatar>
              <div className="p-3 rounded-2xl bg-accent/50 text-foreground rounded-tl-sm flex items-center gap-2 h-10">
                <div className="size-2 rounded-full bg-brand-blue animate-bounce" />
                <div className="size-2 rounded-full bg-brand-purple animate-bounce delay-100" />
                <div className="size-2 rounded-full bg-brand-orange animate-bounce delay-200" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
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
          <Button type="submit" disabled={isLoading || !input.trim()} className="bg-brand-blue hover:bg-brand-blue/90 text-white">
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
