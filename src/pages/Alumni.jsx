// src/pages/AlumniDirectoryPage.jsx
import React, { useState, useMemo } from 'react';
import DropdownFilter from '../components/DropdownFilter';
import { FaUserPlus, FaSearch, FaUserCircle, FaUpload } from 'react-icons/fa'; // Import FaUpload
import DetailAlumni from '../components/DetailAlumni';
import AddAlumniPopup from '../components/AddAlumniPopup';
import UploadCsvPopup from '../components/UploadCSVPopup'; // Impor popup Upload CSV

function Alumni() {
  const [tahunLulusFilter, setTahunLulusFilter] = useState('');
  const [statusAlumniFilter, setStatusAlumniFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  const [isAddAlumniPopupOpen, setIsAddAlumniPopupOpen] = useState(false);

  // --- State baru untuk UploadCsvPopup ---
  const [isUploadCsvPopupOpen, setIsUploadCsvPopupOpen] = useState(false);

  // Data dummy yang diperbanyak dan diperkaya dengan detail
  const [allAlumniData, setAllAlumniData] = useState(() => {
    const data = [];
    for (let i = 1; i <= 50; i++) {
      data.push({
        no: i,
        nis: `NIS${1000 + i}`,
        nisn: `NISN${20000 + i}`,
        tanggalLahir: `2002-0${(i % 12) + 1}-0${(i % 28) + 1}`,
        nik: `NIK${300000 + i}`,
        namaSiswa: `Alumni ${i}`,
        tahunLulus: 2019 + (i % 3),
        statusSiswa: ['Lanjut Pendidikan', 'Bekerja', 'Wirausaha'][i % 3],
        statusKuesioner: (i % 2 === 0) ? 'Sudah Mengisi' : 'Belum Mengisi',
        alamatEmail: `alumni${i}@example.com`,
        nomorTelepon: `+62 ${81234567890 + i}`,
        perguruanTinggi: (i % 3 === 0) ? 'Universitas Lampung' : '',
        programStudi: (i % 3 === 0) ? 'Sistem Informasi' : '',
        sumberPembiayaan: (i % 3 === 0) ? 'Beasiswa KIP' : '',
        buktiKuliah: (i % 3 === 0) ? 'Ada' : '',
        tahunMasukKuliah: (i % 3 === 0) ? '2022' : '',
        kualitasPendidikan: ['Sangat Bagus', 'Bagus', 'Cukup'][i % 3],
        kualitasKegiatanEkstrakurikuler: ['Sangat Bagus', 'Bagus', 'Cukup'][i % 3],
        kualitasFasilitasSekolah: ['Sangat Bagus', 'Bagus', 'Cukup'][i % 3],
      });
    }
    return data;
  });

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
    return allAlumniData.filter((alumni) => {
      const matchTahunLulus = tahunLulusFilter ? alumni.tahunLulus === parseInt(tahunLulusFilter) : true;
      const matchStatusAlumni = statusAlumniFilter ?
        (statusAlumniFilter === 'melanjutkan' && alumni.statusSiswa === 'Lanjut Pendidikan') ||
        (statusAlumniFilter === 'bekerja' && alumni.statusSiswa === 'Bekerja') ||
        (statusAlumniFilter === 'wirausaha' && alumni.statusSiswa === 'Wirausaha') ||
        (statusAlumniFilter === 'belum_bekerja' && alumni.statusSiswa === 'Belum / Tidak Bekerja') ||
        (statusAlumniFilter === 'gap_year' && alumni.statusSiswa === 'Gap Year') : true;

      // Logika pencarian NISN / Nama
      const matchSearchQuery = searchQuery.toLowerCase();
      const matchNISN = alumni.nisn.toLowerCase().includes(matchSearchQuery);
      const matchNama = alumni.namaSiswa.toLowerCase().includes(matchSearchQuery);
      const matchSearch = (matchSearchQuery === '') || matchNISN || matchNama;

      return matchTahunLulus && matchStatusAlumni && matchSearch;
    });
  }, [allAlumniData, tahunLulusFilter, statusAlumniFilter, searchQuery]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAlumni.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAlumni.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

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

  // Fungsi untuk mengontrol AddAlumniPopup
  const handleOpenAddAlumniPopup = () => {
    setIsAddAlumniPopupOpen(true);
  };
  const handleCloseAddAlumniPopup = () => {
    setIsAddAlumniPopupOpen(false);
  };
  const handleAddAlumniSubmit = (newAlumniData) => {
    console.log('Data Alumni Baru Diterima:', newAlumniData);
    alert('Data alumni berhasil ditambahkan (simulasi)!');
    setAllAlumniData((prevData) => [
      ...prevData,
      {
        no: prevData.length > 0 ? Math.max(...prevData.map((a) => a.no)) + 1 : 1,
        ...newAlumniData,
        statusSiswa: 'Belum Diketahui',
        statusKuesioner: 'Belum Mengisi',
      }
    ]);
    handleCloseAddAlumniPopup();
  };

  // Fungsi untuk mengontrol UploadCsvPopup
  const handleOpenUploadCsvPopup = () => {
    setIsUploadCsvPopupOpen(true);
  };
  const handleCloseUploadCsvPopup = () => {
    setIsUploadCsvPopupOpen(false);
  };
  const handleCsvUploadSubmit = (csvParsedData) => {
    console.log('Data CSV yang di-upload dan di-parse:', csvParsedData);
    alert(`${csvParsedData.length} data alumni berhasil di-import dari CSV (simulasi)!`);

    // Tambahkan data dari CSV ke state allAlumniData
    // Anda mungkin perlu menyesuaikan pemetaan header CSV ke properti alumniData
    const newAlumniEntries = csvParsedData.map((item, index) => ({
      no: allAlumniData.length + index + 1, // Beri nomor unik
      nis: item.NIS || '',
      nisn: item.NISN || '',
      tanggalLahir: item['Tanggal Lahir'] || '', // Hati-hati dengan spasi di header CSV
      nik: item.NIK || '',
      namaSiswa: item['Nama Siswa'] || '',
      tahunLulus: parseInt(item['Tahun Lulus']) || '',
      statusSiswa: item['Status Siswa'] || 'Belum Diketahui',
      statusKuesioner: item['Status Kuesioner'] || 'Belum Mengisi',
      alamatEmail: item['Alamat Email'] || '',
      nomorTelepon: item['No Telepon'] || '', // Sesuaikan nama kolom CSV
      // Tambahkan mapping untuk field lainnya
    }));
    setAllAlumniData((prevData) => [...prevData, ...newAlumniEntries]);

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

  return (
    <div className="min-h-screen ">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <button
            onClick={handleOpenAddAlumniPopup}
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-md shadow-lg transition duration-300 flex items-center justify-center space-x-2"
          >
            <FaUserPlus className="text-xl" />
            <span>Tambah Data Alumni</span>
          </button>
          {/* Tombol baru untuk Upload CSV */}
          <button
            onClick={handleOpenUploadCsvPopup}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md shadow-lg transition duration-300 flex items-center justify-center space-x-2"
          >
            <FaUpload className="text-xl" />
            <span>Upload CSV</span>
          </button>

          {/* Input Pencarian */}
          <div className="relative flex-grow flex items-center">
            <input
              type="text"
              placeholder="Cari Alumni (NISN / Nama)"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full py-3 pl-4 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition duration-200"
            />
            <FaSearch className="absolute right-3 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Berdasarkan</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <DropdownFilter
              label="Tahun lulus"
              options={tahunLulusOptions}
              selectedValue={tahunLulusFilter}
              onChange={null}
              className="w-full md:w-1/3"
            />
            <DropdownFilter
              label="Status Alumni"
              options={statusAlumniOptions}
              selectedValue={statusAlumniFilter}
              onChange={null}
              className="w-full md:w-1/3"
            />
          </div>
        </div>

        {/* Tabel Data Alumni */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Siswa
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tahun Lulus
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status Siswa
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status Kuesioner
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((alumni) => (
                    <tr key={alumni.no}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {alumni.no}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {alumni.namaSiswa}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {alumni.tahunLulus}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {alumni.statusSiswa}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {alumni.statusKuesioner}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-center">
                        <button
                          onClick={() => handleDetailClick(alumni)}
                          className="bg-teal-100 text-teal-600 hover:bg-teal-200 py-2 px-4 rounded-md text-xs font-semibold transition duration-200"
                        >
                        Detail
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    Tidak ada data alumni yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kontrol Pagination */}
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

      {/* Menggunakan AddAlumniPopup yang benar */}
      <AddAlumniPopup
        isOpen={isAddAlumniPopupOpen}
        onClose={handleCloseAddAlumniPopup}
        onSubmit={handleAddAlumniSubmit}
      />

      {/* Menggunakan UploadCsvPopup yang benar */}
      <UploadCsvPopup
        isOpen={isUploadCsvPopupOpen}
        onClose={handleCloseUploadCsvPopup}
        onSubmitCsv={handleCsvUploadSubmit}
      />
    </div>
  );
};

export default Alumni;