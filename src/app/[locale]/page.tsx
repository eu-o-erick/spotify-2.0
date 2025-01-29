import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <main className="my-24 container flex-1">
      <h1>{t("hello")}</h1>
    </main>
  );
}
