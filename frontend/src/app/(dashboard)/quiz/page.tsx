"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Award, BrainCircuit } from "lucide-react";

export default function QuizCenterPage() {
  const upcomingQuizzes = [
    { id: 1, title: "Fractions & Decimals", subject: "Math", questions: 15, difficulty: "Medium" },
    { id: 2, title: "Solar System", subject: "Science", questions: 10, difficulty: "Easy" },
    { id: 3, title: "Basic Grammar", subject: "English", questions: 20, difficulty: "Hard" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-purple">Quiz Center</h1>
          <p className="text-muted-foreground mt-2">
            Test your knowledge, detect weaknesses, and get instant feedback.
          </p>
        </div>
        <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white gap-2">
          <BrainCircuit className="w-4 h-4" /> Generate New Quiz
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {upcomingQuizzes.map((quiz, i) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow bg-card/50 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-blue to-brand-purple"></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge variant="outline" className="bg-brand-blue/10 text-brand-blue border-brand-blue/20">
                    {quiz.subject}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {quiz.difficulty}
                  </Badge>
                </div>
                <CardTitle className="mt-4 text-xl">{quiz.title}</CardTitle>
                <CardDescription>{quiz.questions} Questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mt-2">
                  <Award className="w-4 h-4 mr-2 text-brand-orange" />
                  Earn up to {quiz.questions * 10} XP
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full group-hover:bg-brand-purple transition-colors gap-2">
                  <PlayCircle className="w-4 h-4" /> Start Quiz
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
