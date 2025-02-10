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

export default function HomePage() {
  const t = useTranslations("HomePage");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <main className="flex-1 mb-20">
      <SearchComponent />

      <SwiperListComponent
        title={t("featuredAlbums")}
        titleNotFound="featuredAlbums"
        isLoading={isLoading}
      >
        {featuredAlbums.items.map((album, i) => (
          <ItemAlbumComponent key={i} album={album} isPageArtist={false} />
        ))}
      </SwiperListComponent>

      <SwiperListComponent
        title={t("latestAlbums")}
        titleNotFound="latestAlbums"
        isLoading={isLoading}
      >
        {latestAlbums.items.map((album, i) => (
          <ItemAlbumComponent key={i} album={album} isPageArtist={false} />
        ))}
      </SwiperListComponent>

      <SwiperListComponent
        title={t("featuredArtists")}
        isArtistComponent={true}
        titleNotFound="artistAlbums"
        isLoading={isLoading}
      >
        {featuredArtists.items.map((artist, i) => (
          <ItemArtistComponent key={i} artist={artist} />
        ))}
      </SwiperListComponent>
    </main>
  );
}
