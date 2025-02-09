"use client";

import SwiperListComponent from "../Items/SwiperList";
import ItemAlbumComponent from "../Items/ItemAlbum";
import ItemArtistComponent from "../Items/ItemArtist";
import { Link } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { TArtist } from "@/types/TArtist";
import { useTranslations } from "next-intl";
import { useState } from "react";

const options = ["popularReleases", "singles", "albums"];

export default function ArtistContent({ dataArtist }: { dataArtist: TArtist }) {
  const searchParams = useSearchParams();
  const artistId = searchParams.get("id");

  const [type, setType] = useState("popularReleases");

  const t = useTranslations("ArtistPage");

  return (
    <section className="container">
      <SwiperListComponent
        title={t("artistAlbums")}
        titleNotFound={"artistAlbums"}
        dropDownOptions={{ state: type, setState: setType, options }}
      >
        {dataArtist.discography?.[
          type as "popularReleases" | "singles" | "albums"
        ].items.map(({ releases }, i) => (
          <ItemAlbumComponent
            key={i}
            album={releases.items[0]}
            isPageArtist={true}
          />
        ))}
      </SwiperListComponent>

      {(dataArtist.discography?.singles.totalCount > 10 ||
        dataArtist.discography?.albums.totalCount > 10) && (
        <div className="container -mt-6 pb-24 flex flex-col items-end max-sm:-mt-8 max-sm:pb-20">
          <Link
            className="hover:underline opacity-60 hover:opacity-90 transition-all max-sm:px-2 max-sm:text-xs"
            href={{
              pathname: "/artist/albums",
              query: {
                artistId,
                type: "albums",
                name: encodeURIComponent(dataArtist.profile.name),
              },
            }}
          >
            {t("seeAllResulst")}
          </Link>
        </div>
      )}

      <SwiperListComponent
        title={t("similarArtists")}
        isArtistComponent={true}
        titleNotFound="artistsFound"
      >
        {dataArtist.relatedContent.relatedArtists.items.map((artist, i) => (
          <ItemArtistComponent key={i} artist={artist} isPageArtist={true} />
        ))}
      </SwiperListComponent>
    </section>
  );
}
