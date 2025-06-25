import React from 'react';
import DashboardCard from '../components/DashboardCard';
import DropdownFilter from '../components/DropdownFilter';
import BarGraph from '../components/BarGraph';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { getStatistikAlumni, getStatistikKuesioner } from '../utils/api.js';

function DashboardPage() {
  const [cardData, setCardData] = React.useState([]);
  const [graphData, setgraphData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [tahunLulusFilter, setTahunLulusFilter] = React.useState('');
  const [statusAlumniFilter, setStatusAlumniFilter] = React.useState('');

  React.useEffect(() => {
    getStatistikAlumni().then(({ data }) => {
      setCardData(data);
      setLoading(false);
    });
  }, []);

  React.useEffect(() => {
    getStatistikKuesioner().then(({ data }) => {
      setgraphData(data);
      setLoading(false);
    });
  }, []);

  // Opsi untuk filter Tahun Lulus
  const tahunLulusOptions = [
    { label: '2025', value: '2025' },
    { label: '2024', value: '2024' },
    { label: '2023', value: '2023' },
    { label: '2022', value: '2022' },
    { label: '2021', value: '2021' },
  ];

  // Opsi untuk filter Status AlumniPage
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
    console.log('Filter Tahun Lulus:', e.target.value);
  };

  const handleStatusAlumniChange = (e) => {
    setStatusAlumniFilter(e.target.value);
    // Di sini Anda bisa memicu pengambilan data grafik baru berdasarkan filter
    console.log('Filter Status AlumniPage:', e.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            title="Jumlah Siswa Lulus"
            value={cardData.jumlahSiswa}
            className="bg-gradient-to-br from-blue-50 to-indigo-100"
          />
          <DashboardCard
            title="Persentase Tracer Study"
            value={cardData.persentaseTracerStudy}
            description={`${cardData.totalResponden} dari ${cardData.jumlahSiswa} Siswa`}
            className="bg-gradient-to-br from-green-50 to-teal-100"
          />
          <DashboardCard
            title="Melanjutkan Pendidikan"
            value={cardData.melanjutkanPendidikan}
            description={`${cardData.jumlahMelanjutkanPendidikan} dari ${cardData.totalResponden} Siswa`}
            className="bg-gradient-to-br from-purple-50 to-pink-100"
          />
        </div>

        {/*/!* Filter *!/*/}
        {/*<div className="bg-white rounded-lg shadow-md p-6 mb-8">*/}
        {/*  <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Berdasarkan</h2>*/}
        {/*  <div className="flex flex-col md:flex-row gap-6">*/}
        {/*    <DropdownFilter*/}
        {/*      label="Tahun lulus"*/}
        {/*      options={tahunLulusOptions}*/}
        {/*      selectedValue={tahunLulusFilter}*/}
        {/*      onChange={handleTahunLulusChange}*/}
        {/*      className="w-full md:w-1/3"*/}
        {/*    />*/}
        {/*    <DropdownFilter*/}
        {/*      label="Status AlumniPage"*/}
        {/*      options={statusAlumniOptions}*/}
        {/*      selectedValue={statusAlumniFilter}*/}
        {/*      onChange={handleStatusAlumniChange}*/}
        {/*      className="w-full md:w-1/3"*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}

        {
          graphData.map((data, index) => (
            <BarGraph key={index} title={data.kuesioner} data={data.data} />
          ))
        }

      </main>
    </div>
  );
};

export default DashboardPage;