"use client";
import React, { useState, useRef, useEffect } from "react";
import { Swiper as SwiperComp, SwiperSlide } from "swiper/react";
import type { Swiper } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Controller } from "swiper/modules";
// import { data } from "@/app/data/exampleData";
import SpeachBubbleCard from "../../molecules/WidgetTemplates/SpeachBubbleCard";
import ArrowButton from "../../atoms/ArrowButton";
import { Testimonial } from "@/types/Testimonial";
import { firstTwoLetters } from "@/lib/utils";
import { Avatar } from "@nextui-org/react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  data?: Testimonial[];
  preview?: boolean;
}
export default function SpeachBubble({ data, preview }: Props) {
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
          preview={preview}
        />
        <SpeachBubbleCard
          rating={data?.map((el) => el.rating)[currSlide]}
          preview={preview}
        >
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
            {data?.map((el, i) => (
              <SwiperSlide key={i}>
                <p className="font-semibold">{el.title}</p>
                <p>{el.testimonial}</p>
              </SwiperSlide>
            ))}
          </SwiperComp>
        </SpeachBubbleCard>
        <ArrowButton
          onClick={() => swiperRef.current?.slideNext()}
          orientation="next"
          disabled={swiperState?.slides?.length! - 1 === currSlide}
          preview={preview}
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
        {data?.map((el, i) => (
          <SwiperSlide key={i} className="swiper-slide-auto">
            {/* <Avatar className="w-full h-full mb-3 ">
              <AvatarImage
                src={el?.photo?.downloadUrl}
                alt={el.photo?.name}
                className="object-cover "
              />
              <AvatarFallback className="h-full">
                {firstTwoLetters(el.name)}
              </AvatarFallback>
            </Avatar> */}
            <Avatar
              src={el?.photo?.downloadUrl}
              // className=" w-full h-full mb-3 bg-transparent"
              classNames={{
                base: "w-full h-full mb-3 bg-transparent",
                icon: "bg-gray-300",
              }}
            />
            <p className="text-gray-500  text-center w-[200px] translate-x-[-58px]">
              {el.name}
            </p>
          </SwiperSlide>
        ))}
      </SwiperComp>
    </>
  );
}
