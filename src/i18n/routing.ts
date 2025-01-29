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
    "/privacy-policy": {
      en: "/privacy-policy",
      pt: "/politica-de-privacidade",
      es: "/politica-de-privacidad",
    },
    "/terms-and-conditions": {
      en: "/terms-and-conditions",
      pt: "/termos-e-condicoes",
      es: "/terminos-y-condiciones",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
