import { ChatMessagesProps } from "@/lib/type";
import Message from "./message";

const ChatMessages = ({ messages , sources, isLoading }: ChatMessagesProps) => {
  return (
    <section className="mx-auto w-[90%] md:w-[80%] lg:w-[65%] space-y-4">
      {messages.length > 0
        ? messages.map((message, index) => {
          const source = sources[index] || undefined; 
          console.log(source)
          return (
            <Message key={message.id} message={message} />
          )})
        : null}
    </section>
  );
};

export default ChatMessages;
