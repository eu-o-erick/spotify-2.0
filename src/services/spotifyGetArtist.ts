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

    const { artist, error }: { artist: TArtist; error: string | undefined } =
      await response.json();

    if (error) return null;

    saveArtistToCache(artist, artistId);

    return artist;
  } catch (err) {
    console.error("Error fetching data:", err);

    return null;
  }
};
