"use client";

import SearchComponent from "@/components/Search";
import LoadingSearchComponent from "@/components/Search/Loading";
import NoResultsSearchComponent from "@/components/Search/NoResults";
import NothingYetSearchComponent from "@/components/Search/NothingYet";
import ResultsSearchComponent from "@/components/Search/ResultsSearch";
import { fetchSpotifySearch } from "@/services/spotifyService";
import { TAlbum, TArtist } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [dataAlbums, setDataAlbums] = useState<TAlbum[]>([]);
  const [dataArtists, setDataArtists] = useState<TArtist[]>([]);
  const [loading, setLoading] = useState(false);

  const noResults = query && !dataAlbums.length && !dataArtists.length;

  useEffect(() => {
    setDataAlbums([]);
    setDataArtists([]);

    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);

      const { albums, artists } = await fetchSpotifySearch(
        "multi",
        query,
        null
      );

      setDataAlbums(albums);
      setDataArtists(artists);

      setLoading(false);
    };

    fetchResults();
  }, [query]);

  return (
    <main className="flex-1 mb-28">
      <SearchComponent />

      {!query && <NothingYetSearchComponent />}

      {loading && <LoadingSearchComponent />}

      {noResults && !loading && <NoResultsSearchComponent query={query} />}

      {query && !noResults && (
        <ResultsSearchComponent
          query={query!}
          dataArtists={dataArtists}
          dataAlbums={dataAlbums}
        />
      )}
    </main>
  );
}
