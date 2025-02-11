"use client";

import { TTrack } from "@/types/TAlbum";
import { FaPlay } from "react-icons/fa";
import { BsExplicitFill } from "react-icons/bs";
import RatingStars from "./RatingStars";
import RatingInput from "./RatingInput";
import { useState } from "react";

export default function TrackItemComponent({ track }: { track: TTrack }) {
  const [rating, setRating] = useState<number | string>("");

  return (
    <tr className="md:hover:rounded-md md:hover:bg-secondary group transition-all">
      <td className="font-bold text-lg text-start px-6 text-zinc-500 rounded-s-lg">
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
          className="p-1.5 rounded-full md:hover:bg-zinc-100 md:hover:text-main max-md:active:text-zinc-500 hover:bg-opacity-5 transition-all"
        >
          <FaPlay className="w-3.5 h-3.5" />
        </button>
      </td>
      <td className="rounded-e-lg">
        <div className="flex gap-4 items-center justify-end">
          <RatingStars rating={rating} />
          <RatingInput
            trackNumber={track.track_number}
            rating={rating}
            setRating={setRating}
          />
        </div>
      </td>
    </tr>
  );
}
