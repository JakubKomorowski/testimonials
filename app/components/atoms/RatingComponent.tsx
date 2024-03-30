"use client";
import { Rating } from "react-simple-star-rating";
import { FaStar } from "react-icons/fa";
import { FC } from "react";

interface Props {
  rating: number;
  size: number;
}

const RatingComponent: FC<Props> = ({ rating, size }) => {
  return (
    <Rating
      readonly
      initialValue={rating}
      iconsCount={5}
      emptyStyle={{ display: "flex" }}
      fillStyle={{ display: "-webkit-inline-box" }}
      allowFraction
      transition
      emptyIcon={<FaStar size={size} />}
      fillIcon={<FaStar size={size} />}
    />
  );
};

export default RatingComponent;
