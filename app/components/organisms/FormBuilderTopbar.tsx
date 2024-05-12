"use client";
import { ROUTES } from "@/routes";
import Link from "next/link";
import React from "react";
import { Button, Spinner, Tooltip } from "@nextui-org/react";
import Image from "next/image";

interface Props {
  loading: boolean;
}
const FormBuilderTopbar = ({ loading }: Props) => {
  return (
    <div className=" px-3 h-full border-gray-300 border-b flex justify-between items-center col-start-2 col-span-4 row-start-1">
      <Tooltip content="Go to forms" placement="right">
        <Link href={ROUTES.forms}>
          <Image
            src={`/Icons/arrowLeft.svg`}
            alt="form-icon"
            width={30}
            height={30}
            className="h-5 w-5  mr-2"
          />
        </Link>
      </Tooltip>
      <div className="flex justify-end ">
        <div className="px-1">
          <Button type="submit" color="primary">
            {loading ? <Spinner color="current" size="sm" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormBuilderTopbar;
