"use client";

import ImageLoader from "../../ImageLoader";
import { TTrack } from "@/types/TAlbum";
import { BsExplicitFill } from "react-icons/bs";

export default function VisualMusicControllerComponent({
  track,
  albumCover,
}: {
  track: TTrack | null;
  albumCover: string | undefined;
}) {
  return (
    <div className="flex items-center gap-3">
      <ImageLoader
        src={albumCover ?? "/no-image.webp"}
        alt="cover album"
        className="w-12 h-12 !shadow-sm rounded-sm max-md:w-10 max-md:h-10"
      />

      <div className="">
        <h3 className="font-normal max-md:text-sm">{track?.name}</h3>
        <p className="text-[13px] flex items-center gap-1 text-zinc-400 max-md:text-xs">
          {track?.explicit && <BsExplicitFill />}
          {track?.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
    </div>
  );
}
