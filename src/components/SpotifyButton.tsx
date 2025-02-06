"use client";

import Image from "next/image";

export default function SpotifyButton({ url }: { url: string }) {
  return (
    <a href={url} className="flex items-end gap-1.5 group" target="_blank">
      <span className="text-xs opacity-60 group-hover:underline">
        Listen on
      </span>
      <Image
        src={"/spotify.webp"}
        width={80}
        height={20}
        className=""
        alt={`spotify logo`}
      />
    </a>
  );
}
