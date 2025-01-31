export type TAlbum = {
  data: {
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
        width: number;
        height: number;
      }[];
    };
    date: {
      year: number;
    };
  };
};

export type TArtist = {
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
