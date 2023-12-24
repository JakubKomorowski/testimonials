import { FOOTER_MENU_LIST, ROUTES } from "@/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItem from "./NavItem";

const Footer = () => {
  return (
    <div className=" text-white bg-primary-foreground mt-4">
      <div className="container gap-8 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between">
        <Link className="flex gap-3 items-center " href={ROUTES.home}>
          <Image
            src="/logo.png"
            alt="logo"
            width={0}
            height={0}
            sizes="100%"
            style={{
              width: "30px",
              height: "auto",
              objectFit: "cover",
            }}
          />
          <div className="font-bold text-lg">Testi Crafter</div>
        </Link>
        <nav>
          <ul className="flex flex-col md:flex-row gap-4 md:gap-8">
            {FOOTER_MENU_LIST.map((menu) => {
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
        </nav>
      </div>
    </div>
  );
};

export default Footer;
