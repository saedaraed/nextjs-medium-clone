"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const schema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
}).required();

interface FormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const { loading, error, login, loginWithGoogle } = useAuth();
  const router = useRouter();
  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
      router.replace("/");
    } catch (err) {
      console.error("Error during login", err);
    }
  };

  return (
    <div
      className="relative min-h-screen  pt-40"
      // style={{
      //   backgroundImage:
      //     'url("https://plus.unsplash.com/premium_photo-1667761634654-7fcf176434b8?q=80&w=2037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', // Update to a direct image URL
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundAttachment: "fixed",
      // }}
    >
      {/* <div className="absolute inset-0 bg-[rgb(240, 246, 252)] opacity-95 backdrop-blur-lg"></div> */}

      <div className="container w-full md:w-1/2 mx-auto relative z-10">
        <h2 className="text-center text-[30px] text-[#3B0014] font-bold">Welcome back!</h2>
        <p className="text-center text-black/60 text-[20px]">
          Welcome back Please enter your details
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 mb-6 md:grid-cols-1 mt-5">
            <div className="">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email address
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#bd88c9] focus:border-[#3B0014]  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.email && (
                <p className=" text-sm text-red-600 dark:text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="Enter your password"
                className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#bd88c9] focus:border-[#3B0014]  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {errors.password && (
                <p className=" text-sm text-red-600 dark:text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              text="Login"
              type="submit"
              variant="secondary"
              disabled={loading}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {error}
              </p>
            )}
          </div>
        </form>

        <div className="w-full">
          <Button
            text="Sign in with Google"
            onClick={loginWithGoogle}
            variant="outlined"
            disabled={loading}
          />
        </div>
        <div>
          <p className="text-center text-[17px] mt-5">
          Don&apos;t have an account?
          <Link href="/register" className="text-[#3B0014] font-bold">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
