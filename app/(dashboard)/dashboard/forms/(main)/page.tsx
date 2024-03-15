"use client";
import FormCard from "@/app/components/ui/FormCard";
import React from "react";
import { redirect } from "next/navigation";
import { ROUTES } from "@/routes";
import { useSession } from "next-auth/react";

const Forms = () => {
  const { data: session } = useSession();
  if (!session || !session.user) {
    redirect(ROUTES.signin);
  }
  return (
    <div className="p-8">
      <FormCard />
    </div>
  );
};

export default Forms;
