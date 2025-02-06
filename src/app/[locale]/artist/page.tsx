"use client";

import ContentArtist from "@/components/Artist/ContentArtist";
import DescriptionArtist from "@/components/Artist/Description";
import { fetchSpotifyArtist } from "@/services/spotifyGetArtist";
import { TArtist } from "@/types/TArtist";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ArtistPage() {
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

  if (loading) {
    return <h1 className="container py-20 flex-1">carregando</h1>;
  }

  if (!dataArtist) {
    return <h1 className="container py-20 flex-1">nenhum album encontrado</h1>;
  }

  return (
    <main className="flex-1 mb-28">
      <DescriptionArtist dataArtist={dataArtist} />

      <ContentArtist dataArtist={dataArtist} />
    </main>
  );
}
