import { TAlbum } from "@/types/TAlbum";
import InfoImageDownload from "./Info";
import SeparatorComponent from "../Separator";
import TrackTableDownloadComponent from "./Table";
import CreditsDownloadAlbumComponent from "./Credits";

export default function ImageDownloadComponent({
  dataAlbum,
}: {
  dataAlbum: TAlbum;
}) {
  return (
    <div className="absolute top-0 left-0 opacity-0 pointer-events-none">
      <div className="absolute w-[1080px] bg-main track-table">
        <SeparatorComponent />

        <InfoImageDownload dataAlbum={dataAlbum} />

        <TrackTableDownloadComponent
          albumId={dataAlbum.id}
          tracks={dataAlbum.tracks.items}
        />

        <CreditsDownloadAlbumComponent copyrights={dataAlbum.copyrights} />
      </div>
    </div>
  );
}
