"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Sun, 
  Lock, 
  UserCircle, 
  CreditCard, 
  HelpCircle, 
  LogOut 
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [savingsReminders, setSavingsReminders] = useState(true);
  const [expenseReminders, setExpenseReminders] = useState(true);
  const [goalNotifications, setGoalNotifications] = useState(true);

  return (
    <div className="container mx-auto pt-20 pb-10 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Settings</h1>
      
      <div className="grid gap-8">
        {/* Appearance Settings */}
        <Card className="dark:bg-black/50 border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-500">
              <Sun className="h-5 w-5 text-green-500" />
              <span>Appearance</span>
            </CardTitle>
            <CardDescription className="text-white/80">Customize how Phi Saver looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-green-400">Theme</Label>
                <p className="text-sm text-white/70">
                  Select light, dark, or system theme
                </p>
              </div>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="dark:bg-black/50 border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-500">
              <Bell className="h-5 w-5 text-green-500" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription className="text-white/80">Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications" className="text-green-400">Push Notifications</Label>
                <p className="text-sm text-white/70">
                  Receive notifications about your savings goals and achievements
                </p>
              </div>
              <Switch 
                id="notifications" 
                checked={notifications} 
                onCheckedChange={setNotifications} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications" className="text-green-400">Email Notifications</Label>
                <p className="text-sm text-white/70">
                  Receive email updates about your account
                </p>
              </div>
              <Switch 
                id="email-notifications" 
                checked={emailNotifications} 
                onCheckedChange={setEmailNotifications} 
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="marketing" 
                checked={marketingEmails} 
                onCheckedChange={(checked) => 
                  setMarketingEmails(checked === true)
                } 
              />
              <Label htmlFor="marketing" className="text-sm text-green-400">
                Receive marketing emails with tips and offers
              </Label>
            </div>
            
            <div className="space-y-3">
              <Label className="text-green-400">Reminder Settings</Label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="savings-reminders" 
                    checked={savingsReminders} 
                    onCheckedChange={(checked) => 
                      setSavingsReminders(checked === true)
                    } 
                  />
                  <Label htmlFor="savings-reminders" className="text-sm text-green-400">
                    Savings reminders
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="expense-reminders" 
                    checked={expenseReminders} 
                    onCheckedChange={(checked) => 
                      setExpenseReminders(checked === true)
                    } 
                  />
                  <Label htmlFor="expense-reminders" className="text-sm text-green-400">
                    Expense tracking reminders
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="goal-notifications" 
                    checked={goalNotifications} 
                    onCheckedChange={(checked) => 
                      setGoalNotifications(checked === true)
                    } 
                  />
                  <Label htmlFor="goal-notifications" className="text-sm text-green-400">
                    Goal achievement notifications
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Currency Settings */}
        <Card className="dark:bg-black/50 border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-500">
              <CreditCard className="h-5 w-5 text-green-500" />
              <span>Currency</span>
            </CardTitle>
            <CardDescription className="text-white/80">Set your preferred currency</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={currency} 
              onValueChange={setCurrency}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inr" id="inr" />
                <Label htmlFor="inr" className="text-green-400">Indian Rupee (₹)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="usd" id="usd" />
                <Label htmlFor="usd" className="text-green-400">US Dollar ($)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="eur" id="eur" />
                <Label htmlFor="eur" className="text-green-400">Euro (€)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gbp" id="gbp" />
                <Label htmlFor="gbp" className="text-green-400">British Pound (£)</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="dark:bg-black/50 border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-500">
              <UserCircle className="h-5 w-5 text-green-500" />
              <span>Account</span>
            </CardTitle>
            <CardDescription className="text-white/80">Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Button variant="outline" className="justify-start text-green-400">
                <UserCircle className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="outline" className="justify-start text-green-400">
                <Lock className="mr-2 h-4 w-4" />
                Change Password
              </Button>
              <Button variant="outline" className="justify-start text-green-400">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </Button>
              <Button variant="destructive" className="justify-start">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 text-center">
        <Button className="bg-green-500 hover:bg-green-600 text-white">Save Changes</Button>
      </div>
    </div>
  );
}
