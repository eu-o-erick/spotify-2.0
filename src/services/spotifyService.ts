import { getFromCache, saveToCache } from "@/lib/spotifyCache";
import { TDataSearch } from "@/types";
import { clearExpiredCache } from "@/lib/spotifyCache";

export const fetchSpotifySearch = async (
  type: "multi" | "albums" | "artists",
  query: string | null,
  artistId: string | null,
  page?: string
) => {
  let url = "";

  if (artistId) {
    url = `/api/v1/search?type=albums&artistId=${artistId}&page=${page ?? "0"}`;
  } else if (query) {
    url = `/api/v1/search?q=${query}&type=${type}&page=${page ?? "0"}`;
  } else {
    throw new Error();
  }

  const cachedData = getFromCache(type, query, artistId, page ?? "0");

  if (cachedData) {
    console.log("pesquisa csalve em cache, não fez a requisição");

    return {
      albums: cachedData.albums?.items || [],
      artists: cachedData.artists?.items || [],
    };
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error fetching data from Spotify");
    }

    const data: TDataSearch = await response.json();

    saveToCache(data, type, query, artistId, page ?? "0");

    console.log("pesquisa não salve em cache, fez a requisição");
    clearExpiredCache();

    return {
      albums: data.albums?.items || [],
      artists: data.artists?.items || [],
    };
  } catch (err) {
    console.error("Error fetching data:", err);

    return {
      albums: [],
      artists: [],
    };
  }
};
