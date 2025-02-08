"use client";

import BgGradient from "../BgGradient";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import formatNumber from "@/lib/formatNumber";
import LinksArtist from "./LinksArtist";
import SpotifyButton from "../SpotifyButton";
import { TArtist } from "@/types/TArtist";
import ImageLoader from "../ImageLoader";

export default function DescriptionArtist({
  dataArtist,
}: {
  dataArtist: TArtist;
}) {
  return (
    <section className="relative mb-20">
      <BgGradient />

      <div className="relative z-[2] container pt-24 pb-11 flex gap-6 max-lg:pt-16 max-sm:px-3 max-sm:py-8 max-sm:flex-col max-sm:gap-4">
        <div className="flex justify-between items-start">
          <ImageLoader
            alt={`${dataArtist.profile.name} image`}
            src={
              dataArtist.visuals.avatarImage?.sources?.[0]?.url ??
              "/no-image.webp"
            }
            className="shadow-strong rounded-[4px] w-[300px] h-[300px] max-lg:w-48 max-lg:h-48 max-lg:rounded-sm"
          />

          <SpotifyButton
            url={dataArtist.sharingInfo.shareUrl}
            className="sm:hidden"
          />
        </div>

        <div className="flex flex-1 max-sm:items-end">
          <div className="flex-1 flex flex-col justify-between py-2 max-sm:py-0">
            <div className="flex flex-col">
              {dataArtist.profile.verified && (
                <p className="flex items-center gap-1 opacity-70">
                  <RiVerifiedBadgeFill className="max-lg:w-3.5" />
                  <span className="text-sm max-lg:text-xs">
                    Verified Artist
                  </span>
                </p>
              )}

              <h1 className="mt-4 mb-2 text-4xl font-light max-lg:mt-2 max-lg:text-2xl max-sm:mt-6">
                {dataArtist.profile.name}
              </h1>

              <p className="text-sm font-medium opacity-80 max-lg:text-xs max-lg:font-normal">
                {formatNumber(dataArtist.stats.followers)} followers
              </p>
            </div>

            <SpotifyButton
              url={dataArtist.sharingInfo.shareUrl}
              className="max-sm:hidden"
            />
          </div>

          <LinksArtist links={dataArtist.profile.externalLinks.items} />
        </div>
      </div>
    </section>
  );
}
