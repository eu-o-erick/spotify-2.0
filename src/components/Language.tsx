"use client";

import { useEffect, useState } from "react";
import { LANGUAGES } from "@/lib/constants";
import { redirect, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { cn } from "@/lib/cn";
import { useSearchParams } from "next/navigation";
import useClickOutside from "@/hooks/useClickOutside";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import SeparatorComponent from "./Separator";

type DropDownItem = {
  value: string;
  label: string;
};

export default function SwitchLanguages() {
  const locale = useLocale();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen, dropdownRef] = useClickOutside<HTMLDivElement>();

  const [language, setLanguage] = useState<DropDownItem>(() => {
    const currentLanguage = LANGUAGES.find((lang) => lang.value === locale);
    return currentLanguage ?? LANGUAGES[0];
  });

  const queryObject = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    if (locale !== language.value) {
      redirect({
        href: { pathname, query: queryObject },
        locale: language.value,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={cn(
          "flex justify-between items-center gap-4 py-3 px-5 max-sm:px-3",
          {
            "bg-secondary": isOpen,
          }
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-center items-center gap-2">
          <Image
            className="max-sm:w-4"
            src={`/flags/${language.value}.png`}
            width={20}
            height={20}
            alt={`${language.label} flag`}
          />

          <span className="text-sm max-sm:text-xs">{language.label}</span>
        </div>

        <IoIosArrowDown
          className={cn("w-4 h-4 transition-all", {
            "rotate-180": isOpen,
          })}
        />
      </button>
      <nav
        className={cn(
          "absolute right-0 top-full z-10 bg-secondary shadow-sm w-full transition-all min-w-28",
          {
            "opacity-0 pointer-events-none": !isOpen,
          }
        )}
      >
        <SeparatorComponent className="bg-primary" />

        <ul className="flex flex-col py-1 gap-1 max-sm:gap-0">
          {LANGUAGES.map((option, i) => (
            <li key={i} className="text-sm max-sm:text-xs">
              {option.value !== language.value && (
                <button
                  type="button"
                  onClick={() => setLanguage(option)}
                  className="flex items-center w-full py-2 px-5 gap-2 hover:bg-primary max-sm:px-3"
                >
                  <div className="w-5 h-5 max-sm:w-4 max-sm:h-4 flex items-center">
                    <Image
                      src={`/flags/${option.value}.png`}
                      width={20}
                      height={20}
                      alt={`${option.label} flag`}
                    />
                  </div>
                  <span>{option.label}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
