import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import FormInput from './FormInput';

function AddAlumniPopup({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    nis: '',
    nisn: '',
    tanggal_lahir: '',
    nik: '',
    nama_siswa: '',
    tahun_lulus: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allFieldsFilled = Object.values(formData).every(
      (value) => value.toString().trim() !== ''
    );

    if (!allFieldsFilled) {
      alert('Mohon lengkapi semua data.');
      return;
    }

    onSubmit(formData);

    setFormData({
      nis: '',
      nisn: '',
      tanggal_lahir: '',
      nik: '',
      nama_siswa: '',
      tahun_lulus: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000059] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-200"
        >
          <FaTimes className="text-2xl" />
        </button>

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Tambah Data Alumni</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <FormInput
              label="NIS (Nomor Induk Siswa)"
              id="nis"
              type="text"
              placeholder="Masukkan NIS"
              value={formData.nis}
              onChange={handleChange}
              required
            />
            <FormInput
              label="NISN (Nomor Induk Siswa Nasional)"
              id="nisn"
              type="text"
              placeholder="Masukkan NISN"
              value={formData.nisn}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Tanggal Lahir"
              id="tanggal_lahir"
              type="date"
              value={formData.tanggal_lahir}
              onChange={handleChange}
              required
            />
            <FormInput
              label="NIK (Nomor Induk Kependudukan)"
              id="nik"
              type="text"
              placeholder="Masukkan NIK"
              value={formData.nik}
              onChange={handleChange}
              required
              minLength={16}
            />
            <FormInput
              label="Nama Siswa"
              id="nama_siswa"
              type="text"
              placeholder="Masukkan Nama Siswa"
              value={formData.nama_siswa}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Tahun Lulus"
              id="tahun_lulus"
              type="number"
              placeholder="Masukkan Tahun Lulus"
              value={formData.tahun_lulus}
              onChange={handleChange}
              required
              min="2000"
              max={new Date().getFullYear()}
            />
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-12 rounded-md shadow-lg text-lg transition duration-300 transform hover:scale-105"
            >
              Tambah Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAlumniPopup;
