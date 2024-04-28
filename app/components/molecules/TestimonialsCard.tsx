"use client";
import { db } from "@/app/firebase";
import { ROUTES } from "@/routes";
import { Tooltip } from "@nextui-org/react";
import { DocumentData } from "firebase-admin/firestore";
import { collection } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

type Props = {};

const options = {
  year: "numeric",
  month: "short",
  day: "numeric",
} as const;

const TestimonialsCard = (props: Props) => {
  const [value, loadingState, errorState] = useCollectionData(
    collection(db, "testimonials")
  );
  const slicedTestimonials = value
    ?.sort(function (a: DocumentData, b: DocumentData) {
      return b?.createdAt?.seconds - a?.createdAt?.seconds;
    })
    .slice(0, 2);

  return (
    <section className="bg-muted  p-6 rounded-lg w-full ">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
        <div className="flex gap-2 items-center h-fit cursor-pointer">
          <p>see all </p>
          <Image
            src={`/Icons/link.svg`}
            alt="form-icon"
            width={30}
            height={30}
            className="h-7 w-7 object-contain "
          />
        </div>
      </div>
      <div className="flex gap-6 flex-col  flex-wrap ">
        {slicedTestimonials?.map((el: DocumentData) => {
          const time = new Date(el?.createdAt?.seconds * 1000).toLocaleString(
            "en-US",
            options
          );
          return (
            <div
              key={el.id}
              className="px-3 pt-3 pb-5  rounded-lg bg-container3 flex-1 min-w-[400px]"
            >
              <div className=" flex-1 flex">
                <Image
                  src={`/Icons/avatar.svg`}
                  alt="form-icon"
                  width={30}
                  height={30}
                  className="h-8 w-8 object-contain ml-2"
                />
                <div className="mt-1 pl-4 ">
                  <p className="">{el.name}</p>
                  <p className="text-sm text-gray-500 mb-2">Created: {time}</p>
                  <p className="">{el.testimonial}</p>
                </div>
                <div className="flex gap-2 h-fit ml-auto">
                  <Tooltip content="Edit" color="foreground">
                    <div className="cursor-pointer flex-1 shrink-0">
                      <Link href={`${ROUTES.forms}/${el.id}`}>
                        <Image
                          src={`/Icons/edit.svg`}
                          alt="form-icon"
                          width={30}
                          height={30}
                          className="h-6 w-6 object-contain "
                        />
                      </Link>
                    </div>
                  </Tooltip>
                  <Tooltip content="Delete" color="foreground">
                    <div className="cursor-pointer flex-1 shrink-0">
                      <Image
                        src={`/Icons/trash.svg`}
                        alt="form-icon"
                        width={30}
                        height={30}
                        className="h-6 w-6 object-contain "
                      />
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TestimonialsCard;
