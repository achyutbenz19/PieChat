import { ChangeEventHandler, FormEventHandler } from "react";

export type ChatInputProps = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  input: string;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
};

export type FileUploaderProps = {
  focus: boolean;
};

export type ChatPageProps = {
  params: {
    chatId: string;
  };
};
