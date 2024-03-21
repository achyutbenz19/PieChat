import { Message } from "ai";
import { ChangeEventHandler, FormEventHandler } from "react";

export type ChatInputProps = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  input: string;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
};

export type FileUploaderProps = {
  userId: string;
  focus: boolean;
};

export type ChatPageProps = {
  params: {
    chatId: string;
  };
};

export type AuthFormProps = {
  focus: boolean;
};

export type ChatMessagesProps = {
  messages: Message[];
};

export type MessageProps = {
  message: Message;
};

export type UserAvatarProps = {
  src?: string;
  className?: string;
  user?: boolean;
};
