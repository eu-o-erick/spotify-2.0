import { TTrack } from "@/types/TAlbum";
import TrackListHeaderComponent from "./Header";
import TableBodyComponent from "./Body";
import { useTranslations } from "next-intl";

export default function TrackTableComponent({
  tracks,
  isLoading,
}: {
  tracks: TTrack[] | undefined;
  isLoading: boolean;
}) {
  const t = useTranslations("AlbumPage");

  return (
    <div className="container py-10">
      {!isLoading && (!tracks || !tracks.length) ? (
        <h4 className="text-zinc-500 text-center py-10">{t("noTracks")}</h4>
      ) : (
        <table className="w-full">
          <TrackListHeaderComponent />

          <TableBodyComponent tracks={tracks} isLoading={isLoading} />
        </table>
      )}
    </div>
  );
}
