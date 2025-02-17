import { useTranslations } from "next-intl";
import ButtonComponent from "../Button";
import { HiDownload } from "react-icons/hi";

export default function DownloadButtonComponent() {
  const t = useTranslations("AlbumPage");

  return (
    <div className="container flex justify-end my-10 max-md:px-2">
      <ButtonComponent
        label={t("downloadImage")}
        handle={() => {}}
        className="rounded-md"
      >
        <HiDownload className="text-main relative top-0.5 w-4 h-4" />
      </ButtonComponent>
    </div>
  );
}
