import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserAvatarProps } from "@/lib/type";
import { cn } from "@/lib/utils";

export const UserAvatar = ({ src, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn("h-8 w-8 mt-1", className)}>
      <AvatarImage src={src} />
    </Avatar>
  );
};
