"use client";
import { useProjectStore } from "@/store/store";
import TestimonialsGroup from "./TestimonialsGroup";

const TestimonialsGroupWrapper = () => {
  const project = useProjectStore((state) => state.project);
  return project ? <TestimonialsGroup /> : null;
};

export default TestimonialsGroupWrapper;
