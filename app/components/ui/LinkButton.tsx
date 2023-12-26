"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  route: string;
  children: ReactNode;
}

const LinkButton = ({ route, children }: Props) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push(route)}
      className="font-medium text-base py-6 px-6"
    >
      {children}
    </Button>
  );
};

export default LinkButton;
