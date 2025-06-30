// src/pages/AlumniDirectoryPage.jsx
import React, { useState, useMemo, useEffect } from 'react';
import DropdownFilter from '../components/DropdownFilter';
import { FaUserPlus, FaUpload } from 'react-icons/fa'; // Import FaUpload
import DetailAlumni from '../components/DetailAlumni';
import AddAlumniPopup from '../components/AddAlumniPopup';
import UploadCsvPopup from '../components/UploadCSVPopup';
import TableAlumni from '../components/TableAlumni';
import AlumniSearch from '../components/AlumniSearch';
import ButtonActions from '../components/ButtonActions';
import { getAllAlumni, createAlumni } from '../utils/api'; // Impor popup Upload CSV

function AlumniPage() {
  // State Data
  const [alumni, setAlumni] = useState([]);

  // State PopUp
  const [isAddAlumniPopupOpen, setIsAddAlumniPopupOpen] = useState(false);
  const [isUploadCsvPopupOpen, setIsUploadCsvPopupOpen] = useState(false);
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);

  // State Filter and Pagination
  const [tahunLulusFilter, setTahunLulusFilter] = useState('');
  const [statusAlumniFilter, setStatusAlumniFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  // State Conditional Rendering
  const [loading, setLoading] = useState(true);

  // Fetch Alumni Data
  useEffect(() => {
    getAllAlumni().then(({ data }) => {
      setAlumni(data);
      setLoading(false);
    });
  }, []);

  // Opsi filter (sama seperti sebelumnya)
  const tahunLulusOptions = [
    { label: 'Semua', value: '' }, { label: '2025', value: '2025' }, { label: '2024', value: '2024' },
    { label: '2023', value: '2023' }, { label: '2022', value: '2022' }, { label: '2021', value: '2021' },
    { label: '2019', value: '2019' }, { label: '2020', value: '2020' },
  ];
  const statusAlumniOptions = [
    { label: 'Semua Status', value: '' }, { label: 'Melanjutkan Pendidikan', value: 'melanjutkan' },
    { label: 'Bekerja', value: 'bekerja' }, { label: 'Wirausaha', value: 'wirausaha' },
    { label: 'Belum / Tidak Bekerja', value: 'belum_bekerja' }, { label: 'Gap Year', value: 'gap_year' },
  ];

  const filteredAlumni = useMemo(() => {
    return alumni.filter((alumnus) => {
      const matchTahunLulus = tahunLulusFilter ? alumnus.personal_data.tahun_lulus === parseInt(tahunLulusFilter) : true;
      const matchStatusAlumni = statusAlumniFilter ?
        (statusAlumniFilter === 'melanjutkan' &&  alumnus.tracer_data.status == 'Melanjutkan Pendidikan') ||
        (statusAlumniFilter === 'bekerja' && alumnus.tracer_data.status  == 'Bekerja') ||
        (statusAlumniFilter === 'wirausaha' && alumnus.tracer_data.status  == 'Wirausaha') ||
        (statusAlumniFilter === 'belum_bekerja' && alumnus.tracer_data.status  == 'Belum / Tidak Bekerja') ||
        (statusAlumniFilter === 'gap_year' && alumnus.tracer_data.status  == 'Gap Year') : true;

      // Logika pencarian NISN / Nama
      const matchSearchQuery = searchQuery.toLowerCase();
      const matchNISN = alumnus.personal_data.nisn.toLowerCase().includes(matchSearchQuery);
      const matchNama = alumnus.personal_data.nama_siswa.toLowerCase().includes(matchSearchQuery);
      const matchSearch = (matchSearchQuery === '') || matchNISN || matchNama;

      return matchTahunLulus && matchStatusAlumni && matchSearch;
    });
  }, [alumni, tahunLulusFilter, statusAlumniFilter, searchQuery]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAlumni.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAlumni.length / itemsPerPage);

  // EVENT HANDLER
  // Event Handler for Pagination
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // Fungsi untuk mengontrol AddAlumniPopup
  const handleOpenAddAlumniPopup = () => {
    setIsAddAlumniPopupOpen(true);
  };
  const handleCloseAddAlumniPopup = () => {
    setIsAddAlumniPopupOpen(false);

  };

  const handleAddAlumniSubmit = async (newAlumniData) => {
    console.log('Data AlumniPage Baru Diterima:', newAlumniData);

    const { error } = await createAlumni(newAlumniData);

    if (error) {
      alert('Gagal menambahkan data alumni.');
      console.error('Error saat menambahkan data alumni:', error);
    } else {
      alert('Data alumni berhasil ditambahkan!');
      window.location.reload();
    }

    handleCloseAddAlumniPopup();
  };


  // Fungsi untuk mengontrol UploadCsvPopup
  const handleOpenUploadCsvPopup = () => {
    setIsUploadCsvPopupOpen(true);
  };
  const handleCloseUploadCsvPopup = () => {
    setIsUploadCsvPopupOpen(false);
  };

  const handleCsvUploadSubmit = async (csvParsedData) => {
    console.log('Data CSV yang di-upload dan di-parse:', csvParsedData);

    if (!csvParsedData || csvParsedData.length === 0) {
      alert('Tidak ada data yang ditemukan di file CSV.');
      return;
    }

    // Utility untuk membersihkan setiap nilai dari tanda kutip ganda dan spasi
    const cleanValue = (value) =>
      typeof value === 'string' ? value.trim().replace(/^"+|"+$/g, '') : value;

    const newAlumniEntries = csvParsedData.map((item) => ({
      nis: cleanValue(item.nis || ''),
      nisn: cleanValue(item.nisn || ''),
      nik: cleanValue(item.nik || ''),
      nama_siswa: cleanValue(item['nama_siswa'] || ''),
      tanggal_lahir: cleanValue(item['tanggal_lahir'] || ''),
      tahun_lulus: parseInt(cleanValue(item['tahun_lulus'])) || '',
    }));

    console.log('Data alumni baru (setelah dibersihkan):', newAlumniEntries);

    try {
      for (const alumni of newAlumniEntries) {
        console.log('Menyimpan data alumni:', alumni);
        const { error } = await createAlumni(alumni);
        if (error) {
          console.error('Gagal menyimpan data:', alumni, error);
          alert(`Gagal menyimpan data untuk ${alumni.nama_siswa}`);
          continue;
        }
      }

      alert(`${newAlumniEntries.length} data alumni berhasil di-import!`);
      window.location.reload(); // aktifkan jika ingin refresh halaman
    } catch (err) {
      console.error('Terjadi kesalahan saat import CSV:', err);
      alert('Terjadi kesalahan saat mengimpor data.');
    }

    handleCloseUploadCsvPopup();
  };

  // Fungsi untuk membuka/menutup Popup Detail
  const handleDetailClick = (alumni) => {
    setSelectedAlumni(alumni);
    setIsDetailPopupOpen(true);
  };
  const handleCloseDetailPopup = () => {
    setIsDetailPopupOpen(false);
    setSelectedAlumni(null);
  };

  // Handler untuk perubahan input pencarian
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset ke halaman pertama saat melakukan pencarian baru
  };

  // HELPER FUNCTION
  // Fungsi Render Page Number
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 rounded-md text-sm font-medium transition duration-200
            ${currentPage === i ? 'bg-teal-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  // Conditional Rendering
  if (loading) {
    return (
      <p>Loading..</p>
    );
  }

  return (
    <div className="min-h-screen ">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">

          {/* Tombol Tambah Alumni Single */}
          <ButtonActions
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-md shadow-lg transition duration-300 flex items-center justify-center space-x-2"
            onClickHandler={handleOpenAddAlumniPopup}
            icon={<FaUserPlus className="text-xl" />}
            title="Tambah Data Alumni"
          />

          {/* Tombol Upload CSV */}
          <ButtonActions
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md shadow-lg transition duration-300 flex items-center justify-center space-x-2"
            onClickHandler={handleOpenUploadCsvPopup}
            icon={<FaUpload className="text-xl" />}
            title="Upload CSV"
          />

          {/* Input Pencarian */}
          <AlumniSearch searchQuery={searchQuery} onHandleSearchChange={handleSearchChange} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Berdasarkan</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <DropdownFilter
              label="Tahun lulus"
              options={tahunLulusOptions}
              selectedValue={tahunLulusFilter}
              onChange={(e) => setTahunLulusFilter(e.target.value)}
              className="w-full md:w-1/3"
            />
            <DropdownFilter
              label="Status Alumni"
              options={statusAlumniOptions}
              selectedValue={statusAlumniFilter}
              onChange={(e) => setStatusAlumniFilter(e.target.value)}
              className="w-full md:w-1/3"
            />
          </div>
        </div>

        {/* Tabel Data AlumniPage */}
        <TableAlumni currentItems={currentItems} onDetailClick={handleDetailClick}/>

        {/* Kontrol Pagination Table */}
        {filteredAlumni.length > itemsPerPage && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              Previous
            </button>
            <div className="flex">
              {renderPageNumbers()}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              Next
            </button>
          </div>
        )}
      </main>

      {/* Komponen Popups */}
      <DetailAlumni
        isOpen={isDetailPopupOpen}
        onClose={handleCloseDetailPopup}
        alumniData={selectedAlumni}
      />

      {/* Menggunakan AddAlumniPopup  */}
      <AddAlumniPopup
        isOpen={isAddAlumniPopupOpen}
        onClose={handleCloseAddAlumniPopup}
        onSubmit={handleAddAlumniSubmit}
      />

      {/* Menggunakan UploadCsvPopup */}
      <UploadCsvPopup
        isOpen={isUploadCsvPopupOpen}
        onClose={handleCloseUploadCsvPopup}
        onSubmitCsv={handleCsvUploadSubmit}
      />
    </div>
  );
};

export default AlumniPage;