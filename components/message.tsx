import { MessageProps } from "@/lib/type";
import React from "react";
import { UserAvatar } from "./user-avatar";
import getUser from "@/hooks/get-user";

const Message = ({ message }: MessageProps) => {
  const user = getUser();
  return (
    <div className="flex flex-row space-x-2">
      <UserAvatar src={message.role === "user" ? user?.user_metadata.avatar_url! : "/"} />
      <div className="bg-neutral-200 w-full rounded-lg p-2">
        {message.content}
      </div>
    </div>
  );
};

export default Message;
