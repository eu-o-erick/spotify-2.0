"use client";

import { TTrack } from "@/types/TAlbum";
import RatingStars from "./RatingStars";
import RatingInput from "./RatingInput";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { cn } from "@/lib/cn";
import InfoTrackComponent from "./Info";
import PlayPauseTrackItemComponent from "./PlayPause";
import { setIsPlaying, setPlayingTrack } from "@/store/slices/playingTrack";

export default function TrackItemComponent({
  track,
  index,
}: {
  track: TTrack;
  index: number;
}) {
  const [rating, setRating] = useState<number | string>("");

  const { indexCurrentTrack, isPlaying } = useSelector(
    (state: RootState) => state.track
  );

  const dispatch = useDispatch();

  const handleSetTrack = () => {
    if (indexCurrentTrack === index) {
      dispatch(setIsPlaying(!isPlaying));
    } else {
      dispatch(setPlayingTrack(index));
    }
  };

  return (
    <tr
      className={cn(
        "md:hover:rounded-md md:hover:bg-secondary group transition-all",
        {
          "bg-zinc-500 bg-opacity-5": index === indexCurrentTrack,
        }
      )}
      onClick={handleSetTrack}
    >
      <td className="rounded-s-lg">
        <div className="flex items-center justify-center w-14">
          <PlayPauseTrackItemComponent
            index={index}
            handleSetTrack={handleSetTrack}
          />

          <span
            className={cn("font-bold text-zinc-500 w-4 md:group-hover:hidden", {
              hidden: index === indexCurrentTrack && isPlaying,
            })}
          >
            {track.track_number}
          </span>
        </div>
      </td>

      <InfoTrackComponent track={track} />

      <td className="rounded-e-lg">
        <div className="flex gap-4 items-center justify-end">
          <RatingStars rating={rating} />
          <RatingInput
            trackNumber={index}
            rating={rating}
            setRating={setRating}
          />
        </div>
      </td>
    </tr>
  );
}
