"use client";
import { firstTwoLetters } from "@/lib/utils";
import { ROUTES } from "@/routes";
import { useSession, signOut } from "next-auth/react";
import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Avatar,
} from "@nextui-org/react";

const DashboardTopbar = () => {
  const { data: session } = useSession();
  let name = session?.user?.name as string;
  let mail = session?.user?.email as string;
  return (
    <div className="p-3 px-6  border-gray-300 border-b h-fit flex justify-end col-span-3">
      <div className="w-[156px] flex justify-end ">
        <Dropdown>
          <DropdownTrigger className=" outline-none bg-primary   flex items-center justify-center text-bg font-medium rounded-full">
            <Avatar
              name={firstTwoLetters(name, mail)}
              as="button"
              className="transition-transform text-md bg-primary"
            />
          </DropdownTrigger>
          <DropdownMenu variant="flat" aria-label="Profile Actions">
            <DropdownItem
              className="cursor-pointer"
              key="dashboard"
              href={ROUTES.dashboard}
            >
              Dashboard
            </DropdownItem>
            <DropdownItem key="profile" className="cursor-pointer">
              Profile
            </DropdownItem>
            <DropdownItem
              key="sign_out"
              onClick={() => signOut()}
              className="cursor-pointer"
            >
              Sign Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default DashboardTopbar;
