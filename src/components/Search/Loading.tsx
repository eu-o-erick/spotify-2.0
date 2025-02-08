import AlbumComponentSkeleton from "../Skeletons/AlbumItem";
import ArtistComponentSkeleton from "../Skeletons/ArtistItem";
import CarouselComponentSkeleton from "../Skeletons/Carousel";
import ListItemsComponentSkeleton from "../Skeletons/List";

export default function LoadingSearchComponent() {
  return (
    <div className="container mb-32 max-[500xp]:px-1.5">
      <div className="animate-pulse w-80 h-6 bg-secondary rounded-md mb-14 max-md:h-5 max-md:w-52 5 max-md:mb-10" />

      <CarouselComponentSkeleton>
        <ArtistComponentSkeleton />
      </CarouselComponentSkeleton>

      <div className="animate-pulse w-56 h-7 bg-secondary rounded-md max-md:h-6 max-md:w-32 mt-48 mb-10" />

      <ListItemsComponentSkeleton>
        <AlbumComponentSkeleton />
      </ListItemsComponentSkeleton>
    </div>
  );
}
