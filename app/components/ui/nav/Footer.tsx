import { FOOTER_MENU_LIST } from "@/routes";
import React from "react";
import NavItem from "./NavItem";
import Logo from "../Logo";

const Footer = () => {
  return (
    <div className=" text-white bg-bg mt-4">
      <div className="container gap-8 py-8 flex flex-col md:flex-row items-center justify-between">
        <Logo />
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
