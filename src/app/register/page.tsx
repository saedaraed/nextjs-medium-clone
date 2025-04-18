"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const schema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
    bio: Yup.string().required("Bio is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
}).required();

interface FormData {
  username: string;
  email: string;
  password: string;
  bio:string
}

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const {user, loading, error, register: registerUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);
  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data.username, data.email, data.password , data.bio);
      console.log("User registered successfully:", data);
      router.replace("/");
      
    } catch (err) {
      console.error("Error during registration", err);
    }
  };

  return (
    <div
      className="relative min-h-screen  pt-20"
      style={{
        backgroundImage:
          'url("https://plus.unsplash.com/premium_photo-1667761634654-7fcf176434b8?q=80&w=2037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', // Update to a direct image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-[rgb(240, 246, 252)] opacity-95 backdrop-blur-lg"></div>
      <div className="container w-full md:w-1/2 mx-auto relative z-10">
        <h2 className="text-center text-[30px] font-bold">Join FreePen</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 mb-6 md:grid-cols-1">
          <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username:
              </label>
              <input
                type="text"
                {...register("username")}
                placeholder="Enter your username"
                className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#bd88c9] focus:border-[#bd88c9]  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email:
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#bd88c9] focus:border-[#bd88c9]  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Bio:
              </label>
              <textarea
                {...register("bio")}
                placeholder="take about yourself .."
                className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#bd88c9] focus:border-[#bd88c9]  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password:
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="Enter your password"
                className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#bd88c9] focus:border-[#bd88c9]  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="text-black bg-[#bd88c9]  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {loading ? "Registering..." : "Register"}
            </button>
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {error}
              </p>
            )}
          </div>
        </form>
        <div></div>
      </div>
    </div>
  );
};

export default RegisterPage;
