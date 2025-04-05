"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useTheme } from "next-themes";
import { useFriendRequests } from "./FriendRequestContext";

interface FriendRequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FriendRequestDialog({ isOpen, onClose }: FriendRequestDialogProps) {
  const { theme } = useTheme();
  const { friendRequests, acceptFriendRequest, rejectFriendRequest } = useFriendRequests();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`w-[95%] sm:max-w-[500px] ${theme === 'dark' ? 'bg-gray-900 text-white border-gray-800' : ''}`}>
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
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            {friendRequests.map((request) => (
              <div 
                key={request.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4"
              >
                <div className="flex items-start space-x-4">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarFallback>{request.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{request.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{request.email}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Requested on {new Date(request.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2 w-full sm:w-auto justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-500 border-red-500 hover:bg-red-500/10 flex-1 sm:flex-none"
                    onClick={() => rejectFriendRequest(request.id)}
                  >
                    Reject
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 flex-1 sm:flex-none"
                    onClick={() => acceptFriendRequest(request.id)}
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
            onClick={onClose}
            className="!rounded-button whitespace-nowrap cursor-pointer"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 