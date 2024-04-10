"use client";
import { Button } from "@/components/ui/button";
import { useFormViewStore } from "@/store/store";
import { IResponseQuestions } from "@/types/Form";
import { Textarea } from "@nextui-org/react";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  title: string;
  questions: IResponseQuestions[];
  isPreview?: boolean;
}

const ResponseViewClientForm = ({ title, questions, isPreview }: Props) => {
  const setFormView = useFormViewStore((state) => state.setFormView);
  const {
    setValue,
    watch,
    register,
    formState: { errors },
  } = useFormContext();
  console.log(errors);
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

      <div className="w-full ">
        <Textarea
          id="testimonial"
          label="Your testimonial"
          variant="bordered"
          isReadOnly={isPreview}
          isInvalid={!isPreview ? !!errors.testimonial : false}
          minRows={6}
          defaultValue=""
          {...register("testimonial", { required: true })}
        />
      </div>
      <Button
        variant={"default"}
        className="w-full rounded-medium mt-8 flex gap-2"
        type="button"
        onClick={() => (!isPreview ? setFormView("customerDetails") : null)}
      >
        Next
      </Button>
    </div>
  );
};

export default ResponseViewClientForm;
