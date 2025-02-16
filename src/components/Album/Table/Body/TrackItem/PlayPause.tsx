"use client";

import { FaPlay } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { cn } from "@/lib/cn";

export default function PlayPauseTrackItemComponent({
  index,
  handleSetTrack,
}: {
  index: number;
  handleSetTrack: () => void;
}) {
  const { isPlaying, indexCurrentTrack } = useSelector(
    (state: RootState) => state.track
  );

  return (
    <div
      className={cn("hidden items-center md:group-hover:flex max-sm:-ml-1", {
        flex: index === indexCurrentTrack,
      })}
    >
      <button
        type="button"
        className="relative w-5 h-5 max-sm:w-4 max-sm:h-4 rounded-full md:hover:bg-zinc-100 md:hover:text-main max-md:active:text-zinc-500 hover:bg-opacity-5 transition-all"
        onClick={handleSetTrack}
      >
        <GiPauseButton
          className={cn(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 max-sm:w-3 max-sm:h-3 transition-opacity",
            {
              "opacity-0": indexCurrentTrack !== index || !isPlaying,
            }
          )}
        />

        <FaPlay
          className={cn(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 max-sm:w-3 max-sm:h-3 transition-opacity",
            {
              "opacity-0": indexCurrentTrack === index && isPlaying,
            }
          )}
        />
      </button>
    </div>
  );
}
