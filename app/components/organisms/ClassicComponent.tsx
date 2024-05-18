import React from "react";
import DefaultCard from "../molecules/DefaultCard";
import { Testimonial } from "@/types/Testimonial";

interface Props {
  data?: Testimonial[];
  preview?: boolean;
}

const ClassicComponent = ({ data, preview }: Props) => {
  const firstThreeElements = data?.slice(0, 3);
  return (
    // <section className="container grid grid-cols-fluid gap-10 mt-36">
    <section className="container flex flex-wrap justify-around gap-16">
      {firstThreeElements?.map((el) => (
        <DefaultCard
          key={el.id}
          image={el?.photo?.downloadUrl}
          alt={el?.photo?.name}
          name={el.name}
          text={el?.testimonial}
          rating={el.rating}
          preview={preview}
        />
      ))}
    </section>
  );
};

export default ClassicComponent;
