import { TTrack } from "@/types/TAlbum";
import TrackTableSkeletonComponent from "./Skeleton";
import { Fragment } from "react";
import DiscComponent from "./Disc";
import TrackItemComponent from "./TrackItem";

export default function TableBodyComponent({
  tracks,
  isLoading,
  albumId,
}: {
  tracks: TTrack[] | undefined;
  isLoading: boolean;
  albumId: string;
}) {
  return (
    <tbody>
      {isLoading ? (
        <TrackTableSkeletonComponent />
      ) : (
        tracks?.map((track, i) => (
          <Fragment key={i}>
            <DiscComponent track={track} tracks={tracks} i={i} />
            <TrackItemComponent
              track={track}
              key={track.id}
              index={i}
              albumId={albumId}
            />
          </Fragment>
        ))
      )}
    </tbody>
  );
}
