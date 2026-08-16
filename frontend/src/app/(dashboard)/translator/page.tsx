"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Volume2, ArrowRightLeft } from "lucide-react";

const languages = ["English", "Hindi", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati"];

export default function TranslatorPage() {
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Hindi");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslate = () => {
    // Mock translation logic
    if (!inputText) return;
    setTranslatedText(`[${targetLang} Translation]: ${inputText}`);
  };

  const handleSwap = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-blue">Language Translator</h1>
        <p className="text-muted-foreground mt-2">
          Translate lessons and get bilingual explanations instantly.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Translate</CardTitle>
            <CardDescription>Type or speak to translate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Language Selectors */}
            <div className="flex items-center justify-between gap-4">
              <select 
                className="flex-1 bg-background border rounded-md p-2 text-sm"
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
              >
                {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
              </select>
              
              <Button variant="ghost" size="icon" onClick={handleSwap} className="shrink-0 text-brand-purple hover:text-brand-purple hover:bg-brand-purple/10">
                <ArrowRightLeft className="w-5 h-5" />
              </Button>

              <select 
                className="flex-1 bg-background border rounded-md p-2 text-sm"
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
              >
                {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
              </select>
            </div>

            {/* Input & Output Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <textarea
                  className="w-full h-40 p-4 rounded-md border bg-background/50 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  placeholder={`Type in ${sourceLang}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <div className="flex justify-between items-center">
                  <Button variant="outline" size="sm" className="gap-2 text-muted-foreground">
                    <Mic className="w-4 h-4" /> Speak
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-full h-40 p-4 rounded-md border bg-muted/50 overflow-auto">
                  {translatedText ? (
                    <p className="text-foreground">{translatedText}</p>
                  ) : (
                    <p className="text-muted-foreground italic">Translation will appear here...</p>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <Button variant="outline" size="sm" className="gap-2 text-muted-foreground">
                    <Volume2 className="w-4 h-4" /> Listen
                  </Button>
                </div>
              </div>
            </div>

            <Button onClick={handleTranslate} className="w-full bg-gradient-to-r from-brand-blue to-brand-purple text-white hover:opacity-90">
              Translate Now
            </Button>

          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
