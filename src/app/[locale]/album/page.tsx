"use client";

import InfoAlbum from "@/components/Album/Info";
import DropDownComponent from "@/components/DropDown";
import NotFoundComponent from "@/components/NotFound";
import { fetchSpotifyAlbum } from "@/services/spotifyGetAlbum";
import { TAlbum } from "@/types/TAlbum";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { TbArrowsSort } from "react-icons/tb";

const OPTIONS = ["default", "topRated", "custom"];

export default function AlbumPage() {
  const t = useTranslations("AlbumPage");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [dataAlbum, setDataAlbum] = useState<TAlbum | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    setIsLoading(true);
    setDataAlbum(null);

    if (!id) return setIsLoading(false);

    const fetchResults = async () => {
      const data = await fetchSpotifyAlbum(id);

      setDataAlbum(data);

      setIsLoading(false);
    };

    fetchResults();
  }, [id]);

  return (
    <main className="flex-1 mb-28">
      {!dataAlbum && !isLoading ? (
        <NotFoundComponent title={t("title")} description={t("description")} />
      ) : (
        <Fragment>
          <InfoAlbum isLoading={isLoading} dataAlbum={dataAlbum} />
          <div className="container flex justify-end items-center gap-2">
            <DropDownComponent
              options={OPTIONS}
              state={sortBy}
              setState={setSortBy}
              minW="w-[170px]"
            />

            <TbArrowsSort className="opacity-20" />
          </div>
        </Fragment>
      )}
    </main>
  );
}
