"use client";

import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const router = useRouter()

  const login = async(data) => {
     const formdata = { email:data?.email, password:data?.password}
     try {
      const res = await axiosInstance.post(`/api/v1/auth/login`, formdata,{headers:{
        'Content-Type':'application/json'
      }})
      console.log('the res is', res)
      if(res?.data?.success == true){
         localStorage.setItem('userLoggedIn', true)
         toast('You are logged in')
         router.push(`/dashboard`)
         
      }
     } catch (error) {
      console.error('the error is', error)
     }
  };

  return (
    <div className=" ">
      <form
        onSubmit={handleSubmit(login)}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login
        </h2>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
