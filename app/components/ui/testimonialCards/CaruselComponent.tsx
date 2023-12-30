"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import QuoteCard from "./QuoteCard";

export function CarouselComponent() {
  const data = [
    {
      image: "/avatar3.jpg",
      alt: "avatar",
      name: "Vince Doe",
      text: "The results were beyond my expectations – truly a game-changer for my business.",
      rating: 5,
    },
    {
      image: "/avatar1.jpg",
      alt: "avatar",
      name: "Ana Gray",
      text: "This product transformed my daily routine, making everything more efficient and enjoyable.",
      rating: 4,
    },
    {
      image: "/avatar2.jpg",
      alt: "avatar",
      name: "Monica Lee",
      text: "I've never experienced customer service as attentive and caring as this company's.",
      rating: 5,
    },
    {
      image: "/avatar3.jpg",
      alt: "avatar",
      name: "Vince Doe",
      text: "The results were beyond my expectations – truly a game-changer for my business.",
      rating: 5,
    },
    {
      image: "/avatar1.jpg",
      alt: "avatar",
      name: "Ana Gray",
      text: "This product transformed my daily routine, making everything more efficient and enjoyable.",
      rating: 4,
    },
    {
      image: "/avatar2.jpg",
      alt: "avatar",
      name: "Monica Lee",
      text: "I've never experienced customer service as attentive and caring as this company's.",
      rating: 5,
    },
  ];
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full "
    >
      <CarouselContent>
        {data.map((el, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 ">
            <div className="p-2">
              <QuoteCard
                image={el.image}
                alt={el.alt}
                name={el.name}
                text={el.text}
                rating={el.rating}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
