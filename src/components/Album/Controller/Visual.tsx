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
    <div className="flex items-center gap-3 max-sm:gap-1.5">
      <ImageLoader
        src={albumCover ?? "/no-image.webp"}
        alt="cover album"
        className="w-12 h-12 !shadow-sm rounded-sm max-md:w-10 max-md:h-10 flex-1"
      />

      <div className="flex flex-col flex-1">
        <h3 className="font-normal max-md:text-sm line-clamp-1">
          {track?.name}
        </h3>
        <div className="flex items-center gap-1 text-[13px] text-zinc-400 max-md:text-xs">
          {track?.explicit && <BsExplicitFill />}
          <p className="line-clamp-1">
            {track?.artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
