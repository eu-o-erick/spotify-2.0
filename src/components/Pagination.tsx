"use client";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";
import { MdNavigateNext } from "react-icons/md";

export default function PaginationComponent({
  page,
  query,
  artistId,
  type,
  totalPages,
}: {
  page: string | null;
  query?: string | null;
  artistId?: string | null;
  type?: string | null;
  totalPages: number;
}) {
  const pathname = usePathname();
  const currentPage = parseInt(page ?? "1", 10);

  const range = 2;
  const totalButtons = 5;

  let startPage = Math.max(1, currentPage - range);
  const endPage = Math.min(startPage + totalButtons - 1, totalPages);

  if (endPage - startPage < totalButtons - 1) {
    startPage = Math.max(1, endPage - totalButtons + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const buildQuery = (pageNumber: number) => ({
    page: pageNumber.toString(),
    ...(type ? { type } : {}),
    ...(query ? { q: query } : {}),
    ...(artistId ? { artistId } : {}),
  });

  return (
    <nav className="container flex justify-center gap-4 max-sm:gap-3">
      <div className="w-40 flex justify-end max-sm:w-32">
        <div
          className={cn("", {
            "opacity-50 cursor-not-allowed": currentPage <= 1,
          })}
        >
          {currentPage <= 1 ? (
            <span className="h-8 p-1 pr-3 flex justify-center items-center gap-0.5 max-sm:h-7 max-sm:pr-1">
              <PrevButtonContent />
            </span>
          ) : (
            <Link
              className="h-8 p-1 pr-3 flex justify-center items-center gap-0.5 max-sm:h-7 max-sm:pr-1"
              href={{
                pathname,
                query: buildQuery(currentPage - 1),
              }}
            >
              <PrevButtonContent />
            </Link>
          )}
        </div>
      </div>

      <ul className="flex">
        {pages.map((i) => (
          <li
            className={cn("rounded-[4px] max-sm:rounded-sm", {
              "bg-secondary": i === Number(currentPage),
            })}
            key={i}
          >
            <Link
              className="flex justify-center items-center text-sm w-8 h-8 max-sm:text-xs max-sm:w-7 max-sm:h-7"
              href={{ pathname, query: buildQuery(i) }}
            >
              {i}
            </Link>
          </li>
        ))}
      </ul>

      <div className="w-40 flex justify-start max-sm:w-32">
        <div
          className={cn("", {
            "opacity-50 cursor-not-allowed": totalPages <= currentPage,
          })}
        >
          {totalPages <= currentPage ? (
            <span className="h-8 p-1 pl-3 flex justify-center items-center gap-0.5 max-sm:h-7 max-sm:pl-1">
              <NextButtonContent />
            </span>
          ) : (
            <Link
              className="h-8 p-1 pl-3 flex justify-center items-center gap-0.5 max-sm:h-7 max-sm:pl-1"
              href={{
                pathname,
                query: buildQuery(currentPage + 1),
              }}
            >
              <NextButtonContent />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

function PrevButtonContent() {
  const t = useTranslations("PaginationComponent");

  return (
    <>
      <MdNavigateNext className="w-6 h-6 rotate-180 max-sm:w-5 max-sm:h-5 text-primary" />
      <span className="text-sm max-sm:hidden uppercase">{t("prev")}</span>
    </>
  );
}

function NextButtonContent() {
  const t = useTranslations("PaginationComponent");

  return (
    <>
      <span className="text-sm max-sm:text-xs max-sm:hidden uppercase">
        {t("prev")}
      </span>
      <MdNavigateNext className="w-6 h-6 max-sm:w-5 max-sm:h-5 text-primary" />
    </>
  );
}
