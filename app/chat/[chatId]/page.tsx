"use client";
import ChatInput from "@/components/chat-input";
import ChatMessages from "@/components/chat-messages";
import { ChatPageProps } from "@/lib/type";
import { useChat } from "ai/react";

export default function Chat({ params }: ChatPageProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="w-full ju flex flex-col">
      <ChatMessages messages={messages} />
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
