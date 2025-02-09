export default function ListItemsComponentSkeleton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="animate-pulse mb-16 max-md:mb-10">
      <ul
        className={`grid grid-cols-6 gap-y-4 gap-x-[20px] max-lg:gap-x-2.5 max-lg:grid-cols-4 max-md:gap-x-[5px] max-md:grid-cols-3 max-xs:gap-x-0  max-xs:grid-cols-2`}
      >
        {new Array(12).fill(0).map((_, i) => (
          <li className="px-1.5" key={i}>
            {children}
          </li>
        ))}
      </ul>
    </div>
  );
}
