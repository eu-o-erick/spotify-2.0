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
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error fetching data from Spotify");
    }

    const data: TArtist = await response.json();

    clearExpiredCache();

    saveArtistToCache(data, artistId);

    return data;
  } catch (err) {
    console.error("Error fetching data:", err);

    return null;
  }
};
