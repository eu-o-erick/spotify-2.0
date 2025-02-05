"use client";

import SearchComponent from "@/components/Search";
import NothingYetSearchComponent from "@/components/Search/NothingYet";
import ResultsSearchAlbumsComponent from "@/components/Search/Albums/ResultsSearch";
import { TAlbum } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSearchAlbumComponent from "@/components/Search/Albums/Loading";
import NoResultsSearchAlbumComponent from "@/components/Search/Albums/NoResults";
import { fetchSpotifySearch } from "@/services/spotifySearch";
import PaginationComponent from "@/components/Pagination";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const artistId = searchParams.get("artistId");
  const page = searchParams.get("page");

  const [dataAlbums, setDataAlbums] = useState<TAlbum[]>([]);
  const [pagesAlbums, setPagesAlbums] = useState(0);
  const [loading, setLoading] = useState(true);

  const noResults = query && !dataAlbums.length;

  useEffect(() => {
    setLoading(true);
    setDataAlbums([]);

    if (!query && !artistId) return setLoading(false);

    const fetchResults = async () => {
      setLoading(true);

      const { albums, tatalPagesAlbums } = await fetchSpotifySearch(
        "albums",
        query,
        artistId,
        page
      );

      setDataAlbums(albums);
      setPagesAlbums(tatalPagesAlbums);

      setLoading(false);
    };

    fetchResults();
  }, [query, artistId, page]);

  return (
    <main className="flex-1 mb-28">
      <SearchComponent />

      {!query && !artistId && <NothingYetSearchComponent />}

      {loading && <LoadingSearchAlbumComponent />}

      {noResults && !loading && <NoResultsSearchAlbumComponent query={query} />}

      {(artistId || query) && !noResults && (
        <>
          <ResultsSearchAlbumsComponent
            query={query!}
            dataAlbums={dataAlbums}
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
