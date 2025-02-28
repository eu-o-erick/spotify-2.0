"use client";

import { TTrack } from "@/types/TAlbum";
import RatingStars from "./RatingStars";
import { useState, useEffect } from "react";
import InfoTrackComponent from "./Info";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function TrackItemComponent({
  track,
  albumId,
}: {
  track: TTrack;
  albumId: string;
}) {
  const [rating, setRating] = useState<number | string>("");

  const isDownloading = useSelector(
    (state: RootState) => state.isDownloading.value
  );

  useEffect(() => {
    if (!isDownloading) return;

    setRating(() => {
      const albumRatings = JSON.parse(
        localStorage.getItem(`album_${albumId}_ratings`) || "{}"
      );

      return albumRatings[track.id] || "";
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDownloading, albumId]);

  return (
    <tr>
      <td>
        <div className="flex items-center justify-center w-14 max-sm:w-10">
          <span className="font-bold text-zinc-500 w-4">
            {track.track_number}
          </span>
        </div>
      </td>

      <InfoTrackComponent track={track} />

      <td>
        <div className="flex gap-1 items-center justify-end">
          <RatingStars rating={rating} />

          <div className="w-12 mx-6 flex items-end justify-center gap-0.5">
            <span>{rating}</span>

            <div className="text-xs leading-3 font-semibold text-zinc-500 realative mb-1">
              /5
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}
