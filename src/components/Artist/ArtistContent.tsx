"use client";

import SwiperListComponent from "../Items/SwiperList";
import ItemAlbumComponent from "../Items/ItemAlbum";
import ItemArtistComponent from "../Items/ItemArtist";
import { Link } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { TArtist } from "@/types/TArtist";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { TAlbumArtist } from "@/types/TAlbum";

const options = ["popularReleases", "singles", "albums"];

export default function ArtistContent({
  dataArtist,
  isLoading,
}: {
  dataArtist: TArtist | null;
  isLoading: boolean;
}) {
  const searchParams = useSearchParams();
  const artistId = searchParams.get("id");

  const [seeAllResulst, setSeeAllResulst] = useState(false);
  const [type, setType] = useState("popularReleases");
  const [delay, setDelay] = useState(false);

  const [data, setData] = useState<
    {
      releases: {
        items: TAlbumArtist[];
      };
    }[]
  >([]);

  const t = useTranslations("ArtistPage");

  useEffect(() => {
    setSeeAllResulst(
      (dataArtist?.discography?.singles?.totalCount ?? 0) > 10 ||
        (dataArtist?.discography?.albums?.totalCount ?? 0) > 10
    );
  }, [dataArtist]);

  useEffect(() => {
    setData([]);
    setDelay(true);

    setTimeout(() => {
      setData(
        dataArtist?.discography?.[
          type as "popularReleases" | "singles" | "albums"
        ].items ?? []
      );
      setDelay(false);
    }, 300);
  }, [dataArtist, type]);

  return (
    <section className="container">
      <SwiperListComponent
        title={t("artistAlbums")}
        titleNotFound={"artistAlbums"}
        dropDownOptions={{ state: type, setState: setType, options }}
        isLoading={delay || isLoading}
      >
        {data.map(({ releases }, i) => (
          <ItemAlbumComponent
            key={i}
            album={releases.items[0]}
            isPageArtist={true}
          />
        ))}
      </SwiperListComponent>

      {seeAllResulst && (
        <div className="container -mt-6 pb-24 flex flex-col items-end max-sm:-mt-8 max-sm:pb-20">
          <Link
            className="md:hover:underline opacity-60 md:hover:opacity-90 max-md:active:underline max-md:active:opacity-100 transition-all max-sm:px-2 max-sm:text-xs"
            href={{
              pathname: "/artist/albums",
              query: {
                artistId,
                type: "albums",
                name: encodeURIComponent(dataArtist?.profile.name ?? ""),
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
        isLoading={isLoading}
      >
        {(dataArtist?.relatedContent.relatedArtists.items ?? []).map(
          (artist, i) => (
            <ItemArtistComponent key={i} artist={artist} isPageArtist={true} />
          )
        )}
      </SwiperListComponent>
    </section>
  );
}
