import { TArtist } from "@/types/TArtist";
import { simplifyArtistAlbum } from "./simplifyArtistAlbum";

export const simplifyArtist = (artist: TArtist): TArtist => ({
  sharingInfo: {
    shareUrl: artist.sharingInfo.shareUrl,
  },
  profile: {
    name: artist.profile.name,
    verified: artist.profile.verified,
    externalLinks: {
      items:
        artist.profile.externalLinks.items?.map((item) => ({
          name: item.name,
          url: item.url,
        })) ?? [],
    },
  },
  visuals: {
    avatarImage: {
      sources: [{ url: artist.visuals.avatarImage?.sources?.[0].url ?? "" }],
    },
    headerImage: {
      sources: [{ url: artist.visuals.headerImage?.sources?.[0].url ?? "" }],
    },
  },
  discography: {
    popularReleases: {
      items:
        artist.discography.popularReleases?.items?.map(({ releases }) => ({
          releases: {
            items: [simplifyArtistAlbum(releases.items?.[0])],
          },
        })) ?? [],
    },
    singles: {
      items:
        artist.discography.singles?.items?.map(({ releases }) => ({
          releases: {
            items: [simplifyArtistAlbum(releases.items?.[0])],
          },
        })) ?? [],
    },
    albums: {
      items:
        artist.discography.albums?.items?.map(({ releases }) => ({
          releases: {
            items: [simplifyArtistAlbum(releases.items?.[0])],
          },
        })) ?? [],
    },
  },
  relatedContent: {
    relatedArtists: {
      items: artist.relatedContent.relatedArtists?.items?.map(
        (artistRelated) => ({
          uri: artistRelated.uri,
          profile: {
            name: artistRelated.profile.name,
          },
          visuals: {
            avatarImage: {
              sources: [
                {
                  url: artistRelated.visuals.avatarImage.sources?.[0].url ?? "",
                },
              ],
            },
          },
        })
      ),
    },
  },
  stats: {
    followers: artist.stats.followers,
  },
});
