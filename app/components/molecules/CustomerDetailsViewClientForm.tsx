"use client";
import { Button } from "@/components/ui/button";
import { useFormViewStore } from "@/store/store";
import { ICustomerDetails } from "@/types/Form";
import { Tooltip } from "@nextui-org/tooltip";
import { Input } from "@nextui-org/input";
import React from "react";
import { useFormContext } from "react-hook-form";
import { inputConfig } from "../organisms/FormBuilderSidebar";
import { DropzoneField } from "./DropzoneField";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Star from "../atoms/Star";

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

  const filteredCustomerDetails = customerDetails.filter(
    (item) => item.id !== "name" && item.id !== "photo"
  );
  const isPhotoRequired = !!customerDetails.find(
    (item) => item.name === "Photo" && item.required
  );

  const nameValue = watch("name");
  const photoValue = watch("photo");

  const handleDeleteLogo = () => {
    setValue("photo", {
      path: "",
      preview: "",
      name: "",
      downloadUrl: "",
      size: 0,
      type: "image/jpeg",
      lastModified: 0,
    });
  };

  return (
    <div className="flex flex-col w-full">
      {title && (
        <p className="mt-8 mb-6 font-semibold text-xl text-center">{title}</p>
      )}

      <div className="w-full flex flex-col gap-4">
        <div>
          <Input
            {...inputConfig}
            label="Your name"
            type="name"
            autoComplete="name"
            placeholder="John Smith"
            isRequired={true}
            value={nameValue || ""}
            defaultValue=""
            isReadOnly={isPreview}
            isInvalid={!isPreview ? !!errors.name : false}
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-xs text-red-600 pt-1">
              {errors.name.message as string}
            </p>
          )}
        </div>
        <div>
          {photoValue?.preview ? (
            <div>
              <p className="text-sm cursor-default mb-2">
                Your photo
                <span className="ml-[2px]">{isPhotoRequired && "*"}</span>
              </p>
              <Avatar>
                <AvatarImage src={photoValue.preview} alt="Avatar image" />
              </Avatar>
              {photoValue?.name && (
                <div className="flex p-2 gap-2">
                  <p className="text-sm truncate">{photoValue.name}</p>

                  <Tooltip content="Delete" color="foreground">
                    <button
                      onClick={handleDeleteLogo}
                      className="focus:outline-none "
                      type="button"
                    >
                      <Image
                        src="/Icons/trash.svg"
                        width={18}
                        height={18}
                        alt="delete"
                        className="cursor-pointer"
                      />
                    </button>
                  </Tooltip>
                </div>
              )}
            </div>
          ) : (
            <DropzoneField
              name="photo"
              label="Your photo"
              isRequired={isPhotoRequired}
            />
          )}

          {errors.photo && (
            <p className="text-xs text-red-600 pt-1">
              {errors.photo.message as string}
            </p>
          )}
        </div>

        {filteredCustomerDetails.map((item) => {
          return (
            item.enabled && (
              <div key={item.id}>
                <Input
                  key={item.id}
                  {...inputConfig}
                  id={item.id}
                  type={item.id === "email" ? "email" : "text"}
                  placeholder={item.placeholder}
                  label={item.name}
                  value={watch(item.id) || ""}
                  defaultValue=""
                  isRequired={item.required}
                  isReadOnly={isPreview}
                  isInvalid={!isPreview ? !!errors[item.id] : false}
                  {...register(item.id, { required: item.required })}
                />
                {errors[item.id] && (
                  <p className="text-xs text-red-600 pt-1">
                    {errors[item.id]!.message as string}
                  </p>
                )}
              </div>
            )
          );
        })}
      </div>
      <div className="flex flex-col gap-2">
        <Button
          variant={"default"}
          className="w-full rounded-medium mt-8 flex gap-2"
          type={isPreview ? "button" : "submit"}
          // type="submit"
          // onClick={() => (!isPreview ? setFormView("thankYou") : null)}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CustomerDetailsViewClientForm;
