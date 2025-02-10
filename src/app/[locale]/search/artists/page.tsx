"use client";

import PaginationComponent from "@/components/Pagination";
import ResultsSearchArtistsComponent from "@/components/Search/Artists/ResultsSearch";
import NothingYetSearchComponent from "@/components/Search/NothingYet";
import { fetchSpotifySearch } from "@/services/spotifySearch";
import { TSearchArtist } from "@/types/TArtist";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const page = searchParams.get("page");

  const [dataArtists, setDataArtists] = useState<TSearchArtist[]>([]);
  const [pagesArtists, setPagesArtists] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setDataArtists([]);

    if (!query) return setIsLoading(false);

    const fetchResults = async () => {
      const { artists, totalPagesArtists } = await fetchSpotifySearch(
        "artists",
        query,
        null,
        page
      );

      setDataArtists(artists);
      setPagesArtists(totalPagesArtists);

      setIsLoading(false);
    };

    fetchResults();
  }, [query, page]);

  return (
    <main className="flex-1 my-28 container max-sm:my-16">
      {!query ? (
        <NothingYetSearchComponent />
      ) : (
        <>
          <ResultsSearchArtistsComponent
            query={query!}
            dataArtists={dataArtists}
            isLoading={isLoading}
          />
          {!isLoading && (
            <PaginationComponent
              page={page}
              query={query}
              artistId={null}
              totalPages={pagesArtists}
            />
          )}
        </>
      )}
    </main>
  );
}
