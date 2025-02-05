import { TAlbum } from "@/types";

export const simplifyAlbum = (album: TAlbum): TAlbum => ({
  album_type: album.album_type,
  total_tracks: album.total_tracks,
  external_urls: {
    spotify: album.external_urls.spotify,
  },
  id: album.id,
  images: [
    {
      url: album.images?.[0].url,
    },
  ],
  name: album.name,
  release_date: album.release_date,
  artists:
    album.artists?.map((artist) => ({
      id: artist.id,
      name: artist.name,
    })) ?? [],
  tracks: {
    items:
      album.tracks.items?.map((track) => ({
        artists:
          track.artists?.map((artist) => ({
            name: artist.name,
          })) ?? [],
        disc_number: track.disc_number,
        duration_ms: track.duration_ms,
        explicit: track.explicit,
        name: track.name,
        preview_url: track.preview_url,
        track_number: track.track_number,
      })) ?? [],
  },
  copyrights: album.copyrights?.map((copy) => ({
    text: copy.text,
    type: copy.type,
  })),
});
