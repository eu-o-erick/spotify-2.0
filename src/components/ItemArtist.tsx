"use client";

import { Link } from "@/i18n/routing";
import { TArtist } from "@/types";
import Image from "next/image";

export default function ItemArtistComponent({ artist }: { artist: TArtist }) {
  return (
    <div className="select-none flex flex-col px-1.5">
      <Image
        src={
          artist.data.visuals.avatarImage?.sources?.[0].url || "/no-image.webp"
        }
        width={400}
        height={400}
        alt="cover album"
        className="rounded-full shadow-strong aspect-square"
      />
      <Link
        href={{
          pathname: `/artist`,
          query: { id: artist.data.uri.split(":")[2] },
        }}
        className="mt-2 line-clamp-1 max-md:text-[14px]"
      >
        {artist.data.profile.name}
      </Link>
    </div>
  );
}
