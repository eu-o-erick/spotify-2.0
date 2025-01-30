"use client";

import { BsSearch } from "react-icons/bs";
import BgGradient from "./BgGradient";
import ButtonComponent from "./Button";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { redirect } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

export default function SearchComponent() {
  const t = useTranslations("SearchComponent");

  const refInput = useRef<HTMLInputElement | null>(null);

  const [isError, setIsError] = useState(false);
  const locale = useLocale();

  function handleSearch() {
    const query = refInput.current?.value;

    if (!query || query.trim() === "" || query.trim().length < 3)
      return setIsError(true);

    redirect({
      href: {
        pathname: "/search",
        query: { q: encodeURIComponent(query) },
      },
      locale,
    });
  }

  return (
    <section className="relative pt-24 pb-14">
      <BgGradient />

      <div className="container relative">
        <div className="mx-auto text-center max-w-[540px] max-md:max-w-[460px]">
          <h1 className="text-4xl mb-6 mx-4 max-sm:text-2xl max-sm:mb-4">
            {t("title")}
          </h1>

          <p className="opacity-80 mx-4  max-sm:text-sm">{t("desc")}</p>

          <div className="flex gap-3 mt-10 max-sm:mt-8 max-sm:gap-4">
            <div className="relative w-full flex-1">
              <BsSearch className="absolute top-2/4 -translate-y-2/4 left-5 opacity-50 w-5 h-5 pointer-events-none max-sm:left-3 max-sm:w-4 max-sm:h-4" />

              <input
                ref={refInput}
                type="text"
                name="searchInput"
                id="searchInput"
                onChange={() => setIsError(false)}
                autoComplete="off"
                className={cn(
                  "w-full bg-secondary border border-primary p-2.5 text-[14px] pl-14 rounded-[4px] placeholder:opacity-50 focus:outline-none max-sm:rounded-sm max-sm:p-2 max-sm:pl-10",
                  {
                    "border-red-500": isError,
                  }
                )}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                placeholder={t("placeholder")}
              />
            </div>

            <ButtonComponent
              label={t("button")}
              handle={handleSearch}
              className={"max-sm:hidden"}
            />
          </div>

          <div className="mt-4 flex justify-between max-sm:mt-6">
            <p className="text-start text-sm font-extralight opacity-70 text-gray-300 max-sm:text-xs">
              {t.raw("categories").map((string: string, index: number) => (
                <span
                  key={index}
                  className={cn("", {
                    "text-white font-light": index % 2 === 1,
                  })}
                >
                  {string}{" "}
                </span>
              ))}
            </p>
            <ButtonComponent
              label={t("button")}
              handle={handleSearch}
              className={"sm:hidden"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
