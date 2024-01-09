import React from "react";
import QuoteIcon from "./QuoteIcon";
import RatingComponent from "./RatingComponent";

interface Props {
  children: React.ReactNode;
  rating: number;
}

const SpeachBubbleCard = ({ children, rating }: Props) => {
  return (
    <div>
      <div className="relative max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] rounded-2xl border border-gray-100 bg-white shadow-[0px_4px_50px_0px_#00000025]">
        <div className="absolute left-1/2 bottom-0 h-8 w-8 -translate-x-1/2 translate-y-1/2 rotate-45 transform border-r border-b border-gray-100 bg-white"></div>
        <div className="absolute left-8 top-8 hidden md:block">
          <QuoteIcon className="text-black w-12 h-8" opacity={0.15} />
        </div>
        <div className="p-8 pb-16">
          <div className="md:border-l-2 md:border-gray-200 md:pl-8 md:ml-20">
            {children}
          </div>
        </div>
        <div className="absolute right-12 bottom-7">
          <RatingComponent rating={rating} size={15} />
        </div>
      </div>
    </div>
  );
};

export default SpeachBubbleCard;
