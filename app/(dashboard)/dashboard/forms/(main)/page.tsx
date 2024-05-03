"use client";
import React from "react";
import { redirect } from "next/navigation";
import { ROUTES } from "@/routes";
import { useSession } from "next-auth/react";
import FormCardWrapper from "@/app/components/molecules/FormCardWrapper";

const Forms = () => {
  const { data: session } = useSession();
  if (!session || !session.user) {
    redirect(ROUTES.signin);
  }
  return (
    <div className="p-8">
      <FormCardWrapper />
    </div>
  );
};

export default Forms;
