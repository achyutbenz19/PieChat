import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserAvatarProps } from "@/lib/type";
import { cn } from "@/lib/utils";
import { PieChart } from "lucide-react";

export const UserAvatar = ({ src, className, user }: UserAvatarProps) => {
  return (
    <>
      {user ? (
        <Avatar
          className={cn(
            "h-8 w-8 mt-2 text-neutral-800 dark:text-neutral-300",
            className,
          )}
        >
          <AvatarImage src={src} />
        </Avatar>
      ) : (
        <PieChart className="h-8 w-8 mt-2 text-neutral-800 dark:text-neutral-300" />
      )}
    </>
  );
};
