import { clearExpiredCache } from "@/lib/cache/clear";
import { getArtistFromCache, saveArtistToCache } from "@/lib/cache/artist";
import { TArtist } from "@/types/TArtist";

export const fetchSpotifyArtist = async (artistId: string) => {
  const url = `/api/v1/artist?id=${artistId}`;

  const cachedArtist = getArtistFromCache(artistId);

  if (cachedArtist) {
    return cachedArtist;
  }

  try {
    clearExpiredCache();

    const response = await fetch(url);

    const data: { artist: TArtist; error: string | undefined } =
      await response.json();

    if (data.error) return null;

    saveArtistToCache(data.artist, artistId);

    return data.artist;
  } catch (err) {
    console.error("Error fetching data:", err);

    return null;
  }
};
