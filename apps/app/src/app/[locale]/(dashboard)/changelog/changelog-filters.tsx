"use client";

import { useState, useCallback, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@v1/ui/button";
import { Input } from "@v1/ui/input";
import { Badge } from "@v1/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@v1/ui/sheet";
import { Checkbox } from "@v1/ui/checkbox";
import { Separator } from "@v1/ui/separator";
import { Search, Filter, X } from "lucide-react";

const typeOptions = ["All entries", "New", "Improved", "Fixed"];
const labelOptions = [
  "AI",
  "Analytics", 
  "Authentication",
  "Branding",
  "Caching",
  "Deployment",
  "Design",
  "Documentation",
  "Infrastructure",
  "Monitoring",
  "Platform",
  "Search",
  "SEO",
  "UI",
];

interface ChangelogFiltersProps {
  searchQuery: string;
  selectedTypes: string[];
  selectedLabels: string[];
}

export function ChangelogFilters({
  searchQuery: initialSearchQuery,
  selectedTypes: initialSelectedTypes,
  selectedLabels: initialSelectedLabels,
}: ChangelogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedTypes, setSelectedTypes] =
    useState<string[]>(initialSelectedTypes);
  const [selectedLabels, setSelectedLabels] = useState<string[]>(
    initialSelectedLabels,
  );

  const updateURL = useCallback(
    (newSearchQuery: string, newTypes: string[], newLabels: string[]) => {
      const params = new URLSearchParams(searchParams);

      if (newSearchQuery) {
        params.set("search", newSearchQuery);
      } else {
        params.delete("search");
      }

      if (newTypes.length > 0 && !newTypes.includes("All entries")) {
        params.set("types", newTypes.join(","));
      } else {
        params.delete("types");
      }

      if (newLabels.length > 0) {
        params.set("labels", newLabels.join(","));
      } else {
        params.delete("labels");
      }

      startTransition(() => {
        router.push(`?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    updateURL(value, selectedTypes, selectedLabels);
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    let newTypes: string[];
    if (type === "All entries") {
      newTypes = checked ? ["All entries"] : [];
    } else {
      if (checked) {
        newTypes = [...selectedTypes.filter((t) => t !== "All entries"), type];
      } else {
        newTypes = selectedTypes.filter((t) => t !== type);
      }
    }
    setSelectedTypes(newTypes);
    updateURL(searchQuery, newTypes, selectedLabels);
  };

  const handleLabelChange = (label: string, checked: boolean) => {
    const newLabels = checked
      ? [...selectedLabels, label]
      : selectedLabels.filter((l) => l !== label);
    setSelectedLabels(newLabels);
    updateURL(searchQuery, selectedTypes, newLabels);
  };

  const clearFilters = () => {
    setSelectedTypes(["All entries"]);
    setSelectedLabels([]);
    setSearchQuery("");
    updateURL("", ["All entries"], []);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Entries..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearchChange(e.target.value)
            }
            className="pl-10"
          />
        </div>

        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-auto hover:bg-accent hover:text-accent-foreground"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {(selectedLabels.length > 0 ||
                !selectedTypes.includes("All entries")) && (
                <Badge variant="secondary" className="ml-2">
                  {selectedLabels.length +
                    (selectedTypes.includes("All entries")
                      ? 0
                      : selectedTypes.length)}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-80">
            <SheetHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <SheetTitle>Filters</SheetTitle>
              </div>

              <div className="space-y-6">
                {/* Type Filters */}
                <div>
                  <h3 className="font-medium mb-3 flex items-center justify-between">
                    Type
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedTypes(["All entries"]);
                        updateURL(searchQuery, ["All entries"], selectedLabels);
                      }}
                      className="text-xs text-muted-foreground hover:text-accent-foreground"
                    >
                      Clear
                    </Button>
                  </h3>
                  <div className="space-y-3">
                    {typeOptions.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={(checked: boolean) =>
                            handleTypeChange(type, checked)
                          }
                        />
                        <label
                          htmlFor={type}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Label Filters */}
                <div>
                  <h3 className="font-medium mb-3 flex items-center justify-between">
                    Labels
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedLabels([]);
                        updateURL(searchQuery, selectedTypes, []);
                      }}
                      className="text-xs text-muted-foreground hover:text-accent-foreground"
                    >
                      Clear
                    </Button>
                  </h3>
                  <div className="space-y-3">
                    {labelOptions.map((label) => (
                      <div key={label} className="flex items-center space-x-2">
                        <Checkbox
                          id={label}
                          checked={selectedLabels.includes(label)}
                          onCheckedChange={(checked: boolean) =>
                            handleLabelChange(label, checked)
                          }
                        />
                        <label
                          htmlFor={label}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full hover:bg-accent hover:text-accent-foreground"
                >
                  Clear all filters
                </Button>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters */}
      {(selectedLabels.length > 0 ||
        !selectedTypes.includes("All entries")) && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {!selectedTypes.includes("All entries") &&
            selectedTypes.map((type) => (
              <Badge
                key={type}
                variant="secondary"
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
              >
                {type}
                <X
                  className="h-3 w-3 ml-1"
                  onClick={() => handleTypeChange(type, false)}
                />
              </Badge>
            ))}
          {selectedLabels.map((label) => (
            <Badge
              key={label}
              variant="secondary"
              className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
            >
              {label}
              <X
                className="h-3 w-3 ml-1"
                onClick={() => handleLabelChange(label, false)}
              />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs hover:text-accent-foreground"
          >
            Clear all
          </Button>
        </div>
      )}
    </>
  );
}
