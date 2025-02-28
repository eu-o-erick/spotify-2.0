import React from "react";

export default function CreditsDownloadAlbumComponent({
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
    <div className="container py-14 px-20">
      {copyrights?.map((copyright, i) => (
        <p key={i} className="text-xs text-zinc-500 font-semibold">
          {copyright.text}
        </p>
      ))}
    </div>
  );
}
