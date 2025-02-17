import { TTrack } from "@/types/TAlbum";
import { BsExplicitFill } from "react-icons/bs";

export default function InfoTrackComponent({
  track,
  handleSetTrack,
}: {
  track: TTrack;
  handleSetTrack: () => void;
}) {
  return (
    <td className="py-3 flex flex-col items-start">
      <h3 onClick={handleSetTrack} className="font-normal max-sm:text-[15px]">
        {track.name}
      </h3>
      <p
        onClick={handleSetTrack}
        className="flex items-center gap-1 text-[13px] text-zinc-400 max-sm:text-[12px]"
      >
        {track.explicit && <BsExplicitFill />}
        {track.artists.map((artist) => artist.name).join(", ")}
      </p>
    </td>
  );
}
