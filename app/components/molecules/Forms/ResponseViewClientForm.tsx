"use client";
import { Button } from "@/components/ui/button";
import { useFormViewStore } from "@/store/store";
import { IRating, IResponseQuestions } from "@/types/Form";
import { Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import RatingComponent from "../../atoms/RatingComponent";

interface Props {
  title: string;
  questions: IResponseQuestions[];
  isPreview?: boolean;
  rating: IRating;
}

const ResponseViewClientForm = ({
  title,
  questions,
  isPreview,
  rating,
}: Props) => {
  const setFormView = useFormViewStore((state) => state.setFormView);
  const [clickedNext, setClickedNext] = useState(false);

  const {
    setValue,
    getFieldState,
    watch,
    register,
    formState: { errors, touchedFields },
  } = useFormContext();
  const testimonialValue = watch("testimonial");
  const ratingValue = watch("rating");
  const handleRating = (rate: number) => {
    setValue("rating", rate);
  };

  return (
    <div className="flex flex-col w-full">
      {title && (
        <p className="mt-8 mb-6 font-semibold text-xl text-center">{title}</p>
      )}
      {questions.length > 0 && (
        <ul className="mb-4">
          {questions?.map((question) => (
            <li key={question.id}>
              <p>{question.question}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="mb-4">
        <RatingComponent
          readonly={isPreview}
          rating={isPreview ? 5 : ratingValue}
          size={25}
          handleRating={handleRating}
        />
        {!isPreview && clickedNext && rating.required && (
          <p className="text-xs pt-1">Please rate us</p>
        )}
      </div>

      <div className="w-full ">
        <Textarea
          id="testimonial"
          label="Your testimonial"
          variant="bordered"
          isReadOnly={isPreview}
          isInvalid={
            !isPreview && clickedNext && !testimonialValue ? true : false
          }
          minRows={6}
          value={testimonialValue || ""}
          defaultValue=""
          {...register("testimonial", { required: true })}
        />
      </div>
      <Button
        variant={"default"}
        className="w-full rounded-medium mt-8 flex gap-2"
        type="button"
        onClick={() =>
          !isPreview && testimonialValue && ratingValue
            ? setFormView("customerDetails")
            : setClickedNext(true)
        }
      >
        Next
      </Button>
    </div>
  );
};

export default ResponseViewClientForm;
