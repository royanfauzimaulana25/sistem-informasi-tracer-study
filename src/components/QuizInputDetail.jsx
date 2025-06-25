import React from 'react';
import FormInput from './FormInput';
import SelectInput from './SelectInput';
import RadioGroup from './RadioGroup';
import FileUpload from './FileUpload';
import NotificationPopup from './NotificationPopup';
import { getStatus, getJawaban, getKuesioner, getPerguruanTinggiProdi } from '../utils/api';


function QuizInputDetail({ dataAlumni }) {
  const [alumniData, setAlumniData] = React.useState(dataAlumni);
  const [buktiKIPFileName, setBuktiKIPFileName] = React.useState('');
  const [status, setStatus] = React.useState([]);
  const [jawaban, setJawaban] = React.useState([]);
  const [perguruanTinggi, setPerguruanTinggi] = React.useState({});
  const [sumberBiaya, setSumberBiaya] = React.useState({});

  // Get Status List with Structure
  // const statusList = [
  //   { label: 'Melanjutkan Pendidikan', value: 'melanjutkan' },
  //   { label: 'Bekerja', value: 'bekerja' },
  //   ...
  // ];
  React.useEffect(() => {
    const fetchStatusList = async () => {
      try {
        const { data } = await getStatus();
        const selectOptions = data.map((item) => ({
          label: item.status,
          value: item.kode_status
        }));
        setStatus(selectOptions);
      } catch (error) {
        console.error('Failed to fetch status list:', error);
        setStatus([]);
      }
    };

    fetchStatusList();
  }, []);

  // Get Jawaban List with Structure
  // const jawabanList = [
  //   { label: 'Melanjutkan Pendidikan', value: 'melanjutkan' },
  //   { label: 'Bekerja', value: 'bekerja' },
  //   ...
  // ];
  React.useEffect(() => {
    const fetchJawabanList = async () => {
      try {
        const { data } = await getJawaban();
        const selectOptions = data.map((item) => ({
          label: item.jawaban,
          value: item.id_jawaban
        }));
        console.log(selectOptions);
        setJawaban(selectOptions);
      } catch (error) {
        console.error('Failed to fetch jawaban list:', error);
        setJawaban([]);
      }
    };

    fetchJawabanList();
  }, []);


  // --- Opsi untuk Dropdown Perguruan Tinggi ---
  const perguruanTinggiOptions = [
    // { label: 'Pilih Perguruan Tinggi', value: '' }, // Placeholder option
    { label: 'Universitas Lampung', value: 'universitas_lampung' },
    { label: 'Institut Teknologi Bandung', value: 'itb' },
    { label: 'Universitas Gadjah Mada', value: 'ugm' },
    { label: 'Universitas Indonesia', value: 'ui' },
    { label: 'Universitas Brawijaya', value: 'ub' },
    { label: 'Politeknik Negeri Jakarta', value: 'pnj' },
    // Tambahkan lebih banyak opsi sesuai kebutuhan Anda
  ];

  // --- Opsi untuk Dropdown Program Studi ---
  const programStudiOptions = [
    // { label: 'Pilih Program Studi', value: '' }, // Placeholder option
    { label: 'Sistem Informasi', value: 'sistem_informasi' },
    { label: 'Teknik Informatika', value: 'teknik_informatika' },
    { label: 'Manajemen', value: 'manajemen' },
    { label: 'Akuntansi', value: 'akuntansi' },
    { label: 'Ilmu Komunikasi', value: 'ilmu_komunikasi' },
    // Tambahkan lebih banyak opsi sesuai kebutuhan Anda
  ];

  // --- Opsi untuk Dropdown Sumber Pembiayaan ---
  const sumberPembiayaanOptions = [
    // { label: 'Pilih Sumber Pembiayaan', value: '' }, // Placeholder option
    { label: 'Beasiswa KIP', value: 'beasiswa_kip' },
    { label: 'Biaya Sendiri', value: 'biaya_sendiri' },
    { label: 'Beasiswa Lain', value: 'beasiswa_lain' },
    // Tambahkan opsi lain
  ];


  const handleChange = (e) => {
    const { id, name, value, type, files } = e.target;

    if (type === 'radio') {
      setAlumniData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (type === 'file') {
      const file = files[0];
      setAlumniData((prevData) => ({
        ...prevData,
        [id]: file,
      }));
      setBuktiKIPFileName(file ? file.name : '');
    } else {
      setAlumniData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data :', alumniData);
    setIsPopupOpen(true);
    // Di sini Anda akan mengirim alumniData ke backend.
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
              <FormInput label="NIS (Nomor Induk Siswa)" id="nis" type="text" value={alumniData.alumni.nis} onChange={handleChange} disabled />
              <FormInput label="NISN (Nomor Induk Siswa Nasional)" id="nisn" type="text" value={alumniData.alumni.nisn} onChange={handleChange} disabled />
              <FormInput label="Tanggal Lahir" id="tanggalLahir" type="date" value={alumniData.alumni.tanggal_lahir} onChange={handleChange} disabled />
              <FormInput label="NIK (Nomor Induk Kependudukan)" id="nik" type="text" value={alumniData.alumni.nik} onChange={handleChange} disabled />
              <FormInput label="Nama Siswa" id="namaSiswa" type="text" placeholder="Nama Lengkap Anda" value={alumniData.alumni.nama_siswa} onChange={handleChange} disabled/>
              <FormInput label="Tahun Lulus" id="tahunLulus" type="number" placeholder="Contoh: 2020" value={alumniData.alumni.tahun_lulus} onChange={handleChange} disabled/>
              <FormInput label="Alamat Email" id="alamatEmail" type="email" placeholder="email@example.com" value={alumniData.alumni.alamat_email} onChange={handleChange} required />
              <FormInput label="Nomor Telepon" id="nomorTelepon" type="tel" placeholder="08xxxxxxxxxx" value={alumniData.alumni.no_telepon} onChange={handleChange} required />
            </div>

            {/* Bagian Kuisioner Pendidikan Lanjut */}
            <hr className="border-gray-200" />
            <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">Kuisioner Pendidikan Lanjut</h2>
            <RadioGroup
              label="Status Anda saat ini ?*"
              name="status"
              options={status}
              selectedValue={alumniData.status}
              onChange={handleChange}
              required
            />

            {alumniData.statusPendidikanLanjut === 'melanjutkan' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectInput
                    label="Perguruan Tinggi *" // Nama label disesuaikan
                    id="perguruanTinggi"
                    options={perguruanTinggiOptions}
                    value={alumniData.alumni.perguruan_tinggi}
                    onChange={handleChange}
                    placeholder="Pilih Perguruan Tinggi"
                  />
                  <SelectInput
                    label="Program Studi" // Nama label disesuaikan
                    id="programStudi"
                    options={programStudiOptions}
                    value={alumniData.alumni.program_studi}
                    onChange={handleChange}
                    placeholder="Pilih Program Studi"
                  />
                  <SelectInput
                    label="Sumber Biaya" // Nama label disesuaikan
                    id="sumberBiaya"
                    options={sumberPembiayaanOptions}
                    value={alumniData.alumni.sumber_biaya}
                    onChange={handleChange}
                    placeholder="Pilih Sumber Biaya Kuliah"
                  />
                  <FormInput label="Tahun Masuk" id="tahunMasuk" type="number" placeholder="2022" value={alumniData.tahunMasuk} onChange={handleChange} />
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
                options={jawaban}
                selectedValue={alumniData.kualitasPendidikan}
                onChange={handleChange}
                required
              />
              <RadioGroup
                label="Kualitas Kegiatan Intra/Ekstrakurikuler"
                name="kualitasKegiatanIntraEkstra"
                options={jawaban}
                selectedValue={alumniData.kualitasKegiatanIntraEkstra}
                onChange={handleChange}
                required
              />
              <RadioGroup
                label="Kualitas Fasilitas Sekolah"
                name="kualitasFasilitasSekolah"
                options={jawaban}
                selectedValue={alumniData.kualitasFasilitasSekolah}
                onChange={handleChange}
                required
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