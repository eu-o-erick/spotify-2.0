"use client";

import { Link } from "@/i18n/routing";
import { TAlbumArtist, TSearchAlbum } from "@/types/TAlbum";
import Image from "next/image";

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
    <div className="select-none flex flex-col px-3 pt-3 pb-5 rounded-md group hover:bg-[#ffffff05] transition-all">
      <Link
        href={{
          pathname: `/album`,
          query: { id: data.uri.split(":")[2] },
        }}
      >
        <Image
          src={data.coverArt?.sources?.[0]?.url ?? "/no-image.webp"}
          width={400}
          height={400}
          alt="cover album"
          className="rounded-[4px] shadow-strong group-hover:shadow-none max-md:rounded-sm max-md:shadow-sm"
        />
      </Link>

      <Link
        href={{
          pathname: `/album`,
          query: { id: data.uri.split(":")[2] },
        }}
        className="mt-2 line-clamp-2 max-md:text-[14px] text-zinc-300 group-hover:text-white transition-all"
      >
        {data.name}
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
                className="opacity-50 group-hover:opacity-80 transition-all hover:underline"
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
