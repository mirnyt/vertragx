import { Badge } from "@v1/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@v1/ui/card";
import { Button } from "@v1/ui/button";
import { Rss, Mail } from "lucide-react";
import { ChangelogFilters } from "./changelog-filters";

interface ChangelogEntry {
  id: string;
  date: string;
  title: string;
  description: string;
  content: string;
  type: "New" | "Improved" | "Fixed";
  labels: string[];
  badge?: string;
}

const changelogData: ChangelogEntry[] = [
  {
    id: "1",
    date: "June 18, 2025",
    title: "New pricing: lower entry points, fewer limits, more features",
    description:
      "We've updated our pricing to make it easier to get started with our platform and scale as you grow.",
    content:
      "Pricing is now usage-based. You can still start for free, and only pay when you are collecting feedback from more tracked users.\n\nLower entry points:\n• Free plan now includes 25 tracked users and many features that were previously paid\n• Paid plans start at $19/month with 100 tracked users and additional features\n\nFewer limits, more features:\n• Autopilot AI is included in all plans\n• Capture feedback in all of your customer communication.",
    type: "New",
    labels: ["Pricing", "Features"],
    badge: "New",
  },
  {
    id: "2",
    date: "June 10, 2025",
    title: "Enhanced Dashboard Analytics",
    description:
      "New analytics dashboard with real-time metrics and improved data visualization.",
    content:
      "We've completely redesigned our analytics dashboard to provide better insights into your application performance.\n\nKey improvements:\n• Real-time data updates\n• Interactive charts and graphs\n• Custom date range selection\n• Export functionality for all reports\n• Mobile-optimized interface",
    type: "Improved",
    labels: ["Dashboard", "Analytics"],
  },
  {
    id: "3",
    date: "June 5, 2025",
    title: "Fixed email notification issues",
    description:
      "Resolved issues with email notifications not being delivered consistently.",
    content:
      "We've fixed several issues related to email notifications:\n\n• Email delivery reliability improved by 99.9%\n• Fixed duplicate notification bug\n• Improved email template rendering\n• Added retry mechanism for failed deliveries",
    type: "Fixed",
    labels: ["Email", "Notifications", "Bug Fix"],
  },
  {
    id: "4",
    date: "May 28, 2025",
    title: "Integration with Slack and Discord",
    description:
      "Connect your workspace with popular communication platforms for seamless workflow integration.",
    content:
      "New integrations available:\n\n• Slack integration for team notifications\n• Discord webhook support\n• Real-time status updates\n• Custom notification rules\n• Easy setup with OAuth authentication",
    type: "New",
    labels: ["Integration", "Slack", "Discord"],
  },
  {
    id: "5",
    date: "May 20, 2025",
    title: "Performance improvements across the platform",
    description:
      "Significant speed improvements and reduced loading times throughout the application.",
    content:
      "We've made substantial performance improvements:\n\n• 40% faster page load times\n• Optimized database queries\n• Improved caching mechanisms\n• Reduced memory usage\n• Better mobile performance",
    type: "Improved",
    labels: ["Performance", "Optimization"],
  },
];

function getTypeBadgeVariant(type: string) {
  switch (type) {
    case "New":
      return "default";
    case "Improved":
      return "secondary";
    case "Fixed":
      return "outline";
    default:
      return "secondary";
  }
}

export default async function ChangelogPage({
  searchParams,
}: {
  searchParams: { search?: string; types?: string; labels?: string };
}) {
  const searchQuery = searchParams.search || "";
  const selectedTypes = searchParams.types
    ? searchParams.types.split(",")
    : ["All entries"];
  const selectedLabels = searchParams.labels
    ? searchParams.labels.split(",")
    : [];

  const filteredEntries = changelogData.filter((entry) => {
    const matchesSearch =
      searchQuery === "" ||
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedTypes.includes("All entries") ||
      selectedTypes.includes(entry.type);

    const matchesLabels =
      selectedLabels.length === 0 ||
      selectedLabels.some((label) => entry.labels.includes(label));

    return matchesSearch && matchesType && matchesLabels;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">Changelog</h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Follow up on the latest improvements and updates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-accent-foreground"
              >
                <Rss className="h-4 w-4 mr-2" />
                RSS
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-accent-foreground"
              >
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <ChangelogFilters
          searchQuery={searchQuery}
          selectedTypes={selectedTypes}
          selectedLabels={selectedLabels}
        />

        {/* Changelog Entries */}
        <div className="space-y-6 md:space-y-8">
          {filteredEntries.length === 0 ? (
            <Card className="p-8 text-center">
              <CardContent>
                <p className="text-muted-foreground">
                  No entries match your current filters.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredEntries.map((entry) => (
              <Card
                key={entry.id}
                className="hover:bg-accent hover:shadow-md transition-all cursor-pointer"
              >
                <CardHeader className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{entry.date}</span>
                        {entry.badge && (
                          <Badge
                            variant={getTypeBadgeVariant(entry.type)}
                            className="text-xs"
                          >
                            {entry.badge}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl md:text-2xl leading-tight">
                        {entry.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {entry.description}
                      </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {entry.labels.map((label) => (
                        <Badge
                          key={label}
                          variant="outline"
                          className="text-xs"
                        >
                          {label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    {entry.content.split("\n").map((line, index) => (
                      <p
                        key={`${entry.id}-line-${index}`}
                        className="text-sm text-muted-foreground mb-2 last:mb-0"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Results count */}
        <div className="text-center text-sm text-muted-foreground">
          Showing {filteredEntries.length} of {changelogData.length} entries
        </div>
      </div>
    </div>
  );
}
