"use client";

import { fetchSpotifyArtist } from "@/services/spotifyGetArtist";
import { TArtist } from "@/types";
import Image from "next/image";
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

  return (
    <main className="flex-1 mb-28">
      {loading && <h1>carregando</h1>}

      {!dataArtist && !loading && <h1>nenhum album encontrado</h1>}

      {dataArtist && !loading && (
        <>
          <h1>{dataArtist.profile.name}</h1>
          <Image
            src={
              dataArtist.visuals.avatarImage?.sources?.[0]?.url ??
              "/no-image.webp"
            }
            width={400}
            height={400}
            alt="cover album"
          />

          <ul className="flex flex-col">
            {dataArtist.discography.popularReleases.items.map((album, i) => (
              <li key={i}>{album.releases.items[0].name}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
