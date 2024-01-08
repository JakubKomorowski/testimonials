import { FC } from "react";
import RatingComponent from "./RatingComponent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DefaultCard } from "@/types/TestimonialCard";

const DefaultCard: FC<DefaultCard> = ({ image, alt, text, name, rating }) => {
  return (
    <div className="flex flex-col items-center max-w-[270px] ">
      <Avatar className="w-[70px] h-[70px] mb-3">
        <AvatarImage src={image} alt={alt} className="object-cover" />
        <AvatarFallback>AG</AvatarFallback>
      </Avatar>
      <RatingComponent rating={rating} size={25} />
      <p className="text-center mt-5 text-gray-600">{text}</p>
      <p className="font-bold mt-8">-{name}</p>
    </div>
  );
};

export default DefaultCard;
