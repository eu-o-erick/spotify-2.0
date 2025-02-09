"use client";

import ArtistContent from "@/components/Artist/ArtistContent";
import DescriptionArtist from "@/components/Artist/Description";
import NotFoundComponent from "@/components/NotFound";
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setDataArtist(null);

    if (!id) return setIsLoading(false);

    const fetchResults = async () => {
      const data = await fetchSpotifyArtist(id);

      setDataArtist(data);

      setIsLoading(false);
    };

    fetchResults();
  }, [id]);

  return (
    <main className="flex-1 mb-28">
      {!dataArtist && !isLoading ? (
        <NotFoundComponent title={t("title")} description={t("description")} />
      ) : (
        <>
          <DescriptionArtist dataArtist={dataArtist} isLoading={isLoading} />
          <ArtistContent dataArtist={dataArtist} isLoading={isLoading} />
        </>
      )}
    </main>
  );
}
