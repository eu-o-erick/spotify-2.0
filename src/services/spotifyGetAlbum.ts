import { clearExpiredCache } from "@/lib/cache/clear";
import { getAlbumFromCache, saveAlbumToCache } from "@/lib/cache/album";
import { TAlbum } from "@/types/TAlbum";

export const fetchSpotifyAlbum = async (albumId: string) => {
  const url = `/api/v1/album?id=${albumId}`;

  const cachedAlbum = getAlbumFromCache(albumId);

  if (cachedAlbum) {
    console.log("pegou pelo cache");

    return cachedAlbum;
  }

  try {
    const response = await fetch(url);

    clearExpiredCache();

    const { album, error }: { album: TAlbum; error: string | undefined } =
      await response.json();

    console.log("fez a requisição");

    if (error) return null;

    saveAlbumToCache(album, albumId);

    return album;
  } catch (err) {
    console.error("Error fetching data:", err);

    return null;
  }
};
