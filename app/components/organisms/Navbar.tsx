"use client";
import { MENU_LIST, MENU_LIST_MOBILE, ROUTES } from "@/routes";
import NavItem from "../atoms/NavItem";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "../atoms/Logo";
import { useState } from "react";
import { firstTwoLetters } from "@/lib/utils";
// import {
//   Avatar,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
// } from "@nextui-org/react";

// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
// } from "../../proba";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const currentRoute = usePathname();
  let name = session?.user?.name as string;
  let mail = session?.user?.email as string;

  return (
    <nav className="container text-white py-4 flex justify-between items-center">
      <Logo />
      <ul className="hidden md:flex gap-12 ">
        {MENU_LIST.map((menu) => {
          return (
            <li
              key={menu.text}
              className={` ${
                currentRoute === menu.href
                  ? "cursor-pointer relative transition-all w-min-content before:h-px before:absolute before:bottom-0  before:bg-white before:transition-all before:duration-300 hover:before:w-full hover:before:left-0 hover:before:black before:w-full before:black before:left-[0px]"
                  : "cursor-pointer relative transition-all w-min-content before:left-[50%] before:w-0 before:h-px before:absolute before:bottom-0  before:bg-white before:transition-all before:duration-300 hover:before:w-full hover:before:left-0 hover:before:black"
              }`}
            >
              <NavItem {...menu} />
            </li>
          );
        })}
      </ul>
      <div className="flex items-center gap-2 md:gap-3">
        {!session ? (
          <div className="w-[156px] flex justify-end">
            <Button
              onClick={() => router.push(ROUTES.signin)}
              className="font-medium  px-6  py-4"
            >
              Sign In
            </Button>
          </div>
        ) : (
          <div className="w-[156px] flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-primary text-lg h-12 w-12 flex items-center justify-center text-bg font-medium rounded-full">
                {firstTwoLetters(name, mail)}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href={ROUTES.dashboard}>
                  <DropdownMenuItem className="cursor-pointer">
                    Dashboard
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    signOut();
                    router.push("/");
                  }}
                  className="cursor-pointer"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  name={firstTwoLetters(name, mail)}
                  as="button"
                  className="transition-transform text-md bg-primary"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <Link href={ROUTES.dashboard}>
                  <DropdownItem key="dashboard" className="h-14 gap-2">
                    Dashboard
                  </DropdownItem>
                </Link>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem
                  onClick={() => {
                    signOut();
                    router.push("/");
                  }}
                  key="sign_out"
                >
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
          </div>
        )}

        <Sheet open={open} onOpenChange={setOpen}>
          <button
            onClick={() => {
              setOpen(true);
            }}
          >
            <div className="flex flex-col gap-1 ml-2 px-1  md:hidden">
              <div className="w-3 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-3 h-0.5 bg-white ml-auto"></div>
            </div>
          </button>
          <SheetContent>
            <ul className="flex h-full gap-8 flex-col justify-center">
              {MENU_LIST_MOBILE.map((menu) => {
                return (
                  <li
                    key={menu.text}
                    className="w-full py-4 text-3xl"
                    onClick={() => setOpen(false)}
                  >
                    <NavItem {...menu} />
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
