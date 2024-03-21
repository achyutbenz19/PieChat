import { MessageProps } from "@/lib/type";
import React from "react";
import { UserAvatar } from "./user-avatar";
import getUser from "@/hooks/get-user";
import Markdown from "react-markdown";

const Message = ({ message }: MessageProps) => {
  const user = getUser();
  return (
    <div className="flex flex-row space-x-2">
      <UserAvatar
        src={
          message.role === "user"
            ? user?.user_metadata.avatar_url!
            : "/logo.svg"
        }
      />
      <Markdown className="bg-neutral-200 w-full rounded-lg p-2">
        {message.content}
      </Markdown>
    </div>
  );
};

export default Message;
