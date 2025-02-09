"use client";

import EmptyCarouselComponent from "@/components/EmptyCarousel";
import { useTranslations } from "next-intl";

export default function NoResultsSearchArtistsComponent({
  query,
}: {
  query: string;
}) {
  const t = useTranslations("SearchPage");

  return (
    <div className="container">
      <EmptyCarouselComponent
        isArtistComponent={true}
        titleNotFound={`${t("nothingFoundArtists")} ${decodeURIComponent(
          query
        )} ${t("tryAgain")}`}
      />
    </div>
  );
}
