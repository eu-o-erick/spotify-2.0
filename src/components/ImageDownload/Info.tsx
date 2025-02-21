import { Fragment, useEffect, useState } from "react";
import { TAlbum } from "@/types/TAlbum";
import { useTranslations } from "next-intl";
import BgGradient from "../BgGradient";
import Image from "next/image";

export default function InfoImageDownload({
  dataAlbum,
}: {
  dataAlbum: TAlbum;
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
    <div className="relative">
      <BgGradient />
      <div className="relative z-10 flex items-end gap-6 px-20 py-10">
        <Image
          width={256}
          height={256}
          alt={`${dataAlbum.name} cover`}
          src={dataAlbum.images?.[0].url ?? "/no-image.webp"}
          className="rounded-[4px] object-cover"
          unoptimized
          crossOrigin="anonymous"
        />
        <div>
          <p className="capitalize text-zinc-400 font-semibold text-sm leading-tight">
            {dataAlbum.album_type}
          </p>

          <h1 className="text-5xl leading-tight">{dataAlbum.name}</h1>

          <div className="flex items-center">
            <ul className="flex text-sm">
              {dataAlbum.artists?.map((artist, i) => (
                <Fragment key={i}>
                  <li key={i} className="text-zinc-300">
                    {artist.name}
                  </li>
                  {i < dataAlbum.artists.length - 1 && (
                    <span className="text-zinc-200 mx-3">•</span>
                  )}
                </Fragment>
              ))}
            </ul>

            <p className="text-sm text-zinc-400 font-normal">
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
          </div>
        </div>
      </div>
    </div>
  );
}
