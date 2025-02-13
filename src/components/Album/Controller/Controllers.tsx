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
    if (
      audioRef.current &&
      (audioRef.current.currentTime > 5 || currentTrackIndex === 0)
    ) {
      audioRef.current.currentTime = 0;
    } else {
      dispatch(setPlayingTrack(currentTrackIndex - 1));
    }

    dispatch(setIsPlaying(true));
  };

  const handleNextTrack = () => {
    if (currentTrackIndex < tracks - 1) {
      dispatch(setPlayingTrack(currentTrackIndex + 1));
      dispatch(setIsPlaying(true));
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
    <div className="flex items-center justify-center gap-4 max-sm:gap-1">
      <button
        onClick={handlePrevTrack}
        className="text-zinc-400 rounded-full p-1.5 transition-all md:hover:bg-zinc-200 md:hover:bg-opacity-5 max-md:active:text-zinc-400 max-md:p-1"
      >
        <IoPlaySkipBack className="text-base max-md:text-sm" />
      </button>

      <button
        onClick={togglePlay}
        className="bg-zinc-200 text-zinc-700 rounded-full p-1.5 transition-all text-lg max-md:text-base max-md:p-1"
      >
        {isPlaying ? <IoPause /> : <IoPlay />}
      </button>

      <button
        onClick={handleNextTrack}
        className="text-zinc-400 rounded-full p-1.5 transition-all md:hover:bg-zinc-200 md:hover:bg-opacity-5 max-md:active:text-zinc-400 max-md:p-1"
      >
        <IoPlaySkipForward className="text-base max-md:text-sm" />
      </button>
    </div>
  );
}
