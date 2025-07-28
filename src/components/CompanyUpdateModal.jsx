'use client'

import { axiosInstance } from "@/utils/axiosInstance"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

 
const CompanyUpdateModal = ({ updateData, setCompanyData, closeModal, search, currentPage , setPaginate}) => {
         const {
            register,
            handleSubmit,
            setValue,
            formState: { errors }
        } = useForm()
    
        useEffect(() => {
            if (updateData) {
                Object.keys(updateData).forEach((key) => {
                    setValue(key, updateData[key])
                })
            }
        }, [updateData, setValue])
const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async (data) => {
        console.log('Updated Driver Data:', data)
        setIsLoading(true)
        try {
            const res = await axiosInstance.patch(`/api/v1/admin/companies/${updateData?._id}`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log("the update res is", res)
            if (res?.data?.success == true) {
                toast('Driver Info Updated')
                const response = await axiosInstance.get(
                    `/api/v1/admin/company?search=${search}&limit=10&page=${currentPage}`
                );
                if (response?.data?.success == true) {
                    console.log("the response is", response)
                    setCompanyData(response?.data?.data || [])
                    setPaginate(response?.data?.paginate || {})
                    closeModal(false)
                }
             } else {
                toast.error('Failed to update the Company information')
            }
        } catch (error) {
            console.error('the error is', error)
            toast.error('Something went wrong', error)
        }finally{
            setIsLoading(false)
        }
    }
  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900/60 via-purple-900/40 to-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] relative overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300 flex flex-col">
              {/* Header */}
              <div className="flex-shrink-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 px-6 py-5 md:px-8 md:py-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-8 translate-x-8"></div>
                  <button
                      onClick={() => closeModal(false)}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:rotate-90 transition-all duration-300 flex items-center justify-center group"
                  >
                      <span className="text-xl font-light">×</span>
                  </button>
                  <div className="relative z-10">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">Update Company</h2>
                      <p className="text-white/80 text-sm md:text-base">Keep your company information current and accurate</p>
                  </div>
              </div>

              {/* Scrollable Form Area */}
              <div className="flex-1 overflow-y-auto">
                  <div className="p-6 md:p-8">
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                          {/* Company Details Section */}
                          <div className="space-y-6">
                              <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                          <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" />
                                      </svg>
                                  </div>
                                  <h3 className="text-lg font-semibold text-gray-800">Company Information</h3>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="relative group">
                                      <input
                                          {...register("company_name")}
                                          placeholder="Company Name"
                                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700 hover:border-gray-300 group-hover:shadow-sm"
                                      />
                                  </div>
                                  <div className="relative group">
                                      <input
                                          type="number"
                                          {...register("company_established")}
                                          placeholder="Established Year"
                                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700 hover:border-gray-300 group-hover:shadow-sm"
                                      />
                                  </div>
                                  <div className="relative group">
                                      <input
                                          type="number"
                                          {...register("company_registration_no")}
                                          placeholder="Registration Number"
                                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700 hover:border-gray-300 group-hover:shadow-sm"
                                      />
                                  </div>
                                  <div className="relative group">
                                      <input
                                          type="url"
                                          {...register("company_website")}
                                          placeholder="Website URL"
                                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700 hover:border-gray-300 group-hover:shadow-sm"
                                      />
                                  </div>
                              </div>
                          </div>

                          {/* Address Section */}
                          <div className="space-y-6">
                              <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                      </svg>
                                  </div>
                                  <h3 className="text-lg font-semibold text-gray-800">Address Details</h3>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="relative group md:col-span-2">
                                      <input
                                          {...register("company_address1")}
                                          placeholder="Address Line 1"
                                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700 hover:border-gray-300 group-hover:shadow-sm"
                                      />
                                  </div>
                                  <div className="relative group md:col-span-2">
                                      <input
                                          {...register("company_address2")}
                                          placeholder="Address Line 2 (Optional)"
                                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700 hover:border-gray-300 group-hover:shadow-sm"
                                      />
                                  </div>
                                  <div className="relative group">
                                      <input
                                          {...register("city")}
                                          placeholder="City"
                                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700 hover:border-gray-300 group-hover:shadow-sm"
                                      />
                                  </div>
                                  <div className="relative group">
                                      <input
                                          {...register("state")}
                                          placeholder="State / Province"
                                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700 hover:border-gray-300 group-hover:shadow-sm"
                                      />
                                  </div>
                                  <div className="relative group">
                                      <input
                                          type="text"
                                          {...register("zip_code")}
                                          placeholder="Zip / Postal Code"
                                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700 hover:border-gray-300 group-hover:shadow-sm"
                                      />
                                  </div>
                              </div>
                          </div>

                          {/* Contact Information Section */}
                          <div className="space-y-6">
                              <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                      </svg>
                                  </div>
                                  <h3 className="text-lg font-semibold text-gray-800">Primary Contact</h3>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="relative group">
                                      <input
                                          {...register("primary_contact_firstname")}
                                          placeholder="First Name"
                                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700 hover:border-gray-300 group-hover:shadow-sm"
                                      />
                                  </div>
                                  <div className="relative group">
                                      <input
                                          {...register("primary_contact_lastname")}
                                          placeholder="Last Name"
                                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700 hover:border-gray-300 group-hover:shadow-sm"
                                      />
                                  </div>
                                  <div className="relative group">
                                      <input
                                          type="email"
                                          {...register("primary_contact_email")}
                                          placeholder="Email Address"
                                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700 hover:border-gray-300 group-hover:shadow-sm"
                                      />
                                  </div>
                                  <div className="relative group">
                                      <input
                                          type="tel"
                                          {...register("primary_contact_mobile")}
                                          placeholder="Mobile Number"
                                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700 hover:border-gray-300 group-hover:shadow-sm"
                                      />
                                  </div>
                              </div>
                          </div>

                          {/* Submit Button */}
                          <div className="flex justify-end pt-8 border-t border-gray-200">
                              <button
                                  type="submit"
                                  disabled={isLoading}
                                  className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 text-white font-semibold px-6 py-3 md:px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                              >
                                 { isLoading ? <><span>Updating...</span></> :<span>Update Company</span>}
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                  </svg>
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
    )
}

export default CompanyUpdateModal