"use client";

import EmptyCarouselComponent from "../EmptyCarousel";
import AlbumComponentSkeleton from "../Skeletons/AlbumItem";
import ArtistComponentSkeleton from "../Skeletons/ArtistItem";
import CarouselListComponentSkeleton from "../Skeletons/CarouselList";

export default function ListAlbumsComponent({
  children,
  isLoading,
  isArtistComponent,
}: {
  children: React.ReactNode[];
  isLoading: boolean;
  isArtistComponent?: boolean;
}) {
  if (isLoading) {
    return (
      <CarouselListComponentSkeleton>
        {isArtistComponent ? (
          <ArtistComponentSkeleton />
        ) : (
          <AlbumComponentSkeleton />
        )}
      </CarouselListComponentSkeleton>
    );
  }

  if (!children.length) {
    return (
      <EmptyCarouselComponent
        isArtistComponent={isArtistComponent}
        titleNotFound={"searchAlbums"}
      />
    );
  }

  return (
    <ul className="mb-16 max-md:mb-10 grid grid-cols-6 content-between gap-y-4 gap-x-1 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
      {children}
    </ul>
  );
}
