"use client";

import ItemArtistComponent from "@/components/Items/ItemArtist";
import ListAlbumsComponent from "@/components/Items/ListItems";
import { TSearchArtist } from "@/types/TArtist";
import { useTranslations } from "next-intl";

export default function ResultsSearchArtistsComponent({
  query,
  dataArtists,
  isLoading,
}: {
  query: string;
  dataArtists: TSearchArtist[];
  isLoading: boolean;
}) {
  const t = useTranslations("SearchPage");

  return (
    <section className="container">
      <h2 className="text-zinc-500 text-xl mb-14 font-light max-md:px-2">
        {t("artistsResponse")}{" "}
        <span className="font-semibold">{decodeURIComponent(query)}</span>
      </h2>

      <ListAlbumsComponent isLoading={isLoading} isArtistComponent={true}>
        {dataArtists.map((artist, i) => (
          <ItemArtistComponent key={i} artist={artist} />
        ))}
      </ListAlbumsComponent>
    </section>
  );
}
