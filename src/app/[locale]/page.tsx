"use client";

import { useTranslations } from "next-intl";
import SearchComponent from "@/components/Search";
import SwiperListAlbumsComponent from "@/components/SwiperList";
import ItemAlbumComponent from "@/components/ItemAlbum";

import featuredAlbums from "@/data/featured_albums.json";
import latestAlbums from "@/data/latest_albums.json";
import featuredArtists from "@/data/featured_artists.json";
import ItemArtistComponent from "@/components/ItemArtist";
import { useEffect, useState } from "react";
import CarouselSkelotonComponent from "@/components/Skeletons/Carousel";
import ArtistSkelotonComponent from "@/components/Skeletons/ArtistItem";
import AlbumSkelotonComponent from "@/components/Skeletons/AlbumItem";

export default function HomePage() {
  const t = useTranslations("HomePage");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <main className="flex-1 mb-20">
      <SearchComponent />

      {loading ? (
        <div className="container flex flex-col gap-4">
          <CarouselSkelotonComponent>
            <AlbumSkelotonComponent />
          </CarouselSkelotonComponent>

          <CarouselSkelotonComponent>
            <AlbumSkelotonComponent />
          </CarouselSkelotonComponent>

          <CarouselSkelotonComponent>
            <ArtistSkelotonComponent />
          </CarouselSkelotonComponent>
        </div>
      ) : (
        <>
          <SwiperListAlbumsComponent title={t("featuredAlbums")}>
            {featuredAlbums.items.map((album, i) => (
              <ItemAlbumComponent key={i} album={album} isPageArtist={false} />
            ))}
          </SwiperListAlbumsComponent>

          <SwiperListAlbumsComponent title={t("latestAlbums")}>
            {latestAlbums.items.map((album, i) => (
              <ItemAlbumComponent key={i} album={album} isPageArtist={false} />
            ))}
          </SwiperListAlbumsComponent>

          <SwiperListAlbumsComponent title={t("featuredArtists")}>
            {featuredArtists.items.map((artist, i) => (
              <ItemArtistComponent key={i} artist={artist} />
            ))}
          </SwiperListAlbumsComponent>
        </>
      )}
    </main>
  );
}
