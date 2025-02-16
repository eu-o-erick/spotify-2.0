import BgGradient from "../BgGradient";
import SpotifyButton from "../SpotifyButton";
import ImageLoader from "../ImageLoader";
import { TAlbum } from "@/types/TAlbum";
import { Fragment, useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function InfoAlbum({
  dataAlbum,
  isLoading,
}: {
  dataAlbum: TAlbum | null;
  isLoading: boolean;
}) {
  const t = useTranslations("AlbumPage");

  const [totalHours, setTotalHours] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);

  useEffect(() => {
    if (!dataAlbum) return;

    const totalMs = dataAlbum.tracks.items.reduce(
      (acc, track) => acc + track.duration_ms,
      0
    );

    const totalSec = Math.floor(totalMs / 1000);
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;

    setTotalHours(hours);
    setTotalMinutes(minutes);
    setTotalSeconds(seconds);
  }, [dataAlbum]);

  return (
    <section className="relative mb-20">
      <BgGradient />{" "}
      <div className="relative z-[2] container pt-24 pb-11 flex gap-6 max-lg:pt-16 max-sm:py-16 max-sm:flex-col max-sm:gap-4 max-sm:px-2">
        {isLoading && (
          <div className="relative animate-pulse w-full flex gap-6 max-sm:flex-col max-sm:gap-4">
            <div className="bg-secondary rounded-[4px] w-[300px] h-[300px] object-cover max-lg:w-56 max-lg:h-56" />

            <div className="flex flex-1 flex-col justify-end max-sm:py-0">
              <div className="bg-secondary rounded-[4px] h-9 w-56 max-lg:h-7 max-lg:w-44 max-sm:w-40 max-sm:mt-3 max-sm:mb-2" />

              <div className="flex flex-col gap-5 mt-3 max-lg:mt-2 max-lg:gap-3 max-sm:gap-3 max-sm:mt-3 max-sm:flex-col-reverse">
                <div className="h-5 w-64 bg-secondary max-lg:h-4 max-lg:w-48 max-sm:h-3.5" />

                <div className="h-6 w-40 bg-secondary max-lg:h-5 max-lg:w-36 max-sm:h-4" />
              </div>
            </div>
            <div className="flex items-end gap-1 absolute bottom-0 right-0 max-lg:bottom-auto max-lg:top-0">
              <div className="bg-secondary h-4 w-14 rounded-sm max-lg:h-3 max-lg:w-12 max-sm:w-11" />
              <div className="bg-secondary rounded-full h-5 w-20 max-lg:h-5 max-lg:w-16 max-sm:h-4 max-sm:w-14" />
            </div>
          </div>
        )}

        {!isLoading && dataAlbum && (
          <Fragment>
            <ImageLoader
              alt={`${dataAlbum.name} cover`}
              src={dataAlbum.images?.[0].url ?? "/no-image.webp"}
              className="rounded-[4px] w-[300px] h-[300px] object-cover max-lg:w-56 max-lg:h-56"
            />

            <div className="flex flex-1 flex-col justify-end">
              <h1 className="text-4xl max-lg:text-xl max-sm:text-2xl max-sm:pt-3 max-sm:pb-2">
                {dataAlbum.name}
              </h1>

              <div className="flex flex-col gap-5 mt-3 max-lg:mt-1 max-lg:gap-3 max-sm:gap-2 max-sm:flex-col-reverse">
                <p className="text-sm text-zinc-400 font-normal max-lg:text-xs">
                  <span className="capitalize text-zinc-300">
                    {dataAlbum.album_type}
                  </span>
                  <span className="mx-1.5">•</span>
                  <span>{dataAlbum.release_date?.split("-")[0]}</span>
                  <span className="mx-1.5">•</span>
                  <span>
                    {dataAlbum.total_tracks} {t("songs")}
                  </span>

                  {(totalHours > 0 || totalMinutes > 0 || totalSeconds > 0) && (
                    <>
                      <span>, </span>
                      <span>
                        {totalHours > 0 && (
                          <span>
                            {totalHours} {t("hr")}
                          </span>
                        )}
                        {totalMinutes > 0 && (
                          <span className="mx-1">
                            {totalMinutes} {t("min")}
                          </span>
                        )}
                        {totalSeconds > 0 && totalHours === 0 && (
                          <span>
                            {totalSeconds} {t("sec")}
                          </span>
                        )}
                      </span>
                    </>
                  )}
                </p>

                <ul className="flex max-lg:text-sm">
                  {dataAlbum.artists?.map((artist, i) => (
                    <Fragment key={i}>
                      <li
                        key={i}
                        className="text-zinc-300 md:hover:underline md:hover:text-zinc-200 max-md:active:text-zinc-200 max-md:active:underline"
                      >
                        <Link
                          href={{
                            pathname: "/artist",
                            query: { id: artist.id },
                          }}
                        >
                          {artist.name}
                        </Link>
                      </li>
                      {i < dataAlbum.artists.length - 1 && (
                        <span className="text-zinc-200 mx-3 max-lg:mx-1.5">
                          •
                        </span>
                      )}
                    </Fragment>
                  ))}
                </ul>
              </div>
            </div>

            <SpotifyButton
              url={dataAlbum.external_urls?.spotify}
              className="absolute bottom-11 max-lg:bottom-auto max-lg:top-16 right-0 max-sm:right-3"
            />
          </Fragment>
        )}
      </div>
    </section>
  );
}
