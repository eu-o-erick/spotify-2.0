"use client";

import { Link } from "@/i18n/routing";
import { TSearchArtist } from "@/types";
import Image from "next/image";

export default function ItemArtistComponent({
  artist,
}: {
  artist: TSearchArtist;
}) {
  return (
    <div className="select-none flex flex-col px-3 pt-3 pb-5 rounded-md group hover:bg-[#ffffff05] transition-all">
      <Link
        href={{
          pathname: `/artist`,
          query: { id: artist.data.uri.split(":")[2] },
        }}
        className="relative w-full rounded-full shadow-strong aspect-square overflow-hidden group-hover:shadow-none"
      >
        <Image
          src={
            artist.data.visuals.avatarImage?.sources?.[0]?.url ??
            "/no-image.webp"
          }
          width={400}
          height={400}
          alt="cover album"
          className="pointer-events-none transform group-hover:scale-105 transition-all"
        />
      </Link>

      <Link
        href={{
          pathname: `/artist`,
          query: { id: artist.data.uri.split(":")[2] },
        }}
        className="mt-2 line-clamp-1 max-md:text-[14px] text-zinc-300 group-hover:text-white transition-all"
      >
        {artist.data.profile.name}
      </Link>
    </div>
  );
}
