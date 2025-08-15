'use client';
import DeleteModal from '@/components/DeleteModal';
import DriversDetailsModal from '@/components/DriversDetailsModal';
import DriversUpdateModal from '@/components/DriversUpdateModal';
import { axiosInstance } from '@/utils/axiosInstance';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Search, Plus, UserPlus } from 'lucide-react'
import useDebounce from '@/utils/debounce';

const Page = () => {
  const [driverData, setDriverData] = useState([]);
  const [paginate, setPaginate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [updateData, setUpdateData] = useState()
  const [updateModal, setUpdateModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [detailsModal, setDetailsModal] = useState(false)
  const [id, setId]= useState(null)  
  const debounceSearch = useDebounce(search, 500)
  const handleDelete = async (id) => {
    setId(id)
    setDeleteModal(true)
  }

  const handleUpdate=async(data)=>{
    setUpdateData(data)
    setUpdateModal(true)
  }

const handleShowDetails =(data)=>{
  setUpdateData(data)
  setDetailsModal(true)
}
  const handlePageChange = (page) => {
    if (page > 0 && page <= paginate?.totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/admin/driver?search=${debounceSearch}&limit=10&page=${currentPage}`
        );

        if (response?.data?.success === true) {
          setDriverData(response?.data?.data || []);
          setPaginate(response?.data?.paginate || {});
          toast('Drivers data is retrieved')
        }
      } catch (error) {
        console.error('Error fetching drivers:', error);
        toast.error(`Something went erong error is:${error}`)
      }
    };

    fetchDrivers()
    ;
  }, [currentPage, debounceSearch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Drivers</h2>

      {/* Search */}
  <div className='flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between'>
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search drivers..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Add Driver Button */}
      <Link 
        href={`/dashboard/drivers/add-driver`} 
        className='inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap'
      >
        <UserPlus className="w-4 h-4" />
        Add Driver
      </Link>
    </div>
     
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-md">
          <thead>
            <tr className="bg-gray-200 text-left text-sm text-gray-600">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Mobile</th>
              <th className="p-3 border">City</th>
              <th className="p-3 border">State</th>
              <th className="p-3 border">Experience</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {driverData?.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No drivers found
                </td>
              </tr>
            ) : (
             driverData?.length >0 && driverData?.map((driver) => (
                <tr key={driver?._id} className="text-sm border-t">
                  <td className="p-3">
                    {driver?.first_name} {driver?.last_name}
                  </td>
                  <td className="p-3">{driver?.email}</td>
                  <td className="p-3">{driver?.mobile}</td>
                  <td className="p-3">{driver?.city}</td>
                  <td className="p-3">{driver?.state}</td>
                  <td className="p-3">{driver?.experience} yrs</td>
                  <td className="p-3 space-x-2">
                    <button onClick={()=>handleShowDetails(driver)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">
                      View
                    </button>
                   <button onClick={() => handleUpdate(driver)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs">
                      Edit
                    </button>
                    <button onClick={()=> handleDelete(driver?._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {paginate?.totalPages >= 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: paginate.totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
                }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === paginate.totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}


       {/** modals section is */}
       {detailsModal && <DriversDetailsModal data={updateData} closeModal={setDetailsModal} />}
      {updateModal && <DriversUpdateModal updateData={updateData} setDriverData={setDriverData} closeModal={setUpdateModal} search={search} currentPage={currentPage}  />}
      
      {deleteModal && <DeleteModal id={id} type='driver' setDeleteModal={setDeleteModal} setData={setDriverData} search={search} currentPage={currentPage} setPaginate={setPaginate} /> }

    </div>
  );

};

export default Page;
