"use client";

import { TTrack } from "@/types/TAlbum";
import { useTranslations } from "next-intl";
import TrackItemComponent from "./TrackItem";
import { Fragment } from "react";
import { IoDiscOutline } from "react-icons/io5";

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
                <Fragment key={i}>
                  {tracks.some(
                    (t) => t.disc_number !== tracks[0].disc_number
                  ) &&
                    (i === 0 ||
                      tracks[i].disc_number !== tracks[i - 1].disc_number) && (
                      <tr key={`disc-${track.disc_number}`}>
                        <td colSpan={4} className="pb-4 pt-8">
                          <div className="flex items-center gap-2">
                            <IoDiscOutline className="text-zinc-600" />

                            <h3 className="text-zinc-400">
                              {t("disc")} {track.disc_number}
                            </h3>
                          </div>
                        </td>
                      </tr>
                    )}
                  <TrackItemComponent track={track} key={i} index={i} />
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
