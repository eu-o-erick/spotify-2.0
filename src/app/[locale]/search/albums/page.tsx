"use client";

import SearchComponent from "@/components/Search";
import NothingYetSearchComponent from "@/components/Search/NothingYet";
import ResultsSearchAlbumsComponent from "@/components/Search/Albums/ResultsSearch";
import { TAlbum } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSearchAlbumComponent from "@/components/Search/Albums/Loading";
import NoResultsSearchAlbumComponent from "@/components/Search/Albums/NoResults";
import { fetchSpotifySearch } from "@/services/spotifyService";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const artistId = searchParams.get("artistId");

  const [dataAlbums, setDataAlbums] = useState<TAlbum[]>([]);
  const [loading, setLoading] = useState(false);

  const noResults = query && !dataAlbums.length;

  useEffect(() => {
    setDataAlbums([]);

    if (!query && !artistId) return;

    const fetchResults = async () => {
      setLoading(true);

      const { albums } = await fetchSpotifySearch("albums", query, artistId);

      setDataAlbums(albums);

      setLoading(false);
    };

    fetchResults();
  }, [query, artistId]);

  return (
    <main className="flex-1 mb-28">
      <SearchComponent />

      {!query && !artistId && <NothingYetSearchComponent />}

      {loading && <LoadingSearchAlbumComponent />}

      {noResults && !loading && <NoResultsSearchAlbumComponent query={query} />}

      {(artistId || query) && !noResults && (
        <ResultsSearchAlbumsComponent query={query!} dataAlbums={dataAlbums} />
      )}
    </main>
  );
}
