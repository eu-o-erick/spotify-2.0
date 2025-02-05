export type TSearchAlbum = {
  data: {
    type?: "album" | "single";
    uri: string;
    name: string;
    artists: {
      items: {
        uri: string;
        profile: {
          name: string;
        };
      }[];
    };
    coverArt: {
      sources: {
        url: string;
      }[];
    };
    date: {
      year: number;
    };
  };
};

export type TSearchArtist = {
  data: {
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
};

export type TDataSearch = {
  albums: {
    items: TSearchAlbum[];
    totalCount: number;
    pagingInfo: {
      limit: number;
    };
  };
  artists: {
    items: TSearchArtist[];
    totalCount: number;
    pagingInfo: {
      limit: number;
    };
  };
};

export type TAlbum = {
  album_type?: "album" | "single";
  id: string;
  total_tracks: number;
  external_urls: {
    spotify: string;
  };
  images: {
    url: string;
  }[];
  name: string;
  release_date: string;
  artists: {
    id: string;
    name: string;
  }[];
  tracks: {
    items: {
      artists: {
        name: string;
      }[];
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      name: string;
      preview_url: string;
      track_number: number;
    }[];
  };
  copyrights: {
    text: string;
    type: string;
  }[];
};

export type TArtist = {
  sharingInfo: {
    shareUrl: string;
  };
  profile: {
    name: string;
    verified: boolean;
    externalLinks: {
      items: {
        name: string;
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
          items: {
            uri: string;
            name: string;
            type: "ALBUM" | "SINGLE";
            coverArt: {
              sources: {
                url: string;
              }[];
            };
          }[];
        };
      }[];
    };
  };
  relatedContent: {
    relatedArtists: {
      items: {
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
      }[];
    };
  };
};
