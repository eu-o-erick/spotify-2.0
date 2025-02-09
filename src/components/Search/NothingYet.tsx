"use client";

import { useTranslations } from "next-intl";

export default function NothingYetSearchComponent() {
  const t = useTranslations("SearchPage");

  return (
    <div>
      <h2 className="text-center text-zinc-600 text-2xl mt-36 mb-56 max-sm:px-2">
        {t("nothingYet")}
      </h2>
    </div>
  );
}
