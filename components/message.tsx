import { MessageProps } from "@/lib/type";
import React from "react";

const Message = ({ message }: MessageProps) => {
  return (
    <div className="flex flex-row">
      {message.role === "user"}
      <div className="bg-neutral-200 w-full rounded-lg p-2">
        {message.content}
      </div>
    </div>
  );
};

export default Message;
