import { TTrack } from "@/types/TAlbum";
import TrackListHeaderComponent from "./Header";
import TableBodyComponent from "./Body";

export default function TrackTableDownloadComponent({
  tracks,
  albumId,
}: {
  tracks: TTrack[] | undefined;
  albumId: string;
}) {
  return (
    <div className="container py-6 px-20">
      <table className="w-full">
        <TrackListHeaderComponent />
        <TableBodyComponent tracks={tracks} albumId={albumId} />
      </table>
    </div>
  );
}
