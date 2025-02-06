"use client";

import DescriptionArtist from "./Description";
import SwiperListComponent from "../Items/SwiperList";
import ItemAlbumComponent from "../Items/ItemAlbum";
import ItemArtistComponent from "../Items/ItemArtist";
import { Link } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { TArtist } from "@/types/TArtist";
import { useTranslations } from "next-intl";

export default function ContentArtist({ dataArtist }: { dataArtist: TArtist }) {
  const searchParams = useSearchParams();
  const artistId = searchParams.get("id");

  const t = useTranslations("ArtistPage");

  return (
    <>
      <DescriptionArtist dataArtist={dataArtist} />

      <SwiperListComponent title={t("ArtistAlbums")}>
        {dataArtist.discography.popularReleases.items.map(({ releases }, i) => (
          <ItemAlbumComponent
            key={i}
            album={releases.items[0]}
            isPageArtist={true}
          />
        ))}
      </SwiperListComponent>

      <div className="container -mt-10 pb-16 flex flex-col items-end">
        <Link
          className="underline opacity-60 hover:opacity-90 transition-all max-[500px]:px-2"
          href={{
            pathname: "/artist/albums",
            query: { artistId, type: "albums" },
          }}
        >
          {t("seeAllAlbums")}
        </Link>
      </div>

      <SwiperListComponent title={t("similarArtists")}>
        {dataArtist.relatedContent.relatedArtists.items.map((artist, i) => (
          <ItemArtistComponent key={i} artist={artist} isPageArtist={true} />
        ))}
      </SwiperListComponent>
    </>
  );
}
