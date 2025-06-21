// src/components/AddAlumniPopup.jsx
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // Ikon silang untuk menutup
import FormInput from './FormInput'; // Gunakan FormInput untuk input teks biasa

function AddAlumniPopup({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    nis: '',
    nisn: '',
    tanggalLahir: '',
    nik: '',
    namaSiswa: '',
    tahunLulus: ''
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
    // Simulasi validasi sederhana
    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');

    if (!allFieldsFilled) {
      alert('Mohon lengkapi semua data.');
      return;
    }

    onSubmit(formData); // Kirim data ke parent component
    setFormData({ // Reset form setelah submit
      nis: '',
      nisn: '',
      tanggalLahir: '',
      nik: '',
      namaSiswa: '',
      tahunLulus: ''
    });
  };

  if (!isOpen) {
    return null; // Tidak merender apa-apa jika popup tidak terbuka
  }

  return (
    // Overlay latar belakang semi-transparan
    <div className="fixed inset-0 bg-[#00000059] flex items-center justify-center z-50 p-4">
      {/* Container utama popup */}
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full relative">
        {/* Tombol Tutup */}
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
            />
            <FormInput
              label="NISN (Nomor Induk Siswa Nasional)"
              id="nisn"
              type="text"
              placeholder="Masukkan NISN"
              value={formData.nisn}
              onChange={handleChange}
            />
            <FormInput
              label="Tanggal Lahir"
              id="tanggalLahir"
              type="date" // Menggunakan type="date" untuk date picker
              placeholder="Pilih Tanggal Lahir"
              value={formData.tanggalLahir}
              onChange={handleChange}
            />
            <FormInput
              label="NIK (Nomor Induk Kependudukan)"
              id="nik"
              type="text"
              placeholder="Masukkan NIK"
              value={formData.nik}
              onChange={handleChange}
            />
            <FormInput
              label="Nama Siswa"
              id="namaSiswa"
              type="text"
              placeholder="Masukkan Nama Siswa"
              value={formData.namaSiswa}
              onChange={handleChange}
            />
            <FormInput
              label="Tahun Lulus"
              id="tahunLulus"
              type="number" // Menggunakan type="number"
              placeholder="Masukkan Tahun Lulus"
              value={formData.tahunLulus}
              onChange={handleChange}
            />
          </div>

          {/* Tombol Tambah Data */}
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