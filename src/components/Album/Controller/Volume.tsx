"use client";

import SeparatorComponent from "../../Separator";
import { cn } from "@/lib/cn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setIsPlaying, setIsVisible } from "@/store/slices/playingTrack";
import ImageLoader from "../../ImageLoader";
import { TAlbum, TTrack } from "@/types/TAlbum";
import { IoClose } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { BsExplicitFill } from "react-icons/bs";

export default function MusicController({ album }: { album: TAlbum | null }) {
  const dispatch = useDispatch();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [track, setTrack] = useState<TTrack | null>(null);
  const [volume, setVolume] = useState<number>(0.4);

  const { indexCurrentTrack, isPlaying, isVisible } = useSelector(
    (state: RootState) => state.track
  );

  useEffect(() => {
    setTrack(album?.tracks.items[indexCurrentTrack] ?? null);
  }, [album, indexCurrentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    setTimeout(() => {
      if (isPlaying) {
        audioRef.current?.play();
      } else {
        audioRef.current?.pause();
      }
    }, 100);
  }, [isPlaying]);

  useEffect(() => {
    setTimeout(() => {
      if (isPlaying) {
        audioRef.current?.play();
      }
    }, 100);
  }, [track]);

  const handleMusicEnd = () => {
    dispatch(setIsPlaying(false));
  };

  const handleSetIsVisible = () => {
    dispatch(setIsVisible(false));
    dispatch(setIsPlaying(false));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setVolume(volume);
  };

  return (
    <div
      className={cn(
        "sticky bottom-0 left-0 w-full bg-main shadow-up transition-all opacity-0 z-20",
        {
          "opacity-100 -translate-y-0": isVisible,
        }
      )}
    >
      <SeparatorComponent className="bg-primary" />

      <div className="grid grid-cols-3 items-center justify-between px-6 py-4 mx-auto">
        <div className="flex items-center  gap-3">
          <ImageLoader
            src={album?.images?.[0].url ?? "/no-image.webp"}
            alt="cover album"
            className="w-12 h-12 !shadow-sm rounded-sm"
          />

          <div className="">
            <h3 className="font-normal">{track?.name}</h3>
            <p className="text-[13px] flex items-center gap-1 text-zinc-400">
              {track?.explicit && <BsExplicitFill />}
              {track?.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <audio
            ref={audioRef}
            src={track?.preview_url}
            onEnded={handleMusicEnd}
            controls
          />
        </div>

        <div className="flex items-center justify-end">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24"
          />

          <button
            type="button"
            onClick={handleSetIsVisible}
            className="text-2xl"
          >
            <IoClose />
          </button>
        </div>
      </div>
    </div>
  );
}
