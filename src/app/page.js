"use client";

import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const login = async (data) => {
    const formdata = { email: data?.email, password: data?.password };
    try {
      const res = await axiosInstance.post(`/api/v1/auth/login`, formdata, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("the res is", res);
      if (res?.data?.success == true) {
        localStorage.setItem("userLoggedIn", true);
        toast.success("Welcome back! You are logged in successfully");
        router.push(`/dashboard`);
      }
    } catch (error) {
      console.error("the error is", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Please sign in to your account</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div onSubmit={handleSubmit(login)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address"
                    }
                  })}
                  placeholder="Enter your email"
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.email 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-4 h-4 text-red-500">⚠</span>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  placeholder="Enter your password"
                  className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.password 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-4 h-4 text-red-500">⚠</span>
                  {errors.password.message}
                </p>
              )}
            </div>

             {/* <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Forgot password?
              </a>
            </div> */}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit(login)}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          {/* <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                Sign up here
              </a>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}