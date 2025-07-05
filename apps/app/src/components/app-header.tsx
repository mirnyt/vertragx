"use client";

import { Button } from "@v1/ui/button";
import { Menu } from "lucide-react";
import { useSidebar } from "./sidebar-provider";

interface AppHeaderProps {
  title?: string;
}

export function AppHeader({ title = "Dashboard" }: AppHeaderProps) {
  const { toggleSidebar } = useSidebar();
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
    </header>
  );
}