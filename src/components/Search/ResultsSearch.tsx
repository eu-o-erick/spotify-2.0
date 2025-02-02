"use client";

import ItemAlbumComponent from "@/components/ItemAlbum";
import ItemArtistComponent from "@/components/ItemArtist";
import ListAlbumsComponent from "@/components/ListItems";
import SwiperListAlbumsComponent from "@/components/SwiperListAlbums";
import { Link } from "@/i18n/routing";
import { TAlbum, TArtist } from "@/types";
import { useTranslations } from "next-intl";

export default function ResultsSearchComponent({
  query,
  dataArtists,
  dataAlbums,
}: {
  query: string;
  dataArtists: TArtist[];
  dataAlbums: TAlbum[];
}) {
  const t = useTranslations("SearchPage");

  return (
    <>
      <h2 className="container text-zinc-500 text-xl mb-14 font-light max-[500px]:px-2">
        {t("response")}{" "}
        <span className="font-semibold">{decodeURIComponent(query)}</span>
      </h2>

      <section className="container pb-10 flex flex-col items-end">
        <SwiperListAlbumsComponent title={t("artistsFound")}>
          {dataArtists.map((artist, i) => (
            <ItemArtistComponent key={i} artist={artist} />
          ))}
        </SwiperListAlbumsComponent>

        <Link
          className="underline opacity-60 hover:opacity-90 transition-all max-[500px]:px-2"
          href={{ pathname: "/search/artists", query: { q: query } }}
        >
          {t("seeAllArtists")}
        </Link>
      </section>

      <section className="container py-10 flex flex-col items-end">
        <h2 className="container text-2xl max-md:text-xl mb-7 max-[500px]:px-2">
          {t("albumsFound")}
        </h2>
        <ListAlbumsComponent>
          {dataAlbums.map((album, i) => (
            <ItemAlbumComponent key={i} album={album} isPageArtist={false} />
          ))}
        </ListAlbumsComponent>

        <Link
          className="underline opacity-60 hover:opacity-90 transition-all max-[500px]:px-2"
          href={{ pathname: "/search/albums", query: { q: query } }}
        >
          {t("seeAllAlbums")}
        </Link>
      </section>
    </>
  );
}
