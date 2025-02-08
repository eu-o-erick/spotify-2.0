"use client";

import ArtistContent from "@/components/Artist/ArtistContent";
import DescriptionArtist from "@/components/Artist/Description";
import NotFoundComponent from "@/components/NotFound";
import ArtistContentSkeleton from "@/components/Skeletons/ArtistComponent";
import DescriptionArtistSkeleton from "@/components/Skeletons/ArtistDescription";
import { fetchSpotifyArtist } from "@/services/spotifyGetArtist";
import { TArtist } from "@/types/TArtist";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ArtistPage() {
  const t = useTranslations("ArtistPage.artistNotFound");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [dataArtist, setDataArtist] = useState<TArtist | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setDataArtist(null);

    if (!id) return setLoading(false);

    const fetchResults = async () => {
      const data = await fetchSpotifyArtist(id);

      setDataArtist(data);

      setLoading(false);
    };

    fetchResults();
  }, [id]);

  const notFind = !loading && !dataArtist;

  return (
    <main className="flex-1 mb-28">
      {" "}
      {loading && (
        <>
          <DescriptionArtistSkeleton />
          <ArtistContentSkeleton />
        </>
      )}
      {notFind && (
        <NotFoundComponent title={t("title")} description={t("description")} />
      )}
      {!loading && dataArtist && (
        <>
          <DescriptionArtist dataArtist={dataArtist} />
          <ArtistContent dataArtist={dataArtist} />
        </>
      )}
    </main>
  );
}
