"use client";

import { useTranslations } from "next-intl";
import SearchComponent from "@/components/Search";
import SwiperListComponent from "@/components/Items/SwiperList";
import ItemAlbumComponent from "@/components/Items/ItemAlbum";

import featuredAlbums from "@/data/featured_albums.json";
import latestAlbums from "@/data/latest_albums.json";
import featuredArtists from "@/data/featured_artists.json";
import ItemArtistComponent from "@/components/Items/ItemArtist";
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
          <SwiperListComponent title={t("featuredAlbums")}>
            {featuredAlbums.items.map((album, i) => (
              <ItemAlbumComponent key={i} album={album} isPageArtist={false} />
            ))}
          </SwiperListComponent>

          <SwiperListComponent title={t("latestAlbums")}>
            {latestAlbums.items.map((album, i) => (
              <ItemAlbumComponent key={i} album={album} isPageArtist={false} />
            ))}
          </SwiperListComponent>

          <SwiperListComponent title={t("featuredArtists")}>
            {featuredArtists.items.map((artist, i) => (
              <ItemArtistComponent key={i} artist={artist} />
            ))}
          </SwiperListComponent>
        </>
      )}
    </main>
  );
}
