import { FileUploaderProps } from "@/lib/type";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import React from "react";

const FileUploader = ({ focus }: FileUploaderProps) => {
  return (
    <div className="p-2 h-full">
      <div
        className={cn(
          "h-full rounded-lg flex duration-500 transition-all items-center justify-center border-dashed border-neutral-300 dark:border-neutral-700 border-2",
          focus && "border-neutral-800",
        )}
      >
        <label
          className="flex flex-col items-center justify-center p-4 space-y-2 cursor-pointer"
          htmlFor="file-upload"
        >
          <Plus
            className={cn(
              "h-10 w-10 text-neutral-600 duration-500 transition-all",
              focus && "font-extrabold text-neutral-900",
            )}
          />
          <span
            className={cn(
              "text-sm text-neutral-400 duration-500 transition-all dark:text-neutral-500",
              focus && "font-bold text-neutral-900",
            )}
          >
            Drag and drop your CSV file here
          </span>
          <span className="text-xs text-neutral-400 dark:text-neutral-500">
            or
          </span>
          <div className="border hover:bg-neutral-200 dark:hover:bg-neutral-800 px-2 py-1.5 rounded-lg">
            Browse
          </div>
          <input className="hidden" id="file-upload" type="file" />
        </label>
      </div>
    </div>
  );
};

export default FileUploader;
