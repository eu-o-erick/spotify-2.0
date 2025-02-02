"use client";

import SearchComponent from "@/components/Search";
import LoadingSearchArtistsComponent from "@/components/Search/Artists/Loading";
import NoResultsSearchArtistsComponent from "@/components/Search/Artists/NoResults";
import ResultsSearchArtistsComponent from "@/components/Search/Artists/ResultsSearch";
import NothingYetSearchComponent from "@/components/Search/NothingYet";
import { TArtist } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [dataArtists, setDataArtists] = useState<TArtist[]>([]);
  const [loading, setLoading] = useState(true);

  const noResults = query && !dataArtists.length;

  useEffect(() => {
    setDataArtists([]);

    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/v1/search?q=${query}&type=artists`);
        if (!response.ok) throw new Error("Error to fetch data");
        const data = await response.json();
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

      {loading && <LoadingSearchArtistsComponent />}

      {noResults && !loading && (
        <NoResultsSearchArtistsComponent query={query} />
      )}

      {!noResults && (
        <ResultsSearchArtistsComponent
          query={query!}
          dataArtists={dataArtists}
        />
      )}
    </main>
  );
}
