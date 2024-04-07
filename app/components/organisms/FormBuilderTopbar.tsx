"use client";
import { ROUTES } from "@/routes";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@nextui-org/react";

interface Props {
  loading: boolean;
}
const FormBuilderTopbar = ({ loading }: Props) => {
  return (
    <div className="p-3 px-3 border-gray-300 border-b h-fit flex justify-end col-start-2 col-span-4 row-start-1">
      <div className="w-[156px] flex justify-end ">
        <div className="px-1">
          <Link href={ROUTES.forms}>
            <Button variant={"secondary"} className="w-full rounded-medium ">
              Cancel
            </Button>
          </Link>
        </div>
        <div className="px-1">
          <Button
            className="w-full rounded-medium bg-primary font-semibold text-black hover:bg-primary-hover"
            type="submit"
          >
            {loading ? <Spinner color="current" size="sm" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormBuilderTopbar;
