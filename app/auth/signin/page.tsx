"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  signIn,
  getProviders,
  useSession,
  SignInResponse,
} from "next-auth/react";
import * as NProgress from "nprogress";
import { usePRouter } from "@/hooks/usePRouter";
import Link from "next/link";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [wrongPass, setWrongPass] = useState("");
  // const providers = await getProviders();
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { status } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  console.log(status);

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     NProgress.start();
  //     router.push("/dashboard");
  //   }
  // }, [status]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    }).then((res) => {
      if (res?.ok) {
        router.push("/dashboard");
      } else {
        console.log(res?.error);
        setWrongPass("email or password is incorrect");
      }
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mx-auto h-10 w-auto text-center">Logo</div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Welcome to useSocialProof
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
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
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:primary-foreground sm:text-sm sm:leading-6"
              />
            </div>
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
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:primary-foreground sm:text-sm sm:leading-6"
              />
            </div>
            {wrongPass && (
              <p className="text-red-500 text-sm pt-1">{wrongPass}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={!email || !password}
              className="cursor-pointer flex w-full justify-center rounded-md bg-primary-foreground px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-muted-foreground transition duration-150"
            >
              Sign in
            </button>
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href="signup"
              className="font-semibold leading-6 text-gray-900 hover:text-gray-800"
            >
              Sign up
            </Link>
          </p>

          {/* <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:primary-foreground sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              onClick={() =>
                signIn("email", {
                  email,
                  callbackUrl: "/dashboard",
                })
              }
              disabled={!email}
              className="cursor-pointer flex w-full justify-center rounded-md bg-primary-foreground px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-muted-foreground transition duration-150"
            >
              Continue with email
            </button>
          </div> */}
        </form>
        <div className="relative flex py-8 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <button
          onClick={() =>
            signIn("google", {
              redirect: true,
              callbackUrl: "/dashboard",
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
  );
};

export default Signin;
