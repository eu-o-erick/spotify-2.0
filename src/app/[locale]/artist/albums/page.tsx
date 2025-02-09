"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { fetchSpotifyArtistAlbums } from "@/services/spotifyGetArtistAlbums";
import { TReleasesArtistAlbums } from "@/types/TDataArtistAlbums";
import TitleArtistAlbums from "@/components/Search/Artists/Albums/Title";
import ListArtistAlbums from "@/components/Search/Artists/Albums/ListArtistAlbums";
import FilterAlbums from "@/components/Search/Artists/Albums/ChangeType";

export default function SearchPage() {
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const artistId = searchParams.get("artistId");
  const name = searchParams.get("name");
  const page = searchParams.get("page");

  const [dataAlbums, setDataAlbums] = useState<
    TReleasesArtistAlbums[] | undefined | null
  >(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setDataAlbums(null);

    if ((type !== "albums" && type !== "singles") || !artistId)
      return setIsLoading(false);

    const fetchResults = async () => {
      setIsLoading(true);

      const data = await fetchSpotifyArtistAlbums(
        artistId!,
        type as "albums" | "singles",
        page
      );

      if (type === "albums") {
        setDataAlbums(data?.albums);
        setTotalPages(data?.totalPagesAlbums ?? 0);
      } else {
        setDataAlbums(data?.singles);
        setTotalPages(data?.totalPagesSingles ?? 0);
      }

      setIsLoading(false);
    };

    fetchResults();
  }, [type, artistId, page]);

  return (
    <main className="flex-1 my-28 container max-sm:my-16">
      <TitleArtistAlbums artistId={artistId!} name={name ?? ""} />

      <FilterAlbums artistId={artistId!} type={type ?? ""} name={name ?? ""} />

      <ListArtistAlbums
        artistId={artistId!}
        type={type ?? ""}
        dataAlbums={dataAlbums}
        page={page ?? "1"}
        totalPages={totalPages}
        name={name ?? ""}
        isLoading={isLoading}
      />
    </main>
  );
}
