"use client";

import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Target, 
  Coins, 
  TrendingUp, 
  Plus,
  Calendar,
  PiggyBank,
  Award
} from "lucide-react";

interface Goal {
  id: number;
  name: string;
  target: number;
  current: number;
  deadline: string;
}

interface Achievement {
  id: number;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export default function WealthGamificationApp() {
  const [level, setLevel] = useState(12);
  const [xp, setXp] = useState(65);
  const [savings, setSavings] = useState(10000);
  const [streak, setStreak] = useState(7);
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      name: "Emergency Fund",
      target: 25000,
      current: 10000,
      deadline: "2024-12-31"
    },
    {
      id: 2,
      name: "New Laptop",
      target: 5000,
      current: 2500,
      deadline: "2024-06-30"
    }
  ]);
  
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 1,
      name: "First Save",
      description: "Made your first savings deposit",
      unlocked: true,
      icon: "💰"
    },
    {
      id: 2,
      name: "Streak Master",
      description: "Maintained a 7-day saving streak",
      unlocked: true,
      icon: "🔥"
    },
    {
      id: 3,
      name: "Goal Setter",
      description: "Created your first savings goal",
      unlocked: true,
      icon: "🎯"
    }
  ]);

return (
    <div className="space-y-8">
      {/* Level and XP Progress */}
      <Card className="p-6 bg-black/50 border-green-500/20">
<div className="flex items-center gap-4">
          <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
            {level}
</div>
<div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">Level {level} Saver</h3>
<div className="flex items-center gap-3">
              <Progress value={xp} className="flex-1 h-2" />
              <span className="text-sm text-gray-300">{xp}% to Level {level + 1}</span>
</div>
</div>
</div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-black/50 border-green-500/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <PiggyBank className="h-6 w-6 text-green-500" />
</div>
<div>
              <p className="text-sm text-gray-400">Total Savings</p>
              <h3 className="text-2xl font-bold text-white">₹{savings.toLocaleString()}</h3>
</div>
</div>
        </Card>

        <Card className="p-6 bg-black/50 border-green-500/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Calendar className="h-6 w-6 text-green-500" />
</div>
<div>
              <p className="text-sm text-gray-400">Saving Streak</p>
              <h3 className="text-2xl font-bold text-white">{streak} days</h3>
</div>
</div>
        </Card>

        <Card className="p-6 bg-black/50 border-green-500/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Award className="h-6 w-6 text-green-500" />
</div>
<div>
              <p className="text-sm text-gray-400">Achievements</p>
              <h3 className="text-2xl font-bold text-white">
                {achievements.filter(a => a.unlocked).length}/{achievements.length}
</h3>
</div>
</div>
        </Card>
</div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="goals" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/50">
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="mt-4 space-y-4">
<div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Savings Goals</h3>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
</Button>
</div>

{goals.map(goal => (
            <Card key={goal.id} className="p-6 bg-black/50 border-green-500/20">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
<div>
                    <h4 className="text-lg font-semibold text-white">{goal.name}</h4>
                    <p className="text-sm text-gray-400">Target: ₹{goal.target.toLocaleString()}</p>
</div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                    {Math.round((goal.current / goal.target) * 100)}%
                  </Badge>
</div>
                <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>₹{goal.current.toLocaleString()}</span>
                  <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
</div>
</div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="achievements" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map(achievement => (
              <Card 
                key={achievement.id} 
                className={`p-6 ${
                  achievement.unlocked 
                    ? 'bg-green-500/10 border-green-500/20' 
                    : 'bg-black/50 border-gray-800'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{achievement.icon}</div>
<div>
                    <h4 className="font-semibold text-white">{achievement.name}</h4>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
</div>
                  {achievement.unlocked && (
                    <Badge className="ml-auto bg-green-500/20 text-green-400 border-green-500/20">
                      Unlocked
                    </Badge>
                  )}
</div>
</Card>
))}
</div>
</TabsContent>
</Tabs>
</div>
);
}
