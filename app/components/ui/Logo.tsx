import { ROUTES } from "@/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
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
  );
};

export default Logo;
