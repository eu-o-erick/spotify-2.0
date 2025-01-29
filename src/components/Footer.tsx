import { Link } from "@/i18n/routing";
import BgGradient from "./BgGradient";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative pt-12">
      <BgGradient />
      <div className="relative container grid grid-cols-2 grid-rows-1 pb-6">
        <div>
          <nav className="mb-6">
            <ul className="flex items-center gap-8 text-sm underline">
              <li className="opacity-80 hover:opacity-100">
                <Link href={"/"}>HOME</Link>
              </li>
              <li className="w-px h-5 bg-secondary" />
              <li className="opacity-80 hover:opacity-100">
                <Link href={"/"}>SEARCH</Link>
              </li>
            </ul>
          </nav>

          <nav className="mb-16">
            <ul className="flex items-center gap-8 text-sm underline">
              <li className="opacity-60 hover:opacity-80">
                <Link href={"/terms-and-conditions"}>Terms and Conditions</Link>
              </li>
              <li className="w-px h-5 bg-secondary" />
              <li className="opacity-60 hover:opacity-80">
                <Link href={"/privacy-policy"}>Privacy Policy</Link>
              </li>
            </ul>
          </nav>

          <p>contact@damain.com</p>
        </div>
        <div className="flex justify-end items-start gap-2">
          <Image
            src="/logo.png"
            width={50}
            height={50}
            alt="logo"
            className=""
          />
          <Image
            src="/name.png"
            width={150}
            height={80}
            alt="logo"
            className=""
          />
        </div>
      </div>
      <div className="relative bg-primary">
        <div className="container py-2">
          <ul className="flex items-center gap-8 text-xs">
            <li className="">© 2025 TierTracks</li>
            <li className="w-px h-4 bg-white opacity-20" />
            <li className="">
              Data provided by Spotify. All rights belong to their respective
              owners.
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
