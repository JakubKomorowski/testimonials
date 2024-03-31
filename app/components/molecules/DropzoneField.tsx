import { Controller, useFormContext } from "react-hook-form";
import { FC } from "react";
import Dropzone from "../atoms/Dropzone";
import { Iform } from "@/types/Form";
import { DocumentData } from "firebase/firestore";

interface Props {
  name: string;
  currentForm?: Iform & DocumentData;
}

export const DropzoneField = ({ name, currentForm }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field }) => <Dropzone currentForm={currentForm} />}
      name={name}
      control={control}
      defaultValue={currentForm?.logo}
    />
  );
};
