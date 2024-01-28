"use client";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { redirect } from "next/navigation";
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
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase";
import { useSession } from "next-auth/react";
import { Session, User } from "next-auth";
import { Input } from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);

  const { data: session } = useSession();
  const { status } = useSession();

  if (status === "authenticated") redirect(ROUTES.dashboard);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirmPassword = () =>
    setIsVisibleConfirmPassword(!isVisibleConfirmPassword);

  const schema = yup
    .object({
      email: yup.string().email().required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(4, "Password length should be at least 4 characters"),
      confirmPassword: yup
        .string()
        .required("Confirm Password is required")
        .min(4, "Password length should be at least 4 characters")
        .oneOf([yup.ref("password")], "Passwords do not match"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isLoading },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/email-already-in-use") {
        alert("email-already-in-use.");
      } else {
        alert(errorMessage);
      }
    });

    if (userCredential) {
      await sendEmailVerification(userCredential.user);
      setModalOpen(isSubmitSuccessful);
    }
    return userCredential;
  };

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
            Sign up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <div className="mt-2">
                <Input
                  id="email"
                  type="email"
                  label="Email"
                  autoComplete="email"
                  variant="bordered"
                  radius="sm"
                  isInvalid={!!errors.email}
                  {...register("email", { required: true })}
                />
              </div>
              <p className="text-sm text-red-600 pt-1">
                {errors.email?.message}
              </p>
            </div>

            <div>
              <div className="mt-2">
                <Input
                  id="password"
                  type={isVisible ? "text" : "password"}
                  label="Password"
                  autoComplete="current-password"
                  radius="sm"
                  isInvalid={!!errors.password}
                  {...register("password", {
                    required: true,
                  })}
                  variant="bordered"
                  endContent={
                    <button
                      className="focus:outline-none "
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <FaRegEye className="h-full text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
              </div>
              <p className="text-sm text-red-600 pt-1">
                {errors.password?.message}
              </p>
            </div>
            <div>
              <div className="mt-2">
                <Input
                  id="confirmPassword"
                  type={isVisibleConfirmPassword ? "text" : "password"}
                  autoComplete="current-password"
                  label="Confirm password"
                  radius="sm"
                  isInvalid={!!errors.confirmPassword}
                  {...register("confirmPassword", {
                    required: true,
                  })}
                  variant="bordered"
                  endContent={
                    <button
                      className="focus:outline-none "
                      type="button"
                      onClick={toggleVisibilityConfirmPassword}
                    >
                      {isVisibleConfirmPassword ? (
                        <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <FaRegEye className="h-full text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
              </div>
              <p className="text-sm text-red-600 pt-1">
                {errors.confirmPassword?.message}
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="cursor-pointer flex w-full justify-center rounded-md bg-bg px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-muted-foreground transition duration-150"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </form>
      <Dialog open={modalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify email has been sent</DialogTitle>
            <DialogDescription>
              You will soon get a verification email.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              onClick={() => {
                setModalOpen(false);
                reset();
                router.push(ROUTES.signin);
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
