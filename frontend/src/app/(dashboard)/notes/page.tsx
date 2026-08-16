"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Share2, Layers } from "lucide-react";

export default function SmartNotesPage() {
  const notes = [
    { id: 1, title: "Photosynthesis Summary", type: "Note", date: "Today" },
    { id: 2, title: "Algebra Basics", type: "Flashcards", date: "Yesterday" },
    { id: 3, title: "World War II", type: "Mind Map", date: "Oct 12" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-blue">Smart Notes</h1>
          <p className="text-muted-foreground mt-2">
            AI-generated summaries, flashcards, and mind maps.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Layers className="w-4 h-4" /> Create Note
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note, i) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="border-0 shadow-md bg-card/60 backdrop-blur-sm hover:-translate-y-1 transition-transform cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-brand-orange/10 rounded-lg text-brand-orange">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium bg-muted px-2 py-1 rounded-full">
                    {note.type}
                  </span>
                </div>
                <CardTitle className="mt-4 text-lg">{note.title}</CardTitle>
                <CardDescription>Generated {note.date}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between items-center border-t pt-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-brand-blue">
                  <Download className="w-4 h-4 mr-2" /> PDF
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-brand-purple">
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
