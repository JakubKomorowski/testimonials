"use client";
import { db } from "@/app/firebase";
import { sortByDate } from "@/lib/utils";
import { ROUTES } from "@/routes";
import { useProjectStore } from "@/store/store";
import { Testimonial } from "@/types/Testimonial";
import { Tooltip } from "@nextui-org/react";
import { collection } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useCollectionData } from "react-firebase-hooks/firestore";
import TestimonialCard from "../../molecules/Testimonials/TestimonialCard";

const TestimonialsGroup = () => {
  const project = useProjectStore((state) => state.project);
  const [value, loadingState, errorState] = useCollectionData(
    collection(db, "projects", project || "", "testimonials")
  );
  const slicedTestimonials = sortByDate(value as Testimonial[])?.slice(
    0,
    2
  ) as Testimonial[];

  return (
    <section className="bg-muted  p-6 rounded-lg w-full ">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
        <div className="flex gap-2 items-center h-fit cursor-pointer">
          <Tooltip content="See all" color="foreground">
            <Link
              href={ROUTES.forms}
              className="flex gap-2 items-center h-fit cursor-pointer"
            >
              <Image
                src={`/Icons/link.svg`}
                alt="form-icon"
                width={30}
                height={30}
                className="h-7 w-7 object-contain "
              />
            </Link>
          </Tooltip>
        </div>
      </div>
      <div className="flex gap-6 flex-col  2xl:flex-row flex-wrap ">
        {slicedTestimonials?.map((el: Testimonial) => {
          return <TestimonialCard el={el} />;
        })}
      </div>
    </section>
  );
};

export default TestimonialsGroup;
