"use client";

export default function ListAlbumsComponent({
  children,
}: {
  children: React.ReactNode[];
}) {
  return (
    <ul className="mb-16 max-md:mb-10 grid grid-cols-6 content-between gap-y-6 gap-x-[20px] max-lg:grid-cols-4 max-lg:gap-x-[10px] max-md:grid-cols-3 max-md:gap-x-[5px] max-[500px]:grid-cols-2 max-[500px]:gap-x-[10px]">
      {children}
    </ul>
  );
}
