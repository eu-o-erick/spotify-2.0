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
    items: TTrack[];
  };
  copyrights: {
    text: string;
    type: string;
  }[];
};

export type TTrack = {
  artists: {
    name: string;
  }[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  name: string;
  preview_url: string;
  track_number: number;
};

export type TAlbumArtist = {
  uri: string;
  name: string;
  type: "ALBUM" | "SINGLE";
  coverArt: {
    sources: {
      url: string;
    }[];
  };
  date: {
    year: number;
  };
};

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
