'use client'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { axiosInstance } from '@/utils/axiosInstance'
import toast from 'react-hot-toast'

const DriverFormPage = () => {
    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const res = await axiosInstance.post(`/api/v1/admin/driver`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log('the res is', res)
            if (res?.data?.status == true) {
                toast("Driver Added successfully")
                setSuccessMsg('Driver added successfully!')
                reset()
            }
        } catch (error) {
            toast.error("Failed to add the driver")
            setErrorMsg(error?.response?.data?.message || 'Failed to add driver')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 p-4">
            <div className="bg-white/95 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-5xl border border-white/20 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-200/30 to-blue-200/30 rounded-full blur-3xl translate-y-24 -translate-x-24"></div>

                {/* Header */}
                <div className="text-center mb-8 relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent mb-2">
                        Add New Driver
                    </h2>
                    <p className="text-gray-600 text-lg">Register a new driver with complete details</p>
                </div>

                {/* Messages */}
                <div className="relative z-10 mb-6">
                    {successMsg && (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-4 rounded-xl mb-4 flex items-center space-x-3">
                            <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">{successMsg}</span>
                        </div>
                    )}
                    {errorMsg && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-4 flex items-center space-x-3">
                            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">{errorMsg}</span>
                        </div>
                    )}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                    {/* Personal Information Section */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
                            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative group">
                                <input
                                    {...register("first_name", { required: "First name is required" })}
                                    placeholder="First Name *"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-blue-300 hover:shadow-md font-medium"
                                />
                                {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>}
                            </div>
                            <div className="relative group">
                                <input
                                    {...register("last_name", { required: "Last name is required" })}
                                    placeholder="Last Name *"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-blue-300 hover:shadow-md font-medium"
                                />
                                {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>}
                            </div>
                            <div className="relative group">
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    placeholder="Email Address *"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-blue-300 hover:shadow-md font-medium"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                            <div className="relative group">
                                <input
                                    {...register("mobile", { required: "Mobile number is required" })}
                                    placeholder="Mobile Number *"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-blue-300 hover:shadow-md font-medium"
                                />
                                {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* License & Experience Section */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">License & Experience</h3>
                            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative group">
                                <input
                                    {...register("license", { required: "License number is required" })}
                                    placeholder="License Number *"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-emerald-300 hover:shadow-md font-medium"
                                />
                                {errors.license && <p className="text-red-500 text-sm mt-1">{errors.license.message}</p>}
                            </div>
                            <div className="relative group">
                                <input
                                    type="number"
                                    {...register("experience")}
                                    placeholder="Years of Experience"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-emerald-300 hover:shadow-md font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address Information Section */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Address Details</h3>
                            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative group">
                                <input
                                    {...register("address1", { required: "Address is required" })}
                                    placeholder="Address Line 1 *"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-rose-300 hover:shadow-md font-medium"
                                />
                                {errors.address1 && <p className="text-red-500 text-sm mt-1">{errors.address1.message}</p>}
                            </div>
                            <div className="relative group">
                                <input
                                    {...register("address2")}
                                    placeholder="Address Line 2"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-rose-300 hover:shadow-md font-medium"
                                />
                            </div>
                            <div className="relative group">
                                <input
                                    {...register("city")}
                                    placeholder="City"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-rose-300 hover:shadow-md font-medium"
                                />
                            </div>
                            <div className="relative group">
                                <input
                                    {...register("state")}
                                    placeholder="State"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-rose-300 hover:shadow-md font-medium"
                                />
                            </div>
                            <div className="relative group md:col-span-2">
                                <input
                                    {...register("zipcode")}
                                    placeholder="Zip Code"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-rose-300 hover:shadow-md font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-8 border-t border-gray-200">
                        <button
                            type="submit"
                            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white font-bold px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
                        >
                            <span className="relative z-10">Add Driver</span>
                            <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DriverFormPage