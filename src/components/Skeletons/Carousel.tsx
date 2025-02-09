import CarouselListComponentSkeleton from "./CarouselList";

export default function CarouselComponentSkeleton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="animate-pulse mb-16 max-md:mb-10">
      <div className="flex justify-between items-center mb-7 max-md:mb-4 max-sm:px-2">
        <div className="w-56 h-7 bg-secondary rounded-md max-md:h-5 max-md:w-32" />

        <div className="flex gap-2">
          <div className="w-8 h-8 max-md:w-5 max-md:h-5 bg-secondary rounded-md" />
          <div className="w-8 h-8 max-md:w-5 max-md:h-5 bg-secondary rounded-md" />
        </div>
      </div>

      <CarouselListComponentSkeleton>{children}</CarouselListComponentSkeleton>
    </div>
  );
}
