"use client";
import { useProjectStore } from "@/store/store";
import TestimonialsCard from "./TestimonialsCard";

const TestimonialsCardWrapper = () => {
  const project = useProjectStore((state) => state.project);
  return project ? <TestimonialsCard /> : null;
};

export default TestimonialsCardWrapper;
