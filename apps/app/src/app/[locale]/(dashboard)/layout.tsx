import { Sidebar } from "@/components/sidebar";
import { AppHeader } from "@/components/app-header";
import { AppFooter } from "@/components/app-footer";
import { SidebarProvider } from "@/components/sidebar-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="h-screen bg-background flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 h-full">
          {/* Header */}
          <AppHeader />

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto bg-muted/20">
            <div className="min-h-full flex flex-col">
              <div className="flex-1">
                {children}
              </div>
              {/* Footer */}
              <AppFooter />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
