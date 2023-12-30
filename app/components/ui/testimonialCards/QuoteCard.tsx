import { DefaultCard } from "@/types/TestimonialCard";
import React, { FC } from "react";
import RatingComponent from "./RatingComponent";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const QuoteCard: FC<DefaultCard> = ({ image, alt, text, name, rating }) => {
  return (
    <div className="flex flex-col items-center  relative p-6 pb-8 border rounded-lg">
      <div className="flex justify-end w-full">
        <RatingComponent rating={rating} />
      </div>
      <div className="absolute left-6 top-10 ">
        <Image src="/Icons/quote.svg" alt="quote" width={124} height={90} />
      </div>
      <p className="text-center mt-8 text-gray-800">{text}</p>
      <div className="h-px w-20 bg-gray-400 my-6"></div>
      <Avatar className="w-[70px] h-[70px] mb-3">
        <AvatarImage src={image} alt={alt} className="object-cover" />
        <AvatarFallback>AG</AvatarFallback>
      </Avatar>
      <p className="text-gray-500">{name}</p>
    </div>
  );
};

export default QuoteCard;
