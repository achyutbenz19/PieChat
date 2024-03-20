"use client";
import ChatInput from "@/components/chat-input";
import { ChatPageProps } from "@/lib/type";
import { useChat } from "ai/react";

export default function Chat({ params }: ChatPageProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="w-full flex flex-col">
      {messages.length > 0
        ? messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.role === "user" ? "User: " : "AI: "}
              {m.content}
            </div>
          ))
        : null}

      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
