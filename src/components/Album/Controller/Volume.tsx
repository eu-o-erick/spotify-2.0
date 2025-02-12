"use client";

import { IoVolumeOff, IoVolumeLow, IoVolumeMedium } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

export default function VolumeControllerComponent({
  volume,
  setVolume,
}: {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleVolumeChange = (
    e: MouseEvent | React.TouchEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    if (!progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const width = rect.width;

    let newVolume = x / width;
    newVolume = Math.max(0, Math.min(1, newVolume));

    setVolume(newVolume);
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) {
      handleVolumeChange(e as unknown as MouseEvent);
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleVolumeChange(e);
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

  const getVolumeIcon = () => {
    if (volume === 0) return <IoVolumeOff className="mr-0.5" />;
    if (volume < 0.5) return <IoVolumeLow className="mr-px" />;
    return <IoVolumeMedium />;
  };

  return (
    <div className="flex justify-end items-center gap-2  max-md:hidden">
      <button
        onClick={() => setVolume((prev) => (prev === 0 ? 0.5 : 0))}
        className="text-xl text-zinc-400 hover:text-white transition-colors"
      >
        {getVolumeIcon()}
      </button>

      <div
        className="group relative w-24 h-1 bg-zinc-600 rounded-full cursor-pointer"
        ref={progressBarRef}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onTouchMove={handleVolumeChange}
        onTouchEnd={() => setIsDragging(false)}
      >
        <div
          className="absolute h-full bg-zinc-200 group-hover:bg-green-500 transition-colors rounded-full"
          style={{ width: `${volume * 100}%` }}
        />
        <div
          className="absolute w-3 h-3 bg-white rounded-full -translate-y-1/2 top-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            left: `${volume * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
}
