import { getSearchFromCache, saveSearchToCache } from "@/lib/cache/search";
import { clearExpiredCache } from "@/lib/cache/clear";
import { TDataSearch, TResultsSearch } from "@/types/TDataSearch";

export const fetchSpotifySearch = async (
  type: "multi" | "albums" | "artists",
  query: string | null,
  artistId: string | null,
  page: string | null
): Promise<TResultsSearch> => {
  let url = "";

  page = page ?? "1";

  if (artistId) {
    url = `/api/v1/search?type=albums&artistId=${artistId}&page=${page}`;
  } else if (query) {
    url = `/api/v1/search?q=${query}&type=${type}&page=${page}`;
  } else {
    throw new Error();
  }

  const cachedData = getSearchFromCache(type, query, artistId, page);

  if (cachedData) {
    return {
      albums: cachedData.albums?.items || [],
      artists: cachedData.artists?.items || [],
      totalPagesAlbums:
        Math.ceil(
          (cachedData.albums?.totalCount ?? 0) /
            (cachedData.albums?.pagingInfo?.limit ?? 0)
        ) ?? 0,
      tatalPagesArtists:
        Math.ceil(
          (cachedData.artists?.totalCount ?? 0) /
            (cachedData.artists?.pagingInfo?.limit ?? 0)
        ) ?? 0,
    };
  }

  try {
    const response = await fetch(url);

    clearExpiredCache();

    const { data, error }: { data: TDataSearch; error: string | undefined } =
      await response.json();

    if (error)
      return {
        albums: [],
        artists: [],
        totalPagesAlbums: 0,
        tatalPagesArtists: 0,
      };

    saveSearchToCache(data, type, query, artistId, page);

    return {
      albums: data.albums?.items || [],
      artists: data.artists?.items || [],
      totalPagesAlbums:
        Math.ceil(
          (data.albums?.totalCount ?? 0) / (data.albums?.pagingInfo?.limit ?? 0)
        ) ?? 0,
      tatalPagesArtists:
        Math.ceil(
          (data.artists?.totalCount ?? 0) /
            (data.artists?.pagingInfo?.limit ?? 0)
        ) ?? 0,
    };
  } catch (err) {
    console.error("Error fetching data:", err);

    return {
      albums: [],
      artists: [],
      totalPagesAlbums: 0,
      tatalPagesArtists: 0,
    };
  }
};
