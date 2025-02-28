import { TTrack } from "@/types/TAlbum";
import { Fragment } from "react";
import DiscComponent from "./Disc";
import TrackItemComponent from "./TrackItem";

export default function TableBodyComponent({
  tracks,
  albumId,
}: {
  tracks: TTrack[] | undefined;
  albumId: string;
}) {
  return (
    <tbody>
      {tracks?.map((track, i) => (
        <Fragment key={i}>
          <DiscComponent track={track} tracks={tracks} i={i} />
          <TrackItemComponent track={track} key={track.id} albumId={albumId} />
        </Fragment>
      ))}
    </tbody>
  );
}
