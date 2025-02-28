import { TTrack } from "@/types/TAlbum";
import { BsExplicitFill } from "react-icons/bs";

export default function InfoTrackComponent({ track }: { track: TTrack }) {
  return (
    <td className="py-3 flex flex-col items-start">
      <h3 className="font-normal line-clamp-1">{track.name}</h3>
      <p className="flex items-center gap-1 text-[13px] text-zinc-400">
        {track.explicit && <BsExplicitFill />}
        <span className="line-clamp-1">
          {track.artists.map((artist) => artist.name).join(", ")}
        </span>
      </p>
    </td>
  );
}
