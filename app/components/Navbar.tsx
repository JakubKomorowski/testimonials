"use client";
import { MENU_LIST } from "@/routes";
import NavItem from "./NavItem";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  let name = session?.user?.name as string;
  let mail = session?.user?.email as string;
  const firstTwoChars = mail?.slice(0, 2).toUpperCase();
  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");
  let initials;
  if (name) {
    initials = [...name.matchAll(rgx)] || [];
  }
  const formatedInitials = (
    (initials?.shift()?.[1] || "") + (initials?.pop()?.[1] || "")
  ).toUpperCase();

  return (
    <nav className="container text-white  py-4 px-4 md:px-16 flex justify-between items-center">
      <Link href={"/"}>Logo</Link>
      <ul className="hidden md:flex gap-12 ">
        {MENU_LIST.map((menu) => {
          return (
            <li
              key={menu.text}
              className=" cursor-pointer relative transition-all w-min-content before:left-[50%]
            before:w-0 before:h-px before:absolute before:bottom-0  before:bg-white before:transition-all before:duration-300
            hover:before:w-full hover:before:left-0 hover:before:black"
            >
              <NavItem {...menu} />
            </li>
          );
        })}
      </ul>
      <div className="flex items-center gap-2 md:gap-3">
        {!session ? (
          <Button
            onClick={() => router.push("signin")}
            className="font-medium  px-6  py-4"
          >
            Sign In / Sign Up
          </Button>
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-primary text-lg h-12 w-12 flex items-center justify-center text-primary-foreground font-medium rounded-full">
                {formatedInitials || firstTwoChars}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
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
          </>
        )}

        <Sheet>
          <SheetTrigger>
            <div className="flex flex-col gap-1 ml-2 px-1  md:hidden">
              <div className="w-3 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-3 h-0.5 bg-white ml-auto"></div>
            </div>
          </SheetTrigger>
          <SheetContent>
            <ul className="flex h-full justify-around flex-col">
              {MENU_LIST.map((menu) => {
                return (
                  <li key={menu.text} className="w-full">
                    <SheetClose asChild>
                      <NavItem {...menu} />
                    </SheetClose>
                  </li>
                );
              })}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
