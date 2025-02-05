import { TArtist } from "@/types";
import { clearExpiredCache } from "@/lib/cache/clear";
import { getArtistFromCache, saveArtistToCache } from "@/lib/cache/artist";

export const fetchSpotifyArtist = async (artistId: string) => {
  const url = `/api/v1/artist?id=${artistId}`;

  const cachedArtist = getArtistFromCache(artistId);

  if (cachedArtist) {
    console.log("ARTISTA salve em cache, não fez a requisição +++++++");

    return cachedArtist;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error fetching data from Spotify");
    }

    const data: TArtist = await response.json();

    console.log("data: ", data);

    clearExpiredCache();

    saveArtistToCache(data, artistId);

    console.log("ARTISTA não salve em cache, fez a requisição -------");

    return data;
  } catch (err) {
    console.error("Error fetching data:", err);

    return null;
  }
};
