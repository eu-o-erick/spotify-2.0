"use client";

import { useLocale, useTranslations } from "next-intl";
import ButtonComponent from "./Button";
import { redirect } from "@/i18n/routing";

export default function NotFoundComponent({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  const locale = useLocale();
  const t = useTranslations("Error404");

  function goToHome() {
    redirect({
      href: "/",
      locale: locale,
    });
  }

  return (
    <div className="flex flex-col items-center py-20">
      <span className="text-[200px] leading-[1] font-bold text-secondary max-lg:text-9xl max-sm:text-7xl">
        404
      </span>

      <h2 className="pt-6 pb-2 text-3xl font-light text-zinc-300 max-lg:pt-2 max-lg:text-lg">
        {title ?? t("title")}
      </h2>
      <p className="pb-10 font-light text-zinc-400 max-w-[500px] text-center max-md:text-xs max-sm:max-w-[320px] max-sm:pb-6">
        {description ?? t("description")}
      </p>

      <ButtonComponent
        label={t("button")}
        handle={goToHome}
        className="text-lg px-10 max-sm:!px-6"
      />
    </div>
  );
}
