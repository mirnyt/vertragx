import { SearchClient } from "./search-client";

export const metadata = {
  title: "Search",
};

export default async function Page() {
  return <SearchClient />;
}
