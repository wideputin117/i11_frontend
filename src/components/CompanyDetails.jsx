'use client'

import { X } from 'lucide-react'

const CompanyDetails = ({ closeModal, data }) => {
   const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  // Format the data for display
  const formatLabel = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
  }

  const formatValue = (value) => {
    if (value === null || value === undefined || value === '') {
      return 'N/A'
    }
    return value.toString()
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Company Details</h2>
          <button
            onClick={()=>closeModal(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {data ? (
            <div className="space-y-6">
              {/* Company Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">
                  Company Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {formatLabel('company_name')}
                    </label>
                    <p className="text-gray-800 bg-gray-50 p-2 rounded">
                      {formatValue(data.company_name)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {formatLabel('company_established')}
                    </label>
                    <p className="text-gray-800 bg-gray-50 p-2 rounded">
                      {formatValue(data.company_established)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {formatLabel('company_registration_no')}
                    </label>
                    <p className="text-gray-800 bg-gray-50 p-2 rounded">
                      {formatValue(data.company_registration_no)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {formatLabel('company_website')}
                    </label>
                    <p className="text-gray-800 bg-gray-50 p-2 rounded">
                      {data.company_website ? (
                        <a 
                          href={data.company_website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {data.company_website}
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">
                  Address Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {formatLabel('company_address1')}
                    </label>
                    <p className="text-gray-800 bg-gray-50 p-2 rounded">
                      {formatValue(data.company_address1)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {formatLabel('company_address2')}
                    </label>
                    <p className="text-gray-800 bg-gray-50 p-2 rounded">
                      {formatValue(data.company_address2)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {formatLabel('city')}
                    </label>
                    <p className="text-gray-800 bg-gray-50 p-2 rounded">
                      {formatValue(data.city)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {formatLabel('state')}
                    </label>
                    <p className="text-gray-800 bg-gray-50 p-2 rounded">
                      {formatValue(data.state)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {formatLabel('zip_code')}
                    </label>
                    <p className="text-gray-800 bg-gray-50 p-2 rounded">
                      {formatValue(data.zip_code)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Primary Contact Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">
                  Primary Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {formatLabel('primary_contact_firstname')}
                    </label>
                    <p className="text-gray-800 bg-gray-50 p-2 rounded">
                      {formatValue(data.primary_contact_firstname)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {formatLabel('primary_contact_lastname')}
                    </label>
                    <p className="text-gray-800 bg-gray-50 p-2 rounded">
                      {formatValue(data.primary_contact_lastname)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {formatLabel('primary_contact_email')}
                    </label>
                    <p className="text-gray-800 bg-gray-50 p-2 rounded">
                      {data.primary_contact_email ? (
                        <a 
                          href={`mailto:${data.primary_contact_email}`}
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {data.primary_contact_email}
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {formatLabel('primary_contact_mobile')}
                    </label>
                    <p className="text-gray-800 bg-gray-50 p-2 rounded">
                      {data.primary_contact_mobile ? (
                        <a 
                          href={`tel:${data.primary_contact_mobile}`}
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {data.primary_contact_mobile}
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </div>
                </div>
              </div>

             
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No company data available</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={closeModal}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompanyDetails