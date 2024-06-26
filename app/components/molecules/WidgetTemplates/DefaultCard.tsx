import { FC } from "react";
import RatingComponent from "../../atoms/RatingComponent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DefaultCard as DefaultCardType } from "@/types/TestimonialCard";
import { firstTwoLetters } from "@/lib/utils";

const DefaultCard: FC<DefaultCardType> = ({
  image,
  alt,
  text,
  name,
  rating,
  preview,
}) => {
  return (
    <div className="flex flex-col items-center w-[250px]">
      <Avatar className="w-[70px] h-[70px] mb-3">
        <AvatarImage src={image} alt={alt} className="object-cover" />
        <AvatarFallback>{firstTwoLetters(name || "")}</AvatarFallback>
      </Avatar>
      {rating !== 0 && (
        <RatingComponent rating={rating} size={25} readonly={true} />
      )}
      <p className="text-center mt-5 text-gray-600">{text}</p>
      <p className="font-bold mt-8">-{name}</p>
    </div>
  );
};

export default DefaultCard;
