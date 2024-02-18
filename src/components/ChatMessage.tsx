// Represent a single message (for styling)
import { Message } from "ai";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import Markdown from "react-markdown";
import Image from "next/image";
import issem_deer_icon from "@/assets/issem_deer.png";
import { useUser } from "@clerk/nextjs";

export default function ChatMessage({
  message: { role, content },
}: {
  message: Pick<Message, "role" | "content">;
}) {
  // The role could be either user or assistant
  const isAiMessage = role === "assistant";
  const { user } = useUser();
  return (
    <div className="mb-8 me-4 flex justify-start">
      {isAiMessage && (
        <Image
          className="ml-2 mr-2 h-8 w-8"
          src={issem_deer_icon}
          width={30}
          height={30}
          alt="Issem Deer Icon"
        />
      )}
      {!isAiMessage && user?.imageUrl && (
        <Image
          src={user.imageUrl}
          width={30}
          height={30}
          alt="User Profile Picture"
          className="ml-2 mr-2 h-10 w-10 rounded-full object-cover"
        />
      )}
      {/* <ReactMarkdown
        className={cn(
          "rounded-md border px-4 py-2",
          isAiMessage ? "bg-background" : "bg-primary text-primary-foreground",
        )}
      >
        {content}
      </ReactMarkdown> */}
      <div
        className={cn(
          "prose rounded-md border px-4 py-2",
          isAiMessage ? "bg-background" : "bg-primary text-primary-foreground",
        )}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
