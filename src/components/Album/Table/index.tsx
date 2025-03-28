import { TTrack } from "@/types/TAlbum";
import TrackListHeaderComponent from "./Header";
import TableBodyComponent from "./Body";
import { useTranslations } from "next-intl";

export default function TrackTableComponent({
  tracks,
  isLoading,
  albumId,
}: {
  tracks: TTrack[] | undefined;
  isLoading: boolean;
  albumId: string;
}) {
  const t = useTranslations("AlbumPage");

  return (
    <div className="container py-10">
      {!isLoading && (!tracks || !tracks.length) ? (
        <h4 className="text-zinc-400 text-center">{t("noTracks")}</h4>
      ) : (
        <table className="w-full">
          <TrackListHeaderComponent />
          <TableBodyComponent
            tracks={tracks}
            isLoading={isLoading}
            albumId={albumId}
          />
        </table>
      )}
    </div>
  );
}
