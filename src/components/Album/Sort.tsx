"use client";

import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";
import React from "react";
import { LuPencilLine } from "react-icons/lu";

export default function SortTracksComponent({
  sortBy,
  setSortBy,
}: {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}) {
  const t = useTranslations("AlbumPage");

  return (
    <section className="container flex justify-end items-center gap-2 text-white max-sm:px-2">
      <button
        type="button"
        onClick={() => setSortBy("default")}
        className={cn(
          "px-4 py-2 bg-secondary rounded-full max-sm:py-1.5 max-sm:px-3 text-xs",
          {
            "bg-white text-main": sortBy === "default",
          }
        )}
      >
        {t("default")}
      </button>
      <button
        type="button"
        onClick={() => setSortBy("topRated")}
        className={cn(
          "px-4 py-2 bg-secondary rounded-full max-sm:py-1.5 max-sm:px-3 text-xs",
          {
            "bg-white text-main": sortBy === "topRated",
          }
        )}
      >
        {t("topRated")}
      </button>

      <div className="w-px h-6 bg-secondary mx-3 max-sm:mx-1" />

      <span
        className={cn(
          "px-4 py-2 flex items-center bg-secondary rounded-full max-sm:py-1.5 max-sm:px-2",
          {
            "bg-white text-main": sortBy === "custom",
          }
        )}
      >
        <LuPencilLine className="max-sm:w-3.5" />
      </span>
    </section>
  );
}
