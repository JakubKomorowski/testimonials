"use client";
import FormBuilder from "@/app/components/organisms/FormBuilder";
import { formData } from "@/app/data/formData";
import useSetUserProject from "@/app/hooks/useSetUserProject";
import { ROUTES } from "@/routes";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const AddForm = (props: Props) => {
  const { data: session } = useSession();
  const [project] = useSetUserProject();
  if (!session || !session.user) {
    redirect(ROUTES.signin);
  }

  return project ? (
    <FormBuilder project={project} form={formData(session?.user.id)} />
  ) : null;
};

export default AddForm;
