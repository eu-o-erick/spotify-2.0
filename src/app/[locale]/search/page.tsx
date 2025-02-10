"use client";

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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setDataAlbums([]);
    setDataArtists([]);

    if (!query) return setIsLoading(false);

    const fetchResults = async () => {
      const { albums, artists, totalPagesAlbums, totalPagesArtists } =
        await fetchSpotifySearch("multi", query, null, page);

      setDataAlbums(albums);
      setDataArtists(artists);

      setPagesAlbums(totalPagesAlbums);
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
        <ResultsSearchComponent
          query={query}
          dataArtists={dataArtists}
          dataAlbums={dataAlbums}
          pagesAlbums={pagesAlbums}
          pagesArtists={pagesArtists}
          isLoading={isLoading}
        />
      )}
    </main>
  );
}
