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
import { Tooltip, Button as NextButton } from "@nextui-org/react";

interface Props {
  allFormFields: Iform;
  view?: "welcome" | "response" | "customerDetails" | "thankYou";
  selectedKey?: string;
  isPreview?: boolean;
}

interface Inputs {
  testimonial: string;
  rating: number;
  name: string;
  email?: string;
  website?: string;
  socialLink?: string;
  photo?: File;
}

interface TestContextExtended {
  photo?: unknown;
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
  const isPhotoRequired = !!allFormFields.customerDetails.find(
    (item) => item.name === "Photo" && item.required
  );
  const testimonialFormSchema = yup
    .object({
      testimonial: yup.string().required("Please write a testimonial"),
      rating: yup.number().required("Field required"),
      name: yup.string().required("Field required"),
      email: isEmailRequired
        ? yup.string().email().required("Field required")
        : yup.string().email(),
      website: isWebsiteRequired
        ? yup.string().url().required("Field required")
        : yup.string().url(),
      socialLink: isSocialLinkRequired
        ? yup.string().required("Field required")
        : yup.string(),
      photo: yup
        .mixed<File>()
        .test("required", "You need to provide an image", (photo?: File) => {
          // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
          if (photo?.name && isPhotoRequired) return true;
          return false;
        }),
    })
    .required();

  // console.log(allFormFields);
  const methods = useForm<Inputs>({
    resolver: yupResolver(testimonialFormSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const setFormView = useFormViewStore((state) => state.setFormView);
  const formView = useFormViewStore((state) => state.formView);

  const views = ["welcome", "response", "customerDetails", "thankYou"];
  const indexOfView = views.indexOf(formView ? formView : views[0]);

  useEffect(() => {
    view && setFormView(view);
  }, [selectedKey]);
  return (
    <div className="rounded-[30px] px-12 w-[420px] pt-4 pb-12 mx-auto shadow-[0px_4px_50px_0px_#00000025] mt-28 flex  flex-col items-center">
      <div className="flex w-full ">
        {formView !== "welcome" && (
          <NextButton
            isIconOnly
            color={undefined}
            variant="ghost"
            aria-label="Back"
            size="sm"
            onClick={() =>
              !isPreview ? setFormView(views[indexOfView - 1]) : null
            }
            type="button"
          >
            <Image
              src={`/Icons/back.svg`}
              alt="form-icon"
              width={20}
              height={20}
              className="ml-[-2px] "
            />
          </NextButton>
        )}

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
      </div>
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
