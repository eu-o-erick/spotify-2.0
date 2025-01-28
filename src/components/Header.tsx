"use client";

import Image from "next/image";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import DropDown, { DropDownItem } from "./DropDown";
import { LANGUAGES } from "@/lib/constants";

export default function Header() {
  const [language, setLanguage] = useState<DropDownItem>(LANGUAGES[0]);

  return (
    <header className="container py-4 flex justify-between">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" width={40} height={40} alt="logo" />
        <Image src="/name.png" width={120} height={50} alt="logo" />
      </div>

      <div className="flex items-end gap-6">
        <DropDown state={language} setState={setLanguage} options={LANGUAGES} />

        <BsSearch className="w-6 h-6" />
      </div>
    </header>
  );
}
