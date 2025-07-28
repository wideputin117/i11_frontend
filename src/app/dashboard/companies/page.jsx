 


'use client';

import CompanyUpdateModal from '@/components/CompanyUpdateModal';
import DeleteModal from '@/components/DeleteModal';
import { axiosInstance } from '@/utils/axiosInstance';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [companyData, setCompanyData] = useState([]);
  const [paginate, setPaginate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [updateData, setUpdateData] = useState()
  const [updateModal, setUpdateModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [detailsModal, setDetailsModal] = useState(false)
  const [id, setId]= useState(null)  
  const handleUpdate = async (data) => {
    setUpdateData(data)
    setUpdateModal(true)
  }
  const handleDelete =async(id)=>{
    setId(id)
    setDeleteModal(true)
  }


  const handlePageChange = (page) => {
    if (page > 0 && page <= paginate?.totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/admin/company?search=${search}&limit=10&page=${currentPage}`
        );

        if (response?.data?.success === true) {
          setCompanyData(response?.data?.data || []);
          setPaginate(response?.data?.paginate || {});
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, [currentPage, search]);
console.log("the updated data is", companyData)

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Companies</h2>

       <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);  
        }}
        placeholder="Search companies..."
        className="mb-4 px-4 py-2 border rounded-md w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Link href={`/dashboard/companies/add-company`}>
        Add a Company
      </Link>

       <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-md">
          <thead>
            <tr className="bg-gray-200 text-left text-sm text-gray-600">
              <th className="p-3 border">Company Name</th>
              <th className="p-3 border">City</th>
              <th className="p-3 border">State</th>
              <th className="p-3 border">Primary Contact</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companyData == null && companyData?.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No companies found
                </td>
              </tr>
            ) : (
             companyData !=null && companyData?.map((company) => (
                <tr key={company?._id} className="text-sm border-t">
                  <td className="p-3">{company?.company_name}</td>
                  <td className="p-3">{company?.city}</td>
                  <td className="p-3">{company?.state}</td>
                  <td className="p-3">
                    {company?.primary_contact_firstname} {company?.primary_contact_lastname}
                  </td>
                  <td className="p-3 space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">
                      View
                    </button>
                    <button onClick={()=> handleUpdate(company)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs">
                      Edit
                    </button>
                    <button onClick={()=> handleDelete(company?._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
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
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100'
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

      {/** update modals are */}
      {updateModal && <CompanyUpdateModal setPaginate={setPaginate} updateData={updateData} setCompanyData={setCompanyData} closeModal={setUpdateModal} search={search} currentPage={currentPage} />}
      {deleteModal && <DeleteModal setPaginate={setPaginate} setDeleteModal={setDeleteModal} setData={setCompanyData} search={search} currentPage={currentPage}  id={id} type='company' />}
    </div>
  );
};

export default Page;
