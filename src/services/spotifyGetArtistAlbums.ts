import {
  getArtistAlbumsFromCache,
  saveArtistAlbumsToCache,
} from "@/lib/cache/artistAlbums";
import { clearExpiredCache } from "@/lib/cache/clear";
import {
  TDataArtistAlbums,
  TResultsArtistAlbums,
} from "@/types/TDataArtistAlbums";

export const fetchSpotifyArtistAlbums = async (
  artistId: string,
  type: "albums" | "singles",
  page: string | null
): Promise<TResultsArtistAlbums | null> => {
  page = page ?? "1";

  const url = `/api/v1/search?artistId=${artistId}&type=${type}&page=${page}`;

  const cachedArtistAlbums = getArtistAlbumsFromCache(artistId, type, page);

  if (cachedArtistAlbums) {
    console.log("ARTISTA ALBUMS salve em cache, não fez a requisição +++++++");

    return {
      albums: cachedArtistAlbums.data.artist.discography.albums?.items || [],
      singles: cachedArtistAlbums.data.artist.discography.singles?.items || [],
      totalPagesAlbums:
        Math.ceil(
          (cachedArtistAlbums.data.artist.discography.albums?.totalCount ?? 0) /
            24
        ) ?? 0,
      totalPagesSingles:
        Math.ceil(
          (cachedArtistAlbums.data.artist.discography.singles?.totalCount ??
            0) / 24
        ) ?? 0,
    };
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error fetching data from Spotify");
    }

    const data: TDataArtistAlbums = await response.json();

    clearExpiredCache();

    saveArtistAlbumsToCache(data, type, artistId, page);

    console.log("ARTISTA ALBUMS não salve em cache, fez a requisição -------");

    return {
      albums: data.data.artist.discography.albums?.items || [],
      singles: data.data.artist.discography.singles?.items || [],
      totalPagesAlbums:
        Math.ceil(
          (data.data.artist.discography.albums?.totalCount ?? 0) / 24
        ) ?? 0,
      totalPagesSingles:
        Math.ceil(
          (data.data.artist.discography.singles?.totalCount ?? 0) / 24
        ) ?? 0,
    };
  } catch (err) {
    console.error("Error fetching data:", err);

    return null;
  }
};
