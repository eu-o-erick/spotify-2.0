import React from "react";

export default function CreditsAlbumComponent({
  copyrights,
}: {
  copyrights:
    | {
        text: string;
        type: string;
      }[]
    | undefined;
}) {
  return (
    <div className="container mb-24 max-sm:px-2 max-lg:mb-16 max-sm:mb-10">
      {copyrights?.map((copyright, i) => (
        <p key={i} className="text-xs text-zinc-500 font-semibold">
          {copyright.text}
        </p>
      ))}
    </div>
  );
}
