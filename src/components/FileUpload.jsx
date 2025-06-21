// src/components/FileUpload.jsx
import React, { useRef } from 'react';

function FileUpload({ label, id, selectedFileName, onFileChange, buttonText = 'Upload', ...props }) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="block text-gray-700 text-sm font-medium mb-2">{label}</label>
      <div className="flex items-center space-x-3">
        <input
          type="text"
          readOnly
          value={selectedFileName || ''}
          placeholder="Tidak ada file yang dipilih"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-teal-500 bg-gray-50 cursor-default"
        />
        <input
          type="file"
          id={id}
          name={id}
          ref={fileInputRef}
          onChange={onFileChange}
          className="hidden" // Sembunyikan input file asli
          {...props}
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md shadow-sm transition duration-300 whitespace-nowrap"
        >
          {buttonText}
        </button>
      </div>
      {selectedFileName && (
        <p className="text-xs text-gray-500 mt-1">File terpilih: {selectedFileName}</p>
      )}
    </div>
  );
}

export default FileUpload;