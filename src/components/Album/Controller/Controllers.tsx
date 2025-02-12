"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setIsPlaying, setPlayingTrack } from "@/store/slices/playingTrack";
import {
  IoPlaySkipForward,
  IoPlaySkipBack,
  IoPlay,
  IoPause,
} from "react-icons/io5";
import { cn } from "@/lib/cn";

export default function ControllersControllerComponent({
  tracks,
  audioRef,
}: {
  tracks: number;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}) {
  const dispatch = useDispatch();

  const isPlaying = useSelector((state: RootState) => state.track.isPlaying);
  const currentTrackIndex = useSelector(
    (state: RootState) => state.track.indexCurrentTrack
  );

  const handlePrevTrack = () => {
    if (currentTrackIndex > 0) {
      dispatch(setPlayingTrack(currentTrackIndex - 1));
    }
  };

  const handleNextTrack = () => {
    if (currentTrackIndex < tracks - 1) {
      dispatch(setPlayingTrack(currentTrackIndex + 1));
    }
  };

  const togglePlay = () => {
    if (audioRef.current && audioRef.current.ended) {
      dispatch(setIsPlaying(true));
      audioRef.current.currentTime = 0;
    }
    dispatch(setIsPlaying(!isPlaying));
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={handlePrevTrack}
        className={cn("text-zinc-400 rounded-full p-1.5 transition-all", {
          "md:hover:bg-zinc-200 md:hover:bg-opacity-5 max-md:active:text-zinc-500":
            currentTrackIndex !== 0,
          "cursor-not-allowed": currentTrackIndex === 0,
        })}
        disabled={currentTrackIndex === 0}
      >
        <IoPlaySkipBack className="text-base" />
      </button>

      <button
        onClick={togglePlay}
        className={cn(
          "bg-zinc-200 text-zinc-700 rounded-full p-1.5 transition-all",
          {
            "max-md:active:text-zinc-800 md:hover:text-zinc-800":
              currentTrackIndex !== tracks - 1,
            "cursor-not-allowed": currentTrackIndex === tracks - 1,
          }
        )}
      >
        {isPlaying ? (
          <IoPause className="text-lg" />
        ) : (
          <IoPlay className="text-lg" />
        )}
      </button>

      <button
        onClick={handleNextTrack}
        className={cn("text-zinc-400 rounded-full p-1.5 transition-all", {
          "md:hover:bg-zinc-200 md:hover:bg-opacity-5 max-md:active:text-zinc-400":
            currentTrackIndex !== tracks - 1,
          "cursor-not-allowed": currentTrackIndex === tracks - 1,
        })}
        disabled={currentTrackIndex === tracks - 1}
      >
        <IoPlaySkipForward className="text-base" />
      </button>
    </div>
  );
}
