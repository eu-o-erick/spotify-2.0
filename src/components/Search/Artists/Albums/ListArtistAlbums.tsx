"use client";

import PaginationComponent from "@/components/Pagination";
import { TReleasesArtistAlbums } from "@/types/TDataArtistAlbums";
import ListAlbumsComponent from "@/components/Items/ListItems";
import ItemAlbumComponent from "@/components/Items/ItemAlbum";

export default function ListArtistAlbums({
  type,
  artistId,
  page,
  dataAlbums,
  name,
  totalPages,
  isLoading,
}: {
  type: string;
  artistId: string;
  page: string;
  name: string;
  dataAlbums: TReleasesArtistAlbums[] | undefined | null;
  totalPages: number;
  isLoading: boolean;
}) {
  return (
    <>
      <ListAlbumsComponent isLoading={isLoading}>
        {(dataAlbums ?? []).map(({ releases }, i) => (
          <ItemAlbumComponent
            key={i}
            album={releases.items[0]}
            isPageArtist={true}
          />
        ))}
      </ListAlbumsComponent>

      {totalPages > 1 ? (
        <PaginationComponent
          artistId={artistId}
          type={type}
          page={page}
          name={name}
          totalPages={totalPages}
        />
      ) : (
        <></>
      )}
    </>
  );
}
