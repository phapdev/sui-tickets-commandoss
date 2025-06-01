"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  id: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ShareButton({ id, className, size = "md" }: ShareButtonProps) {
  const handleShare = () => {
    const shareUrl = `${window.location.origin}/view?id=${id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleShare}
            variant="ghost"
            size="icon"
            className={cn("h-9 rounded-md px-3", className, size === "sm" && "h-9 rounded-md px-3", size === "lg" && "h-12 w-12")}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Share this event</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
} 