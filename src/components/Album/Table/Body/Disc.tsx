"use client";

import { TTrack } from "@/types/TAlbum";
import { useTranslations } from "next-intl";
import { IoDiscOutline } from "react-icons/io5";

export default function DiscComponent({
  track,
  tracks,
  i,
}: {
  track: TTrack;
  tracks: TTrack[];
  i: number;
}) {
  const t = useTranslations("AlbumPage");

  if (i === 0 || tracks[i].disc_number !== tracks[i - 1].disc_number) {
    return (
      <tr key={`disc-${track.disc_number}`}>
        <td colSpan={4} className="pb-4">
          {tracks.some((t) => t.disc_number !== tracks[0].disc_number) && (
            <div className="flex items-center gap-2 pt-8">
              <IoDiscOutline className="text-zinc-600" />

              <h3 className="text-zinc-400">
                {t("disc")} {track.disc_number}
              </h3>
            </div>
          )}
        </td>
      </tr>
    );
  }

  return null;
}
