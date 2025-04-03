"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import ChatDialog from "./ChatDialog";

export default function ChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 shadow-lg z-50"
        onClick={() => setOpen(true)}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <ChatDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
