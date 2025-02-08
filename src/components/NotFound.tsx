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
  const t = useTranslations("error404");

  function goToHome() {
    redirect({
      href: "/",
      locale: locale,
    });
  }

  return (
    <div className="flex flex-col items-center py-20">
      <span className="text-[200px] leading-[200px] font-bold text-secondary">
        404
      </span>

      <h2 className="pt-6 pb-2 text-3xl font-light text-zinc-300">
        {title ?? t("title")}
      </h2>
      <p className="pb-10 font-light text-zinc-400 max-w-[500px] text-center">
        {description ?? t("description")}
      </p>

      <ButtonComponent
        label={t("button")}
        handle={goToHome}
        className="text-lg px-10"
      />
    </div>
  );
}
