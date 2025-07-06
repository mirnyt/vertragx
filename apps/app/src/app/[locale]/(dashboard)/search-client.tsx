"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search as SearchIcon } from 'lucide-react';
import { Button } from '@v1/ui/button';
import { Input } from '@v1/ui/input';

export function SearchClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search-results?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start pt-[20vh] px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto text-center space-y-4 sm:space-y-5 md:space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-0 pb-0">
          <img
            src="/logo.png"
            alt="VertragX Logo"
            className="mx-auto h-20 sm:h-28 lg:h-36 w-auto"
            draggable={false}
          />
        </div>

        {/* Subtitle */}
        <div className="-mt-2">
          <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl text-muted-foreground font-semibold leading-relaxed px-2 sm:px-0">
            Find products and B2B insights with AI
          </h2>
        </div>

        {/* Search Component */}
        <div className="w-full flex items-center justify-center">
          <div className="relative w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl">
            <div className="relative group">
              {/* Impactful glow and border */}
              <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-r from-accent-foreground/20 via-accent-foreground/10 to-accent-foreground/20 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 group-focus-within:opacity-60 transition-all duration-500" />
              <div className="absolute -inset-1.5 bg-gradient-to-r from-accent/30 to-accent/30 rounded-xl opacity-20 blur" />
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Describe your needs in detail..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="relative w-full h-16 sm:h-20 md:h-24 text-lg sm:text-xl md:text-2xl font-medium px-8 sm:px-10 md:px-12 pr-20 border-2 border-accent bg-background/95 backdrop-blur-md rounded-2xl focus:border-accent-foreground focus:ring-4 focus:ring-accent-foreground/30 transition-all duration-300 shadow-2xl focus:shadow-accent/30 placeholder:text-muted-foreground/60 placeholder:font-semibold"
                  style={{
                    boxShadow: '0 12px 48px -12px rgba(255, 107, 53, 0.18), 0 0 0 2px rgba(255, 107, 53, 0.10)'
                  }}
                />
                {/* Animated search button */}
                <Button
                  onClick={handleSearch}
                  size="icon"
                  className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 h-14 w-14 sm:h-16 sm:w-16 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center border-4 border-background focus:ring-2 focus:ring-primary/40"
                  style={{ boxShadow: '0 4px 24px 0 rgba(27, 54, 93, 0.10)' }}
                >
                  <SearchIcon className="h-7 w-7 sm:h-8 sm:w-8" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}