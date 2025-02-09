"use client";

import ItemArtistComponent from "@/components/Items/ItemArtist";
import ListAlbumsComponent from "@/components/Items/ListItems";
import { TSearchArtist } from "@/types/TArtist";
import { useTranslations } from "next-intl";

export default function ResultsSearchArtistsComponent({
  query,
  dataArtists,
}: {
  query: string;
  dataArtists: TSearchArtist[];
}) {
  const t = useTranslations("SearchPage");

  return (
    <section className="container">
      <h2 className="text-zinc-500 text-xl mb-14 font-light max-sm:px-2">
        {t("artistsResponse")}{" "}
        <span className="font-semibold">{decodeURIComponent(query)}</span>
      </h2>

      <ListAlbumsComponent>
        {dataArtists.map((artist, i) => (
          <ItemArtistComponent key={i} artist={artist} />
        ))}
      </ListAlbumsComponent>
    </section>
  );
}
