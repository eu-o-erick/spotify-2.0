"use client";

import React, { useRef, useState, useEffect } from "react";
import SwiperTypes from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdNavigateNext } from "react-icons/md";
import DropDownComponent from "../DropDown";
import EmptyCarouselComponent from "../EmptyCarousel";
import { cn } from "@/lib/cn";
import CarouselListComponentSkeleton from "../Skeletons/CarouselList";
import AlbumComponentSkeleton from "../Skeletons/AlbumItem";
import ArtistComponentSkeleton from "../Skeletons/ArtistItem";

export default function SwiperListComponent({
  children,
  title,
  isArtistComponent,
  titleNotFound,
  dropDownOptions,
  isLoading,
}: {
  children: React.ReactNode[];
  title: string;
  isArtistComponent?: boolean;
  titleNotFound: string;
  dropDownOptions?: {
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
    options: string[];
  };
  isLoading?: boolean;
}) {
  const swiperRef = useRef<null | SwiperTypes>(null);

  const [slidesPerView, setSlidesPerView] = useState(2);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(6);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(4);
      } else if (window.innerWidth >= 500) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(2);
      }
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  const isMoreThanSlidesPerView = children.length > slidesPerView;

  function handlerPrev() {
    swiperRef.current?.slidePrev();
  }

  function handlerNext() {
    swiperRef.current?.slideNext();
  }

  return (
    <section className="container mb-16 max-md:mb-10">
      <div className="flex justify-between items-end mb-7 max-md:mb-4 max-sm:px-2">
        <h2 className="text-2xl max-md:text-xl">{title}</h2>

        <div className="flex items-end gap-x-6 gap-y-2 max-sm:flex-col ">
          {dropDownOptions && (
            <DropDownComponent
              state={dropDownOptions.state}
              setState={dropDownOptions.setState}
              options={dropDownOptions.options}
            />
          )}

          <div
            className={cn("flex gap-2 pt-1", {
              "opacity-20 pointer-events-none": !isMoreThanSlidesPerView,
            })}
          >
            <button
              type="button"
              onClick={handlerPrev}
              className="text-primary active:text-secondary transition-colors"
              disabled={!isMoreThanSlidesPerView}
            >
              <MdNavigateNext className="w-8 h-8 rotate-180 max-md:w-5 max-md:h-5" />
            </button>

            <button
              type="button"
              onClick={handlerNext}
              className="text-primary active:text-secondary transition-colors"
              disabled={!isMoreThanSlidesPerView}
            >
              <MdNavigateNext className="w-8 h-8 max-md:w-5 max-md:h-5" />
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <CarouselListComponentSkeleton>
          {isArtistComponent ? (
            <ArtistComponentSkeleton />
          ) : (
            <AlbumComponentSkeleton />
          )}
        </CarouselListComponentSkeleton>
      ) : !children.length ? (
        <EmptyCarouselComponent
          isArtistComponent={isArtistComponent}
          titleNotFound={titleNotFound}
        />
      ) : (
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={2}
          spaceBetween={0}
          breakpoints={{
            500: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 4,
            },
          }}
        >
          {children.map((child, index) => (
            <SwiperSlide key={index}>{child}</SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
