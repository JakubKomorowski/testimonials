"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
  icon: string;
}

const activeStyle = " bg-gray-100";

const DashboardSidebarLinkItem = ({ href, icon, children }: Props) => {
  const currentRoute = usePathname();
  return (
    <Link
      href={href}
      className={`flex gap-4 items-center rounded-2xl px-5 py-3 hover:bg-gray-100 w-full ${
        currentRoute === href ? activeStyle : ""
      }`}
    >
      <Image
        src={`/Icons/${icon}.svg`}
        alt="hand-writing"
        width={20}
        height={20}
        className="h-5 w-5 object-contain "
      />
      {children}
    </Link>
  );
};

export default DashboardSidebarLinkItem;
