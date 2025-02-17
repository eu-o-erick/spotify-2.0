"use client";

import { TTrack } from "@/types/TAlbum";
import RatingStars from "./RatingStars";
import RatingInput from "./RatingInput";
import { useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { cn } from "@/lib/cn";
import InfoTrackComponent from "./Info";
import PlayPauseTrackItemComponent from "./PlayPause";
import { setIsPlaying, setPlayingTrack } from "@/store/slices/playingTrack";
import ButtonsRatingInput from "./InputButtons";

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

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSetTrack = () => {
    if (indexCurrentTrack === index) {
      dispatch(setIsPlaying(!isPlaying));
    } else {
      dispatch(setPlayingTrack(index));
      dispatch(setIsPlaying(true));
    }
  };

  return (
    <tr
      className={cn(
        "group transition-all cursor-pointer md:hover:bg-zinc-400 md:hover:bg-opacity-5",
        {
          "bg-zinc-500 bg-opacity-5": index === indexCurrentTrack,
        }
      )}
    >
      <td className="sm:rounded-s-lg">
        <div className="flex items-center justify-center w-14 max-sm:w-10">
          <PlayPauseTrackItemComponent
            index={index}
            handleSetTrack={handleSetTrack}
          />

          <button
            className={cn("font-bold text-zinc-500 w-4 md:group-hover:hidden", {
              hidden: index === indexCurrentTrack,
            })}
            onClick={handleSetTrack}
          >
            {track.track_number}
          </button>
        </div>
      </td>

      <InfoTrackComponent track={track} handleSetTrack={handleSetTrack} />

      <td className="sm:rounded-e-lg">
        <div className="flex gap-1 items-center justify-end">
          <RatingStars rating={rating} setRating={setRating} />

          <div className="flex items-center">
            <RatingInput
              inputRef={inputRef}
              trackNumber={index}
              rating={rating}
              setRating={setRating}
            />

            <ButtonsRatingInput setRating={setRating} />
          </div>
        </div>
      </td>
    </tr>
  );
}
