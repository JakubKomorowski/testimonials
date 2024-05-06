"use client";
import FormBuilder from "@/app/components/organisms/FormBuilder";
import { formData } from "@/app/data/formData";
import useSetUserProject from "@/app/hooks/useSetUserProject";
import { useSession } from "next-auth/react";
import React from "react";

type Props = {};

const AddForm = (props: Props) => {
  const { data: session } = useSession();
  const [project] = useSetUserProject();

  return project ? (
    <FormBuilder project={project} form={formData(session?.user.id)} />
  ) : null;
};

export default AddForm;
