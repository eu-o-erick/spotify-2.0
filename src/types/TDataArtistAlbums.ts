import { TAlbumArtist } from "./TAlbum";

export type TDataArtistAlbums = {
  data: {
    artist: {
      discography: {
        albums: {
          totalCount: number;
          items: {
            releases: {
              items: TAlbumArtist[];
            };
          }[];
        };
        singles: {
          totalCount: number;
          items: {
            releases: {
              items: TAlbumArtist[];
            };
          }[];
        };
      };
    };
  };
};

export type TResultsArtistAlbums = {
  albums: TReleasesArtistAlbums[];
  singles: TReleasesArtistAlbums[];
  totalPagesAlbums: number;
  totalPagesSingles: number;
};

export type TReleasesArtistAlbums = {
  releases: {
    items: TAlbumArtist[];
  };
};
