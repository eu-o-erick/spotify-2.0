"use client";

import { Link } from "@/i18n/routing";
import { TArtistRelated, TSearchArtist } from "@/types/TArtist";
import ImageLoader from "../ImageLoader";

export default function ItemArtistComponent({
  artist,
  isPageArtist,
}: {
  artist: TSearchArtist | TArtistRelated;
  isPageArtist?: boolean;
}) {
  const data = isPageArtist
    ? (artist as TArtistRelated)
    : (artist as TSearchArtist).data;

  return (
    <div className="select-none rounded-md md:hover:bg-[#ffffff05] transition-all">
      <Link
        href={{
          pathname: `/artist`,
          query: { id: data.uri.split(":")[2] },
        }}
        className="select-none flex flex-col px-3 pt-3 pb-5 group"
      >
        <div className="relative w-full rounded-full shadow-strong aspect-square overflow-hidden md:group-hover:shadow-none max-md:shadow-sm">
          <ImageLoader
            alt={`cover '${data.profile.name}'`}
            src={
              data.visuals.avatarImage?.sources?.[0]?.url ?? "/no-image.webp"
            }
            className="aspect-square object-cover pointer-events-none transform transition-all"
          />
        </div>

        <p className="mt-2 line-clamp-1 max-md:text-[14px] text-zinc-300 group-hover:text-white md:group-hover:underline md:group-active:underline transition-all">
          {data.profile.name}
        </p>
      </Link>
    </div>
  );
}
