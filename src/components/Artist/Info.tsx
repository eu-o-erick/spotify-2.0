import BgGradient from "../BgGradient";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import formatNumber from "@/lib/formatNumber";
import LinksArtist from "./LinksArtist";
import SpotifyButton from "../SpotifyButton";
import { TArtist } from "@/types/TArtist";
import ImageLoader from "../ImageLoader";

export default function InfoArtist({
  dataArtist,
  isLoading,
}: {
  dataArtist: TArtist | null;
  isLoading: boolean;
}) {
  return (
    <section className="relative mb-20 max-md:px-2">
      <BgGradient />{" "}
      <div className="relative z-[2] container pt-24 pb-11 flex gap-6 max-lg:pt-16 max-sm:py-8 max-sm:flex-col max-sm:gap-4">
        {isLoading && (
          <>
            <div className="flex justify-between items-start animate-pulse">
              <div className="bg-secondary rounded-[4px] w-[300px] h-[300px] max-lg:w-56 max-lg:h-56 max-lg:rounded-sm" />

              <div className="flex items-end gap-1.5 sm:hidden">
                <span className="bg-secondary h-3 w-11 rounded-sm" />
                <span className="bg-secondary w-14 h-5 rounded-full" />
              </div>
            </div>

            <div className="flex flex-1 max-sm:items-end animate-pulse">
              <div className="flex-1 flex flex-col justify-between py-2 max-sm:py-0">
                <div className="flex flex-col">
                  <p className="flex items-center gap-1 opacity-70">
                    <span className="bg-secondary w-5 h-5 rounded-full max-lg:w-4 max-lg:h-4" />
                    <span className="bg-secondary w-36 h-4 rounded-sm max-sm:w-28" />
                  </p>

                  <span className="bg-secondary h-8 w-64 rounded-sm mt-6 mb-4 max-lg:mt-2 max-sm:h-6 max-sm:w-44 max-sm:mt-7 max-sm:mb-3" />

                  <span className="bg-secondary h-5 w-40 rounded-sm" />
                </div>

                <div className="flex items-end gap-1 max-sm:hidden">
                  <span className="bg-secondary h-4 w-14 rounded-sm max-lg:h-3 max-lg:w-11" />
                  <span className="bg-secondary w-20 h-6 max-lg:h-5 max-lg:w-16 rounded-full" />
                </div>
              </div>

              <ul className="flex items-start gap-3 max-sm:gap-2">
                <li className="bg-secondary w-5 h-5 rounded-sm max-sm:w-4 max-lg:h-4" />
                <li className="bg-secondary w-5 h-5 rounded-sm max-sm:w-4 max-lg:h-4" />
                <li className="bg-secondary w-5 h-5 rounded-sm max-sm:w-4 max-lg:h-4" />
              </ul>
            </div>
          </>
        )}
        {!isLoading && dataArtist && (
          <>
            <div className="flex justify-between items-start">
              <ImageLoader
                alt={`${dataArtist.profile.name} image`}
                src={
                  dataArtist.visuals.avatarImage?.sources?.[0]?.url ??
                  "/no-image.webp"
                }
                className="rounded-[4px] w-[300px] h-[300px] object-cover max-lg:w-56 max-lg:h-56"
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

                  <h1 className="mt-4 mb-2 text-4xl max-lg:mt-2 max-lg:text-2xl max-sm:mt-6">
                    {dataArtist.profile.name}
                  </h1>

                  <p className="text-sm font-medium opacity-80 max-lg:font-normal">
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
          </>
        )}
      </div>
    </section>
  );
}
