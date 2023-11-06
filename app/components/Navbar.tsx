import { MENU_LIST } from "@/routes";
import NavItem from "./NavItem";
import { useRouter } from "next/router";

const Navbar = () => {
  return (
    <nav className="container text-white font-medium py-8 px-16 flex justify-between">
      <div>Logo</div>
      <ul className="flex gap-12">
        {MENU_LIST.map((menu) => {
          return (
            <li key={menu.text} className="w-full">
              <NavItem {...menu} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
