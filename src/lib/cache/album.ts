import { TAlbum } from "@/types";
import { CACHE_TIME } from "../constants";
import { simplifyAlbum } from "../simplify/simplifyAlbum";

export const saveAlbumToCache = (result: TAlbum, albumId: string) => {
  const data = simplifyAlbum(result);
  const key = `album_${albumId}`;

  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
};

export const getAlbumFromCache = (albumId: string): TAlbum | null => {
  const key = `album_${albumId}`;

  const cached = localStorage.getItem(key);

  if (!cached) return null;

  const { data, timestamp }: { data: TAlbum; timestamp: number } = JSON.parse(
    cached!
  );

  if (Date.now() - timestamp > CACHE_TIME) {
    localStorage.removeItem(key);
    return null;
  }

  return data;
};
