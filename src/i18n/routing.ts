import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "pt", "es"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
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
    "/search": {
      en: "/search",
      pt: "/pesquisar",
      es: "/buscar",
    },
    "/search/artists": {
      en: "/search/artists",
      pt: "/pesquisar/artistas",
      es: "/buscar/artistas",
    },
    "/search/albums": {
      en: "/search/albums",
      pt: "/pesquisar/albuns",
      es: "/buscar/albumes",
    },
    "/album": "/album",
    "/artist": {
      en: "/artist",
      pt: "/artista",
      es: "/artista",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
