"use client";
import { useProjectStore } from "@/store/store";
import { FC } from "react";
import FormGroup from "./FormGroup";

interface Props {
  firstTwo?: boolean;
}

const FormGroupWrapper: FC<Props> = ({ firstTwo }) => {
  const project = useProjectStore((state) => state.project);
  return project ? <FormGroup firstTwo={firstTwo} /> : null;
};

export default FormGroupWrapper;
