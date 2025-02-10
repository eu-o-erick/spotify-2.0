"use client";

import { TTrack } from "@/types/TAlbum";
import { FaPlay } from "react-icons/fa";
import { BsExplicitFill } from "react-icons/bs";
import RatingStars from "./RatingStars";

export default function TrackItemComponent({ track }: { track: TTrack }) {
  return (
    <tr className="hover:rounded-md hover:bg-secondary group transition-all">
      <td className="font-bold text-lg text-start px-6 text-zinc-500 rounded-s-xl">
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
          className="p-2.5 rounded-full hover:bg-zinc-100 hover:bg-opacity-5"
        >
          <FaPlay className="w-3.5 h-3.5" />
        </button>
      </td>
      <td className="rounded-e-xl">
        <RatingStars />
      </td>
    </tr>
  );
}
