"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";
import { FormEvent, useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 border-t border-gray-800 p-4 bg-gray-900"
    >
      <Input
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={disabled}
        className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 h-11 text-base px-4"
      />
      <Button
        type="submit"
        size="icon"
        disabled={disabled || !message.trim()}
        className="bg-green-600 hover:bg-green-700 h-11 w-11"
      >
        <SendIcon className="h-5 w-5" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}
