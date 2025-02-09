"use client";

export default function ListAlbumsComponent({
  children,
}: {
  children: React.ReactNode[];
}) {
  return (
    <ul className="mb-16 max-md:mb-10 grid grid-cols-6 content-between gap-y-4 gap-x-1 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
      {children}
    </ul>
  );
}
