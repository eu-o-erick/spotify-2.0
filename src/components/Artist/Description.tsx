"use client";

import Image from "next/image";
import BgGradient from "../BgGradient";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import formatNumber from "@/lib/formatNumber";
import LinksArtist from "../LinksArtist";
import SpotifyButton from "../SpotifyButton";
import { TArtist } from "@/types/TArtist";

export default function DescriptionArtist({
  dataArtist,
}: {
  dataArtist: TArtist;
}) {
  return (
    <section className="relative mb-20">
      <BgGradient />

      <div className="relative z-[2] container pt-24 pb-11 flex gap-6">
        <Image
          src={
            dataArtist.visuals.avatarImage?.sources?.[0]?.url ??
            "/no-image.webp"
          }
          width={300}
          height={300}
          className="shadow-strong rounded-[4px]"
          alt={`${dataArtist.profile.name} image`}
        />

        <div className="flex-1 flex flex-col justify-between py-2">
          <div className="flex flex-col opacity-70">
            {dataArtist.profile.verified && (
              <p className="flex items-center gap-1">
                <RiVerifiedBadgeFill className="" />
                <span className="text-sm">Verified Artist</span>
              </p>
            )}

            <h1 className="mt-4 mb-1 text-4xl font-light">
              {dataArtist.profile.name}
            </h1>

            <p className="text-sm font-medium opacity-90">
              {formatNumber(dataArtist.stats.followers)} followers
            </p>
          </div>

          <SpotifyButton url={dataArtist.sharingInfo.shareUrl} />
        </div>

        <LinksArtist links={dataArtist.profile.externalLinks.items} />
      </div>
    </section>
  );
}
