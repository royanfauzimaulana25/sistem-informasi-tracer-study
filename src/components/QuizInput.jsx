// React Modules
import React from 'react';
import PropTypes from 'prop-types';

// Icons

// Asset

// Components
import FormInput from '../components/FormInput'; // Impor komponen FormInput
import NotificationPopup from '../components/NotificationPopup'; // Impor komponen popup


function QuizInput() {
  const [formData, setFormData] = React.useState({
    nis: '',
    nisn: '',
    tanggalLahir: '',
    nik: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  // Popup Components
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    // Di sini Anda bisa menambahkan logika lain setelah popup ditutup,
    // misalnya mengarahkan pengguna ke halaman lain.
    console.log('Popup ditutup dan tombol Lanjutkan diklik!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // --- Simulasi Validasi Data ---
    // Dalam aplikasi nyata, Anda akan mengirim data ini ke backend
    // dan menunggu respons apakah data ditemukan/valid.
    // Contoh sederhana: Anggap data valid jika semua input tidak kosong.
    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');

    if (allFieldsFilled) {
      console.log('Data yang dikirim:', formData);
      // Jika data ditemukan/valid, tampilkan popup
      setIsPopupOpen(true);
    } else {
      alert('Mohon lengkapi semua data sebelum melanjutkan.');
    }
  };


  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
        Isi Kuesioner Tracer Study
      </h1>

      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* NIS */}
            <FormInput
              label="NIS (Nomor Induk Siswa)"
              id="nis"
              type="text"
              placeholder="Masukkan NIS Anda"
              value={formData.nis}
              onChange={handleChange}
            />

            {/* NISN */}
            <FormInput
              label="NISN (Nomor Induk Siswa Nasional)"
              id="nisn"
              type="text"
              placeholder="Masukkan NISN Anda"
              value={formData.nisn}
              onChange={handleChange}
            />

            {/* Tanggal Lahir */}
            <FormInput
              label="Tanggal Lahir"
              id="tanggalLahir"
              type="date" // Menggunakan type="date" untuk picker tanggal
              value={formData.tanggalLahir}
              onChange={handleChange}
            />

            {/* NIK */}
            <FormInput
              label="NIK (Nomor Induk Kependudukan)"
              id="nik"
              type="text" // NIK bisa juga number, tapi text lebih fleksibel untuk menghindari masalah leading zero
              placeholder="Masukkan NIK Anda"
              value={formData.nik}
              onChange={handleChange}
            />
          </div>

          {/* Tombol Selanjutnya */}
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-12 rounded-md shadow-lg text-lg transition duration-300 transform hover:scale-105"
            >
              Selanjutnya
            </button>
          </div>
        </form>
      </div>
      <NotificationPopup
        message="Data Ditemukan" // Pesan yang akan ditampilkan
        isOpen={isPopupOpen}    // Mengontrol visibilitas popup
        onClose={handleClosePopup} // Fungsi yang dipanggil saat tombol Lanjutkan diklik
      />
    </>
  );
}

export default QuizInput;