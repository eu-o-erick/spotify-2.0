"use client";

import SearchComponent from "@/components/Search";
import NothingYetSearchComponent from "@/components/Search/NothingYet";
import ResultsSearchAlbumsComponent from "@/components/Search/Albums/ResultsSearch";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchSpotifySearch } from "@/services/spotifySearch";
import PaginationComponent from "@/components/Pagination";
import { TSearchAlbum } from "@/types/TAlbum";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const artistId = searchParams.get("artistId");
  const page = searchParams.get("page");

  const [dataAlbums, setDataAlbums] = useState<TSearchAlbum[]>([]);
  const [pagesAlbums, setPagesAlbums] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setDataAlbums([]);

    if (!query && !artistId) return setIsLoading(false);

    const fetchResults = async () => {
      setIsLoading(true);

      const { albums, totalPagesAlbums } = await fetchSpotifySearch(
        "albums",
        query,
        artistId,
        page
      );

      setDataAlbums(albums);
      setPagesAlbums(totalPagesAlbums);

      setIsLoading(false);
    };

    fetchResults();
  }, [query, artistId, page]);

  return (
    <main className="flex-1 mb-28">
      <SearchComponent />

      {!query ? (
        <NothingYetSearchComponent />
      ) : (
        <>
          <ResultsSearchAlbumsComponent
            query={query!}
            dataAlbums={dataAlbums}
            isLoading={isLoading}
          />
          <PaginationComponent
            query={query}
            artistId={artistId}
            page={page}
            totalPages={pagesAlbums}
          />
        </>
      )}
    </main>
  );
}
