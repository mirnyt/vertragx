This is the search feature of the application.

`
    import React, { useState } from 'react';
    import { Search as SearchIcon, Image } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    export default function Search() {
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
    return <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto text-center space-y-8">
            {/* Logo */}
            <div className="space-y-4">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                VertragX
            </h1>
            </div>

            {/* Subtitle */}
            <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-medium leading-relaxed">
                Find products and B2B insights with AI
            </h2>
            </div>

            {/* Search Component */}
            <div className="w-full max-w-4xl mx-auto flex items-center justify-center">
            <div className="relative w-full max-w-3xl">
                <div className="relative group">
                {/* Enhanced gradient glow effects */}
                <div className="absolute -inset-3 bg-gradient-to-r from-accent-foreground/40 via-accent-foreground/20 to-accent-foreground/40 rounded-2xl blur-2xl opacity-60 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-accent-foreground/50 to-accent-foreground/50 rounded-xl opacity-40 blur-lg"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-foreground/60 to-accent-foreground/60 rounded-lg opacity-30"></div>
                
                <div className="relative">
                    <Input type="text" placeholder="Describe your needs in detail..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyPress={handleKeyPress} className="relative w-full h-16 sm:h-20 text-lg sm:text-xl px-6 pr-20 border-2 border-border/50 bg-background/90 backdrop-blur-sm rounded-xl focus:border-accent-foreground/50 focus:ring-4 focus:ring-accent-foreground/20 transition-all duration-300 shadow-2xl focus:shadow-2xl resize-none leading-relaxed" style={{
                    boxShadow: '0 12px 48px -12px rgba(255, 107, 53, 0.25), 0 0 0 1px rgba(255, 107, 53, 0.15)'
                }} />
                    
                    {/* Embedded search button */}
                    <Button onClick={handleSearch} size="icon" className="absolute right-3 top-1/2 transform -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center">
                    <SearchIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>
                </div>
                </div>
            </div>
            </div>

            {/* Additional spacing for mobile */}
            <div className="h-16 sm:h-0"></div>
        </div>
        </div>;
    }
`