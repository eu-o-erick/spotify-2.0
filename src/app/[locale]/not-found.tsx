"use client";

import ButtonComponent from "@/components/Button";
import { redirect } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

export default function NotFoundPage() {
  const locale = useLocale();
  const t = useTranslations("Error404");

  function goToHome() {
    redirect({
      href: "/",
      locale: locale,
    });
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center pb-10">
      <span className="text-[160px] leading-[1] font-bold text-secondary max-lg:text-9xl max-sm:text-6xl">
        404
      </span>

      <h2 className="pt-6 pb-2 text-xl font-light text-zinc-300 max-lg:pt-2 max-lg:text-lg max-sm:text-sm">
        {t("title")}
      </h2>
      <p className="pb-10 font-light text-zinc-400 max-w-[500px] text-center max-md:text-xs max-sm:max-w-[320px] max-sm:pb-6">
        {t("description")}
      </p>

      <ButtonComponent
        label={t("button")}
        handle={goToHome}
        className="px-10 max-sm:!px-6"
      />
    </div>
  );
}
