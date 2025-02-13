"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setIsPlaying, setPlayingTrack } from "@/store/slices/playingTrack";
import { TTrack } from "@/types/TAlbum";
import { useEffect, useRef, useState } from "react";

export default function ProgressbarControllerComponent({
  volume,
  track,
  audioRef,
}: {
  volume: number;
  track: TTrack | null;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}) {
  const dispatch = useDispatch();
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const isPlaying = useSelector((state: RootState) => state.track.isPlaying);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleProgressChange(e);
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, audioRef, track]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  useEffect(() => {
    setCurrentTime(0);
    setDuration(30);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  useEffect(() => {
    return () => {
      dispatch(setIsPlaying(false));
      dispatch(setPlayingTrack(0));
      setCurrentTime(0);
      setDuration(30);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.ceil(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && !isDragging) {
      setCurrentTime(audioRef.current.currentTime || 0);
      setDuration(audioRef.current.duration || 30);
    }
  };

  const handleProgressChange = (
    e: MouseEvent | React.MouseEvent<HTMLDivElement>
  ) => {
    if (!progressBarRef.current || !audioRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const width = rect.width;

    const newTime = Math.min((x / width) * duration, duration);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!progressBarRef.current || !audioRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    const newTime = (x / width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);

    setIsDragging(true);
  };

  return (
    <div className="flex items-center gap-2 w-full max-lg:absolute max-lg:bottom-0 max-lg:left-0">
      <span className="text-xs text-zinc-400 w-10 text-right max-lg:hidden">
        {formatTime(currentTime)}
      </span>

      <div
        className="group relative flex-1 h-1 bg-zinc-600 rounded-full cursor-pointer max-lg:h-px max-lg:cursor-default max-lg:bg-zinc-700"
        ref={progressBarRef}
        onMouseDown={(e) => {
          if (window.innerWidth >= 1024) {
            handleMouseDown(e);
          }
        }}
      >
        <div
          className="absolute h-full bg-zinc-200 lg:group-hover:bg-green-500 transition-colors rounded-full max-lg:bg-zinc-500"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
        <div
          className="absolute w-3 h-3 bg-white rounded-full -translate-y-1/2 top-1/2 opacity-0 lg:group-hover:opacity-100 transition-opacity"
          style={{
            left: `${(currentTime / duration) * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <span className="text-xs text-zinc-400 w-10 max-lg:hidden">
        {formatTime(duration)}
      </span>

      <audio
        className="hidden"
        ref={audioRef}
        src={track?.preview_url}
        onPause={() => dispatch(setIsPlaying(false))}
        onPlay={() => dispatch(setIsPlaying(true))}
        onEnded={() => dispatch(setIsPlaying(false))}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
      />
    </div>
  );
}
