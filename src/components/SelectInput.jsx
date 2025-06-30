import React from 'react';

const SelectInput = ({ label, id, options, value, onChange, placeholder = 'Pilih...', ...props }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="block text-gray-700 text-sm font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 bg-white cursor-pointer"
          {...props}
        >
          {/* Opsi placeholder */}
          <option value="" disabled selected={!value}>
            {placeholder}
          </option>
          {/* Opsi dari prop options */}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Opsional: Tambahkan ikon panah ke bawah jika perlu styling kustom */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15 9.707V7h-2v2l-3.293 3.293z"/></svg>
        </div>
      </div>
    </div>
  );
};

export default SelectInput;