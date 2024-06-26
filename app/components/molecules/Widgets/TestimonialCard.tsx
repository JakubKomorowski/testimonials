import { dateParser, firstTwoLetters } from "@/lib/utils";
import { Testimonial } from "@/types/Testimonial";
import { Avatar, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { DraggableProvided } from "@hello-pangea/dnd";
import { Dispatch } from "react";
import { DocumentData } from "firebase-admin/firestore";
import RatingComponent from "../../atoms/RatingComponent";

type Props = {
  el: Testimonial;
  setChoosenTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  plus?: boolean;
  minus?: boolean;
  selectedTestimonials: Testimonial[];
  innerRef?: (element: HTMLElement | null) => void;
  provided?: DraggableProvided;
  setTestimonials: Dispatch<React.SetStateAction<DocumentData | undefined>>;
  testimonials?: DocumentData;
};

const TestimonialCard = ({
  el,
  selectedTestimonials,
  plus,
  setChoosenTestimonials,
  minus,
  innerRef,
  provided,
  testimonials,
  setTestimonials,
}: Props) => {
  const time = dateParser(el?.date?.seconds || el?.createdAt?.seconds || 0);
  const handleAddTestimonial = (id?: string) => {
    if (selectedTestimonials.find((item) => item.id === id)) {
      setChoosenTestimonials([...selectedTestimonials]);
    } else {
      setChoosenTestimonials([...selectedTestimonials, el]);
      if (testimonials?.length > 0 && testimonials !== undefined) {
        setTestimonials(
          [...testimonials.filter((item: Testimonial) => item.id !== id)] ?? []
        );
      }
    }
  };
  const handleRemoveTestimonial = (el: Testimonial) => {
    setChoosenTestimonials([
      ...selectedTestimonials.filter((item) => item.id !== el.id),
    ]);
    if (testimonials !== undefined) {
      setTestimonials([...(testimonials as Testimonial[]), el]);
    }
  };
  return (
    <div
      key={el.id}
      className="px-3 pt-3 pb-5 mb-4 rounded-lg bg-container3  min-w-[400px] h-fit "
      ref={innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
    >
      <div className="flex">
        <Avatar
          showFallback
          name={firstTwoLetters(el.name, el.email || "")}
          src={el.photo?.downloadUrl}
          className=" object-contain ml-2 shrink-0"
        />
        <div className="mt-1 pl-4 ">
          <p className="">{el.name}</p>
          <p className="text-sm text-gray-500">Created: {time}</p>
          <div className="mb-2">
            {el.rating !== 0 && (
              <RatingComponent rating={el.rating} size={15} readonly={true} />
            )}
          </div>
          <p className="font-semibold">{el.title}</p>
          <p className="">{el.testimonial}</p>
        </div>
        <div className=" ml-auto shrink-0">
          {plus && (
            <Tooltip content="Add" color="foreground">
              <button
                className="cursor-pointer"
                onClick={() => {
                  handleAddTestimonial(el.id);
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
                  handleRemoveTestimonial(el);
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

export default TestimonialCard;
