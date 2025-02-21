import { useTranslations } from "next-intl";
import ButtonComponent from "../Button";
import { HiDownload } from "react-icons/hi";
import { TAlbum } from "@/types/TAlbum";
import html2canvas from "html2canvas";

export default function DownloadButtonComponent({
  dataAlbum,
}: {
  dataAlbum: TAlbum | null;
}) {
  const t = useTranslations("AlbumPage");

  const handleDownloadImage = async () => {
    const trackTable = document.querySelector(".track-table");
    if (!trackTable || !dataAlbum) return;

    try {
      const canvas = await html2canvas(trackTable as HTMLElement, {
        backgroundColor: "#313131",
        useCORS: true,
        allowTaint: true,
        scale: 2,
      });

      const link = document.createElement("a");
      link.download = `${dataAlbum.name}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container flex justify-end my-10 max-md:px-2">
      <ButtonComponent
        label={t("downloadImage")}
        handle={handleDownloadImage}
        className="rounded-md"
      >
        <HiDownload className="text-main relative top-0.5 w-4 h-4" />
      </ButtonComponent>
    </div>
  );
}
