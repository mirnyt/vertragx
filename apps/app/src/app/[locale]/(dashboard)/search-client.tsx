"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import { Button } from "@v1/ui/button";
import { Input } from "@v1/ui/input";

// Conditionally import Upstash Search only if environment variables are available
let Search: any = null;
let searchClient: any = null;
let index: any = null;

// Only initialize Upstash Search if environment variables are configured
if (process.env.NEXT_PUBLIC_UPSTASH_SEARCH_REST_URL && process.env.NEXT_PUBLIC_UPSTASH_SEARCH_REST_TOKEN) {
  try {
    const { Search: SearchModule } = require("@upstash/search");
    Search = SearchModule;
    
    searchClient = new Search({
      url: process.env.NEXT_PUBLIC_UPSTASH_SEARCH_REST_URL,
      token: process.env.NEXT_PUBLIC_UPSTASH_SEARCH_REST_TOKEN,
    });
    
    index = searchClient.index("default");
  } catch (error) {
    console.warn("Failed to initialize Upstash Search:", error);
  }
}

// Define the search result type
interface SearchResult {
  id: string;
  title: string;
  description?: string;
  category?: string;
  url?: string;
  [key: string]: any;
}

export function SearchClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Debounced search function
  const performSearch = useCallback(async (query: string) => {
    if (!query || query.trim().length === 0) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      // Check if Upstash Search is properly configured and available
      if (!index) {
        console.warn("Upstash Search not configured, using mock results");
        // Use mock results if Upstash is not configured
        const mockResults = [
          {
            id: "mock-1",
            title: `${query} - Industrial Equipment`,
            description: "High-quality industrial equipment matching your search",
            category: "Equipment",
            url: `/search-results?q=${encodeURIComponent(query)}`
          },
          {
            id: "mock-2",
            title: `${query} - Supplier Solutions`,
            description: "Verified suppliers for your procurement needs",
            category: "Suppliers",
            url: `/search-results?q=${encodeURIComponent(query)}`
          },
          {
            id: "mock-3",
            title: `${query} - Technical Specifications`,
            description: "Detailed technical information and specifications",
            category: "Documentation",
            url: `/search-results?q=${encodeURIComponent(query)}`
          }
        ].filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
        );
        
        setSearchResults(mockResults);
        setShowResults(mockResults.length > 0);
        return;
      }

      // Use Upstash Search if available
      const response = await index.search({
        query: query,
        limit: 10,
        reranking: true
      });
      
      // Process Upstash Search results
      let results: SearchResult[] = [];
      
      // Check if response has results array
      if (response && response.results && Array.isArray(response.results)) {
        // Map the response results to our SearchResult interface
        results = response.results.map((item: any) => ({
          id: item.id || Math.random().toString(36).substring(2, 11),
          title: item.content?.title || item.title || item.content?.name || item.name || "Untitled",
          supplier: item.content?.supplier || item.supplier || "",
          description: item.content?.description || item.description || item.content?.content || "",
          category: item.content?.category || item.category || item.content?.type || "",
          url: item.content?.url || item.url || `/search-results?q=${encodeURIComponent(query)}`,
          score: item.score || 0,
          ...item.content // Include any additional content fields
        }));
      } else if (Array.isArray(response)) {
        // Fallback if response is directly an array
        results = response.map((item: any) => ({
          id: item.id || Math.random().toString(36).substring(2, 11),
          title: item.content?.title || item.title || "Untitled",
          description: item.content?.description || item.description || "",
          category: item.content?.category || item.category || "",
          url: item.content?.url || `/search-results?q=${encodeURIComponent(query)}`,
          score: item.score || 0,
          ...item.content
        }));
      }
      setSearchResults(results);
      setShowResults(results.length > 0);
    } catch (error) {
      console.error("Search error:", error);
      // If search fails, try to show helpful error info
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      
      // Fallback to mock results on error
      console.warn("Using fallback mock results due to error");
      const fallbackResults = [
        {
          id: "error-1",
          title: `${query} - Search temporarily unavailable`,
          description: "Please try again or browse our categories",
          category: "System",
          url: `/search-results?q=${encodeURIComponent(query)}`
        }
      ];
      setSearchResults(fallbackResults);
      setShowResults(true);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, performSearch]);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (result: SearchResult) => {
    if (result.url) {
      router.push(result.url);
    } else {
      router.push(`/search-results?q=${encodeURIComponent(result.title)}`);
    }
    setShowResults(false);
    setSearchQuery("");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search-results?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowResults(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && selectedIndex === -1) {
      handleSearch();
    } else if (e.key === "Enter" && selectedIndex >= 0 && searchResults[selectedIndex]) {
      handleSelect(searchResults[selectedIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === "Escape") {
      setShowResults(false);
      setSelectedIndex(-1);
    }
  };

  const handleFocus = () => {
    if (searchResults.length > 0) {
      setShowResults(true);
    }
    if (searchQuery === "") {
      setSearchQuery("temperature data logger");
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



        {/* Search Component with Inline Results */}
        <div className="w-full flex items-center justify-center">
          <div ref={searchRef} className="relative w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl">
            <div className="relative group">
              {/* Soft gradient glow below search bar */}
              <div className="absolute -inset-x-2 top-2 bottom-[-20px] bg-gradient-to-b from-accent-foreground/5 via-accent-foreground/10 to-accent-foreground/20 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 group-focus-within:opacity-70 transition-all duration-500" />
              
              <div className="relative">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Describe your procurement needs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={handleFocus}
                  className="relative w-full h-16 sm:h-20 md:h-24 text-lg sm:text-xl md:text-2xl font-medium px-8 sm:px-10 md:px-12 pr-20 border-2 border-accent bg-background/95 backdrop-blur-md rounded-2xl focus:border-accent-foreground focus:ring-4 focus:ring-accent-foreground/30 transition-all duration-300 shadow-2xl focus:shadow-accent/30 placeholder:text-muted-foreground/60 placeholder:font-semibold"
                  style={{
                    boxShadow:
                      "0 12px 48px -12px rgba(255, 107, 53, 0.18), 0 0 0 2px rgba(255, 107, 53, 0.10)",
                  }}
                />
                
                {/* Search Button */}
                <Button
                  onClick={handleSearch}
                  size="icon"
                  className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 h-14 w-14 sm:h-16 sm:w-16 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center border-4 border-background focus:ring-2 focus:ring-primary/40"
                  style={{ boxShadow: "0 4px 24px 0 rgba(27, 54, 93, 0.10)" }}
                >
                  {isSearching ? (
                    <Loader2 className="h-7 w-7 sm:h-8 sm:w-8 animate-spin" />
                  ) : (
                    <SearchIcon className="h-7 w-7 sm:h-8 sm:w-8" />
                  )}
                </Button>
              </div>

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div
                  ref={resultsRef}
                  className="absolute top-full mt-2 w-full bg-background border-2 border-accent rounded-2xl shadow-2xl overflow-hidden"
                  style={{
                    boxShadow:
                      "0 20px 50px -12px rgba(255, 107, 53, 0.15), 0 0 0 1px rgba(255, 107, 53, 0.05)",
                    zIndex: 9999,
                  }}
                >
                  <div className="max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
                    {searchResults.map((result, index) => (
                      <div
                        key={result.id}
                        onClick={() => handleSelect(result)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`px-4 sm:px-6 py-3 sm:py-4 cursor-pointer transition-all duration-200 ${
                          index === selectedIndex
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        <div className="flex flex-col space-y-1">
                          <div className="font-semibold text-sm sm:text-base md:text-lg">
                            {result.title}
                          </div>
                          {result.description && (
                            <div className={`text-xs sm:text-sm line-clamp-2 ${
                              index === selectedIndex ? "" : "text-muted-foreground"
                            }`}>
                              {result.supplier}
                            </div>
                          )}
                          {result.category && (
                            <div className="text-xs font-medium">
                              {result.category}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results Message */}
              {showResults && searchResults.length === 0 && !isSearching && searchQuery.trim() && (
                <div
                  className="absolute top-full mt-2 w-full bg-background border-2 border-accent rounded-2xl shadow-2xl p-8 text-center z-50"
                  style={{
                    boxShadow:
                      "0 20px 50px -12px rgba(255, 107, 53, 0.15), 0 0 0 1px rgba(255, 107, 53, 0.05)",
                  }}
                >
                  <p className="text-muted-foreground font-medium">
                    No results found for "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
