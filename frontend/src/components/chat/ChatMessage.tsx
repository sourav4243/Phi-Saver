"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export type MessageType = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

interface ChatMessageProps {
  message: MessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full items-start gap-2 py-2",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-green-700 text-white text-sm">Phi</AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "rounded-lg px-4 py-3 max-w-[85%] shadow-md",
          isUser
            ? "bg-green-600 text-white"
            : "bg-gray-800 text-gray-100 border border-gray-700"
        )}
      >
        <p className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">{message.content}</p>
        <div
          className={cn(
            "text-xs mt-2",
            isUser ? "text-green-100" : "text-gray-400"
          )}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {isUser && (
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-green-500 text-white text-sm">You</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
