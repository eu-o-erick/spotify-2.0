import { TAlbum } from "@/types";
import { clearExpiredCache } from "@/lib/cache/clear";
import { getAlbumFromCache, saveAlbumToCache } from "@/lib/cache/album";

export const fetchSpotifyAlbum = async (albumId: string) => {
  const url = `/api/v1/album?id=${albumId}`;

  const cachedAlbum = getAlbumFromCache(albumId);

  if (cachedAlbum) {
    console.log("ALBUM salve em cache, não fez a requisição +++++++");

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

    console.log("ALBUM não salve em cache, fez a requisição -------");

    return data;
  } catch (err) {
    console.error("Error fetching data:", err);

    return null;
  }
};
