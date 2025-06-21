import React from 'react';
import { useSearchParams } from 'react-router-dom'; // Import useSearchParams
import FormInput from './FormInput';
import RadioGroup from './RadioGroup';
import FileUpload from './FileUpload';
import NotificationPopup from './NotificationPopup';

function QuizInputDetail() {
  const [searchParams] = useSearchParams(); // Hook untuk membaca query params

  const [formData, setFormData] = React.useState({
    // Inisialisasi dengan data dari query params atau string kosong
    nis: searchParams.get('nis') || '',
    nisn: searchParams.get('nisn') || '',
    tanggalLahir: searchParams.get('tanggalLahir') || '',
    nik: searchParams.get('nik') || '',
    namaSiswa: '',
    tahunLulus: '',
    alamatEmail: '',
    nomorTelepon: '',
    statusPendidikanLanjut: '',
    detailPendidikanLanjut: '',
    programStudi: '',
    sumberPembiayaan: '',
    tahunMasuk: '',
    buktiKIPFile: null,
    kualitasPendidikan: '',
    kualitasKegiatanIntraEkstra: '',
    kualitasFasilitasSekolah: '',
  });
  const [buktiKIPFileName, setBuktiKIPFileName] = React.useState('');

  // Opsi untuk radio button Status Pendidikan Lanjut
  const statusPendidikanLanjutOptions = [
    { label: 'Melanjutkan Pendidikan', value: 'melanjutkan' },
    { label: 'Bekerja', value: 'bekerja' },
    { label: 'Wirausaha', value: 'wirausaha' },
    { label: 'Belum / Tidak Bekerja', value: 'belum_bekerja' },
    { label: 'Gap Year', value: 'gap_year' },
  ];

  // Opsi untuk radio button Kualitas Sekolah
  const kualitasOptions = [
    { label: 'Sangat Bagus', value: 'sangat_bagus' },
    { label: 'Bagus', value: 'bagus' },
    { label: 'Cukup', value: 'cukup' },
    { label: 'Kurang', value: 'kurang' },
    { label: 'Sangat Kurang', value: 'sangat_kurang' },
  ];

  const handleChange = (e) => {
    const { id, name, value, type, files } = e.target;

    if (type === 'radio') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (type === 'file') {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        [id]: file,
      }));
      setBuktiKIPFileName(file ? file.name : '');
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Lengkap (dari Step 2):', formData);
    setIsPopupOpen(true);
    // Di sini Anda akan mengirim formData ke backend.
  };

  // Popup Components
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    // Di sini Anda bisa menambahkan logika lain setelah popup ditutup,
    // misalnya mengarahkan pengguna ke halaman lain.
    console.log('Popup ditutup dan tombol Lanjutkan diklik!');
  };

  return (
    <div className="min-h-screen ">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Isi Kuesioner Tracer Study
        </h1>

        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Bagian Informasi Pribadi (diisi dari query params dan disabled) */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Informasi Dasar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput label="NIS (Nomor Induk Siswa)" id="nis" type="text" value={formData.nis} onChange={handleChange} disabled />
              <FormInput label="NISN (Nomor Induk Siswa Nasional)" id="nisn" type="text" value={formData.nisn} onChange={handleChange} disabled />
              <FormInput label="Tanggal Lahir" id="tanggalLahir" type="date" value={formData.tanggalLahir} onChange={handleChange} disabled />
              <FormInput label="NIK (Nomor Induk Kependudukan)" id="nik" type="text" value={formData.nik} onChange={handleChange} disabled />
              <FormInput label="Nama Siswa" id="namaSiswa" type="text" placeholder="Nama Lengkap Anda" value={formData.namaSiswa} onChange={handleChange} />
              <FormInput label="Tahun Lulus" id="tahunLulus" type="number" placeholder="Contoh: 2020" value={formData.tahunLulus} onChange={handleChange} />
              <FormInput label="Alamat Email" id="alamatEmail" type="email" placeholder="email@example.com" value={formData.alamatEmail} onChange={handleChange} />
              <FormInput label="Nomor Telepon" id="nomorTelepon" type="tel" placeholder="08xxxxxxxxxx" value={formData.nomorTelepon} onChange={handleChange} />
            </div>

            {/* Bagian Kuisioner Pendidikan Lanjut */}
            <hr className="border-gray-200" />
            <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">Kuisioner Pendidikan Lanjut</h2>
            <RadioGroup
              label="Status Anda saat ini ?*"
              name="statusPendidikanLanjut"
              options={statusPendidikanLanjutOptions}
              selectedValue={formData.statusPendidikanLanjut}
              onChange={handleChange}
            />

            {formData.statusPendidikanLanjut === 'melanjutkan' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Detail Pendidikan Lanjut *" id="detailPendidikanLanjut" type="text" placeholder="Perguruan Tinggi" value={formData.detailPendidikanLanjut} onChange={handleChange} />
                  <FormInput label="Program Studi" id="programStudi" type="text" placeholder="(S1) Sistem Informasi" value={formData.programStudi} onChange={handleChange} />
                  <FormInput label="Sumber Pembiayaan" id="sumberPembiayaan" type="text" placeholder="Beasiswa KIP" value={formData.sumberPembiayaan} onChange={handleChange} />
                  <FormInput label="Tahun Masuk" id="tahunMasuk" type="number" placeholder="2022" value={formData.tahunMasuk} onChange={handleChange} />
                </div>
                <FileUpload
                  label="Upload Bukti KTM / KRS / Transkrip / Surat Penerimaan"
                  id="buktiKIPFile"
                  selectedFileName={buktiKIPFileName}
                  onFileChange={handleChange}
                  buttonText="Upload"
                />
              </>
            )}

            {/* Bagian Kuisioner Kualitas Sekolah */}
            <hr className="border-gray-200" />
            <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">Kuisioner Kualitas Sekolah</h2>
            <p className="text-gray-600">Berikan penilaian anda terhadap dampak sekolah kepada anda pada aspek berikut ?*</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-8">
              <RadioGroup
                label="Kualitas Pendidikan"
                name="kualitasPendidikan"
                options={kualitasOptions}
                selectedValue={formData.kualitasPendidikan}
                onChange={handleChange}
              />
              <RadioGroup
                label="Kualitas Kegiatan Intra/Ekstrakurikuler"
                name="kualitasKegiatanIntraEkstra"
                options={kualitasOptions}
                selectedValue={formData.kualitasKegiatanIntraEkstra}
                onChange={handleChange}
              />
              <RadioGroup
                label="Kualitas Fasilitas Sekolah"
                name="kualitasFasilitasSekolah"
                options={kualitasOptions}
                selectedValue={formData.kualitasFasilitasSekolah}
                onChange={handleChange}
              />
            </div>

            {/* Tombol Kirim */}
            <div className="flex justify-center mt-10">
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-12 rounded-md shadow-lg text-lg transition duration-300 transform hover:scale-105"
              >
                Kirim
              </button>
            </div>
          </form>
        </div>
      </main>

      <NotificationPopup
        message="Kuesioner Berhasil Terkirim" // Pesan yang akan ditampilkan
        isOpen={isPopupOpen}    // Mengontrol visibilitas popup
        onClose={handleClosePopup} // Fungsi yang dipanggil saat tombol Lanjutkan diklik
      />

    </div>
  );
}

export default QuizInputDetail;