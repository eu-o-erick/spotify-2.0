"use client";

import { Link } from "@/i18n/routing";
import { TAlbumArtist, TSearchAlbum } from "@/types/TAlbum";
import ImageLoader from "../ImageLoader";

export default function ItemAlbumComponent({
  album,
  isPageArtist,
}: {
  album: TSearchAlbum | TAlbumArtist;
  isPageArtist: boolean;
}) {
  const data = isPageArtist
    ? (album as TAlbumArtist)
    : (album as TSearchAlbum).data;

  return (
    <div className="select-none flex flex-col px-3 pt-3 pb-5 rounded-md md:hover:bg-[#ffffff05] transition-all album-item-container">
      <Link
        href={{
          pathname: `/album`,
          query: { id: data.uri.split(":")[2] },
        }}
        className="relative album-link"
      >
        <ImageLoader
          alt={`cover '${data.name}' album`}
          src={data.coverArt?.sources?.[0]?.url ?? "/no-image.webp"}
          className="rounded-[4px] max-md:rounded-sm album-image transition-all"
        />

        <p className="mt-2 line-clamp-2 max-md:text-[14px] text-zinc-300 album-title transition-all">
          {data.name}
        </p>
      </Link>

      {!isPageArtist ? (
        <ul className="text-sm line-clamp-1 max-md:text-[12px]">
          {(album as TSearchAlbum).data.artists.items.map((artist, i) => (
            <li className="" key={i}>
              {i !== 0 && " • "}
              <Link
                href={{
                  pathname: "/artist",
                  query: { id: artist.uri.split(":")[2] },
                }}
                className="opacity-50 transition-all hover:opacity-90 hover:underline"
              >
                {artist.profile.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm opacity-60 line-clamp-1 max-md:text-[12px]">
          {String((album as TAlbumArtist).date.year)} • {data.type}
        </p>
      )}
    </div>
  );
}
