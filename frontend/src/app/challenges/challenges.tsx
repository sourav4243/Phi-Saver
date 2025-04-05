"use client";


import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from '@radix-ui/react-select';
import { Bell, UserPlus, Plus, Trophy, CalendarCheck, PiggyBank, LineChart, CreditCard, Lock, User, ArrowUp, ArrowDown } from "lucide-react";

// Data interfaces
interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  totalDays: number;
  daysCompleted: number;
  daysRemaining: number;
  reward: number;
  category: string;
  lastCompletedDate?: string; // Date when the challenge was last completed
}

interface ChallengeStats {
  activeChallenges: number;
  completedChallenges: number;
  totalExpEarned: number;
  currentStreak: number;
}

// Sample data - replace with actual data from your backend
const sampleChallenges: Challenge[] = [
  {
    id: '1',
    title: '30-Day Savings Sprint',
    description: 'Save ₹100 every day for 30 days',
    icon: 'fa-piggy-bank',
    progress: 70,
    totalDays: 30,
    daysCompleted: 21,
    daysRemaining: 9,
    reward: 500,
    category: 'savings'
  },
  {
    id: '2',
    title: 'No Dining Out',
    description: 'Skip restaurant meals for 3 weeks',
    icon: 'fa-utensils',
    progress: 52,
    totalDays: 21,
    daysCompleted: 11,
    daysRemaining: 10,
    reward: 600,
    category: 'spending'
  },
  {
    id: '3',
    title: 'Budget Master',
    description: 'Stay within budget for 2 weeks',
    icon: 'fa-wallet',
    progress: 85,
    totalDays: 14,
    daysCompleted: 12,
    daysRemaining: 2,
    reward: 300,
    category: 'budgeting'
  }
];

const sampleStats: ChallengeStats = {
  activeChallenges: 7,
  completedChallenges: 12,
  totalExpEarned: 1500,
  currentStreak: 8
};

const ChallengesComponent: React.FC = () => {
  const { theme } = useTheme();
  const [showAddFriendsDialog, setShowAddFriendsDialog] = useState(false);
  const [showNewChallengeDialog, setShowNewChallengeDialog] = useState(false);
  const [showFriendRequestsDialog, setShowFriendRequestsDialog] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    title: '',
    description: '',
    duration: '',
    reward: '',
    category: ''
  });

  // State for challenges and stats - replace with actual data fetching
  const [challenges, setChallenges] = useState<Challenge[]>(sampleChallenges);
  const [stats, setStats] = useState<ChallengeStats>(sampleStats);
  
  // Sample friend requests data - replace with actual data from your backend
  const [friendRequests, setFriendRequests] = useState([
    { id: '1', name: 'Priya Sharma', email: 'priya.sharma@example.com', date: '2023-04-01' },
    { id: '2', name: 'Rahul Patel', email: 'rahul.patel@example.com', date: '2023-04-02' }
  ]);

  // Function to check if a challenge can be continued today
  const canContinueChallenge = (challenge: Challenge): boolean => {
    if (!challenge.lastCompletedDate) return true;
    
    const today = new Date();
    const lastCompleted = new Date(challenge.lastCompletedDate);
    
    // Check if the last completion was on a different day
    return today.getDate() !== lastCompleted.getDate() || 
           today.getMonth() !== lastCompleted.getMonth() || 
           today.getFullYear() !== lastCompleted.getFullYear();
  };

  // Function to handle continuing a challenge
  const handleContinueChallenge = (challengeId: string) => {
    setChallenges(prevChallenges => 
      prevChallenges.map(challenge => {
        if (challenge.id === challengeId) {
          // Update the challenge with today's date as the last completed date
          const updatedChallenge = {
            ...challenge,
            lastCompletedDate: new Date().toISOString(),
            daysCompleted: challenge.daysCompleted + 1,
            daysRemaining: challenge.daysRemaining - 1,
            progress: Math.round(((challenge.daysCompleted + 1) / challenge.totalDays) * 100)
          };
          
          // Update stats
          setStats(prevStats => ({
            ...prevStats,
            totalExpEarned: Math.round(prevStats.totalExpEarned + challenge.reward / challenge.totalDays)
          }));
          
          return updatedChallenge;
        }
        return challenge;
      })
    );
  };

  const handleNewChallengeChange = (field: 'title' | 'description' | 'duration' | 'reward' | 'category', value: string) => {
    setNewChallenge(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateChallenge = () => {
    // Here you would typically send the data to your backend
    console.log('Creating new challenge:', newChallenge);
    setShowNewChallengeDialog(false);
    // Reset form
    setNewChallenge({
      title: '',
      description: '',
      duration: '',
      reward: '',
      category: ''
    });
  };
  
  const handleAcceptFriendRequest = (requestId: string) => {
    // Here you would typically send the acceptance to your backend
    console.log('Accepting friend request:', requestId);
    // Remove the accepted request from the list
    setFriendRequests(friendRequests.filter(request => request.id !== requestId));
  };
  
  const handleRejectFriendRequest = (requestId: string) => {
    // Here you would typically send the rejection to your backend
    console.log('Rejecting friend request:', requestId);
    // Remove the rejected request from the list
    setFriendRequests(friendRequests.filter(request => request.id !== requestId));
  };

  return (
    <div className="min-h-screen">
      {/* Header navbar*/}

      <main className="max-w-[1440px] mx-auto px-6 py-6">
        {/* Page Title and Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl text-white font-bold mb-1">Financial Challenges</h1>
            <p className="text-gray-600 dark:text-gray-400">Complete challenges to improve your financial health and earn rewards</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <Button 
              variant="outline" 
              className="border-green-500/20 text-white hover:bg-green-500/10"
              onClick={() => setShowAddFriendsDialog(true)}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add Friends 
            </Button>
            <Button 
              className="bg-green-500 hover:bg-green-600"
              onClick={() => setShowNewChallengeDialog(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Challenge
            </Button>
          </div>
        </div>

        {/* Challenge Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-sm bg-white border-green-500">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-black-400 mb-1">Active Challenges</p>
                  <h3 className="text-2xl font-bold">{Math.round(stats.activeChallenges)}</h3>
                  <div className="flex items-center mt-1 text-green-500">
                    <i className="fas fa-arrow-up mr-1 text-xs"></i>
                    <span className="text-sm">+2 from last month</span>
                  </div>
                </div>
                <div className="bg-green-500 p-3 rounded-full">
                  <i className="fas fa-running text-green-400 text-xl"></i>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm bg-white border-green-500">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-black-400 mb-1">Completed Challenges</p>
                  <h3 className="text-2xl font-bold">{Math.round(stats.completedChallenges)}</h3>
                  <div className="flex items-center mt-1 text-blue-500">
                    <i className="fas fa-trophy mr-1 text-xs"></i>
                    <span className="text-sm">+5 this quarter</span>
                  </div>
                </div>
                <div className="bg-blue-500 p-3 rounded-full">
                  <i className="fas fa-check-circle text-blue-400 text-xl"></i>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm bg-white border-green-500">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-black-400 mb-1">Total Exp Earned</p>
                  <h3 className="text-2xl font-bold">{Math.round(stats.totalExpEarned)}</h3>
                  <div className="flex items-center mt-1 text-purple-500">
                    <i className="fas fa-coins mr-1 text-xs"></i>
                    <span className="text-sm">+200 exp this month</span>
                  </div>
                </div>
                <div className="bg-purple-500 p-3 rounded-full">
                  <i className="fas fa-gift text-purple-400 text-xl"></i>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm bg-white border-green-500">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-black-400 mb-1">Current Streak</p>
                  <h3 className="text-2xl font-bold">{Math.round(stats.currentStreak)} Days</h3>
                  <div className="flex items-center mt-1 text-amber-500">
                    <i className="fas fa-fire mr-1 text-xs"></i>
                    <span className="text-sm">Keep it up!</span>
                  </div>
                </div>
                <div className="bg-amber-500 p-3 rounded-full">
                  <i className="fas fa-calendar-check text-amber-400 text-xl"></i>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>


        {/* Active Challenges */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-white font-bold">Active Challenges</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map(challenge => (
              <Card key={challenge.id} className="shadow-sm hover:shadow-md transition-shadow bg-white border-green-500">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="bg-green-500/20 p-2 rounded-full mr-3">
                        <i className={`fas ${challenge.icon} text-green-400`}></i>
                      </div>
                      <CardTitle>{challenge.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="mt-2">{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress: {challenge.daysCompleted}/{challenge.totalDays} days</span>
                      <span className="font-medium">{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <i className="fas fa-calendar-day text-gray-400 mr-2"></i>
                      <span>{challenge.daysRemaining} days remaining</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-coins text-amber-400 mr-2"></i>
                      <span>Reward: ₹{challenge.reward}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    className={`w-full ${canContinueChallenge(challenge) 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-gray-400 cursor-not-allowed'}`}
                    onClick={() => handleContinueChallenge(challenge.id)}
                    disabled={!canContinueChallenge(challenge)}
                  >
                    {canContinueChallenge(challenge) 
                      ? 'Continue Challenge' 
                      : 'Completed Today'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>


        {/* Achievements and Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
          {/* Achievements */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
              <CardDescription>Badges and rewards you've earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                    <Trophy className="text-white w-8 h-8" />
                  </div>
                  <span className="text-sm text-center">Savings Master</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                    <CalendarCheck className="text-white w-8 h-8" />
                  </div>
                  <span className="text-sm text-center">30-Day Streak</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-green-400 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                    <PiggyBank className="text-white w-8 h-8" />
                  </div>
                  <span className="text-sm text-center">Budget Pro</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                    <LineChart className="text-white w-8 h-8" />
                  </div>
                  <span className="text-sm text-center">Investor</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-red-400 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                    <CreditCard className="text-white w-8 h-8" />
                  </div>
                  <span className="text-sm text-center">Debt Crusher</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-gray-400 to-gray-600 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                    <Lock className="text-white w-8 h-8" />
                  </div>
                  <span className="text-sm text-center">Locked</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-gray-400 to-gray-600 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                    <Lock className="text-white w-8 h-8" />
                  </div>
                  <span className="text-sm text-center">Locked</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-gray-400 to-gray-600 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                    <Lock className="text-white w-8 h-8" />
                  </div>
                  <span className="text-sm text-center">Locked</span>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="font-medium mb-3">Recent Achievements</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <i className="fas fa-piggy-bank text-green-600"></i>
                      </div>
                      <div>
                        <p className="font-medium">Completed "No Spend Week"</p>
                        <p className="text-sm text-gray-500">Avoided unnecessary purchases for 7 days</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <i className="fas fa-chart-bar text-blue-600"></i>
                      </div>
                      <div>
                        <p className="font-medium">Completed "Budget Master"</p>
                        <p className="text-sm text-gray-500">Stayed under budget for 14 days</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">1 week ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Leaderboard */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Challenge Leaderboard</CardTitle>
              <CardDescription>See how you rank against other users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center bg-amber-200 dark:bg-amber-450/20 p-3 rounded-lg">
                  <div className="w-8 text-center font-bold text-amber-600">1</div>
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback className="bg-amber-100 text-amber-600 flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">Riya Kapoor</p>
                    <p className="text-sm text-gray-500">15 challenges completed</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">6,200 exp</p>
                    <p className="text-xs text-green-600 flex items-center justify-end">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      <span>+2</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center bg-gray-100 dark:bg-gray-300 p-3 rounded-lg">
                  <div className="w-8 text-center font-bold text-gray-600 dark:text-gray-900">2</div>
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback className="bg-blue-100 text-blue-600 flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">Arjun Singh</p>
                    <p className="text-sm text-gray-500">14 challenges completed</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">5,800 exp</p>
                    <p className="text-xs text-red-600 flex items-center justify-end">
                      <ArrowDown className="h-3 w-3 mr-1" />
                      <span>-1</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center bg-orange-50 dark:bg-orange-200 p-3 rounded-lg">
                  <div className="w-8 text-center font-bold text-orange-600 dark:text-orange-400">3</div>
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback className="bg-orange-100 text-orange-600 flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">Priya Mehta</p>
                    <p className="text-sm text-gray-500">13 challenges completed</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">5,500 exp</p>
                    <p className="text-xs text-green-600 flex items-center justify-end">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      <span>+1</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center bg-gray-50 dark:bg-gray-900/20 p-3 rounded-lg">
                  <div className="w-8 text-center font-bold text-gray-500">4</div>
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback className="bg-green-100 text-green-600 flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">You</p>
                    <p className="text-sm text-gray-500">12 challenges completed</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">4,250 exp</p>
                    <p className="text-xs text-green-600 flex items-center justify-end">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      <span>+2</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center bg-blue-50 dark:bg-blue-100/60 p-3 rounded-lg">
                  <div className="w-8 text-center font-bold text-gray-500 dark:text-gray-400">5</div>
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback className="bg-purple-100 text-purple-600 flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">Vikram Kumar</p>
                    <p className="text-sm text-gray-500">10 challenges completed</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">3,800 exp</p>
                    <p className="text-xs text-red-600 flex items-center justify-end">
                      <ArrowDown className="h-3 w-3 mr-1" />
                      <span>-1</span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full !rounded-button whitespace-nowrap cursor-pointer">
                  View Full Leaderboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Add Friends Dialog */}
      <Dialog open={showAddFriendsDialog} onOpenChange={setShowAddFriendsDialog}>
        <DialogContent className={`sm:max-w-[425px] ${theme === 'dark' ? 'bg-gray-900 text-white border-gray-800' : ''}`}>
          <DialogHeader>
            <DialogTitle>Add Friends</DialogTitle>
            <DialogDescription>
              Invite friends to join your financial challenges and compete together.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right font-medium">
                Email
              </label>
              <Input
                id="email"
                className={`col-span-3 border-none ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} !rounded-button`}
                placeholder="friend@example.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="message" className="text-right font-medium">
                Message
              </label>
              <Textarea
                id="message"
                className={`col-span-3 border-none ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} !rounded-button`}
                placeholder="Hey! Join me on PhiSaver for some fun financial challenges!"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddFriendsDialog(false)}
              className="!rounded-button whitespace-nowrap cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle sending invitation
                setShowAddFriendsDialog(false);
              }}
              className="bg-green-500 hover:bg-green-600 !rounded-button whitespace-nowrap cursor-pointer"
            >
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Challenge Dialog */}
      <Dialog open={showNewChallengeDialog} onOpenChange={setShowNewChallengeDialog}>
        <DialogContent className={`sm:max-w-[425px] ${theme === 'dark' ? 'bg-gray-900 text-white border-gray-800' : ''}`}>
          <DialogHeader>
            <DialogTitle>Create New Challenge</DialogTitle>
            <DialogDescription>
              Set up a new financial challenge for yourself or your friends.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right font-medium">
                Title
              </label>
              <Input
                id="title"
                className={`col-span-3 border-none ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} !rounded-button`}
                placeholder="e.g., 30-Day Savings Sprint"
                value={newChallenge.title}
                onChange={(e) => handleNewChallengeChange('title', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right font-medium">
                Description
              </label>
              <Textarea
                id="description"
                className={`col-span-3 border-none ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} !rounded-button`}
                placeholder="Describe your challenge..."
                value={newChallenge.description}
                onChange={(e) => handleNewChallengeChange('description', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="duration" className="text-right font-medium">
                Duration
              </label>
              <Input
                id="duration"
                type="number"
                min="1"
                className={`col-span-3 border-none ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} !rounded-button`}
                placeholder="30"
                value={newChallenge.duration}
                onChange={(e) => {
                  // Ensure only positive numbers are accepted
                  const value = parseInt(e.target.value);
                  if (value > 0 || e.target.value === '') {
                    handleNewChallengeChange('duration', e.target.value);
                  }
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="reward" className="text-right font-medium">
                Reward
              </label>
              <div className="col-span-3 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <Input
                  id="reward"
                  type="number"
                  className={`pl-7 border-none ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} !rounded-button`}
                  placeholder="500"
                  value={newChallenge.reward}
                  onChange={(e) => handleNewChallengeChange('reward', e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="category" className="text-right font-medium">
                Category
              </label>
              <Select 
                value={newChallenge.category} 
                onValueChange={(value) => handleNewChallengeChange('category', value)}
              >
                <SelectTrigger className={`col-span-3 border-none ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} !rounded-button`}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="savings">Savings</SelectItem>
                  <SelectItem value="spending">Spending</SelectItem>
                  <SelectItem value="budgeting">Budgeting</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewChallengeDialog(false)}
              className="!rounded-button whitespace-nowrap cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateChallenge}
              className="bg-green-500 hover:bg-green-600 !rounded-button whitespace-nowrap cursor-pointer"
            >
              Create Challenge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Friend Requests Dialog */}
      <Dialog open={showFriendRequestsDialog} onOpenChange={setShowFriendRequestsDialog}>
        <DialogContent className={`sm:max-w-[425px] w-[95%] ${theme === 'dark' ? 'bg-gray-900 text-white border-gray-800' : ''}`}>
          <DialogHeader>
            <DialogTitle>Friend Requests</DialogTitle>
            <DialogDescription>
              Accept or reject friend requests to connect with other users.
            </DialogDescription>
          </DialogHeader>
          
          {friendRequests.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">No pending friend requests</p>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              {friendRequests.map((request) => (
                <div key={request.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                    <Avatar>
                      <AvatarFallback>{request.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{request.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{request.email}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">Requested on {new Date(request.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 w-full sm:w-auto justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-500 border-red-500 hover:bg-red-500/10 flex-1 sm:flex-none"
                      onClick={() => handleRejectFriendRequest(request.id)}
                    >
                      Reject
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 flex-1 sm:flex-none"
                      onClick={() => handleAcceptFriendRequest(request.id)}
                    >
                      Accept
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowFriendRequestsDialog(false)}
              className="!rounded-button whitespace-nowrap cursor-pointer"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChallengesComponent;

