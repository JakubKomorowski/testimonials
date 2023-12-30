"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/app/components/ui/Input";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { contactFormSchema } from "./schema";
import { sendEmail } from "@/app/actions/sendEmail";
import { useToast } from "@/components/ui/use-toast";
import { ContactFormEmailProps } from "@/app/emails/contact-form-email";

const Contact = () => {
  const methods = useForm<ContactFormEmailProps>({
    resolver: yupResolver(contactFormSchema),
  });

  const { formState: isSubmitting } = methods;
  const { toast } = useToast();

  const onSubmit: SubmitHandler<ContactFormEmailProps> = async (data) => {
    const result = await sendEmail(data);

    if (result?.data?.data) {
      toast({
        title: "Your message was sent",
      });
      methods.reset();
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
          <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-8">
            <Input
              label="Your name"
              name="name"
              type="name"
              placeholder="John Smith"
            />
            <Input
              label="Your email"
              name="email"
              type="email"
              placeholder="johnsmith@gmail.com"
            />
            <div className="w-full mt-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-4 text-gray-900"
                >
                  Your message
                </label>
                <div className="mt-2">
                  <textarea
                    id="message"
                    autoComplete="message"
                    placeholder="Message"
                    {...methods.register("message", { required: true })}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:primary-foreground sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="text-sm text-red-600 pt-1">
                  {methods.formState.errors.message?.message as string}
                </p>
              </div>
            </div>
            <Button variant={"secondary"} type="submit" className="mt-6">
              {isSubmitting.isSubmitting ? "Sending" : "Submit"}
              <PaperPlaneIcon className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Contact;
