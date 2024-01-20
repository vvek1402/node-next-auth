"use client";
import React, { useContext, useEffect } from "react";
import "../globals.css";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  console.log(errors)

  const { handleSignIn, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  const onSubmit = (data: any) => {
    handleSignIn(data);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4 antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light">
        <a
          href="#"
          className="inline-block mb-6 text-3xl font-bold tracking-wider uppercase text-primary-dark dark:text-light"
        >
          Node Next Auth
        </a>
        <main>
          <div className="w-full max-w-sm px-4 py-6 space-y-6 bg-white rounded-md dark:bg-darker">
            <h1 className="text-xl font-semibold text-center">Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <input
                className="w-full px-4 py-2 border rounded-md dark:bg-darker dark:border-gray-700 focus:outline-none focus:ring focus:ring-primary-100 dark:focus:ring-primary-darker"
                id="email"
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                  minLength: {
                    value: 3,
                    message: "email must be at least 3 characters long",
                  },
                  maxLength: {
                    value: 30,
                    message: "email must not exceed 8 characters",
                  },
                })}
              />
              <small className="text-red-500 text-xs italic">
                {errors?.email && errors.email.message}
              </small>
              <input
                className="w-full px-4 py-2 border rounded-md dark:bg-darker dark:border-gray-700 focus:outline-none focus:ring focus:ring-primary-100 dark:focus:ring-primary-darker"
                id="password"
                type="password"
                placeholder="******************"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 3,
                    message: "Password must be at least 3 characters long",
                  },
                  maxLength: {
                    value: 8,
                    message: "Password must not exceed 8 characters",
                  },
                })}
              />
              <small className="text-red-500 text-xs italic">
                {errors?.password && errors.password.message}
              </small>{" "}
              <div>
                <button
                  type="submit"
                  className="flex items-center justify-center px-4 py-2 space-x-2 text-white transition-all duration-200 bg-black rounded-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 dark:focus:ring-offset-darker"
                >
                  SignIn
                </button>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>
                  Don't have an account yet? <Link href="/signup" className="text-blue-600 hover:underline">Register</Link>
              </p>
            </div>
            </form>
          </div>
        </main>
      </div>
      <ToastContainer />
    </>
  );
}
