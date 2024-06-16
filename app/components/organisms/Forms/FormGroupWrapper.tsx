"use client";
import { FC } from "react";
import FormGroup from "./FormGroup";

interface Props {
  firstTwo?: boolean;
}

const FormGroupWrapper: FC<Props> = ({ firstTwo }) => {
  return <FormGroup firstTwo={firstTwo} />;
};

export default FormGroupWrapper;
