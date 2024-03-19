import { ChangeEventHandler, FormEventHandler } from "react";

export type ChatInputProps = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  input: string;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
};
