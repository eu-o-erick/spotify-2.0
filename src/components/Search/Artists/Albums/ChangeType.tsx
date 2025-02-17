"use client";

import { Link } from "@/i18n/routing";

const TYPES = ["albums", "singles"];

export default function FilterAlbums({
  type,
  artistId,
  name,
}: {
  type: string;
  artistId: string;
  name: string;
}) {
  return (
    <div className="flex justify-end gap-3 text-sm my-4 max-sm:text-xs max-sm:mb-2 max-sm:gap-2 max-md:px-2">
      {TYPES.map((TYPE, i) => {
        if (TYPE === type) {
          return (
            <span
              key={i}
              className="px-4 py-2 bg-white text-main rounded-full max-sm:py-1.5 max-sm:px-3"
            >
              {TYPE}
            </span>
          );
        } else {
          return (
            <Link
              key={i}
              href={{
                pathname: "/artist/albums",
                query: { artistId, type: TYPE, name },
              }}
              className="px-4 py-2 bg-secondary text-white rounded-full max-sm:py-1.5 max-sm:px-3"
            >
              {TYPE}
            </Link>
          );
        }
      })}
    </div>
  );
}
