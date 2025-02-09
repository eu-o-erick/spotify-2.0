import { Link } from "@/i18n/routing";
import BgGradient from "./BgGradient";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function FooterComponent() {
  const t = useTranslations("FooterComponent");

  return (
    <footer className="relative pt-12 max-sm:pt-8">
      <BgGradient />
      <div className="relative container grid grid-cols-2 grid-rows-1 pb-6 max-sm:grid-cols-1 max-sm:px-1.5">
        <div>
          <nav className="mb-6">
            <ul className="flex items-center gap-8 text-sm underline max-lg:gap-6 max-sm:text-xs">
              <li className="opacity-80 hover:opacity-100">
                <Link href={"/"}>{t("nav.home")}</Link>
              </li>
              <li className="w-px h-5 bg-secondary" />
              <li className="opacity-80 hover:opacity-100">
                <Link href={"/search"}>{t("nav.search")}</Link>
              </li>
            </ul>
          </nav>

          <nav className="mb-16 max-sm:mb-14">
            <ul className="flex items-center gap-8 text-sm underline max-lg:gap-6 max-sm:text-xs">
              <li className="opacity-60 hover:opacity-80">
                <Link href={"/terms-and-conditions"}>
                  {t("nav.termsAndConditions")}
                </Link>
              </li>
              <li className="w-px h-5 bg-secondary" />
              <li className="opacity-60 hover:opacity-80">
                <Link href={"/privacy-policy"}>{t("nav.privacyPolicy")}</Link>
              </li>
            </ul>
          </nav>

          <div className="flex justify-between items-end">
            <p className="max-sm:text-sm">contact@damain.com</p>

            <div className="flex items-center gap-1 sm:hidden">
              <Image src="/logo.png" width={35} height={35} alt="logo" />
              <Image src="/name.png" width={110} height={37} alt="logo" />
            </div>
          </div>
        </div>
        <div className="flex justify-end items-start gap-2 max-sm:hidden">
          <Image src="/logo.png" width={40} height={40} alt="logo" />
          <Image src="/name.png" width={120} height={40} alt="logo" />
        </div>
      </div>
      <div className="relative bg-primary">
        <div className="container py-2 max-sm:px-1.5">
          <ul className="flex items-center gap-8 text-xs max-sm:text-[10px] max-sm:gap-4">
            <li className="max-sm:w-[54px]">© 2025 Abcdefgz</li>
            <li className="w-px h-6 bg-white opacity-20" />
            <li>{t("disclaimer")}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
