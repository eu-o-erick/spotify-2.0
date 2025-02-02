"use client";

import SearchComponent from "@/components/Search";
import NothingYetSearchComponent from "@/components/Search/NothingYet";
import ResultsSearchAlbumsComponent from "@/components/Search/Albums/ResultsSearch";
import { TAlbum } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSearchAlbumComponent from "@/components/Search/Albums/Loading";
import NoResultsSearchAlbumComponent from "@/components/Search/Albums/NoResults";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [dataAlbums, setDataAlbums] = useState<TAlbum[]>([]);
  const [loading, setLoading] = useState(true);

  const noResults = query && !dataAlbums.length;

  useEffect(() => {
    setDataAlbums([]);

    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/v1/search?q=${query}&type=albums`);
        if (!response.ok) throw new Error("Error to fetch data");

        const data = await response.json();
        setDataAlbums(data.albums.items || []);
      } catch (err) {
        console.error("Error fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <main className="flex-1 mb-28">
      <SearchComponent />

      {!query && <NothingYetSearchComponent />}

      {loading && <LoadingSearchAlbumComponent />}

      {noResults && !loading && <NoResultsSearchAlbumComponent query={query} />}

      {!noResults && (
        <ResultsSearchAlbumsComponent query={query!} dataAlbums={dataAlbums} />
      )}
    </main>
  );
}
