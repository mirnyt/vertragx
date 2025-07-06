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
  FileText,
  History,
  Heart,
  LogOut,
} from "lucide-react";
import { Button } from "@v1/ui/button";
import { cn } from "@v1/ui/cn";
import { createClient } from "@v1/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

const navigationItems = [
  { title: "Search", url: "/", icon: Search },
  { title: "History", url: "/history", icon: History },
  { title: "Favorites", url: "/favorites", icon: Heart },
  { title: "Changelog", url: "/changelog", icon: FileText },
];

const bottomNavigationItems = [
  { title: "Help", url: "/help", icon: HelpCircle },
  { title: "Settings", url: "/settings", icon: Settings },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setSidebarOpen(false);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          `bg-background border-r border-border transition-transform duration-300 ease-in-out flex-shrink-0 flex flex-col h-full
        w-20
        fixed inset-y-0 left-0 z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:relative lg:z-auto`,
          className,
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-center h-16 border-b border-border px-2 flex-shrink-0">
          {/* VertragX Logo */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-foreground to-primary flex items-center justify-center shadow-sm overflow-hidden">
            <Image
              src="/logo-icon.png"
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
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
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
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
              )}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="text-center leading-tight">{item.title}</span>
            </Link>
          ))}
          
          {/* Sign Out Button - Only show if user is authenticated */}
          {user && (
            <button
              onClick={handleSignOut}
              className="flex flex-col items-center gap-1 px-2 py-3 text-xs font-medium transition-all duration-200 rounded-lg group min-h-11 text-muted-foreground hover:bg-accent/50 hover:text-foreground w-full"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span className="text-center leading-tight">Logout</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
