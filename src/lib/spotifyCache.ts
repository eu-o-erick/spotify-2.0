import { TDataSearch } from "@/types";
import { simplifyDataSearch } from "./utils";

const CACHE_TIME = 10 * 60 * 1000;

export const saveToCache = (
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

export const getFromCache = (
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

export const clearExpiredCache = () => {
  const now = Date.now();

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (!key) continue;

    const cached = localStorage.getItem(key);
    if (!cached) continue;

    try {
      const { timestamp } = JSON.parse(cached);

      if (now - timestamp > CACHE_TIME) localStorage.removeItem(key);
    } catch (err) {
      console.error(err);
    }
  }
};
