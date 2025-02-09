export default function AlbumComponentSkeleton() {
  return (
    <div className="px-3 pt-3 pb-5">
      <div className="w-full aspect-square bg-secondary rounded-[4px]" />

      <div className="w-4/5 h-5 bg-secondary rounded-md mt-3 mb-2 max-md:h-4" />
      <div className="w-3/5 h-4 bg-secondary rounded-md max-md:h-4" />
    </div>
  );
}
