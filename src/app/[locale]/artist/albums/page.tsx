"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import PaginationComponent from "@/components/Pagination";
import { fetchSpotifyArtistAlbums } from "@/services/spotifyGetArtistAlbums";
import { TReleasesArtistAlbums } from "@/types/TDataArtistAlbums";
import ListAlbumsComponent from "@/components/Items/ListItems";
import ItemAlbumComponent from "@/components/Items/ItemAlbum";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const artistId = searchParams.get("artistId");
  const page = searchParams.get("page");

  const [dataAlbums, setDataAlbums] = useState<
    TReleasesArtistAlbums[] | undefined | null
  >(null);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const noResults = artistId && !dataAlbums?.length;

  useEffect(() => {
    setLoading(true);
    setDataAlbums(null);

    if ((type !== "albums" && type !== "singles") || !artistId)
      return setLoading(false);

    const fetchResults = async () => {
      setLoading(true);

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

      setLoading(false);
    };

    fetchResults();
  }, [type, artistId, page]);

  return (
    <main className="flex-1 my-28 container">
      {loading && <h1>carregando</h1>}

      {noResults && !loading && <h1>nenhum artista encontrado</h1>}

      {!loading && !noResults && (
        <ListAlbumsComponent>
          {" "}
          {dataAlbums?.map(({ releases }, i) => (
            <ItemAlbumComponent
              key={i}
              album={releases.items[0]}
              isPageArtist={true}
            />
          ))}
        </ListAlbumsComponent>
      )}

      {totalPages > 1 ? (
        <PaginationComponent
          artistId={artistId}
          type={type}
          page={page}
          totalPages={totalPages}
        />
      ) : (
        <></>
      )}
    </main>
  );
}
