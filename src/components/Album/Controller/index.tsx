"use client";

import SeparatorComponent from "../../Separator";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { TAlbum, TTrack } from "@/types/TAlbum";
import { useEffect, useState, useRef } from "react";
import ProgressbarControllerComponent from "./Progressbar";
import VisualMusicControllerComponent from "./Visual";
import VolumeControllerComponent from "./Volume";
import ControllersControllerComponent from "./Controllers";

export default function MusicController({ album }: { album: TAlbum | null }) {
  const [track, setTrack] = useState<TTrack | null>(null);
  const [volume, setVolume] = useState<number>(
    process.env.NODE_ENV === "development" ? 0.01 : 0.4
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { indexCurrentTrack } = useSelector((state: RootState) => state.track);

  useEffect(() => {
    setTrack(album?.tracks.items[indexCurrentTrack] ?? null);
  }, [album, indexCurrentTrack]);

  return (
    <div className="sticky bottom-0 left-0 bg-main shadow-up transition-all z-20 -translate-y-0">
      <SeparatorComponent className="bg-primary" />

      <div className="grid grid-cols-3 items-center justify-between px-6 py-4 mx-auto max-lg:grid-cols-[1.8fr_.6fr_.6fr] max-md:grid-cols-[1.5fr_.5fr] max-md:p-3">
        <VisualMusicControllerComponent
          albumCover={album?.images?.[0].url}
          track={track}
        />
        <div className="flex flex-col items-center gap-2 max-w-xl max-lg:items-end">
          <ControllersControllerComponent
            tracks={album?.tracks.items.length ?? 0}
            audioRef={audioRef}
          />

          <ProgressbarControllerComponent
            track={track}
            volume={volume}
            audioRef={audioRef}
          />
        </div>

        <VolumeControllerComponent volume={volume} setVolume={setVolume} />
      </div>
    </div>
  );
}
