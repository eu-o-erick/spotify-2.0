"use client";

import React, { useRef } from "react";
import SwiperTypes from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdNavigateNext } from "react-icons/md";
import DropDownComponent from "../DropDown";

export default function SwiperListComponent({
  children,
  title,
  dropDownOptions,
}: {
  children: React.ReactNode[];
  title: string;
  dropDownOptions?: {
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
    options: string[];
  };
}) {
  const swiperRef = useRef<null | SwiperTypes>(null);

  function handlerPrev() {
    swiperRef.current?.slidePrev();
  }

  function handlerNext() {
    swiperRef.current?.slideNext();
  }

  return (
    <section className="container mb-16 max-md:mb-10">
      <div className="flex justify-between mb-7 max-md:mb-4 max-[500px]:px-2">
        <h2 className="text-2xl max-md:text-xl">{title}</h2>

        <div className="flex gap-2">
          {dropDownOptions && (
            <DropDownComponent
              state={dropDownOptions.state}
              setState={dropDownOptions.setState}
              options={dropDownOptions.options}
            />
          )}

          <button
            type="button"
            onClick={handlerPrev}
            className="text-primary active:text-secondary transition-colors ml-8"
          >
            <MdNavigateNext className="w-8 h-8 rotate-180 max-md:w-5 max-md:h-5" />
          </button>

          <button
            type="button"
            onClick={handlerNext}
            className="text-primary active:text-secondary transition-colors"
          >
            <MdNavigateNext className="w-8 h-8 max-md:w-5 max-md:h-5" />
          </button>
        </div>
      </div>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={2}
        spaceBetween={0}
        breakpoints={{
          500: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}
      >
        {children.map((child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
