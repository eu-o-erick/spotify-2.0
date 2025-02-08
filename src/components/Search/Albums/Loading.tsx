import AlbumComponentSkeleton from "@/components/Skeletons/AlbumItem";
import ListItemsComponentSkeleton from "@/components/Skeletons/List";

export default function LoadingSearchAlbumComponent() {
  return (
    <div className="container mb-32 max-[500xp]:px-1.5">
      <div className="animate-pulse w-80 h-6 bg-secondary rounded-md mb-14 max-md:h-5 max-md:w-52 5 max-md:mb-10" />

      <ListItemsComponentSkeleton>
        <AlbumComponentSkeleton />
      </ListItemsComponentSkeleton>
    </div>
  );
}
