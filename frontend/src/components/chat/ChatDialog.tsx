"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessage, { MessageType } from "./ChatMessage";
import { v4 as uuidv4 } from "uuid";
import { sendChatMessage } from "@/lib/api";

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChatDialog({ open, onOpenChange }: ChatDialogProps) {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "welcome",
      content: "Hi there! I'm Phi, your savings assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    const scrollToBottom = () => {
      console.log('Attempting to scroll to bottom');
      const scrollAnchor = document.getElementById('scroll-anchor');
      if (scrollAnchor) {
        try {
          scrollAnchor.scrollIntoView({ behavior: 'smooth', block: 'end' });
          console.log('Scrolled using anchor');
        } catch (e) {
          console.error('Error scrolling with anchor:', e);
        }
      }

      // Always try the direct method as a backup
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollContainer) {
          try {
            setTimeout(() => {
              scrollContainer.scrollTop = scrollContainer.scrollHeight;
              console.log('Scrolled using container, height:', scrollContainer.scrollHeight);
            }, 100); // Small delay to ensure content is rendered
          } catch (e) {
            console.error('Error scrolling with container:', e);
          }
        }
      }
    };

    // Scroll immediately and then again after delays to ensure it works
    scrollToBottom();
    const timeoutId1 = setTimeout(scrollToBottom, 200);
    const timeoutId2 = setTimeout(scrollToBottom, 500);

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, [messages, isLoading]);

  const handleSendMessage = async (content: string) => {
    // Add user message to chat
    const userMessage: MessageType = {
      id: uuidv4(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send message to API and get response
      const response = await sendChatMessage(content);

      // Add assistant response to chat
      const assistantMessage: MessageType = {
        id: uuidv4(),
        content: response.message,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      // Handle error
      const errorMessage: MessageType = {
        id: uuidv4(),
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[450px] md:max-w-[550px] h-[500px] flex flex-col p-0 bg-gray-900 border-gray-800 rounded-xl shadow-2xl"
      >
        <DialogHeader className="px-4 py-2 border-b border-gray-800 bg-gray-900 sticky top-0 z-10">
          <DialogTitle className="text-white">Chat with Phi Assistant</DialogTitle>
        </DialogHeader>

        <ScrollArea
          className="flex-1 p-4 bg-gray-900 overflow-y-auto"
          ref={scrollAreaRef}
          style={{ scrollBehavior: 'smooth', overflowY: 'auto' }}
        >
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex justify-center py-2">
                <div className="animate-pulse flex space-x-1">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            )}
            {/* Invisible element to help with scrolling */}
            <div id="scroll-anchor" ref={(el) => {
              if (el && scrollAreaRef.current) {
                setTimeout(() => {
                  try {
                    el.scrollIntoView({ behavior: 'smooth', block: 'end' });
                    console.log('Scrolled to bottom');
                  } catch (e) {
                    console.error('Error scrolling:', e);
                  }
                }, 100);
              }
            }}></div>
          </div>
        </ScrollArea>

        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </DialogContent>
    </Dialog>
  );
}
