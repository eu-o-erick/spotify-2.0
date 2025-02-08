"use client";
import { useEffect, useState } from "react";

export default function CarouselComponentSkeleton({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [itemsToShow, setItemsToShow] = useState(
    getItemsToShowByWidth(getWindowWidth())
  );

  function getWindowWidth() {
    try {
      if (isClient) {
        return window.innerWidth;
      } else {
        return 1920;
      }
    } catch {
      return 0;
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(getItemsToShowByWidth(getWindowWidth()));
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="animate-pulse mb-16 max-md:mb-10">
      <div className="flex justify-between items-center mb-7 max-md:mb-4 max-[500px]:px-2">
        <div className="w-56 h-7 bg-secondary rounded-md max-md:h-5 max-md:w-32" />

        <div className="flex gap-2">
          <div className="w-8 h-8 max-md:w-5 max-md:h-5 bg-secondary rounded-md" />
          <div className="w-8 h-8 max-md:w-5 max-md:h-5 bg-secondary rounded-md" />
        </div>
      </div>

      <ul
        className={`grid grid-cols-6 gap-[20px] max-lg:gap-2.5 max-lg:grid-cols-4 max-md:gap-[5px] max-md:grid-cols-3 max-[500px]:gap-2.5 max-[500px]:grid-cols-2`}
      >
        {new Array(itemsToShow).fill(0).map((_, i) => (
          <li className="px-1.5" key={i}>
            {children}
          </li>
        ))}
      </ul>
    </div>
  );
}

const getItemsToShowByWidth = (width: number) => {
  if (width >= 1024) {
    return 6;
  } else if (width >= 768) {
    return 4;
  } else if (width >= 500) {
    return 3;
  } else {
    return 2;
  }
};
