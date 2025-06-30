import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Import FaUpload

function AlumniSearch({ searchQuery, onHandleSearchChange }) {
  return (
    <div className="relative flex-grow flex items-center">
      <input
        type="text"
        placeholder="Cari Alumni (NISN / Nama)"
        value={searchQuery}
        onChange={onHandleSearchChange}
        className="w-full py-3 pl-4 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition duration-200"
      />
      <FaSearch className="absolute right-3 text-gray-400" />
    </div>
  )
}

export default AlumniSearch;