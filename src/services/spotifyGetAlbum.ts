import { clearExpiredCache } from "@/lib/cache/clear";
import { getAlbumFromCache, saveAlbumToCache } from "@/lib/cache/album";
import { TAlbum } from "@/types/TAlbum";

export const fetchSpotifyAlbum = async (albumId: string) => {
  const url = `/api/v1/album?id=${albumId}`;

  const cachedAlbum = getAlbumFromCache(albumId);

  if (cachedAlbum) {
    return cachedAlbum;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error fetching data from Spotify");
    }

    const data: TAlbum = await response.json();

    clearExpiredCache();

    saveAlbumToCache(data, albumId);

    return data;
  } catch (err) {
    console.error("Error fetching data:", err);

    return null;
  }
};
