import AlbumSkelotonComponent from "../Skeletons/AlbumItem";
import ArtistSkelotonComponent from "../Skeletons/ArtistItem";
import CarouselSkelotonComponent from "../Skeletons/Carousel";
import ListItemsSkelotonComponent from "../Skeletons/List";

export default function LoadingSearchComponent() {
  return (
    <div className="container mb-32">
      <div className="animate-pulse w-80 h-6 bg-secondary rounded-md mb-14 max-md:h-5 max-md:w-52 5 max-md:mb-10" />

      <CarouselSkelotonComponent>
        <ArtistSkelotonComponent />
      </CarouselSkelotonComponent>

      <div className="animate-pulse w-56 h-7 bg-secondary rounded-md max-md:h-6 max-md:w-32 mt-48 mb-10" />

      <ListItemsSkelotonComponent>
        <AlbumSkelotonComponent />
      </ListItemsSkelotonComponent>
    </div>
  );
}
