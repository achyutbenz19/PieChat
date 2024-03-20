import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import { ModeToggle } from "./theme-toggle";

const Header = () => {
  return (
    <div className="h-10 p-2 flex flex-row justify-between top-0">
      <Sheet>
        <SheetTrigger asChild>
          <Menu className="cursor-pointer hover:scale-105" />
        </SheetTrigger>
        <SheetContent className="justify-between flex flex-col" side="left">
          <SheetHeader>
            <SheetTitle>Chat History</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col justify-center items-center h-full py-4">
            <div className="text-neutral-500">Coming soon!</div>
          </div>
          <SheetFooter>
            <ModeToggle />
          </SheetFooter>
        </SheetContent>
      </Sheet>
      hi
    </div>
  );
};

export default Header;
