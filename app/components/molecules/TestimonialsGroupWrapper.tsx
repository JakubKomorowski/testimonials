"use client";
import { useProjectStore } from "@/store/store";
import TestimonialsCard from "./TestimonialsGroup";

const TestimonialsGroupWrapper = () => {
  const project = useProjectStore((state) => state.project);
  return project ? <TestimonialsCard /> : null;
};

export default TestimonialsGroupWrapper;
