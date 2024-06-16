"use client";
import TestimonialsGroup from "./TestimonialsGroup";

interface Props {
  firstTwo?: boolean;
}

const TestimonialsGroupWrapper = ({ firstTwo }: Props) => {
  return <TestimonialsGroup firstTwo={firstTwo} />;
};

export default TestimonialsGroupWrapper;
