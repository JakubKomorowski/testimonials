import { DefaultCard } from "@/types/TestimonialCard";
import React, { FC } from "react";
import RatingComponent from "../../atoms/RatingComponent";
import QuoteIcon from "../../atoms/QuoteIcon";
import { cn, firstTwoLetters } from "@/lib/utils";
import { Avatar } from "@nextui-org/react";

const QuoteCard: FC<DefaultCard> = ({ image, alt, text, name, rating }) => {
  const withRatingClass = rating ? "mt-8" : "mt-4";
  return (
    <div className="flex flex-col items-center  relative p-6 pb-8 border rounded-lg min-w-[200px] max-w-[700px]">
      {rating !== 0 && (
        <div className="flex justify-end w-full">
          <RatingComponent rating={rating} size={25} readonly={true} />
        </div>
      )}
      <div className="absolute left-6 top-10 ">
        <QuoteIcon className="text-blue-800 w-32 h-24" opacity={0.05} />
      </div>
      <p className={cn("text-center text-gray-800", withRatingClass)}>{text}</p>
      <div className="h-px w-20 bg-gray-400 my-6"></div>
      <Avatar
        src={image}
        className=" object-contain shrink-0 w-[70px] h-[70px] mb-3"
      />
      <p className="text-gray-500">{name}</p>
    </div>
  );
};

export default QuoteCard;
