"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "./sidebar-provider";
import { 
  Database, 
  Search, 
  LayoutGrid, 
  TrendingUp, 
  Settings,
  HelpCircle,
  Radio,
  Zap,
  Menu,
  FileText
} from "lucide-react";
import { Button } from "@v1/ui/button";
import { Avatar, AvatarFallback } from "@v1/ui/avatar";
import { Badge } from "@v1/ui/badge";
import { cn } from "@v1/ui/cn";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutGrid },
  { title: "Posts", url: "/posts", icon: Database },
  { title: "Changelog", url: "/changelog", icon: FileText },
  { title: "Analytics", url: "/analytics", icon: TrendingUp },
  { title: "Search", url: "/search", icon: Search },
];

const bottomNavigationItems = [
  { title: "Help", url: "/help", icon: HelpCircle },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Account", url: "/account", icon: Zap },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setSidebarOpen(false);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        `bg-background border-r border-border transition-transform duration-300 ease-in-out flex-shrink-0 flex flex-col h-full
        w-20
        fixed inset-y-0 left-0 z-50
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:relative lg:z-auto`,
        className
      )}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-center h-16 border-b border-border px-2 flex-shrink-0">
          {/* VertragX Logo */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-foreground to-primary flex items-center justify-center shadow-sm overflow-hidden">
            <Image 
              src="/logoicon.png" 
              alt="VertragX Logo" 
              width={40} 
              height={40} 
              className="w-10 h-10 object-cover"
            />
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 flex flex-col py-4 overflow-hidden">
          <div className="space-y-1 px-2">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className={cn(
                  "flex flex-col items-center gap-1 px-2 py-3 text-xs font-medium transition-all duration-200 rounded-lg group min-h-11",
                  isActive(item.url)
                    ? "bg-accent text-accent-foreground" 
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="text-center leading-tight">{item.title}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Spacer for desktop/tablet only */}
        <div className="hidden md:flex-1"></div>

        {/* Bottom Navigation */}
        <div className="space-y-1 px-2 border-t border-border pt-4 flex-shrink-0">
          {bottomNavigationItems.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className={cn(
                "flex flex-col items-center gap-1 px-2 py-3 text-xs font-medium transition-all duration-200 rounded-lg group min-h-11",
                isActive(item.url)
                  ? "bg-accent text-accent-foreground" 
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="text-center leading-tight">{item.title}</span>
            </Link>
          ))}
          
          {/* Notification Badge */}
          <div className="flex justify-center py-2">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xs text-primary-foreground font-medium">4</span>
              </div>
            </div>
          </div>

          {/* User Avatar */}
          <div className="flex justify-center py-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-accent-foreground text-white text-xs font-medium">
                SP
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </aside>
    </>
  );
}