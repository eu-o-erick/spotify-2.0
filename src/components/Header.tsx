"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import DropDown, { DropDownItem } from "./DropDown";
import { LANGUAGES } from "@/lib/constants";
import { Link, redirect, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function HeaderComponent() {
  const locale = useLocale();
  const pathname = usePathname();

  const [language, setLanguage] = useState<DropDownItem>(() => {
    const currentLanguage = LANGUAGES.find((lang) => lang.value === locale);
    return currentLanguage ?? LANGUAGES[0];
  });

  useEffect(() => {
    if (locale !== language.value) {
      redirect({ href: pathname, locale: language.value });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <header className="container py-6 flex justify-between max-sm:py-4 max-sm:px-4">
      <Link className="flex items-center gap-2 max-md:gap-1" href={"/"}>
        <Image
          src="/logo.png"
          width={30}
          height={30}
          alt="logo"
          className="max-md:w-6 max-md:h-6"
        />
        <Image
          src="/name.png"
          width={100}
          height={30}
          alt="logo"
          className="max-md:w-20 max-md:h-6"
        />
      </Link>

      <div className="flex items-end gap-6 max-sm:gap-4">
        <DropDown state={language} setState={setLanguage} options={LANGUAGES} />
        <BsSearch className="w-6 h-6 max-md:w-4 max-md:h-4" />
      </div>
    </header>
  );
}
