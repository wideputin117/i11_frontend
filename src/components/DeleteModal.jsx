'use client'

import { axiosInstance } from "@/utils/axiosInstance"
import { useState } from "react";
import toast from "react-hot-toast";

const DeleteModal = ({ id, type,setDeleteModal, setData, search, currentPage, setPaginate }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const deleteUrl = `/api/v1/admin/${type === 'driver' ? 'drivers' : 'companies'}/${id}`;
    const fetchUrl = `/api/v1/admin/${type === 'driver' ? 'driver' : 'company'}`;

    try {
      const res = await axiosInstance.delete(deleteUrl);
      if (res?.data?.success) {
        toast.success(`${type} deleted successfully`);

        const { data } = await axiosInstance.get(`${fetchUrl}?search=${search}&limit=10&page=${currentPage}`);
        if (data?.success) {
          setData(data.data || []);
          setPaginate(data.paginate || {});
        }

        setDeleteModal(false);
      } else {
        toast.error(res?.data?.message || `Failed to delete ${type}`);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || `Error deleting ${type}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-300 flex flex-col overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="p-6 flex items-start space-x-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">Confirm Deletion</h2>
            <p className="text-gray-600 mt-1">
              Are you sure you want to delete this {type}? This action cannot be undone.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end items-center space-x-3 border-t border-gray-200">
          <button
            onClick={() => setDeleteModal(false)}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>  )
}

export default DeleteModal