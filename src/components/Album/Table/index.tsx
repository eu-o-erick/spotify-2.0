import { TTrack } from "@/types/TAlbum";
import TrackListHeaderComponent from "./Header";
import TableBodyComponent from "./Body";

export default function TrackTableComponent({
  tracks,
  isLoading,
}: {
  tracks: TTrack[] | undefined;
  isLoading: boolean;
}) {
  return (
    <div className="container py-10">
      {!isLoading && (!tracks || !tracks.length) ? (
        <>num tem</>
      ) : (
        <table className="w-full">
          <TrackListHeaderComponent />

          <TableBodyComponent tracks={tracks} isLoading={isLoading} />
        </table>
      )}
    </div>
  );
}
