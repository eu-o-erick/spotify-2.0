import AlbumSkelotonComponent from "./AlbumItem";
import ArtistSkelotonComponent from "./ArtistItem";
import CarouselSkelotonComponent from "./Carousel";

export default function ArtistContentSkeleton() {
  return (
    <section className="container">
      <CarouselSkelotonComponent>
        <AlbumSkelotonComponent />
      </CarouselSkelotonComponent>

      <div className="container -mt-6 pb-24 flex flex-col items-end max-sm:-mt-8 max-sm:pb-20">
        <span className="bg-secondary animate-pulse rounded-sm w-40 h-5 max-sm:h-4 max-sm:w-36" />
      </div>

      <CarouselSkelotonComponent>
        <ArtistSkelotonComponent />
      </CarouselSkelotonComponent>
    </section>
  );
}
