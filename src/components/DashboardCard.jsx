// src/components/DashboardCard.jsx
import React from 'react';

function DashboardCard({ title, value, description, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 text-center flex flex-col justify-between items-center ${className}`}>
      <h3 className="text-lg font-medium text-gray-600 mb-2">{title}</h3>
      <p className="text-5xl font-bold text-gray-800 mb-2">{value}</p>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
}

export default DashboardCard;