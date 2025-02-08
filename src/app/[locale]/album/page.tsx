"use client";

import { fetchSpotifyAlbum } from "@/services/spotifyGetAlbum";
import { TAlbum } from "@/types/TAlbum";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AlbumPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [dataAlbum, setDataAlbum] = useState<TAlbum | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setDataAlbum(null);

    if (!id) return setLoading(false);

    const fetchResults = async () => {
      const data = await fetchSpotifyAlbum(id);

      setDataAlbum(data);

      setLoading(false);
    };

    fetchResults();
  }, [id]);

  return (
    <main className="flex-1 mb-28">
      {loading && <h1>carregando</h1>}

      {!dataAlbum && !loading && <h1>nenhum album encontrado</h1>}

      {dataAlbum && !loading && (
        <>
          <h1>{dataAlbum.name}</h1>

          <Image
            src={dataAlbum.images?.[0]?.url ?? "/no-image.webp"}
            width={400}
            height={400}
            alt="cover album"
          />

          <ul className="flex flex-col">
            {dataAlbum.tracks.items.map((track, i) => (
              <li key={i}>{track.name}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
