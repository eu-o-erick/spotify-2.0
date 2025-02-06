import { TAlbumArtist } from "@/types/TAlbum";

export const simplifyArtistAlbum = (album: TAlbumArtist): TAlbumArtist => ({
  uri: album.uri ?? "",
  name: album.name ?? "",
  type: album.type ?? "",
  coverArt: {
    sources: [
      {
        url: album.coverArt.sources?.[0].url ?? "",
      },
    ],
  },
  date: {
    year: album.date.year,
  },
});
