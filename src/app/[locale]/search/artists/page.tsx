"use client";

import PaginationComponent from "@/components/Pagination";
import SearchComponent from "@/components/Search";
import LoadingSearchArtistsComponent from "@/components/Search/Artists/Loading";
import NoResultsSearchArtistsComponent from "@/components/Search/Artists/NoResults";
import ResultsSearchArtistsComponent from "@/components/Search/Artists/ResultsSearch";
import NothingYetSearchComponent from "@/components/Search/NothingYet";
import { fetchSpotifySearch } from "@/services/spotifySearch";
import { TArtist } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const page = searchParams.get("page");

  const [dataArtists, setDataArtists] = useState<TArtist[]>([]);
  const [pagesArtists, setPagesArtists] = useState(0);
  const [loading, setLoading] = useState(true);

  const noResults = query && !dataArtists.length;

  useEffect(() => {
    setLoading(true);
    setDataArtists([]);

    if (!query) return setLoading(false);

    const fetchResults = async () => {
      setLoading(true);

      const { artists, tatalPagesArtists } = await fetchSpotifySearch(
        "artists",
        query,
        null,
        page
      );

      setDataArtists(artists);
      setPagesArtists(tatalPagesArtists);

      setLoading(false);
    };

    fetchResults();
  }, [query, page]);

  return (
    <main className="flex-1 mb-28">
      <SearchComponent />

      {!query && <NothingYetSearchComponent />}

      {loading && <LoadingSearchArtistsComponent />}

      {noResults && !loading && (
        <NoResultsSearchArtistsComponent query={query} />
      )}

      {query && !noResults && (
        <>
          <ResultsSearchArtistsComponent
            query={query!}
            dataArtists={dataArtists}
          />
          <PaginationComponent
            page={page}
            query={query}
            artistId={null}
            totalPages={pagesArtists}
          />
        </>
      )}
    </main>
  );
}
