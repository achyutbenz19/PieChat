import { ChangeEventHandler, FormEventHandler } from "react";

export type ChatInputProps = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  input: string;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
};

export type FileUploaderProps = {
  userId: string | undefined | null;
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
