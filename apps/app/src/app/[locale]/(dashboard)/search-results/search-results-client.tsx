"use client";

import { useState } from "react";
import {
  Send,
  Heart,
  Star,
  Filter,
  ChevronDown,
  MessageCircle,
  X,
  Search,
  TrendingUp,
  Building2,
  Target,
  Users,
} from "lucide-react";
import { Button } from "@v1/ui/button";
import { Input } from "@v1/ui/input";
import { Badge } from "@v1/ui/badge";
import { Card, CardContent } from "@v1/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@v1/ui/select";
import { Slider } from "@v1/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@v1/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@v1/ui/drawer";

interface SearchResultsClientProps {
  searchQuery: string;
}

export function SearchResultsClient({ searchQuery }: SearchResultsClientProps) {
  const [chatMessage, setChatMessage] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(["Best Selling"]);
  const [selectedSupplierType, setSelectedSupplierType] = useState("");
  const [selectedCertifications, setSelectedCertifications] = useState<
    string[]
  >([]);

  // Mock chat messages
  const chatMessages = [
    {
      type: "user",
      content: searchQuery || "temperature data logger",
      timestamp: "2 min ago",
    },
    {
      type: "ai",
      content:
        "I will search for sourcing options for a temperature data logger for you. Please hold on for a moment.",
      timestamp: "2 min ago",
    },
    {
      type: "ai",
      content:
        "The search for temperature data loggers has been successfully completed, and the relevant products are now displayed on your interface. If you need further assistance or have any other inquiries, feel free to let me know!",
      timestamp: "1 min ago",
    },
  ];

  // Follow-up suggestions
  const followUpSuggestions = [
    {
      icon: Search,
      text: "Find suppliers for temperature data loggers",
    },
    {
      icon: TrendingUp,
      text: "Market trends for temperature data loggers",
    },
    {
      icon: Target,
      text: "Source high accuracy temperature data loggers",
    },
  ];

  // Mock product data
  const products = [
    {
      id: 1,
      name: "Elitech LogEt 1 TH Single Use",
      price: "$25-50",
      minOrder: "10 piece",
      supplier: "Elitech",
      verified: true,
      years: "9 yrs",
      rating: 4.9,
      reviews: 134,
      image: "/logger/01.png",
      badges: ["FCC", "CE"],
      attributes: ["High Accuracy", "Wide Temperature Range"],
    },
    {
      id: 2,
      name: "Rotronic BL-1D Data Logger",
      price: "$270-300",
      minOrder: "1 set",
      supplier: "Rotronic",
      verified: true,
      years: "1 yr",
      rating: 5.0,
      reviews: 118,
      image: "/logger/02.png",
      badges: ["CE"],
      attributes: ["Multi Channel", "Modbus Interface"],
    },
    {
      id: 3,
      name: "HTC Easy Log Temperature and Humidity Data Logger",
      price: "$59-85",
      minOrder: "5 pieces",
      supplier: "HTC",
      verified: false,
      years: "12 yrs",
      rating: 4.5,
      reviews: 16,
      image: "/logger/03.png",
      badges: [],
      attributes: ["Graphing Display", "Humidity Sensor"],
    },
    {
      id: 4,
      name: "Honeywell BluTag 360 USB Data Logger",
      price: "$27-35",
      minOrder: "10 units",
      supplier: "Honeywell",
      verified: false,
      years: "2 yrs",
      rating: 4.8,
      reviews: 50,
      image: "/logger/04.png",
      badges: [],
      attributes: ["High Temperature", "USB"],
    },
    {
      id: 5,
      name: "ADAPT Cold Chain Single Use Datalogger",
      price: "$28-35",
      minOrder: "5 units",
      supplier: "ADAPT",
      verified: true,
      years: "19 yrs",
      rating: 4.7,
      reviews: 1329,
      image: "/logger/05.png",
      badges: ["CE"],
      attributes: ["Single Use", "Long Battery Life"],
    },
    {
      id: 6,
      name: "VEGA Alpha Wi-Fi Temperature and Humidity Data Logger",
      price: "$200-250",
      minOrder: "1 units",
      supplier: "VEGA World",
      verified: true,
      years: "5 yrs",
      rating: 4.9,
      reviews: 89,
      image: "/logger/06.png",
      badges: ["CE", "RoHS"],
      attributes: ["LCD Display", "Data Storage", "Wi-Fi"],
    },
    {
      id: 7,
      name: "Bluetooth Temperature and Humidity Logger with App",
      price: "$125-180",
      minOrder: "2 sets",
      supplier: "Alibaba.com - Guangzhou Smart",
      verified: true,
      years: "3 yrs",
      rating: 4.7,
      reviews: 245,
      image: "/placeholder.svg",
      badges: ["FCC", "CE"],
      attributes: ["Bluetooth", "Mobile App", "Real-time Monitoring"],
    },
    {
      id: 8,
      name: "Industrial Grade Temperature Logger -40°C to 85°C",
      price: "$89-156",
      minOrder: "5 units",
      supplier: "Alibaba.com - Shanghai Industrial",
      verified: false,
      years: "7 yrs",
      rating: 4.1,
      reviews: 67,
      image: "/placeholder.svg",
      badges: ["IP65"],
      attributes: ["Industrial Grade", "Wide Range", "Waterproof"],
    },
    {
      id: 9,
      name: "Portable Temperature Data Logger with PDF Report",
      price: "$35-62",
      minOrder: "20 pieces",
      supplier: "Alibaba.com - Dongguan Precision",
      verified: true,
      years: "8 yrs",
      rating: 3.9,
      reviews: 156,
      image: "/placeholder.svg",
      badges: ["CE"],
      attributes: ["PDF Export", "Portable", "Easy Setup"],
    },
    {
      id: 10,
      name: "WiFi Temperature Data Logger Cloud Storage",
      price: "$220-315",
      minOrder: "1 unit",
      supplier: "Alibaba.com - Xiamen IoT",
      verified: true,
      years: "4 yrs",
      rating: 4.5,
      reviews: 78,
      image: "/placeholder.svg",
      badges: ["FCC", "CE", "WiFi"],
      attributes: ["WiFi Enabled", "Cloud Storage", "Remote Access"],
    },
    {
      id: 11,
      name: "Vaccine Cold Chain Temperature Monitor",
      price: "$95-145",
      minOrder: "10 units",
      supplier: "Alibaba.com - Medical Solutions",
      verified: true,
      years: "6 yrs",
      rating: 4.8,
      reviews: 134,
      image: "/placeholder.svg",
      badges: ["FDA", "CE", "WHO"],
      attributes: ["Cold Chain", "Medical Grade", "Alarm System"],
    },
    {
      id: 12,
      name: "Solar Powered Outdoor Temperature Logger",
      price: "$180-275",
      minOrder: "3 pieces",
      supplier: "Alibaba.com - Green Energy",
      verified: false,
      years: "2 yrs",
      rating: 4.0,
      reviews: 45,
      image: "/placeholder.svg",
      badges: ["IP67"],
      attributes: ["Solar Powered", "Outdoor Use", "Long Battery Life"],
    },
  ];

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessage("");
    }
  };

  const ChatInterface = () => (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Chat Header */}
      <div className="p-4 border-b border-border bg-card">
        <h2 className="font-semibold text-lg text-foreground">
          Product Search Assistant
        </h2>
        <p className="text-sm text-muted-foreground">
          Ask me anything about products
        </p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Follow-up Suggestions */}
      <div className="p-3 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-2">
          Ask follow-up...
        </h3>
        <div className="space-y-1">
          {followUpSuggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-2 p-2 text-left text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors duration-200"
            >
              <suggestion.icon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{suggestion.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Ask about products..."
            className="flex-1"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  const FilterDrawer = () => (
    <Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFilters.length > 0 && (
            <Badge
              variant="secondary"
              className="ml-2 h-5 px-1.5 text-xs bg-accent-foreground text-white"
            >
              {activeFilters.length}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[85vh] sm:h-[90vh]">
        <DrawerHeader className="border-b border-border">
          <DrawerTitle>Filter Products</DrawerTitle>
        </DrawerHeader>

        <div className="p-6 overflow-y-auto">
          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-accent text-accent-foreground"
                  >
                    {filter} <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Price Range</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">$1</span>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={2000}
                  step={10}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground">$2000+</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Selected: ${priceRange[0]} - ${priceRange[1]}+
              </div>
            </div>
          </div>

          {/* Supplier Type */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Supplier Type</h3>
            <Select
              value={selectedSupplierType}
              onValueChange={setSelectedSupplierType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select supplier type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="verified">Verified Suppliers</SelectItem>
                <SelectItem value="experienced">5+ Years Experience</SelectItem>
                <SelectItem value="gold">Gold Suppliers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Certifications */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Certifications</h3>
            <div className="grid grid-cols-2 gap-2">
              {["CE", "FCC", "RoHS", "FDA", "WHO", "IP65", "IP67", "WiFi"].map(
                (cert) => (
                  <Button
                    key={cert}
                    variant="outline"
                    size="sm"
                    className="justify-start"
                  >
                    {cert}
                  </Button>
                ),
              )}
            </div>
          </div>

          {/* Product Features */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Features</h3>
            <div className="space-y-2">
              {[
                "High Accuracy",
                "Wide Temperature Range",
                "Long Battery Life",
                "Wireless",
                "Multi Channel",
                "Waterproof",
              ].map((feature) => (
                <Button
                  key={feature}
                  variant="ghost"
                  size="sm"
                  className="justify-start w-full"
                >
                  {feature}
                </Button>
              ))}
            </div>
          </div>

          {/* Minimum Order */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Minimum Order Quantity</h3>
            <Input type="number" placeholder="Enter MOQ" />
          </div>
        </div>

        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsFilterOpen(false)}
            >
              Clear All
            </Button>
            <Button className="flex-1" onClick={() => setIsFilterOpen(false)}>
              Apply Filters
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );

  const ProductResults = () => (
    <div className="h-full overflow-y-auto bg-background">
      {/* Streamlined Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4 sm:p-6 z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">
              {searchQuery || "temperature data logger"}
            </h1>
            <p className="text-muted-foreground mt-1">
              Results from{" "}
              <span className="font-semibold text-accent-foreground">
                61,000+
              </span>{" "}
              products and{" "}
              <span className="font-semibold text-accent-foreground">
                3,600+
              </span>{" "}
              suppliers
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Chat Toggle */}
            <div className="sm:hidden">
              <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:w-[400px] p-0 flex flex-col">
                  <SheetHeader className="p-4 flex-shrink-0">
                    <SheetTitle>Product Assistant</SheetTitle>
                  </SheetHeader>
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {chatMessages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.type === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Follow-up Suggestions */}
                    <div className="p-3 border-t border-border flex-shrink-0">
                      <h3 className="text-sm font-medium text-foreground mb-2">
                        Ask follow-up...
                      </h3>
                      <div className="space-y-1">
                        {followUpSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            className="w-full flex items-center gap-2 p-2 text-left text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors duration-200"
                          >
                            <suggestion.icon className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{suggestion.text}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 border-t border-border flex-shrink-0">
                      <div className="flex gap-2">
                        <Input
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          placeholder="Ask about products..."
                          className="flex-1"
                          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        />
                        <Button onClick={handleSendMessage} size="icon">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Filter Button */}
            <FilterDrawer />
          </div>
        </div>

        {/* Quick Filter Tags */}
        {activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-accent text-accent-foreground"
              >
                {filter} <X className="ml-1 h-3 w-3" />
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center">
            <div className="w-2 h-2 bg-accent-foreground rounded-full mr-2" />
            All products
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-all duration-200 hover:bg-accent/5 border-border"
            >
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative aspect-square bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  {product.badges.length > 0 && (
                    <div className="absolute bottom-3 left-3 flex gap-1">
                      {product.badges.slice(0, 2).map((badge) => (
                        <Badge
                          key={badge}
                          variant="secondary"
                          className="text-xs bg-background/90 text-foreground"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  {/* Product Name */}
                  <h3 className="font-medium text-sm leading-tight line-clamp-2 text-foreground min-h-[2.5rem]">
                    {product.name}
                  </h3>

                  {/* Price and Rating */}
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-accent-foreground">
                      {product.price}
                    </span>
                    {product.rating > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-muted-foreground font-medium">
                          {product.rating}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Supplier Info */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground truncate">
                        {product.supplier.split(" - ")[1] || product.supplier}
                      </span>
                      {product.verified && (
                        <Badge
                          variant="outline"
                          className="text-xs px-1.5 py-0"
                        >
                          ✓
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>MOQ: {product.minOrder}</span>
                      <span>{product.years}</span>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="flex flex-wrap gap-1">
                    {product.attributes.slice(0, 2).map((attr) => (
                      <Badge
                        key={attr}
                        variant="outline"
                        className="text-xs px-2 py-0.5 text-muted-foreground"
                      >
                        {attr}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            className="hover:bg-accent hover:text-accent-foreground"
          >
            Load more products
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-3.5rem)] bg-background">
      {/* Desktop Layout */}
      <div className="hidden sm:flex h-full">
        {/* Chat Interface - 1/3 width */}
        <div className="w-1/3 min-w-[300px] max-w-[400px]">
          <ChatInterface />
        </div>

        {/* Product Results - 2/3 width */}
        <div className="flex-1">
          <ProductResults />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden h-full">
        <ProductResults />
      </div>
    </div>
  );
}
