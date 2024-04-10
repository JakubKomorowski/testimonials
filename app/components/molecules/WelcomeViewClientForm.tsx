"use client";
import { Button } from "@/components/ui/button";
import { useFormViewStore } from "@/store/store";
import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  message: string;
  isPreview?: boolean;
}

const WelcomeViewClientForm = ({ title, message, isPreview }: Props) => {
  const setFormView = useFormViewStore((state) => state.setFormView);
  return (
    <div className="flex  flex-col items-center">
      {title && <p className="mt-8 font-semibold text-xl">{title}</p>}
      {message && <p className="mt-8 ">{message}</p>}
      <Button
        variant={"default"}
        className="w-full rounded-medium mt-8 flex gap-2"
        type="button"
        onClick={() => (!isPreview ? setFormView("response") : null)}
      >
        <Image
          src="/Icons/pen.svg"
          alt="pen"
          width={20}
          height={20}
          className=""
        />
        Send in text
      </Button>
      <Button
        variant={"secondary"}
        className="w-full rounded-medium mt-2 flex gap-2"
        type="button"
      >
        <Image
          src="/Icons/camera.svg"
          alt="camera"
          width={20}
          height={20}
          className=""
        />
        Record a video
      </Button>
    </div>
  );
};

export default WelcomeViewClientForm;
