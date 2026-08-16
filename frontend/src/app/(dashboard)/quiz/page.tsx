"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BrainCircuit, PlayCircle, CheckCircle2, XCircle,
  ChevronRight, RotateCcw, Trophy, Loader2, BookOpen, Sparkles,
} from "lucide-react";
import { getAllNotes, type SmartNote } from "@/lib/notes";

interface MCQ {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

type Stage = "setup" | "loading" | "quiz" | "results";

const OPTION_LABELS = ["A", "B", "C", "D"];

export default function QuizCenterPage() {
  const [stage, setStage] = useState<Stage>("setup");
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState<MCQ[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ selected: string; correct: boolean }[]>([]);
  const [error, setError] = useState("");
  const [savedNotes, setSavedNotes] = useState<SmartNote[]>([]);
  const [selectedNote, setSelectedNote] = useState<SmartNote | null>(null);

  useEffect(() => {
    setSavedNotes(getAllNotes());
  }, []);

  const buildStudyContent = (note: SmartNote) =>
    note.messages
      .map((m) => `${m.role === "user" ? "Q" : "A"}: ${m.content}`)
      .join("\n")
      .slice(0, 3000);

  const generateQuiz = async () => {
    if (!topic.trim()) return;
    setStage("loading");
    setError("");
    setScore(0);
    setAnswers([]);
    setCurrent(0);
    setSelected(null);
    setRevealed(false);

    try {
      const body: Record<string, unknown> = {
        topic,
        num_questions: numQuestions,
      };
      if (selectedNote) {
        body.study_content = buildStudyContent(selectedNote);
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
      const res = await fetch(`${API_URL}/api/quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();

      if (!data.questions || data.questions.length === 0) {
        throw new Error("No questions returned");
      }
      setQuestions(data.questions);
      setStage("quiz");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to generate quiz.");
      setStage("setup");
    }
  };

  const handleSelect = (opt: string) => {
    if (revealed) return;
    setSelected(opt);
  };

  const handleConfirm = () => {
    if (!selected) return;
    const isCorrect = selected === questions[current].answer;
    setRevealed(true);
    if (isCorrect) setScore((s) => s + 1);
    setAnswers((prev) => [...prev, { selected, correct: isCorrect }]);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setStage("results");
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  const reset = () => {
    setStage("setup");
    setQuestions([]);
    setCurrent(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setAnswers([]);
    setSelectedNote(null);
  };

  const pct = Math.round((score / questions.length) * 100);
  const grade =
    pct >= 90 ? { label: "Excellent! 🏆", color: "text-green-500" } :
    pct >= 70 ? { label: "Good Job! 👍", color: "text-brand-blue" } :
    pct >= 50 ? { label: "Keep Practicing 📚", color: "text-brand-orange" } :
    { label: "Need More Study 💪", color: "text-red-500" };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-purple">Quiz Center</h1>
        <p className="text-muted-foreground mt-2">
          Generate MCQ quizzes from your study sessions or any topic.
        </p>
      </div>

      <AnimatePresence mode="wait">

        {/* ── SETUP ── */}
        {stage === "setup" && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-5"
          >
            <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <BrainCircuit className="w-5 h-5 text-brand-purple" />
                  Configure Your Quiz
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Topic */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quiz Topic</label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && generateQuiz()}
                    placeholder="e.g. Photosynthesis, World War II, Algebra..."
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-brand-purple text-sm"
                  />
                </div>

                {/* Number of questions */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Number of Questions</label>
                  <div className="flex gap-2">
                    {[3, 5, 10, 15].map((n) => (
                      <button
                        key={n}
                        onClick={() => setNumQuestions(n)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                          numQuestions === n
                            ? "bg-brand-purple text-white border-brand-purple"
                            : "bg-background border-border hover:border-brand-purple/50"
                        }`}
                      >
                        {n} Qs
                      </button>
                    ))}
                  </div>
                </div>

                {/* Use saved notes */}
                {savedNotes.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-brand-blue" />
                      Generate from Smart Note (optional)
                    </label>
                    <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                      <button
                        onClick={() => setSelectedNote(null)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${
                          !selectedNote
                            ? "border-brand-blue/50 bg-brand-blue/5 text-brand-blue"
                            : "border-border hover:border-brand-blue/30 text-muted-foreground"
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 inline mr-2 opacity-70" />
                        Use topic only (no notes)
                      </button>
                      {savedNotes.map((note) => (
                        <button
                          key={note.id}
                          onClick={() => { setSelectedNote(note); setTopic(note.title.slice(0, 60)); }}
                          className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${
                            selectedNote?.id === note.id
                              ? "border-brand-purple/50 bg-brand-purple/5 text-brand-purple"
                              : "border-border hover:border-brand-purple/30 text-muted-foreground"
                          }`}
                        >
                          <span className="font-medium text-foreground line-clamp-1">{note.title}</span>
                          <span className="text-xs opacity-60 block mt-0.5">
                            {note.messages.length} messages · {new Date(note.updatedAt).toLocaleDateString()}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {error && (
                  <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 px-4 py-2 rounded-lg">
                    ⚠️ {error}
                  </p>
                )}

                <Button
                  onClick={generateQuiz}
                  disabled={!topic.trim()}
                  className="w-full h-11 bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:opacity-90 gap-2 text-base"
                >
                  <PlayCircle className="w-5 h-5" />
                  Generate Quiz
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ── LOADING ── */}
        {stage === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-32 gap-5"
          >
            <div className="size-20 rounded-full bg-brand-purple/10 flex items-center justify-center">
              <Loader2 className="size-10 text-brand-purple animate-spin" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">Generating your quiz...</p>
              <p className="text-muted-foreground text-sm mt-1">
                AI is crafting {numQuestions} MCQ questions on "{topic}"
              </p>
            </div>
          </motion.div>
        )}

        {/* ── QUIZ ── */}
        {stage === "quiz" && questions.length > 0 && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="space-y-4"
          >
            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Question {current + 1} of {questions.length}</span>
                <span>Score: {score}/{current + (revealed ? 1 : 0)}</span>
              </div>
              <Progress value={((current + (revealed ? 1 : 0)) / questions.length) * 100} className="h-2" />
            </div>

            {/* Question card */}
            <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6 space-y-5">
                <div className="flex gap-3 items-start">
                  <span className="size-8 rounded-full bg-brand-purple/10 text-brand-purple flex items-center justify-center font-bold text-sm shrink-0">
                    {current + 1}
                  </span>
                  <p className="text-base font-semibold leading-snug pt-1">
                    {questions[current].question}
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-2.5">
                  <AnimatePresence>
                    {questions[current].options.map((opt, i) => {
                      const isCorrect = opt === questions[current].answer;
                      const isSelected = opt === selected;
                      let cls = "border-border hover:border-brand-purple/50 hover:bg-brand-purple/5";
                      if (revealed) {
                        if (isCorrect) cls = "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400";
                        else if (isSelected && !isCorrect) cls = "border-red-400 bg-red-400/10 text-red-600 dark:text-red-400";
                      } else if (isSelected) {
                        cls = "border-brand-purple bg-brand-purple/10 text-brand-purple";
                      }

                      return (
                        <motion.button
                          key={opt}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                          onClick={() => handleSelect(opt)}
                          disabled={revealed}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-all ${cls} ${revealed ? "cursor-default" : "cursor-pointer"}`}
                        >
                          <span className="size-6 rounded-full border border-current flex items-center justify-center font-bold text-xs shrink-0">
                            {OPTION_LABELS[i]}
                          </span>
                          <span className="flex-1">{opt}</span>
                          {revealed && isCorrect && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
                          {revealed && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Explanation */}
                {revealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl px-4 py-3 text-sm text-blue-800 dark:text-blue-300"
                  >
                    <span className="font-semibold">💡 Explanation: </span>
                    {questions[current].explanation}
                  </motion.div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3 pt-1">
                  {!revealed ? (
                    <Button
                      onClick={handleConfirm}
                      disabled={!selected}
                      className="flex-1 bg-brand-purple hover:bg-brand-purple/90 text-white gap-2"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="flex-1 bg-gradient-to-r from-brand-blue to-brand-purple text-white gap-2"
                    >
                      {current + 1 >= questions.length ? "See Results" : "Next Question"}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  )}
                  <Button variant="outline" size="icon" onClick={reset} title="Restart">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ── RESULTS ── */}
        {stage === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            {/* Score card */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-brand-purple/10 to-brand-blue/10 backdrop-blur-sm">
              <CardContent className="pt-8 pb-8 text-center space-y-4">
                <div className="size-20 rounded-full bg-white/20 dark:bg-white/10 flex items-center justify-center mx-auto shadow-lg">
                  <Trophy className="size-10 text-brand-orange" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${grade.color}`}>{grade.label}</p>
                  <p className="text-5xl font-black mt-2">{pct}%</p>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {score} correct out of {questions.length} questions
                  </p>
                  <Badge className="mt-3 bg-brand-purple/10 text-brand-purple border-brand-purple/20 text-sm px-4 py-1">
                    Topic: {topic}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Per-question review */}
            <div className="space-y-3">
              <h3 className="font-semibold text-base">Review Answers</h3>
              {questions.map((q, i) => {
                const ans = answers[i];
                return (
                  <Card key={i} className={`border shadow-sm ${ans?.correct ? "border-green-500/30 bg-green-50/30 dark:bg-green-950/10" : "border-red-400/30 bg-red-50/30 dark:bg-red-950/10"}`}>
                    <CardContent className="pt-4 pb-4 space-y-2">
                      <div className="flex gap-2 items-start">
                        {ans?.correct
                          ? <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          : <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                        }
                        <p className="text-sm font-medium">{q.question}</p>
                      </div>
                      {!ans?.correct && (
                        <p className="text-xs text-muted-foreground ml-6">
                          You chose: <span className="text-red-500">{ans?.selected}</span> ·{" "}
                          Correct: <span className="text-green-600">{q.answer}</span>
                        </p>
                      )}
                      <p className="text-xs text-blue-600 dark:text-blue-400 ml-6">💡 {q.explanation}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Button
              onClick={reset}
              className="w-full h-11 bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:opacity-90 gap-2 text-base"
            >
              <RotateCcw className="w-5 h-5" />
              Try Another Quiz
            </Button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
