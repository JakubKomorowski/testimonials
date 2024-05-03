"use client";
import { useProjectStore } from "@/store/store";
import React, { FC } from "react";
import FormCard from "./FormCard";

interface Props {
  firstTwo?: boolean;
}

const FormCardWrapper: FC<Props> = ({ firstTwo }) => {
  const project = useProjectStore((state) => state.project);
  return project ? <FormCard firstTwo={firstTwo} /> : null;
};

export default FormCardWrapper;
