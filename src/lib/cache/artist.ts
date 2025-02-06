import { TArtist } from "@/types/TArtist";
import { CACHE_TIME } from "../constants";
import { simplifyArtist } from "../simplify/simplifyArtist";

export const saveArtistToCache = (result: TArtist, artistId: string | null) => {
  const data = simplifyArtist(result);
  const key = `artist_${artistId}`;

  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
};

export const getArtistFromCache = (artistId: string): TArtist | null => {
  const key = `artist_${artistId}`;

  const cached = localStorage.getItem(key);

  if (!cached) return null;

  const { data, timestamp }: { data: TArtist; timestamp: number } = JSON.parse(
    cached!
  );

  if (Date.now() - timestamp > CACHE_TIME) {
    localStorage.removeItem(key);
    return null;
  }

  return data;
};
