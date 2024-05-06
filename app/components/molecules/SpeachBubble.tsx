"use client";
import React, { useState, useRef, useEffect } from "react";
import { Swiper as SwiperComp, SwiperSlide } from "swiper/react";
import type { Swiper } from "swiper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Controller } from "swiper/modules";
import { data } from "@/app/data/exampleData";
import SpeachBubbleCard from "./SpeachBubbleCard";
import ArrowButton from "../atoms/ArrowButton";

export default function SpeachBubble() {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);
  const [swiperState, setSwiperState] = useState<Swiper | null>(null);
  const swiperRef = useRef<Swiper>();
  const [currSlide, setCurrSlide] = useState(0);

  useEffect(() => {
    if (swiperState?.controller && thumbsSwiper?.controller) {
      swiperState.controller.control = thumbsSwiper;
      thumbsSwiper.controller.control = swiperState;
    }
  }, [swiperState, thumbsSwiper]);

  return (
    <>
      <div className="flex items-center justify-center mb-10 gap-10">
        <ArrowButton
          onClick={() => swiperRef.current?.slidePrev()}
          orientation="previous"
          disabled={swiperRef.current?.activeIndex === 0}
        />
        <SpeachBubbleCard rating={data.map((el) => el.rating)[currSlide]}>
          <SwiperComp
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Controller, Navigation]}
            loop={false}
            spaceBetween={30}
            onSwiper={setSwiperState}
            onSlideChange={(swiper) => setCurrSlide(swiper.activeIndex)}
            className="main-slider"
            autoHeight={true}
          >
            {data.map((el, i) => (
              <SwiperSlide key={i}>{el.text}</SwiperSlide>
            ))}
          </SwiperComp>
        </SpeachBubbleCard>
        <ArrowButton
          onClick={() => swiperRef.current?.slideNext()}
          orientation="next"
          disabled={swiperState?.slides?.length! - 1 === currSlide}
        />
      </div>

      <SwiperComp
        modules={[Controller]}
        slideToClickedSlide={true}
        slidesPerView={3}
        centeredSlides={true}
        onSwiper={setThumbsSwiper}
        className="thumb-slider"
        spaceBetween={10}
      >
        {data.map((el, i) => (
          <SwiperSlide key={i} className="swiper-slide-auto">
            <Avatar className="w-full h-fit mb-3 ">
              <AvatarImage
                src={el.image}
                alt={el.alt}
                className="object-cover"
              />
              <AvatarFallback>AG</AvatarFallback>
            </Avatar>
            <p className="text-gray-500  text-center w-[200px] translate-x-[-58px]">
              {el.name}
            </p>
          </SwiperSlide>
        ))}
      </SwiperComp>
    </>
  );
}
