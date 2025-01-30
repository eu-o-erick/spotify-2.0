import SearchComponent from "@/components/Search";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <main className="flex-1">
      <SearchComponent />
      <h1>{t("hello")}</h1>
    </main>
  );
}
