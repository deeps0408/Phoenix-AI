"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Trash2, BookOpen, MessageSquare, ChevronRight, X, Bot, User } from "lucide-react";
import { getAllNotes, deleteNote, type SmartNote } from "@/lib/notes";
import { generatePDF } from "@/lib/pdfGenerator";

export default function SmartNotesPage() {
  const [notes, setNotes] = useState<SmartNote[]>([]);
  const [selectedNote, setSelectedNote] = useState<SmartNote | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  const refresh = () => setNotes(getAllNotes());

  useEffect(() => {
    refresh();
    // Listen for storage changes (e.g., new notes saved from chat)
    const handler = () => refresh();
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNote(id);
    refresh();
    if (selectedNote?.id === id) setSelectedNote(null);
  };

  const handleDownloadPDF = async (note: SmartNote, e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloading(note.id);
    try {
      generatePDF(note);
    } finally {
      setTimeout(() => setDownloading(null), 1000);
    }
  };

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-blue">Smart Notes</h1>
          <p className="text-muted-foreground mt-2">
            All your study sessions auto-saved — download as PDF anytime.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
            {notes.length} {notes.length === 1 ? "note" : "notes"} saved
          </span>
          <Button variant="outline" size="sm" onClick={refresh} className="gap-2">
            Refresh
          </Button>
        </div>
      </div>

      {notes.length === 0 ? (
        /* Empty state */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 gap-4 text-center"
        >
          <div className="size-20 rounded-full bg-brand-blue/10 flex items-center justify-center">
            <BookOpen className="size-10 text-brand-blue/50" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">No notes yet</h3>
            <p className="text-muted-foreground mt-1 max-w-sm">
              Start chatting with any AI agent — your sessions will automatically appear here as Smart Notes.
            </p>
          </div>
          <Button
            variant="default"
            className="bg-brand-blue text-white hover:bg-brand-blue/90 mt-2"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Go to Dashboard & Start Chatting
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notes List */}
          <div className="lg:col-span-1 space-y-3">
            <AnimatePresence>
              {notes.map((note, i) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Card
                    onClick={() => setSelectedNote(note)}
                    className={`border cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md ${
                      selectedNote?.id === note.id
                        ? "border-brand-blue/50 bg-brand-blue/5 shadow-md"
                        : "border-border/40 bg-card/60 backdrop-blur-sm"
                    }`}
                  >
                    <CardHeader className="pb-2 pt-4 px-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="p-1.5 bg-brand-orange/10 rounded-lg text-brand-orange shrink-0 mt-0.5">
                          <FileText className="w-4 h-4" />
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 text-muted-foreground shrink-0 mt-1 transition-transform ${
                            selectedNote?.id === note.id ? "rotate-90 text-brand-blue" : ""
                          }`}
                        />
                      </div>
                      <CardTitle className="text-sm font-semibold leading-snug line-clamp-2 mt-2">
                        {note.title}
                      </CardTitle>
                      <CardDescription className="text-xs flex items-center gap-1.5 mt-1">
                        <MessageSquare className="w-3 h-3" />
                        {note.messages.length} messages · {formatDate(note.updatedAt)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-between items-center border-t pt-3 pb-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-brand-blue h-7 px-2 gap-1.5 text-xs"
                        onClick={(e) => handleDownloadPDF(note, e)}
                        disabled={downloading === note.id}
                      >
                        <Download className="w-3.5 h-3.5" />
                        {downloading === note.id ? "Generating..." : "PDF"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-red-500 h-7 px-2 gap-1.5 text-xs"
                        onClick={(e) => handleDelete(note.id, e)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Note Preview Panel */}
          <div className="lg:col-span-2">
            {selectedNote ? (
              <motion.div
                key={selectedNote.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-border/40 bg-card/60 backdrop-blur-sm shadow-md overflow-hidden"
              >
                {/* Preview Header */}
                <div className="p-4 border-b border-border/40 bg-background/50 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-lg leading-snug line-clamp-2">{selectedNote.title}</h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(selectedNote.createdAt)} · {selectedNote.messages.length} messages · Agent: {selectedNote.agentUsed}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      size="sm"
                      className="bg-brand-blue text-white hover:bg-brand-blue/90 gap-2 text-xs"
                      onClick={(e) => handleDownloadPDF(selectedNote, e)}
                      disabled={downloading === selectedNote.id}
                    >
                      <Download className="w-3.5 h-3.5" />
                      {downloading === selectedNote.id ? "Generating PDF..." : "Download PDF"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setSelectedNote(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages Preview */}
                <div className="overflow-y-auto max-h-[60vh] p-4 space-y-4">
                  {selectedNote.messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`size-8 rounded-full flex items-center justify-center shrink-0 ${
                          msg.role === "user"
                            ? "bg-brand-blue text-white"
                            : "bg-gradient-to-br from-brand-purple to-brand-blue text-white"
                        }`}
                      >
                        {msg.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
                      </div>
                      <div className="max-w-[80%] space-y-1">
                        <div
                          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                            msg.role === "user"
                              ? "bg-brand-blue text-white rounded-tr-sm"
                              : "bg-accent/50 text-foreground rounded-tl-sm"
                          }`}
                        >
                          {msg.content}
                        </div>
                        {msg.timestamp && (
                          <p className={`text-[10px] text-muted-foreground ${msg.role === "user" ? "text-right" : "text-left"}`}>
                            {new Date(msg.timestamp).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground gap-3 rounded-xl border border-dashed border-border/40">
                <FileText className="size-10 opacity-30" />
                <p className="text-sm">Select a note to preview it here</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
