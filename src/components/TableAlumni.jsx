import React from 'react';


function TableAlumni({ currentItems, onDetailClick, onDeleteClick }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama Siswa
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tahun Lulus
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status Siswa
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status Kuesioner
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((alumni, index) => (
                <tr key={index + 1}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {alumni.personal_data.nama_siswa}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {alumni.personal_data.tahun_lulus}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {alumni.tracer_data.status  ? alumni.tracer_data.status  : 'Belum Mengisi' }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {alumni.tracer_data.is_filled ? 'Sudah Mengisi' : 'Belum Mengisi' }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-center">
                    <button
                      onClick={() => onDetailClick(alumni)}
                      className="bg-teal-100 text-teal-600 hover:bg-teal-200 py-2 px-4 rounded-md text-xs font-semibold transition duration-200"
                    >
                    Detail
                    </button>
                    <button
                      onClick={() => onDeleteClick(alumni.personal_data.id_alumni)}
                      className="bg-red-100 text-red-600 hover:bg-red-200 py-2 px-4 rounded-md text-xs font-semibold transition duration-200"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                Tidak ada data alumni yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableAlumni;