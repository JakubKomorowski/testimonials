import { Controller, useFormContext } from "react-hook-form";
import { FC } from "react";
import Dropzone from "../atoms/Dropzone";
import { ICustomerDetails, Iform } from "@/types/Form";
import { DocumentData } from "firebase/firestore";

interface Props {
  name: string;
  currentForm?: Iform & DocumentData;
  isRequired?: boolean;
  label?: string;
  disabled?: boolean;
}

export const DropzoneField = ({
  name,
  currentForm,
  label,
  isRequired,
  disabled,
}: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field }) => (
        <Dropzone
          name={name}
          currentForm={currentForm}
          label={label}
          isRequired={isRequired}
          disabled={disabled}
        />
      )}
      name={name}
      control={control}
      defaultValue={currentForm?.logo}
    />
  );
};
