"use client";
import { Button } from "@/components/ui/button";
import { Iform } from "@/types/Form";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
  allFormFields: Iform;
}

const ClientForm = ({ allFormFields }: Props) => {
  return (
    <div className="rounded-[30px] px-12 w-[420px] pt-4 pb-12 mx-auto shadow-[0px_4px_50px_0px_#00000025] mt-28 flex  flex-col items-center">
      {/* <div className="rounded-full bg-slate-400 w-24 h-24 mt-[-48px]"></div> */}
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

      <p className="mt-8 font-semibold text-xl">{allFormFields.welcomeTitle}</p>
      <p className="mt-8 ">{allFormFields.welcomeMessage}</p>
      <Button
        variant={"default"}
        className="w-full rounded-medium mt-8 flex gap-2"
        type="button"
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

export default ClientForm;
