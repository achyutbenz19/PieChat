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
        user={message.role === "user"}
        src={user?.user_metadata.avatar_url!}
      />
      <Markdown className="bg-neutral-200 dark:bg-neutral-900 w-full rounded-lg p-3 px-4">
        {message.content}
      </Markdown>
    </div>
  );
};

export default Message;
