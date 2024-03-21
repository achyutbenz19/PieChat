import { ChatMessagesProps } from "@/lib/type";
import { Avatar } from "@nextui-org/react";
import Message from "./message";

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <section className="mx-auto space-y-2">
      {messages.length > 0
        ? messages.map((message) => (
            <Message key={message.id} message={message} />
          ))
        : null}
    </section>
  );
};

export default ChatMessages;
