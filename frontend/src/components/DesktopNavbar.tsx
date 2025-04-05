import Link from "next/link";
import { Button } from "./ui/button";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Bell } from "lucide-react";
import { Badge } from "./ui/badge";
import { useState } from "react";
import FriendRequestDialog from "./FriendRequestDialog";
import { useFriendRequests } from "./FriendRequestContext";

export default function DesktopNavbar() {
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const { friendRequestCount } = useFriendRequests();

  return (
    <div className="flex items-center space-x-6">
      <Link
        href="/"
        className="text-sm font-medium text-white transition-colors hover:text-white"
      >
        Home
      </Link>

      <SignedIn>
        {friendRequestCount > 0 && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative text-white hover:bg-green-500/20"
            onClick={() => setShowFriendRequests(true)}
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center p-0 text-xs">
              {friendRequestCount}
            </Badge>
          </Button>
        )}
        
        <UserButton afterSignOutUrl="/" />

        <FriendRequestDialog 
          isOpen={showFriendRequests} 
          onClose={() => setShowFriendRequests(false)} 
        />
      </SignedIn>

      <SignedOut>
        <Link
          href="/contact"
          className="text-sm font-medium text-white transition-colors hover:text-white"
        >
          Contact
        </Link>

        <SignInButton mode="modal">
          <Button
            variant="outline"
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-lg text-white"
          >
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}