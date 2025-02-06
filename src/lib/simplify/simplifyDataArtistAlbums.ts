import { simplifyArtistAlbum } from "./simplifyArtistAlbum";
import { TDataArtistAlbums } from "@/types/TDataArtistAlbums";

export const simplifyAllArtistAlbums = ({
  data,
}: TDataArtistAlbums): TDataArtistAlbums => ({
  data: {
    artist: {
      discography: {
        albums: {
          totalCount: data.artist.discography.albums?.totalCount ?? 0,
          items:
            data.artist.discography.albums?.items?.map(({ releases }) => ({
              releases: {
                items: [simplifyArtistAlbum(releases.items?.[0])],
              },
            })) ?? [],
        },
        singles: {
          totalCount: data.artist.discography.singles?.totalCount ?? 0,
          items:
            data.artist.discography.singles?.items?.map(({ releases }) => ({
              releases: {
                items: [simplifyArtistAlbum(releases.items?.[0])],
              },
            })) ?? [],
        },
      },
    },
  },
});
