"use client";
import React from "react";
import { redirect } from "next/navigation";
import { ROUTES } from "@/routes";
import { useSession } from "next-auth/react";
import FormGroupWrapper from "@/app/components/organisms/Forms/FormGroupWrapper";
import TestimonialsGroupWrapper from "@/app/components/organisms/Testimonials/TestimonialsGroupWrapper";

const TestimonialPage = () => {
  const { data: session } = useSession();
  if (!session || !session.user) {
    redirect(ROUTES.signin);
  }
  return (
    <section>
      <TestimonialsGroupWrapper />
    </section>
  );
};

export default TestimonialPage;
