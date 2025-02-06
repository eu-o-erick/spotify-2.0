"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function TitleArtistAlbums({
  artistId,
  name,
}: {
  artistId: string;
  name: string;
}) {
  const t = useTranslations("SearchPage");

  return (
    <h2 className="font-light text-zinc-500 text-xl max-sm:gap-1 max-sm:text-base max-[500px]:px-2">
      {t("browseAlbumsAndSingles")}{" "}
      <Link
        href={{
          pathname: "/artist",
          query: { id: artistId },
        }}
        className="inline text-zinc-400 hover:text-zinc-300 transition-all hover:underline"
      >
        {decodeURIComponent(name)}
      </Link>
    </h2>
  );
}
