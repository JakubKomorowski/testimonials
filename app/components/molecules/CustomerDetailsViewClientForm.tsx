"use client";
import { Button } from "@/components/ui/button";
import { useFormViewStore } from "@/store/store";
import { ICustomerDetails } from "@/types/Form";
import { Input } from "@nextui-org/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { inputConfig } from "../organisms/FormBuilderSidebar";

interface Props {
  title: string;
  customerDetails: ICustomerDetails[];
  isPreview?: boolean;
}

const CustomerDetailsViewClientForm = ({
  title,
  customerDetails,
  isPreview,
}: Props) => {
  const setFormView = useFormViewStore((state) => state.setFormView);
  const {
    setValue,
    watch,
    register,
    formState: { errors },
  } = useFormContext();

  const isEmailRequired = !!customerDetails.find(
    (item) => item.name === "Email address" && item.required
  );
  const isWebsiteRequired = !!customerDetails.find(
    (item) => item.name === "Your website" && item.required
  );
  const isSocialLinkRequired = !!customerDetails.find(
    (item) => item.name === "Social link" && item.required
  );

  return (
    <div className="flex flex-col w-full">
      {title && (
        <p className="mt-8 mb-6 font-semibold text-xl text-center">{title}</p>
      )}

      <div className="w-full flex flex-col gap-4">
        <Input
          {...inputConfig}
          label="Your name"
          type="name"
          autoComplete="name"
          placeholder="John Smith"
          isRequired={true}
          defaultValue=""
          isReadOnly={isPreview}
          isInvalid={!isPreview ? !!errors.testimonial : false}
          {...register("name", { required: true })}
        />
        <Input
          {...inputConfig}
          id="email"
          type="email"
          autoComplete="email"
          placeholder="johnsmith@email.com"
          label="Email"
          defaultValue=""
          isRequired={isEmailRequired}
          isReadOnly={isPreview}
          isInvalid={!isPreview ? !!errors.email : false}
          {...register("email")}
        />
        <Input
          {...inputConfig}
          id="website"
          type="text"
          placeholder="https://www.example.com"
          label="Your website"
          defaultValue=""
          isRequired={isWebsiteRequired}
          isReadOnly={isPreview}
          isInvalid={!isPreview ? !!errors.website : false}
          {...register("website")}
        />
        <Input
          {...inputConfig}
          id="socialLink"
          type="text"
          label="Social link"
          defaultValue=""
          isRequired={isSocialLinkRequired}
          placeholder="instagram.com/john_smith"
          isReadOnly={isPreview}
          isInvalid={!isPreview ? !!errors.socialLink : false}
          {...register("socialLink")}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          variant={"default"}
          className="w-full rounded-medium mt-8 flex gap-2"
          type="submit"
          // onClick={() => (!isPreview ? setFormView("customerDetails") : null)}
        >
          Submit
        </Button>
        <Button
          variant="secondary"
          className="w-full rounded-medium  flex gap-2"
          type="button"
          onClick={() => (!isPreview ? setFormView("response") : null)}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default CustomerDetailsViewClientForm;
