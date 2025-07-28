'use client'

import { axiosInstance } from '@/utils/axiosInstance'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const DriversUpdateModal = ({ updateData, closeModal,setDriverData,search, currentPage }) => {
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

    const [isLoading,setIsLoading]= useState(false)
    const onSubmit = async (data) => {
        console.log('Updated Driver Data:', data)
         setIsLoading(true)
         try {
            const res= await axiosInstance.patch(`/api/v1/admin/drivers/${updateData?._id}`, data, {
                headers:{
                    'Content-Type':'application/json'
                }
            })
            console.log("the update res is", res)
            if(res?.data?.success== true){
                toast('Driver Info Updated')
            const response = await axiosInstance.get(
                    `/api/v1/admin/driver?search=${search}&limit=10&page=${currentPage}`
                    );
                    if(response?.data?.success== true){
                        setDriverData(response?.data?.data)
                    }               
             closeModal(false)
            }else{
                toast.error('Failed to update the drivers infor')
            }
         } catch (error) {
            console.error('the error is', error)
            toast.error('Something went wrong', error)
         }finally{
            setIsLoading(false)
         }
     }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
                <button
                    onClick={()=>closeModal(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-semibold mb-4">Update Driver</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input {...register('first_name')} placeholder="First Name" className="input" />
                    <input {...register('last_name')} placeholder="Last Name" className="input" />
                    <input {...register('email')} placeholder="Email" className="input" />
                    <input {...register('mobile')} placeholder="Mobile" className="input" />
                    <input {...register('license')} placeholder="License" className="input" />
                    <input {...register('experience')} placeholder="Experience" type="number" className="input" />
                    <input {...register('address1')} placeholder="Address 1" className="input" />
                    <input {...register('address2')} placeholder="Address 2" className="input" />
                    <input {...register('city')} placeholder="City" className="input" />
                    <input {...register('state')} placeholder="State" className="input" />
                    <input {...register('zipcode')} placeholder="Zip Code" className="input" />

                    <div className="col-span-full flex justify-end mt-4">
                        <button disabled={isLoading} type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                            {isLoading ? <span>Updating...</span>:<span>Update</span>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DriversUpdateModal
