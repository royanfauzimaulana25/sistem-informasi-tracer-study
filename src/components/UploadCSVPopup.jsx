// src/components/UploadCsvPopup.jsx
import React, { useState } from 'react';
import { FaTimes, FaCloudUploadAlt } from 'react-icons/fa'; // Ikon upload

function UploadCsvPopup({ isOpen, onClose, onSubmitCsv }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'text/csv') {
        setError('Hanya file CSV (.csv) yang diperbolehkan.');
        setSelectedFile(null);
        setFileName('');
        return;
      }
      setSelectedFile(file);
      setFileName(file.name);
      setError('');
    } else {
      setSelectedFile(null);
      setFileName('');
      setError('');
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      setError('Pilih file CSV terlebih dahulu.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvString = event.target.result;
        // Parse CSV string into an array of objects
        const lines = csvString.split('\n').filter(line => line.trim() !== ''); // Filter baris kosong
        if (lines.length === 0) {
          setError('File CSV kosong atau tidak valid.');
          return;
        }

        const headers = lines[0].split(',').map(header => header.trim());
        const data = [];

        for (let i = 1; i < lines.length; i++) {
          const currentline = lines[i].split(',');
          const obj = {};
          for (let j = 0; j < headers.length; j++) {
            // Trim whitespace dari nilai
            obj[headers[j]] = currentline[j] ? currentline[j].trim() : '';
          }
          data.push(obj);
        }

        onSubmitCsv(data); // Kirim data parsed ke parent component
        setSelectedFile(null);
        setFileName('');
        setError('');
        onClose(); // Tutup popup setelah submit
      } catch (e) {
        setError('Gagal membaca atau mem-parse file CSV. Pastikan formatnya benar.');
        console.error('Error parsing CSV:', e);
      }
    };
    reader.onerror = () => {
      setError('Gagal membaca file.');
    };
    reader.readAsText(selectedFile); // Baca file sebagai teks
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-[#00000059] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-200"
        >
          <FaTimes className="text-2xl" />
        </button>

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Upload Data Alumni (CSV)</h2>

        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6 text-center hover:border-teal-500 transition duration-200 cursor-pointer">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
            id="csv-upload-input"
          />
          <label htmlFor="csv-upload-input" className="cursor-pointer">
            <FaCloudUploadAlt className="text-5xl text-gray-400 mb-3 mx-auto" />
            <p className="text-gray-600 font-medium">Klik untuk memilih file</p>
            {fileName && <p className="mt-2 text-sm text-gray-500">File terpilih: {fileName}</p>}
          </label>
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            disabled={!selectedFile} // Disable jika tidak ada file terpilih
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-12 rounded-md shadow-lg text-lg transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadCsvPopup;