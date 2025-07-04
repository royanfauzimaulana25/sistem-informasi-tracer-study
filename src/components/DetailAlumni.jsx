// src/components/AlumniDetailPopup.jsx
import React from 'react';

function DetailAlumni({ isOpen, onClose, alumniData }) {
  if (!isOpen || !alumniData) return null;

  const displayValue = (value) => value || 'Belum Mengisi / Tidak Lanjut Pendidkan';

  return (
    // Latar belakang overlay
    <div className="fixed inset-0 bg-[#00000059] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[90vh]">

        <div className="px-8 pt-8 pb-4 flex-shrink-0">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Detail Alumni</h2>
        </div>

        <div className="flex-grow overflow-y-auto px-8">
          {/* Informasi Umum */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-700">Detail Informasi Umum</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${alumniData.tracer_data?.is_filled ? 'bg-teal-100 text-teal-600' : 'bg-amber-100 text-amber-700'}`}>
                {alumniData.tracer_data?.is_filled ? 'Sudah Mengisi Tracer' : 'Belum Mengisi Tracer'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
              {[
                ['NIK', alumniData.personal_data?.nik],
                ['NIS', alumniData.personal_data?.nis],
                ['NISN', alumniData.personal_data?.nisn],
                ['Nama Siswa (Alumni)', alumniData.personal_data?.nama_siswa],
                ['Tahun Lulus', alumniData.personal_data?.tahun_lulus],
                ['Tanggal Lahir', alumniData.personal_data?.tanggal_lahir],
                ['Alamat Email', alumniData.personal_data?.alamat_email],
                ['No Telepon / HP', alumniData.personal_data?.no_telepon],
                ['Status Alumni', alumniData.tracer_data?.status],
              ].map(([label, value], i) => (
                <div key={i} className={label === 'Status Alumni' ? 'md:col-span-2' : ''}>
                  <p className="font-medium">{label}</p>
                  <p className="text-gray-900 font-semibold">{displayValue(value)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Detail Pendidikan */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Detail Pendidikan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
              {[
                ['Perguruan Tinggi', alumniData.pendidikan_data?.perguruan_tinggi],
                ['Program Studi', alumniData.pendidikan_data?.program_studi],
                ['Sumber Pembiayaan', alumniData.pendidikan_data?.sumber_biaya],
                ['Tahun Masuk', alumniData.pendidikan_data?.tahun_masuk],
              ].map(([label, value], i) => (
                <div key={i}>
                  <p className="font-medium">{label}</p>
                  <p className="text-gray-900 font-semibold">{displayValue(value)}</p>
                </div>
              ))}
              <div>
                <p className="font-medium">Bukti Kuliah</p>
                <p className="text-gray-900 font-semibold">
                  {alumniData.pendidikan_data?.bukti_kuliah ? (
                    <a href={alumniData.pendidikan_data.bukti_kuliah} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      Lihat File
                    </a>
                  ) : (
                   ' Belum Mengisi / Tidak Lanjut Pendidkan'
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Detail Kuesioner */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Kuesioner Kualitas Sekolah</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 text-gray-700">
              {alumniData.questionnaire_data?.length > 0 ? (
                alumniData.questionnaire_data.map((item, index) => (
                  <div key={index}>
                    <p className="font-medium">{item.questionnaire}</p>
                    <p className="text-gray-900 font-semibold">{displayValue(item.answer)}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-900 font-semibold col-span-3">Belum Mengisi Kuesioner</p>
              )}
            </div>
          </div>
        </div>

        {/* == BAGIAN FOOTER (TIDAK BISA SCROLL) == */}
        <div className="flex justify-center px-8 pb-8 pt-6 flex-shrink-0">
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