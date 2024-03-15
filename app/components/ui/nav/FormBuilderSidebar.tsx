import React from "react";
import Image from "next/image";
import { Input, Textarea } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import { Iform } from "@/types/Form";

interface Props {
  currentForm: Iform;
  tabName: string;
}

const FormBuilderSidebar = ({ currentForm, tabName }: Props) => {
  const { register } = useFormContext();
  return (
    <aside className=" p-4  px-6 border-r border-gray-300 row-span-4 col-start-1 row-start-1">
      <div className="mb-12 flex gap-2 items-center">
        <Image
          src={`/Icons/marker.svg`}
          alt="form-icon"
          width={30}
          height={30}
          className="h-8 w-8 object-contain "
        />
        <p className="text-2xl">Form Creation</p>
      </div>
      <div className="mt-12 text-xl">{tabName}</div>
      <div className="mt-8 flex flex-col gap-4">
        <Input
          radius="md"
          type="text"
          label="Welcome page title"
          placeholder={currentForm?.welcomeTitle || "Welcome title"}
          variant="bordered"
          labelPlacement="outside"
          {...register("welcomeTitle")}
        />
        <Textarea
          radius="md"
          type="text"
          label="Welcome page title"
          placeholder={currentForm?.welcomeMessage || "Welcome message"}
          variant="bordered"
          labelPlacement="outside"
          {...register("welcomeMessage")}
        />
      </div>
      <div className="mb-8"></div>
    </aside>
  );
};

export default FormBuilderSidebar;
