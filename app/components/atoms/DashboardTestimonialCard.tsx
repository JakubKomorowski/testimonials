import { dateParser } from "@/lib/utils";
import { Tooltip } from "@nextui-org/react";
import { DocumentData } from "firebase-admin/firestore";
import Image from "next/image";
import { Dispatch } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

type Props = {
  el: DocumentData;
  setChoosenTestimonials: React.Dispatch<React.SetStateAction<string[]>>;
  plus?: boolean;
  minus?: boolean;
  selectedTestimonialsId: string[];
};

const DashboardTestimonialCard = ({
  el,
  selectedTestimonialsId,
  plus,
  setChoosenTestimonials,
  minus,
}: Props) => {
  const time = dateParser(el?.createdAt?.seconds);
  return (
    <div
      key={el.id}
      className="px-3 pt-3 pb-5  rounded-lg bg-container3  min-w-[400px] h-fit "
    >
      <div className="flex">
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
        <div className=" ml-auto shrink-0">
          {plus && (
            <Tooltip content="Add" color="foreground">
              <button
                className="cursor-pointer"
                onClick={() => {
                  setChoosenTestimonials([
                    ...new Set([...selectedTestimonialsId, el.id]),
                  ]);
                }}
              >
                <Image
                  src={`/Icons/plus.svg`}
                  alt="form-icon"
                  width={30}
                  height={30}
                  className="h-6 w-6 "
                />
              </button>
            </Tooltip>
          )}

          {minus && (
            <Tooltip content="Remove" color="foreground">
              <button
                className="cursor-pointer"
                onClick={() => {
                  setChoosenTestimonials([
                    ...selectedTestimonialsId.filter((item) => item !== el.id),
                  ]);
                }}
              >
                <Image
                  src={`/Icons/minus.svg`}
                  alt="form-icon"
                  width={30}
                  height={30}
                  className="h-6 w-6 "
                />
              </button>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardTestimonialCard;
