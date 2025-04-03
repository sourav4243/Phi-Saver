// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useCallback } from 'react';
import * as echarts from 'echarts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import 'swiper/css';
import 'swiper/css/pagination';
const App: React.FC = () => {
const [currentLevel, setCurrentLevel] = useState(12);
const [xpProgress, setXpProgress] = useState(65);
const [streakCount, setStreakCount] = useState(28);
const [dailyGoal, setDailyGoal] = useState(15);
const [dailyProgress, setDailyProgress] = useState(10);
const [showExpenseDialog, setShowExpenseDialog] = useState(false);
const [petLevel, setPetLevel] = useState(2);
const [isDarkMode, setIsDarkMode] = useState(false);
const toggleTheme = useCallback(() => {
setIsDarkMode(prev => !prev);
// Here you would implement actual theme switching logic
// For example, adding/removing a class to the document body
if (!isDarkMode) {
document.documentElement.classList.add('dark-theme');
document.body.style.backgroundColor = '#121212';
document.body.style.color = '#ffffff';
} else {
document.documentElement.classList.remove('dark-theme');
document.body.style.backgroundColor = '';
document.body.style.color = '';
}
}, [isDarkMode]);
useEffect(() => {
// Initialize savings chart
const savingsChartElement = document.getElementById('savings-chart');
if (savingsChartElement) {
const savingsChart = echarts.init(savingsChartElement);
const option = {
animation: false,
tooltip: {
trigger: 'axis',
formatter: '{b}: ${c}'
},
grid: {
left: '3%',
right: '4%',
bottom: '3%',
containLabel: true
},
xAxis: {
type: 'category',
boundaryGap: false,
data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
},
yAxis: {
type: 'value',
axisLabel: {
formatter: '${value}'
}
},
series: [
{
name: 'Current Savings',
type: 'line',
data: [350, 480, 620, 790, 950, 1200, 1450, 1700, 1950, 2200, 2450, 2700],
itemStyle: {
color: '#16a34a'
},
areaStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: 'rgba(22, 163, 74, 0.5)' },
{ offset: 1, color: 'rgba(22, 163, 74, 0.1)' }
])
},
smooth: true
},
{
name: 'Projected Savings',
type: 'line',
data: [350, 480, 620, 790, 950, 1200, 1450, 1700, 1950, 2200, 2450, 3200],
itemStyle: {
color: '#047857'
},
lineStyle: {
type: 'dashed'
},
smooth: true
}
]
};
savingsChart.setOption(option);
window.addEventListener('resize', () => {
savingsChart.resize();
});
return () => {
savingsChart.dispose();
window.removeEventListener('resize', () => {
savingsChart.resize();
});
};
}
}, []);
const [expenses, setExpenses] = useState([
{ id: 1, category: 'Food', amount: 350, date: '2025-04-01', icon: 'fa-utensils', color: '#f59e0b' },
{ id: 2, category: 'Transport', amount: 200, date: '2025-04-01', icon: 'fa-car', color: '#3b82f6' },
{ id: 3, category: 'Entertainment', amount: 150, date: '2025-04-02', icon: 'fa-film', color: '#ec4899' },
{ id: 4, category: 'Shopping', amount: 250, date: '2025-04-02', icon: 'fa-shopping-bag', color: '#10b981' },
{ id: 5, category: 'Others', amount: 50, date: '2025-04-03', icon: 'fa-ellipsis-h', color: '#6366f1' },
{ id: 6, category: 'Food', amount: 120, date: '2025-04-03', icon: 'fa-utensils', color: '#f59e0b' },
]);
useEffect(() => {
// Initialize expense chart
const expenseChartElement = document.getElementById('expense-chart');
if (expenseChartElement) {
const expenseChart = echarts.init(expenseChartElement);
// Calculate totals for each category
const categoryTotals: Record<string, number> = {};
expenses.forEach(expense => {
if (categoryTotals[expense.category]) {
categoryTotals[expense.category] += expense.amount;
} else {
categoryTotals[expense.category] = expense.amount;
}
});
// Prepare data for chart
const chartData = Object.entries(categoryTotals).map(([category, total]) => {
const expenseItem = expenses.find(e => e.category === category);
return {
value: total,
name: category,
itemStyle: { color: expenseItem?.color }
};
});
const option = {
animation: false,
tooltip: {
trigger: 'item',
formatter: (params: any) => {
const percent = Math.round((params.value / expenses.reduce((sum, exp) => sum + exp.amount, 0)) * 100);
return `${params.name}: $${params.value} (${percent}%)`;
}
},
legend: {
orient: 'vertical',
right: 10,
top: 'center',
data: Object.keys(categoryTotals)
},
series: [
{
name: 'Expense Breakdown',
type: 'pie',
radius: ['50%', '70%'],
avoidLabelOverlap: false,
itemStyle: {
borderRadius: 10,
borderColor: '#fff',
borderWidth: 2
},
label: {
show: false,
position: 'center'
},
emphasis: {
label: {
show: true,
fontSize: 16,
fontWeight: 'bold'
}
},
labelLine: {
show: false
},
data: chartData
}
]
};
expenseChart.setOption(option);
window.addEventListener('resize', () => {
expenseChart.resize();
});
return () => {
expenseChart.dispose();
window.removeEventListener('resize', () => {
expenseChart.resize();
});
};
}
}, [expenses]);
const handleAddExpense = () => {
setShowExpenseDialog(true);
};
const [newExpense, setNewExpense] = useState({
category: 'food',
amount: '',
date: new Date().toISOString().split('T')[0],
note: ''
});
const handleExpenseChange = (field: string, value: string) => {
setNewExpense({
...newExpense,
[field]: value
});
};
const handleSaveExpense = () => {
// Validate amount
if (!newExpense.amount || parseFloat(newExpense.amount) <= 0) {
return;
}
// Create new expense object
const amount = parseFloat(newExpense.amount);
const categoryMap: Record<string, {icon: string, color: string}> = {
food: {icon: 'fa-utensils', color: '#f59e0b'},
transport: {icon: 'fa-car', color: '#3b82f6'},
entertainment: {icon: 'fa-film', color: '#ec4899'},
shopping: {icon: 'fa-shopping-bag', color: '#10b981'},
others: {icon: 'fa-ellipsis-h', color: '#6366f1'}
};
const newExpenseItem = {
id: expenses.length + 1,
category: newExpense.category.charAt(0).toUpperCase() + newExpense.category.slice(1),
amount,
date: newExpense.date,
icon: categoryMap[newExpense.category].icon,
color: categoryMap[newExpense.category].color
};
// Add to expenses list
setExpenses([newExpenseItem, ...expenses]);
// Close dialog and reset form
setShowExpenseDialog(false);
setNewExpense({
category: 'food',
amount: '',
date: new Date().toISOString().split('T')[0],
note: ''
});
// Update daily progress (saving money by tracking expenses)
setDailyProgress(Math.min(dailyProgress + 5, dailyGoal));
};
const badges = [
{ id: 1, name: 'Starter Saver', icon: 'fa-solid fa-piggy-bank', achieved: true },
{ id: 2, name: '7-Day Streak', icon: 'fa-solid fa-fire', achieved: true },
{ id: 3, name: 'Budget Master', icon: 'fa-solid fa-chart-line', achieved: true },
{ id: 4, name: 'Goal Crusher', icon: 'fa-solid fa-bullseye', achieved: true },
{ id: 5, name: 'Social Saver', icon: 'fa-solid fa-users', achieved: false },
{ id: 6, name: 'Money Mentor', icon: 'fa-solid fa-graduation-cap', achieved: false },
];
const leaderboard = [
{ id: 1, name: 'Alex Johnson', avatar: 'A', savings: 2850, level: 15 },
{ id: 2, name: 'You', avatar: 'Y', savings: 2700, level: 12 },
{ id: 3, name: 'Emma Wilson', avatar: 'E', savings: 2500, level: 11 },
{ id: 4, name: 'Michael Brown', avatar: 'M', savings: 2350, level: 10 },
{ id: 5, name: 'Sophia Davis', avatar: 'S', savings: 2100, level: 9 },
];
const challenges = [
{ id: 1, name: 'No Takeout Week', progress: 80, participants: 5, reward: '50 XP' },
{ id: 2, name: 'Coffee at Home', progress: 60, participants: 3, reward: '30 XP' },
{ id: 3, name: 'Weekend Spending Freeze', progress: 40, participants: 4, reward: '100 XP' },
];
const goals = [
{ id: 1, name: 'New Laptop', amount: 1200, saved: 800, image: 'https://public.readdy.ai/ai/img_res/63a404803d344f17e7696b85bd43065e.jpg' },
{ id: 2, name: 'Summer Vacation', amount: 2500, saved: 1500, image: 'https://public.readdy.ai/ai/img_res/4a71a37e53bfad2ce8468a79e7ccba48.jpg' },
{ id: 3, name: 'Emergency Fund', amount: 5000, saved: 2700, image: 'https://public.readdy.ai/ai/img_res/555a75a4b784feed513fc5ca9da1bbab.jpg' },
];
const petStages = [
{ level: 1, name: 'Baby Dragon', image: 'https://public.readdy.ai/ai/img_res/497316d619ba1975e873ddb7a171234a.jpg' },
{ level: 2, name: 'Young Dragon', image: 'https://public.readdy.ai/ai/img_res/0dd9d7cd4dd2a21ddccf107890cf9d8e.jpg' },
{ level: 3, name: 'Adult Dragon', image: 'https://public.readdy.ai/ai/img_res/56ad4a74e703f55580530ba31dced0f8.jpg' },
];
const currentPet = petStages.find(pet => pet.level === petLevel) || petStages[0];
return (
<div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-gradient-to-b from-green-50 to-white'}`}>
{/* Top Navigation */}
<header className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'} shadow-sm sticky top-0 z-50`}>
<div className="container mx-auto px-4 py-3 flex justify-between items-center">
<div className="flex items-center gap-2">
<img src="https://static.readdy.ai/image/1d12ed58f30bd87413fd7dae56545de9/53472d93773a9a227c1fe28df95cc16f.jpeg" alt="PHI SAVER Logo" className="h-10 w-10" />
<span className="text-2xl text-green-600 font-bold">PHI SAVER</span>
<Badge variant="outline" className="bg-green-100 text-green-800 ml-2">BETA</Badge>
</div>
<div className="flex items-center gap-4">
<div className="flex items-center mr-2 relative group" onClick={toggleTheme}>
<div className={`w-10 h-5 ${isDarkMode ? 'bg-green-800' : 'bg-gray-200'} rounded-full p-1 duration-300 ease-in-out group-hover:${isDarkMode ? 'bg-green-700' : 'bg-gray-300'}`}>
<div className={`${isDarkMode ? 'bg-green-400' : 'bg-white'} w-3 h-3 rounded-full shadow-md transform duration-300 ease-in-out ${isDarkMode ? 'translate-x-5' : ''} cursor-pointer`}></div>
</div>
<span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} hidden md:inline`}>{isDarkMode ? 'Dark' : 'Light'}</span>
</div>
<Button variant="ghost" size="sm" className="!rounded-button whitespace-nowrap cursor-pointer" onClick={() => alert('Notifications clicked')}>
<i className="fa-solid fa-bell mr-2 text-green-500"></i>
<span className="hidden md:inline">Notifications</span>
</Button>
<Button variant="ghost" size="sm" className="!rounded-button whitespace-nowrap cursor-pointer" onClick={() => alert('Settings clicked')}>
<i className="fa-solid fa-gear mr-2 text-green-500"></i>
<span className="hidden md:inline">Settings</span>
</Button>
<Dialog>
<DialogTrigger asChild>
<Avatar className="cursor-pointer">
<AvatarImage src="https://public.readdy.ai/ai/img_res/a12b5249664aa360ce57ca5d3dcf5221.jpg" />
<AvatarFallback>JD</AvatarFallback>
</Avatar>
</DialogTrigger>
<DialogContent className={`sm:max-w-[425px] ${isDarkMode ? 'bg-gray-900 text-white border-gray-800' : ''}`}>
<DialogHeader>
<DialogTitle>Profile</DialogTitle>
<DialogDescription>
Your personal information and account settings.
</DialogDescription>
</DialogHeader>
<div className="py-4">
<div className="flex flex-col items-center mb-4">
<Avatar className="h-20 w-20 mb-2">
<AvatarImage src="https://readdy.ai/api/search-image?query=Professional headshot portrait of a young diverse person with friendly smile, neutral background, high quality professional photography, modern clean look, soft lighting&width=80&height=80&seq=7&orientation=squarish" />
<AvatarFallback className="text-xl">JD</AvatarFallback>
</Avatar>
<h3 className="font-bold text-lg">John Doe</h3>
<p className="text-gray-500 text-sm">john.doe@example.com</p>
</div>
<div className="space-y-3">
<div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
<i className="fa-solid fa-user"></i>
</div>
<span>Account Settings</span>
</div>
<i className="fa-solid fa-chevron-right text-gray-400"></i>
</div>
<div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
<i className="fa-solid fa-bell"></i>
</div>
<span>Notifications</span>
</div>
<i className="fa-solid fa-chevron-right text-gray-400"></i>
</div>
<div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
<i className="fa-solid fa-lock"></i>
</div>
<span>Privacy & Security</span>
</div>
<i className="fa-solid fa-chevron-right text-gray-400"></i>
</div>
<div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
<i className="fa-solid fa-question-circle"></i>
</div>
<span>Help & Support</span>
</div>
<i className="fa-solid fa-chevron-right text-gray-400"></i>
</div>
</div>
</div>
<DialogFooter>
<Button variant="outline" className="!rounded-button whitespace-nowrap cursor-pointer">
<i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
Sign Out
</Button>
</DialogFooter>
</DialogContent>
</Dialog>
</div>
</div>
</header>
<main className="container mx-auto px-4 py-6">
{/* User Stats Bar */}
<div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'} rounded-xl shadow-md p-4 mb-6 flex flex-wrap justify-between items-center`}>
<div className="flex items-center gap-4 mb-2 md:mb-0">
<div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
{currentLevel}
</div>
<div>
<h3 className="font-semibold">Level {currentLevel} Explorer</h3>
<div className="flex items-center gap-2">
<Progress value={xpProgress} className="w-32 h-2" />
<span className="text-xs text-gray-500">{xpProgress}% to Level {currentLevel + 1}</span>
</div>
</div>
</div>
<div className="flex items-center gap-4 mb-2 md:mb-0">
<div className="bg-amber-100 text-amber-800 rounded-lg px-3 py-1 flex items-center">
<i className="fa-solid fa-fire text-amber-500 mr-2"></i>
<span className="font-medium">{streakCount} Day Streak</span>
</div>
<div className="bg-green-100 text-green-800 rounded-lg px-3 py-1 flex items-center">
<i className="fa-solid fa-sack-dollar text-green-500 mr-2"></i>
<span className="font-medium">$2,700 Saved</span>
</div>
</div>
<div className="flex gap-2">
<Button variant="outline" className="!rounded-button whitespace-nowrap cursor-pointer" onClick={handleAddExpense}>
<i className="fa-solid fa-plus mr-2"></i>Log Expense
</Button>
<Button className="bg-green-600 hover:bg-green-700 !rounded-button whitespace-nowrap cursor-pointer" onClick={() => alert('Add Savings clicked')}>
<i className="fa-solid fa-piggy-bank mr-2"></i>Add Savings
</Button>
</div>
</div>
{/* Main Content Grid */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
{/* Left Column */}
<div className="lg:col-span-2 space-y-6">
{/* Daily Goal Card */}
<Card className={isDarkMode ? 'bg-gray-900 text-white border-gray-800' : ''}>
<CardHeader className="pb-2">
<div className="flex justify-between items-center">
<CardTitle>Today's Saving Goal</CardTitle>
<Badge variant="outline" className="bg-green-100 text-green-800">
<i className="fa-solid fa-calendar-day mr-1"></i>
{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
</Badge>
</div>
<CardDescription>Save ${dailyGoal} today to keep your streak going!</CardDescription>
</CardHeader>
<CardContent>
<div className="space-y-4">
<div className="flex justify-between items-center">
<span className="font-medium">${dailyProgress} / ${dailyGoal}</span>
<span className="text-sm text-gray-500">{Math.round((dailyProgress / dailyGoal) * 100)}% Complete</span>
</div>
<Progress value={(dailyProgress / dailyGoal) * 100} className="h-3" />
<div className={`${isDarkMode ? 'bg-green-900' : 'bg-green-50'} rounded-lg p-4 flex items-center gap-4`}>
<div className={`${isDarkMode ? 'bg-green-800' : 'bg-green-100'} rounded-full p-3`}>
<i className={`fa-solid fa-dragon ${isDarkMode ? 'text-green-400' : 'text-green-600'} text-xl`}></i>
</div>
<div className="flex-1">
<h4 className="font-medium">Defeat the Spending Dragon!</h4>
<p className="text-sm text-gray-600">Every $5 saved helps you battle the dragon. Complete your goal to win!</p>
</div>
<Button className="bg-green-600 hover:bg-green-700 !rounded-button whitespace-nowrap cursor-pointer" onClick={() => setDailyProgress(Math.min(dailyProgress + 5, dailyGoal))}>Battle Now</Button>
</div>
</div>
</CardContent>
</Card>
{/* Charts Section */}
<Card className={isDarkMode ? 'bg-gray-900 text-white border-gray-800' : ''}>
<CardHeader>
<Tabs defaultValue="savings" className="w-full">
<div className="flex justify-between items-center">
<CardTitle>Financial Progress</CardTitle>
<TabsList>
<TabsTrigger value="savings" className={`!rounded-button whitespace-nowrap cursor-pointer ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Savings</TabsTrigger>
<TabsTrigger value="expenses" className={`!rounded-button whitespace-nowrap cursor-pointer ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Expenses</TabsTrigger>
</TabsList>
</div>
</Tabs>
</CardHeader>
<CardContent>
<Tabs defaultValue="savings" className="w-full">
<TabsContent value="savings" className="mt-0">
<div id="savings-chart" className="w-full h-[300px]"></div>
</TabsContent>
<TabsContent value="expenses" className="mt-0">
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
<div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-lg shadow-sm p-4 border`}>
<div className="flex items-center gap-3">
<div className="bg-amber-100 p-3 rounded-full">
<i className="fa-solid fa-calendar-day text-amber-600"></i>
</div>
<div>
<p className="text-sm text-gray-500">Today's Expenses</p>
<p className="text-xl font-bold">${expenses.filter(e => e.date === '2025-04-03').reduce((sum, exp) => sum + exp.amount, 0)}</p>
</div>
</div>
</div>
<div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-lg shadow-sm p-4 border`}>
<div className="flex items-center gap-3">
<div className={`${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} p-3 rounded-full`}>
<i className={`fa-solid fa-calendar-week ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}></i>
</div>
<div>
<p className="text-sm text-gray-500">This Week</p>
<p className="text-xl font-bold">${expenses.reduce((sum, exp) => sum + exp.amount, 0)}</p>
</div>
</div>
</div>
<div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-lg shadow-sm p-4 border`}>
<div className="flex items-center gap-3">
<div className={`${isDarkMode ? 'bg-green-900' : 'bg-green-100'} p-3 rounded-full`}>
<i className={`fa-solid fa-chart-pie ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}></i>
</div>
<div>
<p className="text-sm text-gray-500">Biggest Category</p>
<p className="text-xl font-bold">Food (${expenses.filter(e => e.category === 'Food').reduce((sum, exp) => sum + exp.amount, 0)})</p>
</div>
</div>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="md:col-span-2">
<div id="expense-chart" className="w-full h-[300px]"></div>
</div>
<div>
<div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-lg shadow-sm p-4 border h-[300px] overflow-auto`}>
<h3 className="font-medium mb-3 flex items-center">
<i className="fa-solid fa-receipt mr-2 text-indigo-600"></i>
Recent Expenses
</h3>
<div className="space-y-3">
{expenses.map(expense => (
<div key={expense.id} className={`flex items-center justify-between p-2 hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${expense.color}20` }}>
<i className={`fa-solid ${expense.icon}`} style={{ color: expense.color }}></i>
</div>
<div>
<p className="font-medium text-sm">{expense.category}</p>
<p className="text-xs text-gray-500">{new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
</div>
</div>
<p className="font-medium">${expense.amount}</p>
</div>
))}
</div>
</div>
</div>
</div>
</TabsContent>
</Tabs>
</CardContent>
</Card>
{/* Savings Goals */}
<Card className={isDarkMode ? 'bg-gray-900 text-white border-gray-800' : ''}>
<CardHeader>
<div className="flex justify-between items-center">
<CardTitle>Savings Goals</CardTitle>
<Button variant="outline" className={`!rounded-button whitespace-nowrap cursor-pointer ${isDarkMode ? 'text-green-400 border-green-800' : 'text-green-600 border-green-200'}`} onClick={() => alert('New Goal clicked')}>
<i className="fa-solid fa-plus mr-2"></i>New Goal
</Button>
</div>
<CardDescription>Visualize what you're saving for</CardDescription>
</CardHeader>
<CardContent>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{goals.map(goal => (
<div key={goal.id} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow`}>
<div className="flex items-center gap-3 mb-3">
<img
src={goal.image}
alt={goal.name}
className="w-12 h-12 rounded-lg object-cover object-top"
/>
<div>
<h4 className="font-medium">{goal.name}</h4>
<p className="text-sm text-gray-500">${goal.saved} of ${goal.amount}</p>
</div>
</div>
<Progress value={(goal.saved / goal.amount) * 100} className="h-2 mb-2" />
<div className="flex justify-between items-center text-xs text-gray-500">
<span>{Math.round((goal.saved / goal.amount) * 100)}% Complete</span>
<span>${goal.amount - goal.saved} to go</span>
</div>
</div>
))}
</div>
</CardContent>
</Card>
</div>
{/* Right Column */}
<div className="space-y-6">
{/* Virtual Pet Card */}
<Card className={isDarkMode ? 'bg-gray-900 text-white border-gray-800' : ''}>
<CardHeader className="pb-2">
<CardTitle>Your Companion</CardTitle>
<CardDescription>Level up your pet by saving more!</CardDescription>
</CardHeader>
<CardContent className="text-center">
<img
src={currentPet.image}
alt={currentPet.name}
className="w-48 h-48 mx-auto mb-4 object-contain"
/>
<h3 className="font-bold text-lg">{currentPet.name}</h3>
<p className="text-gray-500 mb-4">Level {petLevel} • {petLevel === 3 ? 'Fully Evolved' : `${petLevel}/3 Evolution`}</p>
{petLevel < 3 && (
<div className={`${isDarkMode ? 'bg-amber-900' : 'bg-amber-50'} rounded-lg p-3 text-left mb-4`}>
<p className={`${isDarkMode ? 'text-amber-200' : 'text-amber-800'} text-sm`}>
<i className={`fa-solid fa-lightbulb ${isDarkMode ? 'text-amber-400' : 'text-amber-500'} mr-2`}></i>
Save ${(petLevel + 1) * 500} more to evolve your companion to the next stage!
</p>
</div>
)}
<div className="grid grid-cols-2 gap-2">
<Button variant="outline" className="!rounded-button whitespace-nowrap cursor-pointer text-black" onClick={() => alert('Customize pet clicked')}>
<i className="fa-solid fa-hat-wizard mr-2"></i>Customize
</Button>
<Button className="bg-green-600 hover:bg-green-700 !rounded-button whitespace-nowrap cursor-pointer" onClick={() => setPetLevel(Math.min(petLevel + 1, 3))}>
<i className="fa-solid fa-gift mr-2"></i>Feed Pet
</Button>
</div>
</CardContent>
</Card>
{/* Achievements */}
<Card className={isDarkMode ? 'bg-gray-900 text-white border-gray-800' : ''}>
<CardHeader className="pb-2">
<CardTitle>Your Achievements</CardTitle>
<CardDescription>Badges earned through your savings journey</CardDescription>
</CardHeader>
<CardContent>
<ScrollArea className="h-[180px] pr-4">
<div className="grid grid-cols-2 gap-3">
{badges.map(badge => (
<div
key={badge.id}
className={`border rounded-lg p-3 flex items-center gap-3 ${
badge.achieved
? isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
: isDarkMode ? 'bg-gray-900 opacity-60 border-gray-800' : 'bg-gray-50 opacity-60'
}`}
>
<div className={`w-10 h-10 rounded-full flex items-center justify-center ${
badge.achieved
? isDarkMode ? 'bg-green-900 text-green-400' : 'bg-green-100 text-green-600'
: isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'
}`}>
<i className={badge.icon}></i>
</div>
<div>
<h4 className="font-medium text-sm">{badge.name}</h4>
<p className="text-xs text-gray-500">
{badge.achieved ? 'Achieved' : 'Locked'}
</p>
</div>
</div>
))}
</div>
</ScrollArea>
</CardContent>
</Card>
{/* Social & Challenges */}
<Card className={isDarkMode ? 'bg-gray-900 text-white border-gray-800' : ''}>
<CardHeader className="pb-2">
<Tabs defaultValue="challenges" className="w-full">
<div className="flex justify-between items-center">
<CardTitle>Community</CardTitle>
<TabsList>
<TabsTrigger value="leaderboard" className="!rounded-button whitespace-nowrap cursor-pointer">Leaderboard</TabsTrigger>
<TabsTrigger value="challenges" className="!rounded-button whitespace-nowrap cursor-pointer">Challenges</TabsTrigger>
</TabsList>
</div>
</Tabs>
</CardHeader>
<CardContent>
<Tabs defaultValue="challenges" className="w-full">
<TabsContent value="leaderboard" className="mt-0 space-y-4">
<div className={`${isDarkMode ? 'bg-green-900' : 'bg-green-50'} rounded-lg p-3 text-center`}>
<p className={`${isDarkMode ? 'text-green-200' : 'text-green-800'} text-sm`}>
<i className={`fa-solid fa-crown ${isDarkMode ? 'text-amber-400' : 'text-amber-500'} mr-2`}></i>
You're in the top 10% of savers in your age group!
</p>
</div>
<div className="space-y-3">
{leaderboard.map((user, index) => (
<div
key={user.id}
className={`flex items-center gap-3 p-2 rounded-lg ${
user.name === 'You' ? isDarkMode ? 'bg-green-900' : 'bg-green-50' : ''
}`}
>
<div className="w-6 text-center font-bold text-gray-500">#{index + 1}</div>
<Avatar className="h-8 w-8">
<AvatarFallback className={user.name === 'You' ? 'bg-green-200 text-green-700' : ''}>
{user.avatar}
</AvatarFallback>
</Avatar>
<div className="flex-1">
<p className={`font-medium text-sm ${user.name === 'You' ? 'text-green-700' : ''}`}>
{user.name}
</p>
</div>
<div className="text-right">
<p className="font-medium">${user.savings}</p>
<p className="text-xs text-gray-500">Level {user.level}</p>
</div>
</div>
))}
</div>
</TabsContent>
<TabsContent value="challenges" className="mt-0">
<div className="space-y-4">
<div className={`${isDarkMode ? 'bg-gradient-to-r from-green-900 to-green-800' : 'bg-gradient-to-r from-green-600 to-green-700'} rounded-xl p-4 text-white mb-4`}>
<div className="flex justify-between items-start mb-3">
<div>
<h3 className="font-bold text-lg">April Savings Challenge</h3>
<p className="opacity-90">Save $500 this month</p>
</div>
<Badge className="bg-white text-green-700 hover:bg-gray-100">200 XP Reward</Badge>
</div>
<div className="bg-white/20 rounded-lg p-3 mb-3">
<div className="flex justify-between items-center mb-1">
<span className="text-sm font-medium">Your progress: $320 / $500</span>
<span className="text-sm font-medium">64%</span>
</div>
<Progress value={64} className="h-2 bg-white/30" />
</div>
<div className="flex justify-between items-center text-sm">
<div className="flex items-center gap-1">
<i className="fa-solid fa-users"></i>
<span>42 participants</span>
</div>
<div className="flex items-center gap-1">
<i className="fa-solid fa-calendar-day"></i>
<span>17 days left</span>
</div>
</div>
</div>
<div className="flex justify-between items-center mb-3">
<h4 className="font-medium">Active Challenges</h4>
<Button variant="outline" size="sm" className="!rounded-button whitespace-nowrap cursor-pointer" onClick={() => alert('Join More Challenges clicked')}>
<i className="fa-solid fa-plus mr-2"></i>Join More
</Button>
</div>
{challenges.map(challenge => (
<div key={challenge.id} className={`border ${isDarkMode ? 'border-gray-700' : ''} rounded-lg p-4 hover:shadow-md transition-shadow`}>
<div className="flex justify-between items-start mb-2">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
{challenge.id === 1 && <i className="fa-solid fa-utensils"></i>}
{challenge.id === 2 && <i className="fa-solid fa-mug-hot"></i>}
{challenge.id === 3 && <i className="fa-solid fa-snowflake"></i>}
</div>
<h4 className="font-medium">{challenge.name}</h4>
</div>
<Badge>{challenge.reward}</Badge>
</div>
<p className="text-sm text-gray-500 mb-2">
<i className="fa-solid fa-users mr-1"></i> {challenge.participants} participants • {7 - Math.floor(challenge.progress / 20)} days left
</p>
<Progress value={challenge.progress} className="h-2 mb-1" />
<div className="flex justify-between text-xs text-gray-500">
<span>{challenge.progress}% Complete</span>
<span className="text-indigo-600 font-medium cursor-pointer hover:underline">View Details</span>
</div>
</div>
))}
<div className="mt-4">
<Button className="w-full bg-green-600 hover:bg-green-700 !rounded-button whitespace-nowrap cursor-pointer" onClick={() => alert('Create New Challenge clicked')}>
<i className="fa-solid fa-plus mr-2"></i>Create New Challenge
</Button>
</div>
</div>
</TabsContent>
</Tabs>
</CardContent>
</Card>
</div>
</div>
{/* What You Can Buy Section */}
<div className="mt-8">
<h2 className="text-2xl font-bold mb-4 flex items-center">
<i className="fa-solid fa-shopping-bag text-green-600 mr-3 text-3xl"></i>
What You Can Buy With Your Savings
</h2>
<div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
<div className="mb-4 text-gray-800">
<p className="text-lg font-medium mb-2">Your current savings: <span className="font-bold text-xl">$2,700</span></p>
<p className="text-gray-600">Here are some things you could purchase with your savings:</p>
</div>
<Swiper
modules={[Pagination, Autoplay]}
pagination={{ clickable: true }}
autoplay={{ delay: 5000 }}
spaceBetween={20}
slidesPerView={1}
breakpoints={{
640: { slidesPerView: 2 },
1024: { slidesPerView: 3 },
}}
className="pb-10"
>
<SwiperSlide>
<div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl overflow-hidden shadow-md h-full transform transition-transform hover:scale-105`}>
<div className="relative">
<img
src="https://public.readdy.ai/ai/img_res/d9749838d21a0e3b3df29d565205f8ac.jpg"
alt="Premium Headphones"
className="w-full h-48 object-cover object-top"
/>
<div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
Affordable Now
</div>
</div>
<div className="p-4">
<h3 className="font-bold text-lg">Premium Headphones</h3>
<div className="flex justify-between items-center mb-2">
<p className="text-green-600 font-bold">$299</p>
<Badge variant="outline" className="bg-green-100 text-green-800">11% of savings</Badge>
</div>
<p className="text-gray-500 mb-3 text-sm">You can buy this 9 times with your current savings!</p>
<Button className="w-full bg-green-600 hover:bg-green-700 !rounded-button whitespace-nowrap cursor-pointer" onClick={() => alert('Premium Headphones set as goal')}>
<i className="fa-solid fa-cart-shopping mr-2"></i>Set as Goal
</Button>
</div>
</div>
</SwiperSlide>
<SwiperSlide>
<div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl overflow-hidden shadow-md h-full transform transition-transform hover:scale-105`}>
<div className="relative">
<img
src="https://public.readdy.ai/ai/img_res/a104e1a81f43cf5856d3bc5ec63ebc21.jpg"
alt="Weekend Getaway"
className="w-full h-48 object-cover object-top"
/>
<div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
Affordable Now
</div>
</div>
<div className="p-4">
<h3 className="font-bold text-lg">Weekend Getaway</h3>
<div className="flex justify-between items-center mb-2">
<p className="text-green-600 font-bold">$600</p>
<Badge variant="outline" className="bg-green-100 text-green-800">22% of savings</Badge>
</div>
<p className="text-gray-500 mb-3 text-sm">You can afford 4 weekend trips with your savings!</p>
<Button className="w-full bg-green-600 hover:bg-green-700 !rounded-button whitespace-nowrap cursor-pointer" onClick={() => alert('Premium Headphones set as goal')}>
<i className="fa-solid fa-cart-shopping mr-2"></i>Set as Goal
</Button>
</div>
</div>
</SwiperSlide>
<SwiperSlide>
<div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl overflow-hidden shadow-md h-full transform transition-transform hover:scale-105`}>
<div className="relative">
<img
src="https://public.readdy.ai/ai/img_res/e7020b7ce766539aa2530c3b43299422.jpg"
alt="New Smartphone"
className="w-full h-48 object-cover object-top"
/>
<div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
Affordable Now
</div>
</div>
<div className="p-4">
<h3 className="font-bold text-lg">New Smartphone</h3>
<div className="flex justify-between items-center mb-2">
<p className="text-green-600 font-bold">$999</p>
<Badge variant="outline" className="bg-green-100 text-green-800">37% of savings</Badge>
</div>
<p className="text-gray-500 mb-3 text-sm">You can buy 2 smartphones with your savings!</p>
<Button className="w-full bg-green-600 hover:bg-green-700 !rounded-button whitespace-nowrap cursor-pointer" onClick={() => alert('Premium Headphones set as goal')}>
<i className="fa-solid fa-cart-shopping mr-2"></i>Set as Goal
</Button>
</div>
</div>
</SwiperSlide>
<SwiperSlide>
<div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl overflow-hidden shadow-md h-full transform transition-transform hover:scale-105`}>
<div className="relative">
<img
src="https://public.readdy.ai/ai/img_res/263200f056013fdd28fb54940c0f3c6a.jpg"
alt="European Vacation"
className="w-full h-48 object-cover object-top"
/>
<div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
77% Funded
</div>
</div>
<div className="p-4">
<h3 className="font-bold text-lg">European Vacation</h3>
<div className="flex justify-between items-center mb-2">
<p className="text-green-600 font-bold">$3,500</p>
<Badge variant="outline" className="bg-amber-100 text-amber-800">130% of savings</Badge>
</div>
<p className="text-gray-500 mb-3 text-sm">Just $800 more to reach this dream vacation!</p>
<Button className="w-full bg-green-600 hover:bg-green-700 !rounded-button whitespace-nowrap cursor-pointer" onClick={() => alert('Premium Headphones set as goal')}>
<i className="fa-solid fa-cart-shopping mr-2"></i>Set as Goal
</Button>
</div>
</div>
</SwiperSlide>
<SwiperSlide>
<div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl overflow-hidden shadow-md h-full transform transition-transform hover:scale-105`}>
<div className="relative">
<img
src="https://public.readdy.ai/ai/img_res/8c82d582d28e5e8a1718272a9e6aff99.jpg"
alt="Luxury Watch"
className="w-full h-48 object-cover object-top"
/>
<div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
Affordable Now
</div>
</div>
<div className="p-4">
<h3 className="font-bold text-lg">Luxury Watch</h3>
<div className="flex justify-between items-center mb-2">
<p className="text-green-600 font-bold">$1,200</p>
<Badge variant="outline" className="bg-green-100 text-green-800">44% of savings</Badge>
</div>
<p className="text-gray-500 mb-3 text-sm">Treat yourself to this premium timepiece!</p>
<Button className="w-full bg-green-600 hover:bg-green-700 !rounded-button whitespace-nowrap cursor-pointer" onClick={() => alert('Premium Headphones set as goal')}>
<i className="fa-solid fa-cart-shopping mr-2"></i>Set as Goal
</Button>
</div>
</div>
</SwiperSlide>
</Swiper>
</div>
</div>
</main>
{/* Bottom Navigation */}
<footer className={`${isDarkMode ? 'bg-gray-900 text-white border-gray-800' : 'bg-white'} border-t mt-8 py-4 sticky bottom-0`}>
<div className="container mx-auto px-4">
<div className="flex justify-between items-center">
<Button variant="ghost" className="flex flex-col items-center !rounded-button whitespace-nowrap cursor-pointer" onClick={() => alert('Home clicked')}>
<i className="fa-solid fa-house text-lg text-green-600"></i>
<span className="text-xs mt-1">Home</span>
</Button>
<Button variant="ghost" className="flex flex-col items-center !rounded-button whitespace-nowrap cursor-pointer" onClick={() => alert('Stats clicked')}>
<i className="fa-solid fa-chart-line text-lg text-gray-500"></i>
<span className="text-xs mt-1">Stats</span>
</Button>
<div className="relative -mt-10">
<Button className={`h-16 w-16 rounded-full ${isDarkMode ? 'bg-gradient-to-r from-green-800 to-green-900' : 'bg-gradient-to-r from-green-600 to-green-700'} flex items-center justify-center shadow-lg !rounded-button whitespace-nowrap cursor-pointer`} onClick={handleAddExpense}>
<i className="fa-solid fa-plus text-2xl"></i>
</Button>
</div>
<Button variant="ghost" className="flex flex-col items-center !rounded-button whitespace-nowrap cursor-pointer" onClick={() => alert('Challenges clicked')}>
<i className="fa-solid fa-trophy text-lg text-gray-500"></i>
<span className="text-xs mt-1">Challenges</span>
</Button>
<Button variant="ghost" className="flex flex-col items-center !rounded-button whitespace-nowrap cursor-pointer" onClick={() => alert('Settings clicked')}>
<i className="fa-solid fa-gear text-lg text-gray-500"></i>
<span className="text-xs mt-1">Settings</span>
</Button>
</div>
</div>
</footer>
{/* Expense Dialog */}
<Dialog open={showExpenseDialog} onOpenChange={setShowExpenseDialog}>
<DialogContent className={`sm:max-w-[425px] ${isDarkMode ? 'bg-gray-900 text-white border-gray-800' : ''}`}>
<DialogHeader>
<DialogTitle>Log New Expense</DialogTitle>
<DialogDescription>
Track your spending to improve your saving habits.
</DialogDescription>
</DialogHeader>
<div className="grid gap-4 py-4">
<div className="grid grid-cols-4 items-center gap-4">
<label htmlFor="amount" className="text-right font-medium">
Amount
</label>
<div className="col-span-3 relative">
<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
<Input
id="amount"
type="number"
className={`pl-7 border-none ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} !rounded-button`}
placeholder="0.00"
value={newExpense.amount}
onChange={(e) => handleExpenseChange('amount', e.target.value)}
/>
</div>
</div>
<div className="grid grid-cols-4 items-center gap-4">
<label htmlFor="category" className="text-right font-medium">
Category
</label>
<Select
value={newExpense.category}
onValueChange={(value) => handleExpenseChange('category', value)}
>
<SelectTrigger className={`col-span-3 border-none ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} !rounded-button`}>
<SelectValue placeholder="Select category" />
</SelectTrigger>
<SelectContent>
<SelectItem value="food">
<div className="flex items-center gap-2">
<i className="fa-solid fa-utensils text-amber-500"></i>
<span>Food & Dining</span>
</div>
</SelectItem>
<SelectItem value="transport">
<div className="flex items-center gap-2">
<i className="fa-solid fa-car text-blue-500"></i>
<span>Transportation</span>
</div>
</SelectItem>
<SelectItem value="entertainment">
<div className="flex items-center gap-2">
<i className="fa-solid fa-film text-pink-500"></i>
<span>Entertainment</span>
</div>
</SelectItem>
<SelectItem value="shopping">
<div className="flex items-center gap-2">
<i className="fa-solid fa-shopping-bag text-green-500"></i>
<span>Shopping</span>
</div>
</SelectItem>
<SelectItem value="others">
<div className="flex items-center gap-2">
<i className="fa-solid fa-ellipsis-h text-indigo-500"></i>
<span>Others</span>
</div>
</SelectItem>
</SelectContent>
</Select>
</div>
<div className="grid grid-cols-4 items-center gap-4">
<label htmlFor="date" className="text-right font-medium">
Date
</label>
<Input
id="date"
type="date"
value={newExpense.date}
onChange={(e) => handleExpenseChange('date', e.target.value)}
className={`col-span-3 border-none ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} !rounded-button`}
/>
</div>
<div className="grid grid-cols-4 items-center gap-4">
<label htmlFor="note" className="text-right font-medium">
Note
</label>
<Input
id="note"
className={`col-span-3 border-none ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} !rounded-button`}
placeholder="Optional note"
value={newExpense.note}
onChange={(e) => handleExpenseChange('note', e.target.value)}
/>
</div>
</div>
<DialogFooter>
<Button variant="outline" onClick={() => setShowExpenseDialog(false)} className="!rounded-button whitespace-nowrap cursor-pointer">
Cancel
</Button>
<Button onClick={handleSaveExpense} className={`${isDarkMode ? 'bg-green-800 hover:bg-green-900' : 'bg-green-600 hover:bg-green-700'} !rounded-button whitespace-nowrap cursor-pointer`}>
Save Expense
</Button>
</DialogFooter>
</DialogContent>
</Dialog>
</div>
);
};
export default App
