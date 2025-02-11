"use client";

import { cn } from "@/lib/cn";
import Image from "next/image";

export default function SpotifyButton({
  url,
  className,
}: {
  url: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end", className)}>
      <a href={url} className="flex items-end gap-1.5 group" target="_blank">
        <span className="text-xs leading-1 opacity-60 md:group-hover:underline max-sm:text-[10px] max-sm:-mb-0.5">
          Listen on
        </span>
        <Image
          src={"/spotify.webp"}
          width={80}
          height={20}
          className="max-lg:h-5 max-lg:w-16 max-sm:h-[18px] max-sm:w-14"
          alt={`spotify logo`}
        />
      </a>
    </div>
  );
}
