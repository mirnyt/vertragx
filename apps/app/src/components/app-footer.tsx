export function AppFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6 py-2">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hover:text-foreground transition-colors"
          >
            Privacy Policy
          </button>
          <button
            type="button"
            className="hover:text-foreground transition-colors"
          >
            Terms of Service
          </button>
        </div>
        <div className="flex items-center justify-center flex-shrink-0">
          <span className="text-muted-foreground">
            © {currentYear} VertragX.com
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hover:text-foreground transition-colors"
          >
            Status
          </button>
          <button
            type="button"
            className="hover:text-foreground transition-colors"
          >
            API
          </button>
          <button
            type="button"
            className="hover:text-foreground transition-colors"
          >
            Docs
          </button>
          <div className="w-4 h-4 rounded bg-muted flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-accent-foreground to-primary" />
          </div>
        </div>
      </div>
    </footer>
  );
}
