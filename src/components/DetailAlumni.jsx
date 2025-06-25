// src/components/AlumniDetailPopup.jsx
import React from 'react';
import { FaTimes } from 'react-icons/fa'; // Ikon silang untuk menutup

function DetailAlumni({ isOpen, onClose, alumniData }) {
  if (!isOpen || !alumniData) {
    return null; // Tidak merender apa-apa jika popup tidak terbuka atau data tidak ada
  }

  // Fungsi pembantu untuk menampilkan status "Belum Mengisi Tracer Study" jika data kosong
  const displayValue = (value) => {
    return value || 'Belum Mengisi Tracer Study';
  };

  return (
    // Overlay latar belakang semi-transparan
    <div className="fixed inset-0  bg-[#00000059] flex items-center justify-center z-50 p-10">
      {/* Container utama popup */}
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full relative">

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Detail Alumni</h2>

        {/* Detail Informasi Umum */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-700">Detail Informasi Umum</h3>
            {/* Contoh badge, bisa disesuaikan logikanya */}
            <span className="bg-teal-100 text-teal-600 px-3 py-1 rounded-full text-sm font-medium">
              {displayValue(alumniData.statusKuesioner)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
            <div>
              <p className="font-medium">NIK</p>
              <p className="text-gray-900 font-semibold">{displayValue(alumniData.nik)}</p>
            </div>
            <div>
              <p className="font-medium">NIS</p>
              <p className="text-gray-900 font-semibold">{displayValue(alumniData.nis)}</p>
            </div>
            <div>
              <p className="font-medium">NISN</p>
              <p className="text-gray-900 font-semibold">{displayValue(alumniData.nisn)}</p>
            </div>
            <div>
              <p className="font-medium">Nama Siswa (Alumni)</p>
              <p className="text-gray-900 font-semibold">{displayValue(alumniData.namaSiswa)}</p>
            </div>
            <div>
              <p className="font-medium">Tahun Lulus</p>
              <p className="text-gray-900 font-semibold">{displayValue(alumniData.tahunLulus)}</p>
            </div>
            <div>
              <p className="font-medium">Tanggal Lahir</p>
              <p className="text-gray-900 font-semibold">{displayValue(alumniData.tanggalLahir)}</p>
            </div>
            <div>
              <p className="font-medium">Alamat Email</p>
              <p className="text-gray-900 font-semibold">{displayValue(alumniData.alamatEmail)}</p>
            </div>
            <div>
              <p className="font-medium">No Telepon / HP</p>
              <p className="text-gray-900 font-semibold">{displayValue(alumniData.nomorTelepon)}</p>
            </div>
            <div className="md:col-span-2"> {/* Span 2 kolom untuk Status AlumniPage */}
              <p className="font-medium">Status Alumni</p>
              <p className="text-gray-900 font-semibold">{displayValue(alumniData.statusSiswa)}</p>
            </div>
          </div>
        </div>

        {/* Detail Pendidikan */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Detail Pendidikan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
            <div>
              <p className="font-medium">Perguruan Tinggi</p>
              <p className="text-gray-900 font-semibold">{displayValue(alumniData.perguruanTinggi)}</p>
            </div>
            <div>
              <p className="font-medium">Program Studi</p>
              <p className="text-gray-900 font-semibold">{displayValue(alumniData.programStudi)}</p>
            </div>
            <div>
              <p className="font-medium">Sumber Pembiayaan</p>
              <p className="text-gray-900 font-semibold">{displayValue(alumniData.sumberPembiayaan)}</p>
            </div>
            <div>
              <p className="font-medium">Bukti Kuliah</p>
              <p className="text-gray-900 font-semibold">{displayValue(alumniData.buktiKuliah)}</p>
            </div>
            <div>
              <p className="font-medium">Tahun Masuk</p>
              <p className="text-gray-900 font-semibold">{displayValue(alumniData.tahunMasukKuliah)}</p>
            </div>
          </div>
        </div>

        {/* Detail Kuesioner Kualitas Sekolah */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Detail Kuesioner Kualitas Sekolah</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 text-gray-700">
            <div>
              <p className="font-medium">Kualitas Pendidikan</p>
              <p className="text-gray-900 font-semibold">{displayValue(alumniData.kualitasPendidikan)}</p>
            </div>
            <div>
              <p className="font-medium">Kualitas Kegiatan Ekstrakurikuler</p>
              <p className="text-gray-900 font-semibold">{displayValue(alumniData.kualitasKegiatanEkstrakurikuler)}</p>
            </div>
            <div>
              <p className="font-medium">Kualitas Fasilitas Sekolah</p>
              <p className="text-gray-900 font-semibold">{displayValue(alumniData.kualitasFasilitasSekolah)}</p>
            </div>
          </div>
        </div>

        {/* Tombol Tutup */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-md shadow-lg text-lg transition duration-300 transform hover:scale-105"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailAlumni;