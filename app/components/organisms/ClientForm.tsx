"use client";
import { Button } from "@/components/ui/button";
import { Iform } from "@/types/Form";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import WelcomeViewClientForm from "../molecules/WelcomeViewClientForm";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ResponseViewClientForm from "../molecules/ResponseViewClientForm";
import { useFormViewStore } from "@/store/store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomerDetailsViewClientForm from "../molecules/CustomerDetailsViewClientForm";

interface Props {
  allFormFields: Iform;
  view?: "welcome" | "response" | "customerDetails";
  selectedKey?: string;
  isPreview?: boolean;
}

interface Inputs {
  testimonial: string;
  name: string;
  email?: string;
  website?: string;
  socialLink?: string;
}

const ClientForm = ({ allFormFields, view, selectedKey, isPreview }: Props) => {
  const isEmailRequired = !!allFormFields.customerDetails.find(
    (item) => item.name === "Email address" && item.required
  );
  const isWebsiteRequired = !!allFormFields.customerDetails.find(
    (item) => item.name === "Your website" && item.required
  );
  const isSocialLinkRequired = !!allFormFields.customerDetails.find(
    (item) => item.name === "Social link" && item.required
  );
  const testimonialFormSchema = yup
    .object({
      testimonial: yup.string().required("Please write a testimonial"),
      name: yup.string().required(),
      email: isEmailRequired
        ? yup.string().email().required()
        : yup.string().email(),
      website: isWebsiteRequired
        ? yup.string().url().required()
        : yup.string().url(),
      socialLink: isSocialLinkRequired ? yup.string().required() : yup.string(),
    })
    .required();

  // console.log(allFormFields);
  const methods = useForm<Inputs>({
    resolver: yupResolver(testimonialFormSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const setFormView = useFormViewStore((state) => state.setFormView);
  const formView = useFormViewStore((state) => state.formView);
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
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
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
          {formView === "customerDetails" && (
            <CustomerDetailsViewClientForm
              title={allFormFields.customerTitle}
              customerDetails={allFormFields.customerDetails}
              isPreview={isPreview}
            />
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default ClientForm;
