"use client";

// Chat Components
import { useChat } from "ai/react";
import ChatMessage from "./ChatMessage";

// UI Components
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Trash2, Bot } from "lucide-react";
import { useRef, useEffect } from "react";

export default function AIChat() {
  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
  } = useChat();

  // A reference to control the scrolling behavior as new messages arrived
  const scrollRef = useRef<HTMLDivElement>(null);

  // As new messages arrived, scroll down
  useEffect(() => {
    // Scroll to the bottom of the message window after rendering each message
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Indicates whether the last message is from user
  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  return (
    <>
      {/* Conversation between user and ai */}
      <div className="flex-1 overflow-y-scroll" ref={scrollRef}>
        <div className="mx-auto w-full max-w-screen-md p-4">
          {/* Display chat messages between user and ai */}
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
          {/* Show loading when the messages hasn't started streaming */}
          {isLoading && lastMessageIsUser && (
            <ChatMessage message={{ role: "assistant", content: "..." }} />
          )}
          {/* If there is an error, display appropriate message */}
          {error && (
            <ChatMessage
              message={{
                role: "assistant",
                content: "Something went wrong. Please try again later.",
              }}
            />
          )}
          {/* Display guiding message to start */}
          {!error && messages.length === 0 && (
            <ChatMessage
              message={{
                role: "assistant",
                content:
                  "Hi, my name is Issem 😊.\n\nI can answer questions you have about these positions:\n\n**1. Machine Learning Engineer\n2. Data Scientist\n3. Data Analyst**\n",
              }}
            />
          )}
        </div>
      </div>

      {/* Message Input */}

      <div className="mx-auto w-full max-w-screen-md px-4 pb-2 pt-0">
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <Button
            title="Clear Chat"
            type="button"
            onClick={() => setMessages([])}
          >
            <Trash2 />
          </Button>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask questions about jobs"
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </>
  );
}
