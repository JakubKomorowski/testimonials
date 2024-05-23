"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import QuoteCard from "../../molecules/WidgetTemplates/QuoteCard";
import { Testimonial } from "@/types/Testimonial";
import { classNames } from "@/lib/utils";

interface Props {
  data?: Testimonial[];
  preview?: boolean;
}
export function CarouselComponent({ data, preview }: Props) {
  const basis =
    data && !preview
      ? data?.length === 2
        ? "basis-5/6 md:basis-1/2"
        : data?.length === 1
        ? "basis-5/6"
        : "basis-5/6 md:basis-1/2 lg:basis-1/3"
      : data?.length === 2
      ? "basis-5/6 md:basis-1/2"
      : data?.length === 1
      ? "basis-5/6"
      : "basis-5/6 xl:basis-1/2 2xl:basis-1/3 ";

  const caruselContentClass = preview ? "max-w-[400px] xl:max-w-full" : "";
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full "
    >
      <CarouselContent className={classNames(caruselContentClass)}>
        {data?.map((el, index) => (
          <CarouselItem
            key={index}
            // className="basis-5/6 md:basis-1/2 lg:basis-1/3 "
            className={classNames(basis ? basis : "basis-5/6 md:basis-1/2")}
          >
            <div className="p-2">
              <QuoteCard
                image={el?.photo?.downloadUrl}
                alt={el?.photo?.name}
                name={el?.name}
                text={el?.testimonial}
                rating={el?.rating}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}
