"use client";
import { FileUploaderProps } from "@/lib/type";
import { cn } from "@/lib/utils";
import { Check, Loader2Icon, Plus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { uuid } from "uuidv4";
import { Spinner } from "@nextui-org/react";
import { createClient } from "@/supabase/client";
import { v4 as uuidv4 } from "uuid";

const FileUploader = ({ userId, focus }: FileUploaderProps) => {
  const supabase = createClient();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      if (selectedFile.size > 4000000) {
        toast.error("File size exceeds 4 MB");
        return;
      }
      setFile(selectedFile);
      await handleUpload(selectedFile);
    }
  };

  const handleUpload = async (file: File) => {
    try {
      setUploading(true);
      const { error, data } = await supabase.storage
        .from("files")
        .upload(userId + "/" + uuidv4(), file);
      if (error) {
        toast.error(error.message);
      }
      if (data) {
        toast.success("Uploaded successfully!");
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/csv") {
      setFile(droppedFile);
      handleUpload(droppedFile);
    } else {
      toast.error("Invalid file type. Please drop a CSV file.");
    }
  };

  const handleChat = () => {
    router.push(`/chat/${uuid()}`);
  };

  const labelText = uploading
    ? "Uploading..."
    : isDragOver
      ? "Drop file here"
      : file
        ? "File uploaded"
        : "Drag and drop your CSV file here";

  return (
    <div className="p-2 h-full">
      <div
        className={cn(
          "h-full rounded-lg flex duration-500 transition-all items-center justify-center border-dashed border-neutral-300 dark:border-neutral-700 border-2",
          focus && "border-neutral-800 dark:border-neutral-300",
        )}
      >
        <label
          className="flex flex-col w-full h-full items-center justify-center p-4 space-y-2 cursor-pointer"
          htmlFor="file-upload"
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {uploading ? (
            <Spinner size="sm" />
          ) : file ? (
            <Check className="h-10 w-10" />
          ) : (
            <Plus
              className={cn(
                "h-10 w-10 text-neutral-500 duration-500 transition-all",
                focus &&
                  "font-extrabold text-neutral-700 dark:text-neutral-300",
              )}
            />
          )}
          <span
            className={cn(
              "text-sm text-neutral-400 duration-500 transition-all dark:text-neutral-300",
              focus && "font-bold text-neutral-800 dark:text-neutral-300",
            )}
          >
            {labelText}
          </span>
          {uploading ? (
            <></>
          ) : !file ? (
            <>
              <span className="text-xs text-neutral-400 dark:text-neutral-300">
                or
              </span>
              <div
                className={cn(
                  "border dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 px-2 duration-500 transition-all py-1.5 rounded-lg",
                  focus &&
                    "border-2 border-neutral-600 dark:border-neutral-300",
                )}
              >
                Browse
              </div>
            </>
          ) : (
            <>
              <Button onClick={handleChat}>Chat</Button>
            </>
          )}
          <input
            accept="application/csv"
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};

export default FileUploader;
