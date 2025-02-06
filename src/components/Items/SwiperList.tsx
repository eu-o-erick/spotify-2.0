"use client";

import { useEffect, useRef, useState } from "react";
import SwiperTypes from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdNavigateNext } from "react-icons/md";

export default function SwiperListComponent({
  children,
  title,
}: {
  children: React.ReactNode[];
  title: string;
}) {
  const swiperRef = useRef<null | SwiperTypes>(null);
  const [isDisabled, setIsDisabled] = useState(true);

  function handlerPrev() {
    if (isDisabled) return;

    swiperRef.current?.slidePrev();
  }

  function handlerNext() {
    if (isDisabled) return;

    swiperRef.current?.slideNext();
  }

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const updateButtonState = () => {
      const slidesPerView =
        typeof swiper.params.slidesPerView === "number"
          ? swiper.params.slidesPerView
          : 1;

      setIsDisabled(children.length <= slidesPerView);
    };

    updateButtonState();
    swiper.on("resize", updateButtonState);

    return () => {
      swiper.off("resize", updateButtonState);
    };
  }, [children.length]);

  return (
    <section className="container mb-16 max-md:mb-10">
      <div className="flex justify-between mb-7 max-md:mb-4 max-[500px]:px-2">
        <h2 className="text-2xl max-md:text-xl">{title}</h2>

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
        spaceBetween={0}
        loop={true}
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
