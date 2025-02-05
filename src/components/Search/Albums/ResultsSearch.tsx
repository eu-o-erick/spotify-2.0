"use client";

import ItemAlbumComponent from "@/components/ItemAlbum";
import ListAlbumsComponent from "@/components/ListItems";
import { TSearchAlbum } from "@/types";
import { useTranslations } from "next-intl";

export default function ResultsSearchAlbumsComponent({
  query,
  dataAlbums,
}: {
  query: string;
  dataAlbums: TSearchAlbum[];
}) {
  const t = useTranslations("SearchPage");

  return (
    <section className="container">
      <h2 className="text-zinc-500 text-xl mb-14 font-light max-[500px]:px-2">
        {t("albumsResponse")}{" "}
        <span className="font-semibold">{decodeURIComponent(query)}</span>
      </h2>

      <ListAlbumsComponent>
        {dataAlbums.map((album, i) => (
          <ItemAlbumComponent key={i} album={album} isPageArtist={false} />
        ))}
      </ListAlbumsComponent>
    </section>
  );
}
