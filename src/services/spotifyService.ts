import { getFromCache, saveToCache } from "@/lib/spotifyCache";
import { TDataSearch } from "@/types";
import { clearExpiredCache } from "@/lib/spotifyCache";

export const fetchSpotifySearch = async (
  type: "multi" | "albums" | "artists",
  query: string | null,
  artistId: string | null,
  page: string | null
) => {
  let url = "";

  page = page ?? "1";

  if (artistId) {
    url = `/api/v1/search?type=albums&artistId=${artistId}&page=${page}`;
  } else if (query) {
    url = `/api/v1/search?q=${query}&type=${type}&page=${page}`;
  } else {
    throw new Error();
  }

  const cachedData = getFromCache(type, query, artistId, page);

  if (cachedData) {
    console.log("pesquisa salve em cache, não fez a requisição +++++++");

    return {
      albums: cachedData.albums?.items || [],
      artists: cachedData.artists?.items || [],
      tatalPagesAlbums:
        Math.floor(
          (cachedData.albums?.totalCount ?? 0) /
            (cachedData.albums?.pagingInfo?.limit ?? 0)
        ) ?? 0,
      tatalPagesArtists:
        Math.floor(
          (cachedData.artists?.totalCount ?? 0) /
            (cachedData.artists?.pagingInfo?.limit ?? 0)
        ) ?? 0,
    };
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error fetching data from Spotify");
    }

    const data: TDataSearch = await response.json();

    saveToCache(data, type, query, artistId, page);

    console.log("pesquisa não salve em cache, fez a requisição -------");
    clearExpiredCache();

    return {
      albums: data.albums?.items || [],
      artists: data.artists?.items || [],
      tatalPagesAlbums:
        Math.floor(
          (data.albums?.totalCount ?? 0) / (data.albums?.pagingInfo?.limit ?? 0)
        ) ?? 0,
      tatalPagesArtists:
        Math.floor(
          (data.artists?.totalCount ?? 0) /
            (data.artists?.pagingInfo?.limit ?? 0)
        ) ?? 0,
    };
  } catch (err) {
    console.error("Error fetching data:", err);

    return {
      albums: [],
      artists: [],
      tatalPagesAlbums: 0,
      tatalPagesArtists: 0,
    };
  }
};
