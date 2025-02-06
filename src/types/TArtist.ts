import { TAlbumArtist } from "./TAlbum";

export type TArtist = {
  sharingInfo: {
    shareUrl: string;
  };
  profile: {
    name: string;
    verified: boolean;
    externalLinks: {
      items: {
        name: "FACEBOOK" | "INSTAGRAM" | "WIKIPEDIA" | "TWITTER";
        url: string;
      }[];
    };
  };
  visuals: {
    avatarImage: {
      sources: {
        url: string;
      }[];
    };
    headerImage: {
      sources: {
        url: string;
      }[];
    };
  };
  discography: {
    popularReleases: {
      items: {
        releases: {
          items: TAlbumArtist[];
        };
      }[];
    };
    singles: {
      items: {
        releases: {
          items: TAlbumArtist[];
        };
      }[];
    };
    albums: {
      items: {
        releases: {
          items: TAlbumArtist[];
        };
      }[];
    };
  };
  relatedContent: {
    relatedArtists: {
      items: TArtistRelated[];
    };
  };
  stats: {
    followers: number;
  };
};

export type TArtistRelated = {
  uri: string;
  profile: {
    name: string;
  };
  visuals: {
    avatarImage: {
      sources: {
        url: string;
      }[];
    };
  };
};

export type TSearchArtist = {
  data: TArtistRelated;
};
