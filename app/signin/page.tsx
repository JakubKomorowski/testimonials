"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signIn, getProviders, useSession } from "next-auth/react";
import * as NProgress from "nprogress";
import { usePRouter } from "@/hooks/usePRouter";

const Signin = () => {
  const [email, setEmail] = useState("");
  // const router = useRouter();
  // const providers = await getProviders();
  const router = usePRouter();
  const { status } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  console.log({ status, router, pathname, searchParams });
  useEffect(() => {
    if (status === "authenticated") {
      NProgress.start();
      router.push("/dashboard");
    }
  }, [status]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mx-auto h-10 w-auto text-center">Logo</div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Welcome to useSocialProof
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
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
          </div>
        </form>
        <div className="relative flex py-8 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <button
          onClick={() => signIn("google")}
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
