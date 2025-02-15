"use client";

import { useTranslations } from "next-intl";

export default function TrackListHeaderComponent() {
  const t = useTranslations("AlbumPage");

  return (
    <thead className="border-b border-zinc-600 ">
      <tr className="h-12 ">
        <td className="rounded-s-lg opacity-80 w-14">
          <div className="flex items-center justify-center">
            <span className="text-xs font-light w-4">#</span>
          </div>
        </td>
        <th className="text-start text-xs font-light opacity-80">
          {t("titleSong")}
        </th>

        <th className="text-start text-xs font-light opacity-80 w-20">
          {t("rating")}
        </th>
      </tr>
    </thead>
  );
}
