import { SearchResultsClient } from "./search-results-client";

export const metadata = {
  title: "Search Results",
};

interface SearchResultsPageProps {
  searchParams: {
    q?: string;
  };
}

export default async function SearchResultsPage({ searchParams }: SearchResultsPageProps) {
  const searchQuery = searchParams.q || 'temperature data logger';
  
  return <SearchResultsClient searchQuery={searchQuery} />;
}