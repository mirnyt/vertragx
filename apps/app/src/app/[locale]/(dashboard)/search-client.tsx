"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import { SearchBar } from "@upstash/search-ui";
import { Search } from "@upstash/search";
import "@upstash/search-ui/dist/index.css";
import "./search-upstash.css";

// Initialize Upstash Search client
const searchClient = new Search({
  url: process.env.NEXT_PUBLIC_UPSTASH_SEARCH_REST_URL!,
  token: process.env.NEXT_PUBLIC_UPSTASH_SEARCH_REST_TOKEN!,
});

// Define the search index type
interface SearchResult {
  id: string;
  title: string;
  description?: string;
  category?: string;
  url?: string;
}

const index = searchClient.index<SearchResult>("products");

export function SearchClient() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSelect = useCallback((result: SearchResult) => {
    // Navigate to the result or search results page
    if (result.url) {
      router.push(result.url);
    } else {
      router.push(`/search-results?q=${encodeURIComponent(result.title)}`);
    }
    setIsOpen(false);
  }, [router]);

  const searchFunction = useCallback(async (query: string) => {
    if (!query || query.trim().length === 0) {
      return [];
    }
    
    try {
      const results = await index.search({
        query,
        limit: 10,
        reranking: true,
      });
      
      return results.results || [];
    } catch (error) {
      console.error("Search error:", error);
      return [];
    }
  }, []);

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

        {/* Upstash Search Component */}
        <div className="w-full flex items-center justify-center">
          <div className="relative w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl">
            <div className="relative group">
              {/* Soft gradient glow below search bar */}
              <div className="absolute -inset-x-2 top-2 bottom-[-20px] bg-gradient-to-b from-accent-foreground/5 via-accent-foreground/10 to-accent-foreground/20 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 group-focus-within:opacity-70 transition-all duration-500" />
              
              <SearchBar.Dialog open={isOpen} onOpenChange={setIsOpen}>
                <SearchBar.DialogTrigger
                  placeholder="Describe your procurement needs..."
                  className="relative w-full h-16 sm:h-20 md:h-24 text-lg sm:text-xl md:text-2xl font-medium px-8 sm:px-10 md:px-12 pr-20 border-2 border-accent bg-background/95 backdrop-blur-md rounded-2xl hover:border-accent-foreground focus:border-accent-foreground focus:ring-4 focus:ring-accent-foreground/30 transition-all duration-300 shadow-2xl focus:shadow-accent/30 placeholder:text-muted-foreground/60 placeholder:font-semibold cursor-text"
                  style={{
                    boxShadow:
                      "0 12px 48px -12px rgba(255, 107, 53, 0.18), 0 0 0 2px rgba(255, 107, 53, 0.10)",
                  }}
                >
                  <div className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 h-14 w-14 sm:h-16 sm:w-16 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center border-4 border-background">
                    <SearchIcon className="h-7 w-7 sm:h-8 sm:w-8" />
                  </div>
                </SearchBar.DialogTrigger>
                
                <SearchBar.DialogContent className="w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[70vw] max-w-4xl">
                  <SearchBar.Input
                    placeholder="Type to search products, suppliers, and insights..."
                    className="text-base sm:text-lg md:text-xl h-12 sm:h-14 md:h-16 px-4 sm:px-6"
                  />
                  
                  <SearchBar.Results
                    searchFn={searchFunction}
                    className="max-h-[50vh] sm:max-h-[60vh] overflow-y-auto"
                  >
                    {(result: SearchResult) => (
                      <SearchBar.Result
                        value={result.id}
                        key={result.id}
                        onSelect={() => handleSelect(result)}
                        className="px-3 sm:px-4 py-3 sm:py-4 hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer rounded-lg mx-2"
                      >
                        <div className="flex flex-col space-y-1">
                          <div className="font-semibold text-sm sm:text-base md:text-lg">
                            {result.title}
                          </div>
                          {result.description && (
                            <div className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                              {result.description}
                            </div>
                          )}
                          {result.category && (
                            <div className="text-xs text-accent-foreground font-medium">
                              {result.category}
                            </div>
                          )}
                        </div>
                      </SearchBar.Result>
                    )}
                  </SearchBar.Results>
                </SearchBar.DialogContent>
              </SearchBar.Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
