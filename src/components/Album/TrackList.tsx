"use client";

import { TTrack } from "@/types/TAlbum";
import { useTranslations } from "next-intl";
import TrackItemComponent from "./TrackItem";

export default function TrackListComponent({
  tracks,
  isLoading,
}: {
  tracks: TTrack[] | undefined;
  isLoading: boolean;
}) {
  const t = useTranslations("AlbumPage");

  return (
    <div className="container py-10">
      {!isLoading && (!tracks || !tracks.length) ? (
        <>num tem</>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="h-7">
              <th className="text-start text-xs font-light opacity-80 w-16 px-6">
                #
              </th>
              <th className="text-start text-xs font-light opacity-80">
                {t("titleSong")}
              </th>
              <th className="text-start text-xs font-light opacity-80">
                {t("preview")}
              </th>
              <th className="text-start text-xs font-light opacity-80 pl-6 w-52">
                {t("rating")}
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr className="h-7">
                <td>loading</td>
              </tr>
            ) : (
              tracks?.map((track, i) => (
                <TrackItemComponent track={track} key={i} />
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
