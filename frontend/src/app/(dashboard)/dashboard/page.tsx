"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Clock, Brain, Target, Activity, BookOpen } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Week 1", score: 45 },
  { name: "Week 2", score: 52 },
  { name: "Week 3", score: 68 },
  { name: "Week 4", score: 74 },
  { name: "Week 5", score: 85 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Student!</h1>
        <p className="text-muted-foreground">Here is your learning progress for this week.</p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-xl border-white/5 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
            <Flame className="size-4 text-brand-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14 Days</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-xl border-white/5 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
            <Clock className="size-4 text-brand-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32.5h</div>
            <p className="text-xs text-muted-foreground">+5h from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Recovery Score</CardTitle>
            <Activity className="size-4 text-brand-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <Progress value={78} className="h-2 mt-2 [&>div]:bg-brand-purple" />
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
            <Target className="size-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12/15</div>
            <p className="text-xs text-muted-foreground">3 remaining this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Chart */}
        <Card className="col-span-4 bg-card/50 backdrop-blur-xl border-white/5 shadow-md">
          <CardHeader>
            <CardTitle>Quiz Performance</CardTitle>
            <CardDescription>Your assessment scores over the last 5 weeks.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#ffffff10', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weak Subjects */}
        <Card className="col-span-3 bg-card/50 backdrop-blur-xl border-white/5 shadow-md">
          <CardHeader>
            <CardTitle>Focus Areas</CardTitle>
            <CardDescription>Topics that need more attention.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Brain className="size-8 p-2 bg-red-500/10 text-red-500 rounded-lg mr-4" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Algebra: Quadratic Equations</p>
                <p className="text-sm text-muted-foreground">Assessment score: 45%</p>
              </div>
            </div>
            <div className="flex items-center">
              <BookOpen className="size-8 p-2 bg-yellow-500/10 text-yellow-500 rounded-lg mr-4" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Physics: Kinematics</p>
                <p className="text-sm text-muted-foreground">Assessment score: 60%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
