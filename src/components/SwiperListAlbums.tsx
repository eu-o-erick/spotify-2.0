"use client";

import { useRef } from "react";
import SwiperTypes from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdNavigateNext } from "react-icons/md";

export default function SwiperListAlbumsComponent({
  children,
  title,
}: {
  children: React.ReactNode[];
  title: string;
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
      <div className="flex justify-between mb-7 max-md:mb-4">
        <h2 className="text-2xl  max-md:text-xl">{title}</h2>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlerPrev}
            className="text-primary active:text-secondary transition-colors"
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
        spaceBetween={10}
        loop={true}
        breakpoints={{
          500: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          640: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          1064: {
            slidesPerView: 6,
            spaceBetween: 34,
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
