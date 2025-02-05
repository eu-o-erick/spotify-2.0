import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "fr", "es", "pt"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/privacy-policy": {
      en: "/privacy-policy",
      pt: "/politica-de-privacidade",
      es: "/politica-de-privacidad",
      fr: "/politique-de-confidentialite",
    },
    "/terms-and-conditions": {
      en: "/terms-and-conditions",
      pt: "/termos-e-condicoes",
      es: "/terminos-y-condiciones",
      fr: "/conditions-generales",
    },
    "/search": {
      en: "/search",
      pt: "/pesquisar",
      es: "/buscar",
      fr: "/recherche",
    },
    "/search/artists": {
      en: "/search/artists",
      pt: "/pesquisar/artistas",
      es: "/buscar/artistas",
      fr: "/recherche/artistes",
    },
    "/search/albums": {
      en: "/search/albums",
      pt: "/pesquisar/albuns",
      es: "/buscar/albumes",
      fr: "/recherche/albums",
    },
    "/album": "/album",
    "/artist": {
      en: "/artist",
      pt: "/artista",
      es: "/artista",
      fr: "/artiste",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
