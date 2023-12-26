"use client";
import { sendPasswordResetEmail } from "firebase/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ROUTES } from "@/routes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { auth } from "@/app/firebase";

type Inputs = {
  email: string;
};

export default function ForgotPassword() {
  const schema = yup
    .object({
      email: yup.string().email().required(),
    })
    .required();

  const { status } = useSession();

  if (status === "authenticated") redirect(ROUTES.dashboard);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    sendPasswordResetEmail(auth, data.email);
  };

  console.log(errors);

  const [modalOpen, setModalOpen] = useState(isSubmitSuccessful);

  useEffect(() => {
    setModalOpen(isSubmitSuccessful);
  }, [isSubmitSuccessful]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="johnsmith@gmail.com"
                  {...register("email", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:primary-foreground sm:text-sm sm:leading-6"
                />
              </div>
              <p className="text-sm text-red-600 pt-1">
                {errors.email?.message}
              </p>
            </div>
            <div>
              <button
                type="submit"
                className="cursor-pointer flex w-full justify-center rounded-md bg-bg px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-muted-foreground transition duration-150"
              >
                Send reset pasword email
              </button>
            </div>
          </div>
        </div>
      </form>
      <Dialog open={modalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Email has been sent</DialogTitle>
            <DialogDescription>
              You will soon get an email to reset your password.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              onClick={() => {
                setModalOpen(false);
                reset();
              }}
              type="button"
              variant="secondary"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
