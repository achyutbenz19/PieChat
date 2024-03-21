import { ChatMessagesProps } from "@/lib/type";
import Message from "./message";

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <section className="mx-auto w-[90%] md:w-[80%] lg:w-[65%] space-y-2">
      {messages.length > 0
        ? messages.map((message) => (
            <Message key={message.id} message={message} />
          ))
        : null}
    </section>
  );
};

export default ChatMessages;
