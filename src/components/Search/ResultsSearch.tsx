"use client";

import ItemAlbumComponent from "@/components/Items/ItemAlbum";
import ItemArtistComponent from "@/components/Items/ItemArtist";
import ListAlbumsComponent from "@/components/Items/ListItems";
import SwiperListComponent from "@/components/Items/SwiperList";
import { Link } from "@/i18n/routing";
import { TSearchAlbum } from "@/types/TAlbum";
import { TSearchArtist } from "@/types/TArtist";
import { useTranslations } from "next-intl";

export default function ResultsSearchComponent({
  query,
  dataArtists,
  dataAlbums,
  pagesAlbums,
  pagesArtists,
  isLoading,
}: {
  query: string;
  dataArtists: TSearchArtist[];
  dataAlbums: TSearchAlbum[];
  pagesAlbums: number;
  pagesArtists: number;
  isLoading: boolean;
}) {
  const t = useTranslations("SearchPage");

  return (
    <section>
      <div className="container pb-10 flex flex-col items-end">
        <SwiperListComponent
          title={t("artistsFound")}
          isArtistComponent={true}
          titleNotFound="artistsFound"
          isLoading={isLoading}
        >
          {dataArtists.map((artist, i) => (
            <ItemArtistComponent key={i} artist={artist} />
          ))}
        </SwiperListComponent>

        {pagesArtists > 1 && (
          <Link
            className="hover:underline opacity-60 hover:opacity-90 transition-all max-sm:px-2"
            href={{ pathname: "/search/artists", query: { q: query } }}
          >
            {t("seeAllArtists")}
          </Link>
        )}
      </div>

      <div className="container py-10 flex flex-col items-end">
        <h2 className="container text-2xl max-md:text-xl mb-7 max-sm:px-2">
          {t("albumsFound")}
        </h2>

        <ListAlbumsComponent isLoading={isLoading}>
          {dataAlbums.map((album, i) => (
            <ItemAlbumComponent key={i} album={album} isPageArtist={false} />
          ))}
        </ListAlbumsComponent>

        {pagesAlbums > 1 && (
          <Link
            className="hover:underline opacity-60 hover:opacity-90 transition-all max-sm:px-2"
            href={{ pathname: "/search/albums", query: { q: query } }}
          >
            {t("seeAllAlbums")}
          </Link>
        )}
      </div>
    </section>
  );
}
