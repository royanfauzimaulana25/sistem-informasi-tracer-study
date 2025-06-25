import React from 'react';

function FormInput({ label, id, type = 'text', placeholder = '', value, onChange, ...props }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="block text-gray-700 text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        className="shado appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
        {...props} // Untuk props lain seperti min, max, dll.
      />
    </div>
  );
}

export default FormInput;