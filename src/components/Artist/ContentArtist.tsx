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

export default function ContentArtist({ dataArtist }: { dataArtist: TArtist }) {
  const searchParams = useSearchParams();
  const artistId = searchParams.get("id");

  const [type, setType] = useState("popularReleases");

  const t = useTranslations("ArtistPage");

  return (
    <section className="container">
      <SwiperListComponent
        title={t("ArtistAlbums")}
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

      <div className="container -mt-6 pb-24 flex flex-col items-end">
        <Link
          className="hover:underline opacity-60 hover:opacity-90 transition-all max-[500px]:px-2"
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

      <SwiperListComponent title={t("similarArtists")}>
        {dataArtist.relatedContent.relatedArtists.items.map((artist, i) => (
          <ItemArtistComponent key={i} artist={artist} isPageArtist={true} />
        ))}
      </SwiperListComponent>
    </section>
  );
}
