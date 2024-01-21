"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { firstTwoLetters } from "@/lib/utils";
import { ROUTES } from "@/routes";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const DashboardTopbar = () => {
  const { data: session } = useSession();
  let name = session?.user?.name as string;
  let mail = session?.user?.email as string;
  return (
    <div className="p-3 px-6  border-gray-300 border-b h-fit flex justify-end col-span-3">
      <div className="w-[156px] flex justify-end ">
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-primary text-lg h-10 w-10 flex items-center justify-center text-bg font-medium rounded-full">
            {firstTwoLetters(name, mail)}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-6">
            <DropdownMenuItem className="cursor-pointer">
              <Link href={ROUTES.dashboard}>Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => signOut()}
              className="cursor-pointer"
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardTopbar;
