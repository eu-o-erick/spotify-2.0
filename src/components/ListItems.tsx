"use client";

export default function ListAlbumsComponent({
  children,
}: {
  children: React.ReactNode[];
}) {
  return (
    <ul className="mb-16 max-md:mb-10 grid grid-cols-6 content-between gap-[34px] max-lg:grid-cols-4 max-lg:gap-[10px] max-md:grid-cols-3 max-md:gap-[5px] max-[500px]:grid-cols-2 max-[500px]:gap-[10px]">
      {children}
    </ul>
  );
}
