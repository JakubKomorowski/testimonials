"use client";
import { Rating } from "react-simple-star-rating";
import { FaStar } from "react-icons/fa";
import { FC } from "react";

interface Props {
  rating?: number;
  size: number;
  readonly?: boolean;
  handleRating?: (rate: number) => void;
}

const RatingComponent: FC<Props> = ({
  rating,
  size,
  readonly,
  handleRating,
}) => {
  return (
    <Rating
      onClick={readonly ? () => {} : handleRating}
      readonly={readonly}
      initialValue={rating}
      iconsCount={5}
      emptyStyle={{ display: "flex" }}
      fillStyle={{ display: "-webkit-inline-box" }}
      allowFraction={readonly ? true : false}
      transition
      emptyIcon={<FaStar size={size} />}
      fillIcon={<FaStar size={size} />}
    />
  );
};

export default RatingComponent;
