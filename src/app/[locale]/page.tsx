import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <div className="h-96 my-36 container">
      <h1>{t("hello")}</h1>
    </div>
  );
}
