'use client'

import { useForm } from 'react-hook-form'
 import { useState } from 'react'
import { axiosInstance } from '@/utils/axiosInstance'
import toast from 'react-hot-toast'

const CompanyFormPage = () => {
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
            const res = await axiosInstance.post(`/api/v1/admin/company`, data)
            console.log('the res is', res)
            if(res?.data?.status== true){
                toast("Company Added successfully")
                setSuccessMsg('Company added successfully!')
                reset()
            }
         } catch (error) {
            toast.error("Failed to add the company")
            setErrorMsg(error?.response?.data?.message || 'Failed to add company')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-cyan-100 p-4">
            <div className="bg-white/95 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-5xl border border-white/20 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl translate-y-24 -translate-x-24"></div>

                 <div className="text-center mb-8 relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" />
                        </svg>
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent mb-2">
                        Add New Company
                    </h2>
                    <p className="text-gray-600 text-lg">Create a comprehensive company profile</p>
                </div>

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

                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                     <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Company Information</h3>
                            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative group">
                                <input
                                    {...register("company_name", { required: true })}
                                    placeholder="Company Name *"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-indigo-300 hover:shadow-md font-medium"
                                />
                            </div>
                            <div className="relative group">
                                <input
                                    type="number"
                                    {...register("company_established", { required: true })}
                                    placeholder="Established Year *"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-indigo-300 hover:shadow-md font-medium"
                                />
                            </div>
                            <div className="relative group">
                                <input
                                    type="number"
                                    {...register("company_registration_no", { required: true })}
                                    placeholder="Registration Number *"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-indigo-300 hover:shadow-md font-medium"
                                />
                            </div>
                            <div className="relative group">
                                <input
                                    type="url"
                                    {...register("company_website")}
                                    placeholder="Website URL"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-indigo-300 hover:shadow-md font-medium"
                                />
                            </div>
                        </div>
                    </div>

                     <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
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
                                    {...register("company_address1")}
                                    placeholder="Address Line 1"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-emerald-300 hover:shadow-md font-medium"
                                />
                            </div>
                            <div className="relative group">
                                <input
                                    {...register("company_address2")}
                                    placeholder="Address Line 2"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-emerald-300 hover:shadow-md font-medium"
                                />
                            </div>
                            <div className="relative group">
                                <input
                                    {...register("city")}
                                    placeholder="City"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-emerald-300 hover:shadow-md font-medium"
                                />
                            </div>
                            <div className="relative group">
                                <input
                                    {...register("state")}
                                    placeholder="State"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-emerald-300 hover:shadow-md font-medium"
                                />
                            </div>
                            <div className="relative group md:col-span-2">
                                <input
                                    type="number"
                                    {...register("zip_code")}
                                    placeholder="Zip Code"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-emerald-300 hover:shadow-md font-medium"
                                />
                            </div>
                        </div>
                    </div>

                     <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Primary Contact</h3>
                            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative group">
                                <input
                                    {...register("primary_contact_firstname")}
                                    placeholder="First Name"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-rose-300 hover:shadow-md font-medium"
                                />
                            </div>
                            <div className="relative group">
                                <input
                                    {...register("primary_contact_lastname")}
                                    placeholder="Last Name"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-rose-300 hover:shadow-md font-medium"
                                />
                            </div>
                            <div className="relative group">
                                <input
                                    type="email"
                                    {...register("primary_contact_email")}
                                    placeholder="Email Address"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-rose-300 hover:shadow-md font-medium"
                                />
                            </div>
                            <div className="relative group">
                                <input
                                    {...register("primary_contact_mobile")}
                                    placeholder="Mobile Number"
                                    className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-300 placeholder-gray-500 text-gray-800 hover:border-rose-300 hover:shadow-md font-medium"
                                />
                            </div>
                        </div>
                    </div>

                     <div className="flex justify-center pt-8 border-t border-gray-200">
                        <button
                            type="submit"
                            className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 text-white font-bold px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
                        >
                            <span className="relative z-10">Submit Company</span>
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

export default CompanyFormPage
