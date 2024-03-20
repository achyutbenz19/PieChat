import { Input } from "./ui/input";
import { ChatInputProps } from "@/lib/type";

const ChatInput = ({
  handleSubmit,
  input,
  handleInputChange,
}: ChatInputProps) => {
  return (
    <form className="flex items-center justify-center" onSubmit={handleSubmit}>
      <Input
        className="fixed md:w-[60%] h-12 w-[90%] border-neutral-500 bottom-0 rounded-lg mb-6 md:mb-8 shadow-xl p-2"
        value={input}
        placeholder="Say something..."
        onChange={handleInputChange}
      />
    </form>
  );
};

export default ChatInput;
