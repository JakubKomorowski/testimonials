import { Testimonial } from "@/types/Testimonial";
import React from "react";
import { dateParser, firstTwoLetters } from "@/lib/utils";
import { Avatar, Tooltip } from "@nextui-org/react";
import RatingComponent from "../../atoms/RatingComponent";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/routes";

type Props = {
  el: Testimonial;
};

const TestimonialCard = ({ el }: Props) => {
  const time = dateParser(el?.createdAt?.seconds);
  return (
    <div
      key={el.id}
      className="px-3 pt-3 pb-5  rounded-lg bg-container3 flex-1 min-w-[400px]"
    >
      <div className=" flex-1 flex">
        <Avatar
          showFallback
          name={firstTwoLetters(el.name, el.email || "")}
          src={el.photo?.downloadUrl}
          className=" object-contain ml-2 shrink-0"
        />
        <div className="mt-1 pl-4 ">
          <p className="">{el.name}</p>
          <p className="text-sm text-gray-500 ">Created: {time}</p>
          <div className="mb-2">
            <RatingComponent rating={el.rating} size={15} readonly={true} />
          </div>
          <p className="">{el.testimonial}</p>
        </div>
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
};

export default TestimonialCard;
