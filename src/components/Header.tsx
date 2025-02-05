"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import SwitchLanguages from "./Language";

export default function HeaderComponent() {
  return (
    <header className="container py-6 flex justify-between max-sm:py-4 max-sm:px-4">
      <Link className="flex items-center gap-2 max-md:gap-1" href={"/"}>
        <Image
          src="/logo.png"
          width={30}
          height={30}
          alt="logo"
          className="max-md:w-8 max-md:h-8"
        />
        <Image
          src="/name.png"
          width={100}
          height={30}
          alt="logo"
          className="max-md:w-24 max-md:h-8"
        />
      </Link>

      <div className="flex items-center gap-6 max-sm:gap-4">
        <SwitchLanguages />
      </div>
    </header>
  );
}
