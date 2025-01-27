"use client";

import Image from "next/image";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import DropDown, { DropDownItem } from "./DropDown";
import LANGUAGES from "@/constants/languages";

export default function Header() {
  const [language, setLanguage] = useState<DropDownItem>(LANGUAGES[0]);

  return (
    <header className="container py-4 flex justify-between">
      <Image src="/logo.png" width={50} height={50} alt="logo" className="" />

      <div className="flex items-end gap-4">
        <DropDown state={language} setState={setLanguage} options={LANGUAGES} />

        <BsSearch className="w-6 h-6" />
      </div>
    </header>
  );
}
