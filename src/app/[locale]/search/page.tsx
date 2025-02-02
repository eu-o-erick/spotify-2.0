"use client";

import SearchComponent from "@/components/Search";
import LoadingSearchComponent from "@/components/Search/Loading";
import NoResultsSearchComponent from "@/components/Search/NoResults";
import NothingYetSearchComponent from "@/components/Search/NothingYet";
import ResultsSearchComponent from "@/components/Search/ResultsSearch";
import { TAlbum, TArtist } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [dataAlbums, setDataAlbums] = useState<TAlbum[]>([]);
  const [dataArtists, setDataArtists] = useState<TArtist[]>([]);
  const [loading, setLoading] = useState(true);

  const noResults = query && !dataAlbums.length && !dataArtists.length;

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      setDataAlbums([]);
      setDataArtists([]);

      try {
        const response = await fetch(`/api/v1/search?q=${query}&type=multi`);
        if (!response.ok) throw new Error("Error to fetch data");
        const data = await response.json();
        setDataAlbums(data.albums?.items || []);
        setDataArtists(data.artists?.items || []);
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

      {loading && <LoadingSearchComponent />}

      {noResults && !loading && <NoResultsSearchComponent query={query} />}

      {!noResults && (
        <ResultsSearchComponent
          query={query!}
          dataArtists={dataArtists}
          dataAlbums={dataAlbums}
        />
      )}
    </main>
  );
}
