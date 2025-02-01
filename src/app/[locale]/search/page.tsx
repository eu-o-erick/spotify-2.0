"use client";

import ItemAlbumComponent from "@/components/ItemAlbum";
import ItemArtistComponent from "@/components/ItemArtist";
import ListAlbumsComponent from "@/components/ListItems";
import SearchComponent from "@/components/Search";
import SwiperListAlbumsComponent from "@/components/SwiperListAlbums";
import { Link } from "@/i18n/routing";
import { TAlbum, TArtist } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const t = useTranslations("SearchPage");

  const [dataAlbums, setDataAlbums] = useState<TAlbum[]>([]);
  const [dataArtists, setDataArtists] = useState<TArtist[]>([]);
  const [loading, setLoading] = useState(false);

  const noResults = query && !dataAlbums && !dataArtists;

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      setDataAlbums([]);
      setDataArtists([]);

      try {
        const response = await fetch(`/api/v1/search?q=${query}&type=multi`);

        if (!response.ok) throw new Error("Error to fetch data");

        const data = await response.json();
        setDataAlbums(data.albums?.items || []);
        setDataArtists(data.artists?.items || []);
      } catch (err) {
        console.error("Error fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <main className="flex-1 mb-28">
      <SearchComponent />

      {!query && (
        <h2 className="text-center text-zinc-600 text-2xl mt-36 mb-56 max-[500px]:px-2">
          {t("nothingYet")}
        </h2>
      )}

      {query && !loading && (
        <h2 className="container text-zinc-500 text-xl mb-14 font-light max-[500px]:px-2">
          We found these results for{" "}
          <span className="font-semibold">{decodeURIComponent(query)}</span>
        </h2>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Image src="/loading.gif" alt="loading" width={300} height={300} />
          <p className="text-xl text-zinc-600 animate-pulse">{t("loading")}</p>
        </div>
      )}

      {noResults && (
        <h2 className="container text-zinc-500 text-xl mt-20 mb-80 font-light">
          {t("nothingFound")} <span className="font-semibold">{query}</span>
          {". "}
          {t("tryAgain")}
        </h2>
      )}

      {dataArtists.length !== 0 && (
        <section className="container pb-10 flex flex-col items-end">
          <SwiperListAlbumsComponent title={t("artistsFound")}>
            {dataArtists.map((artist, i) => (
              <ItemArtistComponent key={i} artist={artist} />
            ))}
          </SwiperListAlbumsComponent>

          <Link
            className="underline opacity-60 hover:opacity-90 transition-all max-[500px]:px-2"
            href={{ pathname: "/search", query: { q: query, type: "artists" } }}
          >
            {t("seeAllArtists")}
          </Link>
        </section>
      )}

      {dataAlbums.length !== 0 && (
        <section className="container py-10 flex flex-col items-end">
          <h2 className="container text-2xl max-md:text-xl mb-7 max-[500px]:px-2">
            {t("albumsFound")}
          </h2>
          <ListAlbumsComponent>
            {dataAlbums.map((album, i) => (
              <ItemAlbumComponent key={i} album={album} isPageArtist={false} />
            ))}
          </ListAlbumsComponent>

          <Link
            className="underline opacity-60 hover:opacity-90 transition-all max-[500px]:px-2"
            href={{ pathname: "/search", query: { q: query, type: "albums" } }}
          >
            {t("seeAllAlbums")}
          </Link>
        </section>
      )}
    </main>
  );
}
