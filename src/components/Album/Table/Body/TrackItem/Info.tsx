import { TTrack } from "@/types/TAlbum";
import { BsExplicitFill } from "react-icons/bs";

export default function InfoTrackComponent({ track }: { track: TTrack }) {
  return (
    <td className="py-3 flex flex-col gap-1 items-start">
      <h3 className="font-normal">{track.name}</h3>
      <p className="flex  items-center gap-1 text-[13px] text-zinc-400">
        {track.explicit && <BsExplicitFill />}
        {track.artists.map((artist) => artist.name).join(", ")}
      </p>
    </td>
  );
}
