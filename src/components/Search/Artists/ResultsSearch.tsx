"use client";

import ItemArtistComponent from "@/components/ItemArtist";
import ListAlbumsComponent from "@/components/ListItems";
import { TArtist } from "@/types";
import { useTranslations } from "next-intl";

export default function ResultsSearchArtistsComponent({
  query,
  dataArtists,
}: {
  query: string;
  dataArtists: TArtist[];
}) {
  const t = useTranslations("SearchPage");

  return (
    <section className="container">
      <h2 className="text-zinc-500 text-xl mb-14 font-light max-[500px]:px-2">
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
