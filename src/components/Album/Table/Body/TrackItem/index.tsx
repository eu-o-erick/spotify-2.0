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

  const handleRowClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest(".rating-area")) {
      handleSetTrack();
    }
  };

  const handleRatingAreaClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains("rating-area")) {
      inputRef.current?.focus();
    }
  };

  return (
    <tr
      onClick={handleRowClick}
      className={cn(
        "group transition-all cursor-pointer hover:bg-zinc-400 hover:bg-opacity-5",
        {
          "bg-zinc-500 bg-opacity-5": index === indexCurrentTrack,
        }
      )}
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

      <td className="rounded-e-lg rating-area" onClick={handleRatingAreaClick}>
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
