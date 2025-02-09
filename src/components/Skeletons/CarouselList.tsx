"use client";
import { cn } from "@/lib/cn";

export default function CarouselListComponentSkeleton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div>
      <ul className={cn(`grid grid-cols-6 gap-0 max-lg:hidden`, className)}>
        {new Array(6).fill(0).map((_, i) => (
          <li key={i}>{children}</li>
        ))}
      </ul>
      <ul className={cn(`grid grid-cols-4 lg:hidden max-md:hidden`, className)}>
        {new Array(4).fill(0).map((_, i) => (
          <li key={i}>{children}</li>
        ))}
      </ul>
      <ul className={cn(`grid grid-cols-3 md:hidden max-sm:hidden`, className)}>
        {new Array(3).fill(0).map((_, i) => (
          <li key={i}>{children}</li>
        ))}
      </ul>
      <ul className={cn(`hidden grid-cols-2 max-sm:grid`, className)}>
        {new Array(2).fill(0).map((_, i) => (
          <li key={i}>{children}</li>
        ))}
      </ul>
    </div>
  );
}
