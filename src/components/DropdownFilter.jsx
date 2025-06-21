// src/components/DropdownFilter.jsx
import React from 'react';
import { FaBars } from 'react-icons/fa'; // Ikon hamburger untuk filter

function DropdownFilter({ label, options, selectedValue, onChange, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <label htmlFor={label} className="sr-only">{label}</label>
      <div className="relative">
        <select
          id={label}
          name={label}
          value={selectedValue}
          onChange={onChange}
          className="block w-full py-2 pl-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm appearance-none"
        >
          <option value="">{label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
          <FaBars className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export default DropdownFilter;