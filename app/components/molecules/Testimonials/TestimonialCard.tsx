import { Testimonial } from "@/types/Testimonial";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { cn, dateParser, firstTwoLetters } from "@/lib/utils";
import { Avatar, Badge, Tooltip } from "@nextui-org/react";
import RatingComponent from "../../atoms/RatingComponent";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/routes";
import { IoCheckmark } from "react-icons/io5";
import { useProjectStore } from "@/store/store";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/app/firebase";

type Props = {
  el: Testimonial;
  selectedReviews?: Testimonial[];
  setSelectedReviews?: Dispatch<SetStateAction<Testimonial[]>>;
  preview?: boolean;
};

const TestimonialCard = ({
  el,
  selectedReviews,
  setSelectedReviews,
  preview,
}: Props) => {
  const time = dateParser(el?.date?.seconds || el?.createdAt?.seconds || 0);
  const project = useProjectStore((state) => state.project);

  const handleSelect = (id: string) => {
    if (setSelectedReviews) {
      if (selectedReviews?.find((item) => item.id === id)) {
        setSelectedReviews(selectedReviews?.filter((item) => item.id !== id));
      } else {
        setSelectedReviews([...(selectedReviews || []), el]);
      }
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!project) return;
    const docRef = doc(db, "projects", project, "testimonials", id);
    await deleteDoc(docRef);
  };

  const isSelected = (id: string) => {
    const isSelected = selectedReviews?.find((item) => item.id === id);
    return !!isSelected;
  };
  const previewClassName = preview ? "cursor-pointer hover:bg-container2" : "";

  return (
    <div
      onClick={() => (preview ? handleSelect(el.id) : null)}
      className={cn(
        "px-3 pt-3 pb-5  rounded-lg bg-container3 flex-1 min-w-[400px] relative",
        previewClassName
      )}
    >
      <div className="absolute top-0 right-0">
        <Badge
          content={<IoCheckmark size={20} />}
          color="primary"
          size="lg"
          shape="circle"
          className="top-[-15px]  w-7 h-7 "
          isInvisible={!isSelected(el.id)}
        >
          <div></div>
        </Badge>
      </div>

      <div className=" flex-1 flex w-full">
        {el.photo?.downloadUrl ? (
          <Image
            src={el.photo?.downloadUrl}
            width={100}
            height={100}
            alt="photo"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <Avatar
            showFallback
            name={firstTwoLetters(el.name, el.email || "")}
            src={el.photo?.downloadUrl}
            className=" object-contain ml-2 shrink-0"
          />
        )}
        <div className="mt-2 pl-4 ">
          <p className="">{el.name}</p>
          <p className="text-sm text-gray-500 ">Created: {time}</p>
          <div className="mb-2">
            {el.rating !== 0 && (
              <RatingComponent rating={el.rating} size={15} readonly={true} />
            )}
          </div>

          <p className="font-semibold">{el.title}</p>
          <p>{el.testimonial}</p>
        </div>
        {!preview && (
          <div className="flex gap-2 h-fit ml-auto shrink-0">
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
              <button
                onClick={() => handleDeleteTestimonial(el.id)}
                className="cursor-pointer flex-1 shrink-0"
              >
                <Image
                  src={`/Icons/trash.svg`}
                  alt="form-icon"
                  width={30}
                  height={30}
                  className="h-6 w-6 object-contain "
                />
              </button>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;
