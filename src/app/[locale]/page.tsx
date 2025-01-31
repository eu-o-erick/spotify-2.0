import { useTranslations } from "next-intl";
import SearchComponent from "@/components/Search";
import SwiperListAlbumsComponent from "@/components/SwiperListAlbums";
import ItemAlbumComponent from "@/components/ItemAlbum";

import featuredAlbums from "@/data/featured_albums.json";
import latestAlbums from "@/data/latest_albums.json";
import featuredArtists from "@/data/featured_artists.json";
import ItemArtistComponent from "@/components/ItemArtist";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <main className="flex-1 mb-20 max-sm:mb-10">
      <SearchComponent />

      <SwiperListAlbumsComponent title={t("featuredAlbums")}>
        {featuredAlbums.albums.map((album, i) => (
          <ItemAlbumComponent key={i} album={album} isPageArtist={false} />
        ))}
      </SwiperListAlbumsComponent>

      <SwiperListAlbumsComponent title={t("latestAlbums")}>
        {latestAlbums.albums.map((album, i) => (
          <ItemAlbumComponent key={i} album={album} isPageArtist={false} />
        ))}
      </SwiperListAlbumsComponent>

      <SwiperListAlbumsComponent title={t("featuredArtists")}>
        {featuredArtists.artists.map((artist, i) => (
          <ItemArtistComponent key={i} artist={artist} />
        ))}
      </SwiperListAlbumsComponent>
    </main>
  );
}
