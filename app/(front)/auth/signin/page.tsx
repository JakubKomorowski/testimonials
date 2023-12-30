"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ROUTES } from "@/routes";
import { redirect } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import Divider from "@/app/components/ui/Divider";

type Inputs = {
  email: string;
  password: string;
};

const Signin = () => {
  const [wrongPass, setWrongPass] = useState("");
  const router = useRouter();
  const { status } = useSession();
  const [loading, setLoading] = useState(false);

  if (status === "authenticated") redirect(ROUTES.dashboard);

  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup
        .string()
        .required("Password is required")
        .min(4, "Password length should be at least 4 characters"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then((res) => {
      if (res?.ok) {
        router.push(ROUTES.dashboard);
        setLoading(false);
      } else {
        console.log(res?.error);
        setWrongPass("email or password is incorrect");
        setLoading(false);
      }
    });
  };

  return (
    <>
      {loading ? (
        <div className=" w-full flex justify-center h-[calc(100vh-80px)]">
          <Spinner color="primary" />
        </div>
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="mx-auto h-10 w-auto text-center">Logo</div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      href="forgot-password"
                      className="font-semibold text-gray-900 hover:text-gray-800"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    {...register("password", {
                      required: true,
                    })}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:primary-foreground sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="text-sm text-red-600 pt-1">
                  {errors.password?.message}
                </p>
                {wrongPass && (
                  <p className="text-red-600 text-sm pt-1">{wrongPass}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="cursor-pointer flex w-full justify-center rounded-md bg-bg px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-muted-foreground transition duration-150"
                >
                  Sign in
                </button>
              </div>
              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{" "}
                <Link
                  href={ROUTES.signup}
                  className="font-semibold leading-6 text-gray-900 hover:text-gray-800"
                >
                  Sign up
                </Link>
              </p>
            </form>
            <Divider>or</Divider>
            <button
              onClick={() =>
                signIn("google", {
                  redirect: true,
                  callbackUrl: ROUTES.dashboard,
                })
              }
              className="px-3 py-1.5 text-sm font-semibold leading-6 border flex w-full justify-center  gap-8 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
            >
              <img
                className="w-6 h-6"
                src="/google.svg"
                loading="lazy"
                alt="google logo"
              />
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Signin;
