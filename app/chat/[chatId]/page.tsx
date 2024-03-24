"use client";
import ChatInput from "@/components/chat-input";
import ChatMessages from "@/components/chat-messages";
import { ChatPageProps } from "@/lib/type";
import { useChat } from "ai/react";
import { useState } from "react";


export default function Chat({ params }: ChatPageProps) {
  const [sourcesForMessages, setSourcesForMessages] = useState<
  Record<string, any>
>({});
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: '/api/chat',
      onResponse(response) {
        const sourcesHeader = response.headers.get('x-sources');
        const sources = sourcesHeader ? JSON.parse(atob(sourcesHeader)) : [];

        const messageIndexHeader = response.headers.get('x-message-index');
        if (sources.length && messageIndexHeader !== null) {
          setSourcesForMessages({
            ...sourcesForMessages,
            [messageIndexHeader]: sources,
          });
        }
      },
      onError: (e) => {
        console.log(e)
      },
      onFinish() {},
    });

  return (
    <div className="w-full flex flex-col">
      <ChatMessages sources={sourcesForMessages} isLoading={isLoading} messages={messages} />
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
