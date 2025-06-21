import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'; // Pastikan react-icons terinstal

function AuthInput({ label, id, type = 'text', placeholder = '', value, onChange, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Tentukan tipe input yang sebenarnya
  const actualInputType = type === 'password' && showPassword ? 'text' : type;
  // Tentukan apakah ini input password agar ikon mata ditampilkan
  const isPasswordField = type === 'password';

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="block text-gray-700 text-sm font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={actualInputType}
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
            transition duration-200
            ${isPasswordField ? 'pr-10' : ''} // Tambahkan padding kanan jika ada ikon
          `}
          {...props}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        )}
      </div>
    </div>
  );
}

export default AuthInput;