import { TAlbum } from "@/types/TAlbum";
import InfoImageDownload from "./Info";

export default function ImageDownloadComponent({
  dataAlbum,
}: {
  dataAlbum: TAlbum;
}) {
  // <div className="absolute top-0 left-0 transform -translate-x-full -translate-y-full w-[1080px] bg-main track-table">

  return (
    <div className="w-[1080px] bg-main track-table">
      <InfoImageDownload dataAlbum={dataAlbum} />

      <ul className="">
        <li className="bg-blue-900 w-96 h-10" />
        <li className="bg-yellow-900 w-96 h-10" />
        <li className="bg-green-900 w-96 h-10" />
        <li className="bg-zinc-500 w-96 h-10" />
      </ul>
    </div>
  );
}
