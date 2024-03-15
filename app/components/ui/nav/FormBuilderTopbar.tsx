"use client";
import { ROUTES } from "@/routes";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const FormBuilderTopbar = () => {
  return (
    <div className="p-3 px-3  border-gray-300 border-b h-fit flex justify-end col-start-2 col-span-4 row-start-1">
      <div className="w-[156px] flex justify-end ">
        <div className="px-1">
          <Link href={ROUTES.forms}>
            <Button className="w-full rounded-medium bg-buttonDark text-white hover:bg-buttonDarkHover">
              Cancel
            </Button>
          </Link>
        </div>
        <div className="px-1">
          <Button
            className="w-full rounded-medium bg-primary font-semibold text-black hover:bg-primary-hover"
            type="submit"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormBuilderTopbar;
