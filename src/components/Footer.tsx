import { Link } from "@/i18n/routing";
import BgGradient from "./BgGradient";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SeparatorComponent from "./Separator";

export default function FooterComponent() {
  const t = useTranslations("FooterComponent");

  return (
    <footer className="relative pt-12 max-sm:pt-8">
      <BgGradient />
      <div className="relative container grid grid-cols-2 grid-rows-1 pb-6 max-sm:grid-cols-1 max-md:px-2">
        <div>
          <nav className="mb-6">
            <ul className="flex items-center gap-8 text-sm text-zinc-400 max-lg:gap-6 max-md:text-xs">
              <li className="font-semibold hover:text-zinc-300 hover:underline max-md:text-zinc-300">
                <Link href={"/"}>{t("nav.home")}</Link>
              </li>
              <li className="w-px h-5 bg-zinc-600" />
              <li className="font-semibold hover:text-zinc-300 hover:underline max-md:text-zinc-300">
                <Link href={"/search"}>{t("nav.search")}</Link>
              </li>
            </ul>
          </nav>

          <nav className="mb-16 max-sm:mb-14">
            <ul className="flex items-center gap-8 text-sm text-zinc-400 max-lg:gap-6 max-md:text-xs">
              <li className="font-semibold hover:text-zinc-300 hover:underline max-md:text-zinc-300">
                <Link href={"/terms-and-conditions"}>
                  {t("nav.termsAndConditions")}
                </Link>
              </li>
              <li className="w-px h-5 bg-zinc-600" />
              <li className="font-semibold hover:text-zinc-300 hover:underline max-md:text-zinc-300">
                <Link href={"/privacy-policy"}>{t("nav.privacyPolicy")}</Link>
              </li>
            </ul>
          </nav>

          <div className="flex justify-between items-end">
            <p className=" text-zinc-400 text-sm max-sm:text-xs">
              contact@damain.com
            </p>

            <div className="flex items-center gap-1 sm:hidden">
              <Image
                src="/logo.png"
                width={35}
                height={35}
                alt="logo"
                unoptimized
              />
              <Image
                src="/name.png"
                width={110}
                height={37}
                alt="logo"
                unoptimized
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
            unoptimized
          />
          <Image
            src="/name.png"
            width={120}
            height={40}
            alt="logo"
            unoptimized
          />
        </div>
      </div>
      <div className="container relative py-3 max-md:px-2">
        <SeparatorComponent className="absolute top-0 left-0 bg-primary" />
        <ul className="flex items-center gap-8 text-xs text-zinc-400 max-md:text-[10px] max-sm:gap-4">
          <li className="max-sm:w-[54px]">© 2025 Abcdefgz</li>
          <li className="w-px h-5 bg-zinc-600" />
          <li>{t("disclaimer")}</li>
        </ul>
      </div>
    </footer>
  );
}
