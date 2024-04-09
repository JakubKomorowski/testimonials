"use client";
import { Button } from "@/components/ui/button";
import { Iform } from "@/types/Form";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import WelcomeViewClientForm from "../molecules/WelcomeViewClientForm";
import { SubmitHandler, useForm } from "react-hook-form";
import ResponseViewClientForm from "../molecules/ResponseViewClientForm";
import { useFormViewStore } from "@/store/store";

interface Props {
  allFormFields: Iform;
  view?: "welcome" | "response";
  selectedKey?: string;
  isPreview?: boolean;
}

interface Inputs {
  testimonial: string;
}

const ClientForm = ({ allFormFields, view, selectedKey, isPreview }: Props) => {
  console.log(allFormFields);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const setFormView = useFormViewStore((state) => state.setFormView);
  const formView = useFormViewStore((state) => state.formView);
  console.log(formView);
  useEffect(() => {
    view && setFormView(view);
  }, [selectedKey]);
  return (
    <div className="rounded-[30px] px-12 w-[420px] pt-4 pb-12 mx-auto shadow-[0px_4px_50px_0px_#00000025] mt-28 flex  flex-col items-center">
      {(allFormFields?.logo?.preview || allFormFields?.logo?.downloadUrl) && (
        <div className="w-full h-8 flex justify-end ">
          <Image
            src={
              allFormFields.logo.downloadUrl
                ? allFormFields.logo.downloadUrl
                : allFormFields.logo.preview
            }
            width={100}
            height={20}
            alt="logo"
            style={{ width: "auto", height: "100%" }}
          />
        </div>
      )}
      <form>
        {formView === "welcome" && (
          <WelcomeViewClientForm
            title={allFormFields.welcomeTitle}
            message={allFormFields.welcomeMessage}
            isPreview={isPreview}
          />
        )}
        {formView === "response" && (
          <ResponseViewClientForm
            title={allFormFields.responseTitle}
            questions={allFormFields.responseQuestions}
            isPreview={isPreview}
          />
        )}
      </form>
    </div>
  );
};

export default ClientForm;
