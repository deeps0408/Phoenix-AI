"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Languages, Copy, Check, Loader2 } from "lucide-react";

const languages = [
  "Hindi", "Bengali", "Tamil", "Telugu", "Marathi",
  "Gujarati", "Kannada", "Malayalam", "Punjabi", "Urdu",
  "French", "Spanish", "German", "Japanese", "Arabic", "Sanskrit",
];

export default function TranslatorPage() {
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Hindi");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setError("");
    setTranslatedText("");

    const prompt = `Translate the following text from ${sourceLang} to ${targetLang}:\n\n"${inputText}"`;
    const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

    try {
      const res = await fetch(`${API_URL}/api/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          source_language: sourceLang,
          target_language: targetLang,
        }),
      });

      if (!res.ok) throw new Error("Backend error");
      const data = await res.json();
      setTranslatedText(data.translation);
    } catch {
      // Fallback: use the general chat endpoint with a clear translation prompt
      try {
        const res = await fetch(`${API_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: prompt,
            user_id: "translator-user",
          }),
        });
        if (!res.ok) throw new Error("Chat endpoint error");
        const data = await res.json();
        setTranslatedText(data.response);
      } catch {
        setError("⚠️ Could not connect to the backend. Please ensure the FastAPI server is running.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwap = () => {
    if (sourceLang === "English") return; // Can't swap if source is English (we need to know it)
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(translatedText.replace(/\*\*.*?\*\*:?\s*/g, "").split("\n")[0] || translatedText);
    setTranslatedText("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-blue">Language Translator</h1>
        <p className="text-muted-foreground mt-2">
          AI-powered translation across 16+ languages with transliteration support.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Languages className="w-5 h-5 text-brand-blue" />
              Translate
            </CardTitle>
            <CardDescription>
              Type your text and select source & target language
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Language Selectors */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">From</label>
                <select
                  className="w-full bg-background border border-border rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                >
                  <option value="English">English</option>
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleSwap}
                className="shrink-0 text-brand-purple hover:text-brand-purple hover:bg-brand-purple/10 mt-5"
                title="Swap languages"
              >
                <ArrowRightLeft className="w-5 h-5" />
              </Button>

              <div className="flex-1 space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">To</label>
                <select
                  className="w-full bg-background border border-border rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Input & Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Input */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  {sourceLang} text
                </label>
                <textarea
                  className="w-full h-44 p-4 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none text-sm leading-relaxed"
                  placeholder={`Type in ${sourceLang}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.ctrlKey) handleTranslate();
                  }}
                />
                <p className="text-[11px] text-muted-foreground">
                  Tip: Press <kbd className="px-1 py-0.5 rounded border bg-muted text-xs">Ctrl+Enter</kbd> to translate
                </p>
              </div>

              {/* Output */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-muted-foreground">
                    {targetLang} translation
                  </label>
                  {translatedText && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      className="h-6 px-2 gap-1 text-xs text-muted-foreground hover:text-brand-blue"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  )}
                </div>
                <div className="w-full h-44 p-4 rounded-xl border border-border bg-muted/30 overflow-auto text-sm leading-relaxed">
                  {isLoading ? (
                    <div className="flex items-center gap-2 text-muted-foreground h-full justify-center">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Translating...</span>
                    </div>
                  ) : error ? (
                    <p className="text-red-500 text-sm">{error}</p>
                  ) : translatedText ? (
                    <div className="space-y-3 whitespace-pre-wrap text-foreground">
                      {/* Render bold markdown manually */}
                      {translatedText.split("\n").map((line, i) => {
                        const bold = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
                        return (
                          <p
                            key={i}
                            dangerouslySetInnerHTML={{ __html: bold }}
                            className={line.startsWith("**") ? "text-brand-blue font-medium" : ""}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic">Translation will appear here...</p>
                  )}
                </div>
              </div>
            </div>

            {/* Translate Button */}
            <Button
              onClick={handleTranslate}
              disabled={isLoading || !inputText.trim()}
              className="w-full bg-gradient-to-r from-brand-blue to-brand-purple text-white hover:opacity-90 h-11 text-base gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Translating...
                </>
              ) : (
                <>
                  <Languages className="w-4 h-4" />
                  Translate Now
                </>
              )}
            </Button>

            {/* Quick examples */}
            <div className="border-t pt-4">
              <p className="text-xs text-muted-foreground mb-2 font-medium">Quick examples:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Hello, how are you?",
                  "The sun rises in the east.",
                  "I love learning new things.",
                  "Water is life.",
                ].map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setInputText(ex)}
                    className="text-xs px-3 py-1.5 rounded-full bg-accent hover:bg-accent/80 text-muted-foreground hover:text-foreground transition-colors border border-border/50"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
