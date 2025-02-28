import { useTranslations } from "next-intl";
import ButtonComponent from "../Button";
import { HiDownload } from "react-icons/hi";
import { TAlbum } from "@/types/TAlbum";
import domtoimage from "dom-to-image";
import { useDispatch, useSelector } from "react-redux";
import { setIsDownloading } from "@/store/slices/isDownloading ";
import { RootState } from "@/store";

export default function DownloadButtonComponent({
  dataAlbum,
}: {
  dataAlbum: TAlbum | null;
}) {
  const t = useTranslations("AlbumPage");

  const isDownloading = useSelector(
    (state: RootState) => state.isDownloading.value
  );

  const dispatch = useDispatch();

  const handleDownloadImage = async () => {
    const trackTable = document.querySelector(".track-table");
    if (!trackTable || !dataAlbum) return;

    dispatch(setIsDownloading(true));

    setTimeout(async () => {
      try {
        const dataUrl = await domtoimage.toPng(trackTable as HTMLElement);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${dataAlbum.name}.png`;
        link.click();
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setIsDownloading(false));
      }
    }, 100);
  };

  return (
    <div className="container flex justify-end my-10 max-md:px-2">
      <ButtonComponent
        label={t("downloadImage")}
        handle={handleDownloadImage}
        className="rounded-md"
        isLoading={isDownloading}
      >
        <HiDownload className="text-main relative top-0.5 w-4 h-4" />
      </ButtonComponent>
    </div>
  );
}
