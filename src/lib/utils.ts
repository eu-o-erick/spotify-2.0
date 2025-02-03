import { TAlbum, TArtist, TDataSearch } from "@/types";

export const simplifyDataSearch = (data: any): TDataSearch => ({
  albums: {
    items: data.albums?.items.map(simplifyAlbum) ?? [],
  },
  artists: {
    items: data.artists?.items.map(simplifyArtist) ?? [],
  },
});

const simplifyAlbum = ({ data: album }: TAlbum): TAlbum => ({
  data: {
    uri: album.uri,
    name: album.name,
    type: album.type,
    artists: {
      items:
        album.artists.items?.map((artist: any) => ({
          uri: artist.uri,
          profile: {
            name: artist.profile.name,
          },
        })) ?? [],
    },
    coverArt: {
      sources: album.coverArt.sources?.map((img: any) => ({
        url: img.url,
        width: img.width,
        height: img.height,
      })),
    },
    date: {
      year: album.date.year,
    },
  },
});

const simplifyArtist = ({ data: artist }: TArtist): TArtist => ({
  data: {
    uri: artist.uri,
    profile: {
      name: artist.profile.name,
    },
    visuals: {
      avatarImage: {
        sources:
          artist.visuals.avatarImage?.sources?.map((img: any) => ({
            url: img.url,
            width: img.width,
            height: img.height,
          })) ?? [],
      },
    },
  },
});
