"use client";

import { useTranslations } from "next-intl";

export default function NoResultsSearchComponent({ query }: { query: string }) {
  const t = useTranslations("SearchPage");

  return (
    <h2 className="container text-zinc-500 text-xl mt-20 mb-80 font-light">
      {t("nothingFound")} <span className="font-semibold">{query}</span>
      {". "}
      {t("tryAgain")}
    </h2>
  );
}
