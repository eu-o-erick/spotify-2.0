import { TDataArtistAlbums } from "@/types/TDataArtistAlbums";
import { CACHE_TIME } from "../constants";

import { simplifyAllArtistAlbums } from "../simplify/simplifyDataArtistAlbums";

export const saveArtistAlbumsToCache = (
  result: TDataArtistAlbums,
  type: "albums" | "singles",
  artistId: string,
  page: string
) => {
  const data = simplifyAllArtistAlbums(result);
  const key = `artist_${type}_${artistId}_${page}`;

  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
};

export const getArtistAlbumsFromCache = (
  artistId: string,
  type: "albums" | "singles",
  page: string
): TDataArtistAlbums | null => {
  const key = `artist_${type}_${artistId}_${page}`;

  const cached = localStorage.getItem(key);

  if (!cached) return null;

  const { data, timestamp }: { data: TDataArtistAlbums; timestamp: number } =
    JSON.parse(cached!);

  if (Date.now() - timestamp > CACHE_TIME) {
    localStorage.removeItem(key);
    return null;
  }

  return data;
};
