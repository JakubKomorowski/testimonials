"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FormBuilderTopbar = () => {
  return (
    <div className="p-3 px-6  border-gray-300 border-b h-fit flex justify-end col-start-2 col-span-4 row-start-1">
      <div className="w-[156px] flex justify-end ">
        <Image
          src="/Icons/arrowLeft.svg"
          alt="arrow-right"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default FormBuilderTopbar;
