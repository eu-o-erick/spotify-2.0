"use client";

import SearchComponent from "@/components/Search";
import LoadingSearchComponent from "@/components/Search/Loading";
import NoResultsSearchComponent from "@/components/Search/NoResults";
import NothingYetSearchComponent from "@/components/Search/NothingYet";
import ResultsSearchComponent from "@/components/Search/ResultsSearch";
import { fetchSpotifySearch } from "@/services/spotifySearch";
import { TSearchAlbum } from "@/types/TAlbum";
import { TSearchArtist } from "@/types/TArtist";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const page = searchParams.get("page");

  const [dataAlbums, setDataAlbums] = useState<TSearchAlbum[]>([]);
  const [dataArtists, setDataArtists] = useState<TSearchArtist[]>([]);
  const [pagesAlbums, setPagesAlbums] = useState(0);
  const [pagesArtists, setPagesArtists] = useState(0);

  const [loading, setLoading] = useState(true);

  const noResults = query && !dataAlbums.length && !dataArtists.length;

  useEffect(() => {
    setLoading(true);
    setDataAlbums([]);
    setDataArtists([]);

    if (!query) return setLoading(false);

    const fetchResults = async () => {
      const { albums, artists, totalPagesAlbums, totalPagesArtists } =
        await fetchSpotifySearch("multi", query, null, page);

      setDataAlbums(albums);
      setDataArtists(artists);

      setPagesAlbums(totalPagesAlbums);
      setPagesArtists(totalPagesArtists);

      setLoading(false);
    };

    fetchResults();
  }, [query, page]);

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
          pagesAlbums={pagesAlbums}
          pagesArtists={pagesArtists}
        />
      )}
    </main>
  );
}
