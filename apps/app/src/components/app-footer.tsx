export function AppFooter() {
  return (
    <footer className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6 py-3">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <button type="button" className="hover:text-foreground transition-colors">Privacy Policy</button>
          <button type="button" className="hover:text-foreground transition-colors">Terms of Service</button>
        </div>
        <div className="flex items-center justify-center flex-shrink-0">
          <img src="/logo.png" alt="App Logo" className="h-10 md:h-16 w-auto" />
        </div>
        <div className="flex items-center gap-4">
          <button type="button" className="hover:text-foreground transition-colors">Service Status</button>
          <button type="button" className="hover:text-foreground transition-colors">API</button>
          <button type="button" className="hover:text-foreground transition-colors">Docs</button>
          <button type="button" className="hover:text-foreground transition-colors">Contribute</button>
          <div className="w-6 h-6 rounded bg-muted flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-accent-foreground to-primary" />
          </div>
        </div>
      </div>
    </footer>
  );
}