"use client";

// Chat Components
import { useChat } from "ai/react";

// UI Components
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Trash2 } from "lucide-react";

export default function AIChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <>
      {/* Message History */}
      <div className="flex-1 overflow-y-scroll">
        <div className="mx-auto w-full max-w-screen-md p-4">
          <ul>
            {messages.map((message, index) => (
              <li key={index}>
                {message.role === "user" ? "User: " : "AI: "}
                {message.content}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Message Input */}

      <div className="mx-auto w-full max-w-screen-md px-4 pb-2 pt-0">
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <Button title="Clear Chat" type="button">
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
