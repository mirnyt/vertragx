"use client";

import { Button } from "@v1/ui/button";
import { Avatar, AvatarFallback } from "@v1/ui/avatar";
import { Menu, MessageSquarePlus, Bell } from "lucide-react";
import { useSidebar } from "./sidebar-provider";

interface AppHeaderProps {
  title?: string;
}

export function AppHeader({ title = "VertragX" }: AppHeaderProps) {
  const { toggleSidebar } = useSidebar();

  const handleFeedbackClick = () => {
    // Open feedback form or external feedback service
    // window.open("https://github.com/anthropics/claude-code/issues", "_blank");
    return;
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-8 w-8"
          onClick={toggleSidebar}
        >
          <Menu className="h-4 w-4" />
        </Button>

        {/* Page Title */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        </div>
      </div>

      {/* Right side with Feedback button, Notifications, and Avatar */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          onClick={handleFeedbackClick}
        >
          <MessageSquarePlus className="h-4 w-4" />
          <span className="hidden sm:inline">Give Feedback</span>
        </Button>

        {/* Notification Icon */}
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
            <Bell className="h-4 w-4 text-primary-foreground" />
          </div>
        </div>

        {/* User Avatar */}
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarFallback className="bg-accent-foreground text-white text-xs font-medium">
            SP
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
