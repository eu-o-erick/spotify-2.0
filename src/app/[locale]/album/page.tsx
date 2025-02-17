"use client";

import InfoAlbum from "@/components/Album/Info";
import TrackTableComponent from "@/components/Album/Table";
import MusicController from "@/components/Album/Controller";
import NotFoundComponent from "@/components/NotFound";
import { fetchSpotifyAlbum } from "@/services/spotifyGetAlbum";
import { TAlbum } from "@/types/TAlbum";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import CreditsAlbumComponent from "@/components/Album/Credits";
import DownloadButtonComponent from "@/components/Album/DownloadButton";

export default function AlbumPage() {
  const t = useTranslations("AlbumPage");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [dataAlbum, setDataAlbum] = useState<TAlbum | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    <main className="flex-1 28">
      {!dataAlbum && !isLoading ? (
        <NotFoundComponent title={t("title")} description={t("description")} />
      ) : (
        <Fragment>
          <InfoAlbum isLoading={isLoading} dataAlbum={dataAlbum} />

          <TrackTableComponent
            isLoading={isLoading}
            tracks={dataAlbum?.tracks.items}
          />

          <DownloadButtonComponent />

          <CreditsAlbumComponent copyrights={dataAlbum?.copyrights} />

          <MusicController album={dataAlbum} />
        </Fragment>
      )}
    </main>
  );
}
