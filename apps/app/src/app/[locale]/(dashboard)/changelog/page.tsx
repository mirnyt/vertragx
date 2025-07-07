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
    date: "July 6, 2025",
    title: "User Authentication and Search Enhancements",
    description:
      "Added logout functionality and improved search experience with default values for better testing and demonstration.",
    content:
      "Major improvements to user authentication and search functionality:\n\n• Added logout feature with conditional display in sidebar\n• Implemented default search value 'temperature data logger' for testing and demo purposes\n• Fixed metadata URLs for better SEO and sharing\n• Minor fixes to search component functionality\n• Updated sidebar, header, footer and search results layout to ensure mobile responsiveness",
    type: "New",
    labels: ["Authentication", "Search", "UI"],
    badge: "New",
  },
  {
    id: "2",
    date: "July 5, 2025",
    title: "Metadata and Manifest Improvements",
    description:
      "Enhanced website metadata and added progressive web app manifest details for better mobile experience.",
    content:
      "Website optimization and mobile experience improvements:\n\n• Added comprehensive metadata for better search engine optimization\n• Implemented progressive web app manifest details\n• Updated sidebar menu with improved navigation\n• Added search results page with responsive layout\n• Search page adjustments for better user experience\n• Various search component fixes and improvements",
    type: "Improved",
    labels: ["SEO"],
  },
  {
    id: "3",
    date: "July 4, 2025",
    title: "Logo Integration and Responsive Design",
    description:
      "Added VertragX logo throughout the platform and implemented responsive sidebar menu for better mobile experience.",
    content:
      "Brand consistency and mobile improvements:\n\n• Added VertragX logo in sidebar and as copyright in footer\n• Implemented responsive sidebar menu with mobile support\n• Created changelog page concept for tracking updates\n• Enhanced overall brand consistency and mobile responsiveness across the platform",
    type: "Improved",
    labels: ["Branding", "Design"],
  },
  {
    id: "4",
    date: "July 3, 2025",
    title: "DevOps and Deployment Setup",
    description:
      "Configured automated deployment pipeline to Vercel with GitHub integration for continuous deployment.",
    content:
      "Production deployment and DevOps improvements:\n\n• Setup automated deployment to Vercel triggered by GitHub push\n• Configured environment variables for production\n• Implemented branch-based deployment strategy\n• Setup preview deployments for pull requests•",
    type: "New",
    labels: ["Deployment"],
  },
  {
    id: "5",
    date: "July 3, 2025",
    title: "Analytics and Monitoring Integration",
    description:
      "Integrated OpenPanel for comprehensive analytics tracking and Sentry for application monitoring and error tracking.",
    content:
      "Enhanced monitoring and analytics capabilities:\n\n• Integrated OpenPanel for user analytics and behavior tracking\n• Added Sentry for comprehensive application monitoring\n• Implemented error tracking and performance monitoring\n• Setup real-time error alerts and notifications•",
    type: "New",
    labels: ["Analytics", "Monitoring"],
  },
  {
    id: "6",
    date: "July 2, 2025",
    title: "Redis and Search Infrastructure",
    description:
      "Integrated Upstash for Redis caching, product search capabilities, and vector search functionality.",
    content:
      "Advanced search and caching infrastructure:\n\n• Integrated Upstash Redis for high-performance caching\n• Planned to implement product search with Redis-based indexing\n• Planned to add vector search capabilities for AI-powered search•",
    type: "New",
    labels: ["Search", "Caching", "AI"],
  },
  {
    id: "7",
    date: "July 2, 2025",
    title: "Platform Foundation and Authentication Setup",
    description:
      "Major platform improvements including monorepo documentation, theme updates, and email authentication implementation.",
    content:
      "Foundation improvements and authentication setup:\n\n• Added comprehensive instructions for adding new packages to monorepo\n• Updated theme system and switched to light mode as default\n• Improved email authentication flow with better user experience\n• Added complete email authentication system\n• Initial project setup with all necessary configurations",
    type: "New",
    labels: ["Platform", "Authentication", "Documentation"],
  },
  {
    id: "8",
    date: "July 1, 2025",
    title: "Project Initialization and Core Setup",
    description:
      "Initial project setup with complete monorepo structure, authentication system, and development environment.",
    content:
      "Complete project foundation setup:\n\n• Initial commit with full monorepo configuration\n• Turborepo setup with multiple apps (web, app, api)\n• Supabase integration for authentication and database\n• Email authentication flow implementation\n• Theme system with custom design tokens\n• Development environment configuration\n• Build system and tooling setup",
    type: "New",
    labels: ["Infrastructure"],
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
