"use client";
import React from "react";
import { redirect } from "next/navigation";
import { ROUTES } from "@/routes";
import { useSession } from "next-auth/react";
import FormGroupWrapper from "@/app/components/organisms/Forms/FormGroupWrapper";

const Forms = () => {
  const { data: session } = useSession();
  if (!session || !session.user) {
    redirect(ROUTES.signin);
  }
  return (
    <div className="p-8">
      <FormGroupWrapper />
    </div>
  );
};

export default Forms;
