"use client";
import { db } from "@/app/firebase";
import { cn, sortByDate } from "@/lib/utils";
import { ROUTES } from "@/routes";
import { useProjectStore } from "@/store/store";
import { Testimonial } from "@/types/Testimonial";
import { Spinner, Tooltip } from "@nextui-org/react";
import { collection } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useCollectionData } from "react-firebase-hooks/firestore";
import TestimonialCard from "../../molecules/Testimonials/TestimonialCard";

interface Props {
  firstTwo?: boolean;
}

const TestimonialsGroup = ({ firstTwo }: Props) => {
  const project = useProjectStore((state) => state.project);

  const [value, loadingState, errorState] = useCollectionData(
    project ? collection(db, "projects", project, "testimonials") : null
  );
  const slicedTestimonials = sortByDate(value as Testimonial[])?.slice(
    0,
    2
  ) as Testimonial[];

  const formattedTestimonials = firstTwo
    ? (slicedTestimonials as Testimonial[])
    : (value as Testimonial[]);

  const className = firstTwo ? "bg-muted" : "";

  return (
    <section className={cn("p-6 rounded-large w-full", className)}>
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">Testimonials</h2>
        {firstTwo && (
          <div className="flex gap-2 items-center h-fit cursor-pointer">
            <Tooltip content="See all" color="foreground">
              <Link
                href={ROUTES.testimonials}
                className="flex gap-2 items-center h-fit cursor-pointer"
              >
                <Image
                  src={`/Icons/link.svg`}
                  alt="form-icon"
                  width={30}
                  height={30}
                  className="h-7 w-7 object-contain"
                />
              </Link>
            </Tooltip>
          </div>
        )}
      </div>
      {!loadingState ? (
        <div className="flex gap-6 flex-col  2xl:flex-row flex-wrap ">
          {formattedTestimonials?.map((el: Testimonial) => {
            return <TestimonialCard el={el} key={el.id} />;
          })}
        </div>
      ) : (
        <div className="w-full flex justify-center h-[calc(100vh-180px)]">
          <Spinner color="primary" />
        </div>
      )}
    </section>
  );
};

export default TestimonialsGroup;
