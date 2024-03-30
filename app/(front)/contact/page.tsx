"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Textarea } from "@nextui-org/react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { contactFormSchema } from "./schema";
import { sendEmail } from "@/app/actions/sendEmail";
import { useToast } from "@/components/ui/use-toast";
import { ContactFormEmailProps } from "@/app/emails/contact-form-email";

const Contact = () => {
  const methods = useForm<ContactFormEmailProps>({
    resolver: yupResolver(contactFormSchema),
  });

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    reset,
    register,
  } = methods;
  const { toast } = useToast();

  const onSubmit: SubmitHandler<ContactFormEmailProps> = async (data) => {
    const result = await sendEmail(data);

    if (result?.data?.data) {
      toast({
        title: "Your message was sent",
      });
      reset();
      return;
    }
    // toast error
    console.log(result?.data?.error);
    toast({
      title: "Something went wrong",
    });
  };

  return (
    <div className="container min-h-[calc(100vh-174px)] flex flex-col items-center justify-center">
      <div className="w-1/2 min-w-[300px] flex flex-col  justify-center border border-gray-300 rounded-lg p-8 md:p-12 h-fit">
        <h1>Contact</h1>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <Input
              label="Your name"
              type="name"
              placeholder="John Smith"
              radius="sm"
              variant="bordered"
              {...register("name", { required: true })}
            />
            <p className="text-sm text-red-600 pt-1">
              {errors.name?.message as string}
            </p>
            <Input
              label="Your email"
              type="email"
              placeholder="johnsmith@gmail.com"
              radius="sm"
              variant="bordered"
              className="mt-4"
              {...register("email", { required: true })}
            />
            <p className="text-sm text-red-600 pt-1">
              {errors.email?.message as string}
            </p>
            <div className="w-full mt-4">
              <div>
                <Textarea
                  id="message"
                  label="Your message"
                  autoComplete="message"
                  placeholder="Message"
                  variant="bordered"
                  {...register("message", { required: true })}
                />

                <p className="text-sm text-red-600 pt-1">
                  {errors.message?.message as string}
                </p>
              </div>
            </div>
            <Button variant={"secondary"} type="submit" className="mt-6">
              {isSubmitting ? "Sending" : "Submit"}
              <PaperPlaneIcon className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Contact;
