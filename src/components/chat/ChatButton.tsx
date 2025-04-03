"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import ChatDialog from "./ChatDialog";

export default function ChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 z-[100] flex flex-col items-end">
      <Button
        className="rounded-full w-14 h-14 p-0 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 shadow-lg border-2 border-white/20"
        onClick={() => setOpen(true)}
        aria-label="Open chat"
      >
        <MessageCircle className="h-7 w-7 text-white" />
      </Button>

      <ChatDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
