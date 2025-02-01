"use client";

import { Link } from "@/i18n/routing";
import { TAlbum } from "@/types";
import Image from "next/image";

export default function ItemAlbumComponent({
  album,
  isPageArtist,
}: {
  album: TAlbum;
  isPageArtist: boolean;
}) {
  return (
    <div className="select-none flex flex-col px-1.5">
      <Image
        src={album.data.coverArt?.sources?.[0].url || "/no-image.webp"}
        width={400}
        height={400}
        alt="cover album"
        className="rounded-[4px] shadow-strong max-md:rounded-sm"
      />
      <Link
        href={{
          pathname: `/album`,
          query: { id: album.data.uri.split(":")[2] },
        }}
        className="mt-2 line-clamp-2 max-md:text-[14px]"
      >
        {album.data.name}
      </Link>

      {!isPageArtist ? (
        <ul className="text-sm opacity-60 line-clamp-1 max-md:text-[12px]">
          {album.data.artists.items.map((artist, i) => (
            <li className="" key={i}>
              {i !== 0 && " • "}
              <Link
                href={{
                  pathname: "/artist",
                  query: { id: artist.uri.split(":")[2] },
                }}
              >
                {artist.profile.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm opacity-60 line-clamp-1 max-md:text-[12px]">
          {album.data.type} • {String(album.data.date.year)}
        </p>
      )}
    </div>
  );
}
