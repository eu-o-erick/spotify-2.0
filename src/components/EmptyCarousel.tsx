"use client";

import React from "react";
import CarouselListComponentSkeleton from "./Skeletons/CarouselList";
import ArtistComponentSkeleton from "./Skeletons/ArtistItem";
import AlbumComponentSkeleton from "./Skeletons/AlbumItem";
import { useTranslations } from "next-intl";

export default function EmptyCarouselComponent({
  titleNotFound,
  isArtistComponent,
}: {
  titleNotFound: string;
  isArtistComponent?: boolean;
}) {
  const t = useTranslations("EmptyCarousel");

  return (
    <div className="relative w-full">
      <CarouselListComponentSkeleton className="opacity-10">
        {isArtistComponent ? (
          <ArtistComponentSkeleton />
        ) : (
          <AlbumComponentSkeleton />
        )}
      </CarouselListComponentSkeleton>
      <p
        className="
          absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 transform z-10
          min-w-72 text-xl bg-main px-6 py-4 text-center rounded-[4px] shadow-md text-zinc-600
          max-lg:text-base max-sm:text-sm max-sm:!p-4
        "
      >
        {t(titleNotFound)}{" "}
      </p>
    </div>
  );
}
