import { Link } from "@/i18n/routing";
import BgGradient from "./BgGradient";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative pt-12 max-sm:pt-5">
      <BgGradient />
      <div className="relative container grid grid-cols-2 grid-rows-1 pb-6 max-sm:grid-cols-1">
        <div>
          <nav className="mb-6 max-sm:mb-4">
            <ul className="flex items-center gap-8 text-sm underline max-lg:gap-6 max-sm:text-xs">
              <li className="opacity-80 hover:opacity-100">
                <Link href={"/"}>HOME</Link>
              </li>
              <li className="w-px h-5 bg-secondary" />
              <li className="opacity-80 hover:opacity-100">
                <Link href={"/"}>SEARCH</Link>
              </li>
            </ul>
          </nav>

          <nav className="mb-16 max-sm:mb-14">
            <ul className="flex items-center gap-8 text-sm underline max-lg:gap-6 max-sm:text-xs">
              <li className="opacity-60 hover:opacity-80">
                <Link href={"/terms-and-conditions"}>Terms and Conditions</Link>
              </li>
              <li className="w-px h-5 bg-secondary" />
              <li className="opacity-60 hover:opacity-80">
                <Link href={"/privacy-policy"}>Privacy Policy</Link>
              </li>
            </ul>
          </nav>

          <div className="flex justify-between items-end">
            <p className="max-sm:text-xs">contact@damain.com</p>

            <div className="flex items-center gap-1 sm:hidden">
              <Image
                src="/logo.png"
                width={30}
                height={30}
                alt="logo"
                className=""
              />
              <Image
                src="/name.png"
                width={90}
                height={50}
                alt="logo"
                className=""
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end items-start gap-2 max-sm:hidden">
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="logo"
            className=""
          />
          <Image
            src="/name.png"
            width={120}
            height={60}
            alt="logo"
            className=""
          />
        </div>
      </div>
      <div className="relative bg-primary">
        <div className="container py-2">
          <ul className="flex items-center gap-8 text-xs max-sm:text-[10px] max-sm:gap-4">
            <li className="max-sm:w-[54px]">© 2025 TierTracks</li>
            <li className="w-px h-6 bg-white opacity-20" />
            <li>
              Data provided by Spotify. All rights belong to their respective
              owners.
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
