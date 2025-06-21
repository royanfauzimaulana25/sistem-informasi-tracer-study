// src/pages/DashboardPage.jsx
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import DashboardCard from '../components/DashboardCard';
import DropdownFilter from '../components/DropdownFilter';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaUserCircle } from 'react-icons/fa'; // Ikon profil
import Logo from '/Logo-SMAN4.png';

function Dashboard() {
  const [tahunLulusFilter, setTahunLulusFilter] = useState('');
  const [statusAlumniFilter, setStatusAlumniFilter] = useState('');

  // Data dummy untuk kartu statistik
  const stats = {
    jumlahSiswaLulus: 854,
    persentaseTracerStudy: "85%",
    totalResponden: 726, // 85% dari 854
    melanjutkanPendidikan: "75%",
    jumlahMelanjutkanPendidikan: 544, // 75% dari 726
  };

  // Data dummy untuk grafik
  const graphData = [
    { name: '2021', 'Sangat Bagus': 100, Bagus: 200, Cukup: 50, Kurang: 30, 'Sangat Kurang': 10 },
    { name: '2022', 'Sangat Bagus': 250, Bagus: 350, Cukup: 120, Kurang: 80, 'Sangat Kurang': 40 },
    { name: '2023', 'Sangat Bagus': 180, Bagus: 280, Cukup: 70, Kurang: 40, 'Sangat Kurang': 20 },
    { name: '2024', 'Sangat Bagus': 300, Bagus: 400, Cukup: 150, Kurang: 90, 'Sangat Kurang': 50 },
    { name: '2025', 'Sangat Bagus': 150, Bagus: 250, Cukup: 60, Kurang: 35, 'Sangat Kurang': 15 },
  ];

  // Opsi untuk filter Tahun Lulus
  const tahunLulusOptions = [
    { label: '2025', value: '2025' },
    { label: '2024', value: '2024' },
    { label: '2023', value: '2023' },
    { label: '2022', value: '2022' },
    { label: '2021', value: '2021' },
  ];

  // Opsi untuk filter Status Alumni
  const statusAlumniOptions = [
    { label: 'Melanjutkan Pendidikan', value: 'melanjutkan' },
    { label: 'Bekerja', value: 'bekerja' },
    { label: 'Wirausaha', value: 'wirausaha' },
    { label: 'Belum / Tidak Bekerja', value: 'belum_bekerja' },
    { label: 'Gap Year', value: 'gap_year' },
  ];

  const handleTahunLulusChange = (e) => {
    setTahunLulusFilter(e.target.value);
    // Di sini Anda bisa memicu pengambilan data grafik baru berdasarkan filter
    console.log("Filter Tahun Lulus:", e.target.value);
  };

  const handleStatusAlumniChange = (e) => {
    setStatusAlumniFilter(e.target.value);
    // Di sini Anda bisa memicu pengambilan data grafik baru berdasarkan filter
    console.log("Filter Status Alumni:", e.target.value);
  };

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* Kartu Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            title="Jumlah Siswa Lulus"
            value={stats.jumlahSiswaLulus}
            className="bg-gradient-to-br from-blue-50 to-indigo-100"
          />
          <DashboardCard
            title="Persentase Tracer Study"
            value={stats.persentaseTracerStudy}
            description={`${stats.totalResponden} dari ${stats.jumlahSiswaLulus} Siswa`}
            className="bg-gradient-to-br from-green-50 to-teal-100"
          />
          <DashboardCard
            title="Melanjutkan Pendidikan"
            value={stats.melanjutkanPendidikan}
            description={`${stats.jumlahMelanjutkanPendidikan} dari ${stats.totalResponden} Siswa`}
            className="bg-gradient-to-br from-purple-50 to-pink-100"
          />
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Berdasarkan</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <DropdownFilter
              label="Tahun lulus"
              options={tahunLulusOptions}
              selectedValue={tahunLulusFilter}
              onChange={handleTahunLulusChange}
              className="w-full md:w-1/3"
            />
            <DropdownFilter
              label="Status Alumni"
              options={statusAlumniOptions}
              selectedValue={statusAlumniFilter}
              onChange={handleStatusAlumniChange}
              className="w-full md:w-1/3"
            />
          </div>
        </div>

        {/* Grafik Umban Balik Alumni */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Grafik Umpan Balik Alumni Terhadap Kualitas Sekolah</h2>
          <p className="text-lg font-medium text-gray-700 mb-6">Grafik Kualitas Pendidikan</p>
          <div className="h-96 w-full"> {/* Kontainer untuk grafik */}
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={graphData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                {/* <CartesianGrid strokeDasharray="3 3" /> */} {/* Garis grid */}
                <XAxis dataKey="name" label={{ value: 'Tahun Lulus', position: 'bottom', offset: 0 }} />
                <YAxis label={{ value: 'Jumlah Responden', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="Sangat Bagus" fill="#4CAF50" /> {/* Hijau */}
                <Bar dataKey="Bagus" fill="#8BC34A" />          {/* Hijau Lebih Muda */}
                <Bar dataKey="Cukup" fill="#FFC107" />          {/* Kuning */}
                <Bar dataKey="Kurang" fill="#FF9800" />         {/* Oranye */}
                <Bar dataKey="Sangat Kurang" fill="#F44336" />  {/* Merah */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;