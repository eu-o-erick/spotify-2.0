"use client";

import { Link } from "@/i18n/routing";
import { TAlbum } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ItemAlbumComponent({
  album,
  isPageArtist,
}: {
  album: TAlbum;
  isPageArtist: boolean;
}) {
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (isPageArtist) {
      setDesc(String(album.data.date.year));
    } else {
      setDesc(
        album.data.artists.items
          .map((artist) => artist.profile.name)
          .join(" • ")
      );
    }
  }, [album, isPageArtist]);

  return (
    <div className="select-none flex flex-col px-1.5">
      <Image
        src={album.data.coverArt.sources[0].url}
        width={200}
        height={200}
        alt="cover album"
        className="rounded-[4px] shadow-strong max-md:rounded-sm"
      />
      <Link
        href={{
          pathname: `/album`,
          query: { id: album.data.uri.split(":")[2] },
        }}
        className="mt-2 line-clamp-2 max-md:text-[12px]"
      >
        {album.data.name}
      </Link>
      <span className="text-sm opacity-60 line-clamp-1 max-md:text-[10px]">
        {desc}
      </span>
    </div>
  );
}
