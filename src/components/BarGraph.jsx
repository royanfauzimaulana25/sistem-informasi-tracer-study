import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

function BarGraph({ title, data }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-5 mr-5">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="tahun_lulus" label={{ value: 'Tahun Lulus', position: 'bottom', offset: 0 }} />
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
  );
}

BarGraph.propTypes = {
  title: PropTypes.string.isRequired,
  graphData: PropTypes.array.isRequired,
};

export default BarGraph;