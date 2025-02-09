import { TSearchAlbum } from "./TAlbum";
import { TSearchArtist } from "./TArtist";

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

export type TResultsSearch = {
  albums: TSearchAlbum[];
  artists: TSearchArtist[];
  totalPagesAlbums: number;
  totalPagesArtists: number;
};
