"use client";
import { useFormViewStore } from "@/store/store";
import { IResponseQuestions } from "@/types/Form";
import React from "react";

interface Props {
  title: string;
  questions: IResponseQuestions[];
  isPreview?: boolean;
}

const ResponseViewClientForm = ({ title, questions, isPreview }: Props) => {
  const setFormView = useFormViewStore((state) => state.setFormView);
  return (
    <div className="flex  flex-col items-center mt-4">
      <p className="mt-8 font-semibold text-xl">{title}</p>
      {questions?.map((question) => (
        <p className="mt-2 ">{question.question}</p>
      ))}
    </div>
  );
};

export default ResponseViewClientForm;
