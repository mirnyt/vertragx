"use client";

import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Button } from '@v1/ui/button';
import { Input } from '@v1/ui/input';

export function SearchClient() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Add search functionality here
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start pt-[27vh] px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto text-center space-y-4 sm:space-y-5 md:space-y-6">
        {/* Logo */}
        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            VertragX
          </h1>
        </div>

        {/* Subtitle */}
        <div className="space-y-1 sm:space-y-2">
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground font-medium leading-relaxed px-2 sm:px-0">
            Find products and B2B insights with AI
          </h2>
        </div>

        {/* Search Component */}
        <div className="w-full flex items-center justify-center">
          <div className="relative w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl">
            <div className="relative group">
              {/* Enhanced gradient glow effects */}
              <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-accent-foreground/20 via-accent-foreground/10 to-accent-foreground/20 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-20 group-hover:opacity-40 transition-all duration-700" />
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-foreground/20 to-accent-foreground/20 rounded-lg sm:rounded-xl opacity-10 blur" />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-foreground/10 to-accent-foreground/10 rounded-md sm:rounded-lg opacity-10" />
              
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Describe your needs in detail..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="relative w-full h-12 sm:h-14 md:h-16 text-sm sm:text-base md:text-lg px-4 sm:px-6 pr-16 sm:pr-20 border-2 border-border/50 bg-background/90 backdrop-blur-sm rounded-lg sm:rounded-xl focus:border-accent-foreground/50 focus:ring-4 focus:ring-accent-foreground/20 transition-all duration-300 shadow-2xl focus:shadow-2xl resize-none leading-relaxed"
                  style={{
                    boxShadow: '0 12px 48px -12px rgba(255, 107, 53, 0.25), 0 0 0 1px rgba(255, 107, 53, 0.15)'
                  }}
                />
                
                {/* Embedded search button */}
                <Button
                  onClick={handleSearch}
                  size="icon"
                  className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md sm:rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}