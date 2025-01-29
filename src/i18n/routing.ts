import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "pt", "es"],

  defaultLocale: "en",
  pathnames: {
    "/": {
      en: "/",
      pt: "/",
      es: "/",
    },
    "/path": {
      en: "/test",
      pt: "/teste",
      es: "/testito",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
