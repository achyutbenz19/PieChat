"use client";
import FileUploader from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Component() {
  const [focus, setFocus] = useState(false);

  const handleStart = () => {
    setFocus(true);
    setTimeout(() => setFocus(false), 3000);
  };

  return (
    <section className="h-full flex mx-5 md:mx-10 lg:mx-20 flex-col justify-center items-center">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Interactive Data Visualization and Communication Platform
              </h1>
              <p className="max-w-[600px] text-neutral-500 md:text-xl dark:text-neutral-400">
                Your Personal Data Analyst
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-8 text-sm font-medium text-neutral-50 shadow transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 dark:focus-visible:ring-neutral-300"
                onClick={handleStart}
              >
                Get Started
              </Button>
            </div>
          </div>
          <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center w-full lg:order-last lg:aspect-square">
            <FileUploader focus={focus} />
          </div>
        </div>
      </div>
    </section>
  );
}
