import { TDataSearch } from "@/types";
import { simplifyDataSearch } from "../simplify/simplifyDataSearch";
import { CACHE_TIME } from "../constants";

export const saveSearchToCache = (
  results: TDataSearch,
  type: "multi" | "albums" | "artists",
  query: string | null,
  artistId: string | null,
  page: string
) => {
  const data = simplifyDataSearch(results);
  const key = `${type}_${query ?? artistId}_${page}`;

  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
};

export const getSearchFromCache = (
  type: string,
  query: string | null,
  artistId: string | null,
  page: string
): TDataSearch | null => {
  const key = `${type}_${query ?? artistId}_${page}`;

  const cached = localStorage.getItem(key);

  if (!cached) return null;

  const { data, timestamp }: { data: TDataSearch; timestamp: number } =
    JSON.parse(cached!);

  if (Date.now() - timestamp > CACHE_TIME) {
    localStorage.removeItem(key);
    return null;
  }

  return data as TDataSearch;
};
