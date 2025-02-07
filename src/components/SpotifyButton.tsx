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
    <div className={cn("flex", className)}>
      <a href={url} className="flex items-end gap-1.5 group" target="_blank">
        <span className="text-xs opacity-60 group-hover:underline max-lg:">
          Listen on
        </span>
        <Image
          src={"/spotify.webp"}
          width={80}
          height={20}
          className="max-lg:h-5 max-lg:w-16"
          alt={`spotify logo`}
        />
      </a>
    </div>
  );
}
