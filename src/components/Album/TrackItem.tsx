"use client";

import { TTrack } from "@/types/TAlbum";
import { FaPlay } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";
import { BsExplicitFill } from "react-icons/bs";
import RatingStars from "./RatingStars";
import RatingInput from "./RatingInput";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setIsPlaying, setPlayingTrack } from "@/store/slices/playingTrack";
import { RootState } from "@/store";
import { cn } from "@/lib/cn";

export default function TrackItemComponent({ track }: { track: TTrack }) {
  const [rating, setRating] = useState<number | string>("");

  const dispatch = useDispatch();

  const indexCurrentTrack = useSelector(
    (state: RootState) => state.track.indexCurrentTrack
  );
  const isPlaying = useSelector((state: RootState) => state.track.isPlaying);

  const handleSetTrack = () => {
    if (indexCurrentTrack === track.track_number - 1) {
      dispatch(setIsPlaying(!isPlaying));
    } else {
      dispatch(setPlayingTrack(track.track_number - 1));
    }
  };

  return (
    <tr className="md:hover:rounded-md md:hover:bg-secondary group transition-all">
      <td className="font-bold text-lg text-start px-6 text-zinc-500 rounded-s-lg">
        {track.track_number}
      </td>
      <td className="py-3">
        <h3 className="font-normal">{track.name}</h3>
        <p className="text-[13px] flex items-center gap-1 text-zinc-400">
          {track.explicit && <BsExplicitFill />}
          {track.artists.map((artist) => artist.name).join(", ")}
        </p>
      </td>
      <td>
        <button
          type="button"
          className="relative w-6 h-6 rounded-full md:hover:bg-zinc-100 md:hover:text-main max-md:active:text-zinc-500 hover:bg-opacity-5 transition-all"
          onClick={handleSetTrack}
        >
          <GiPauseButton
            className={cn(
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 transition-opacity",
              {
                "opacity-0":
                  indexCurrentTrack + 1 !== track.track_number || !isPlaying,
              }
            )}
          />

          <FaPlay
            className={cn(
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 transition-opacity",
              {
                "opacity-0":
                  indexCurrentTrack + 1 === track.track_number && isPlaying,
              }
            )}
          />
        </button>
      </td>
      <td className="rounded-e-lg">
        <div className="flex gap-4 items-center justify-end">
          <RatingStars rating={rating} />
          <RatingInput
            trackNumber={track.track_number}
            rating={rating}
            setRating={setRating}
          />
        </div>
      </td>
    </tr>
  );
}
