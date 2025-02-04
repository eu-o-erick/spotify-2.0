import { TAlbum, TArtist, TDataSearch } from "@/types";

export const simplifyDataSearch = (data: any): TDataSearch => ({
  albums: {
    items: data.albums?.items.map(simplifyAlbum) ?? [],
    totalCount: data.albums?.totalCount ?? 0,
    pagingInfo: {
      limit: data.albums?.pagingInfo.limit ?? 0,
    },
  },
  artists: {
    items: data.artists?.items.map(simplifyArtist) ?? [],
    totalCount: data.artists?.totalCount ?? 0,
    pagingInfo: {
      limit: data.artists?.pagingInfo.limit ?? 0,
    },
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
