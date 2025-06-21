import React, { useState } from 'react';
import AuthInput from '../components/AuthInput'; // Impor komponen AuthInput yang baru
import LoginIlustration from '../../public/Login Character.png';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data Login:', formData);
    alert('Login berhasil (simulasi)!');
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row max-w-5xl w-full">

        <div className="md:w-1/2 bg-gray-50 p-6 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-70"></div>
          <img
            src={LoginIlustration}
            alt="Ilustrasi Login"
            className="relative z-10 w-full max-w-xs md:max-w-sm lg:max-w-md h-auto object-contain"
          />
        </div>

        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Masuk ke Halaman Administrator</h2>
          <p className="text-gray-600 mb-8">Masukan informasi akun kamu dulu ya.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Menggunakan AuthInput untuk Email */}
            <AuthInput
              label="Email"
              id="email"
              type="email"
              placeholder="Masukkan email Anda"
              value={formData.email}
              onChange={handleChange}
            />

            {/* Menggunakan AuthInput untuk Password */}
            <AuthInput
              label="Password"
              id="password"
              type="password" // Pastikan type="password"
              placeholder="Masukkan password Anda"
              value={formData.password}
              onChange={handleChange}
            />

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
                />
                <label htmlFor="rememberMe" className="ml-2 text-gray-700">Ingat saya</label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-md shadow-lg text-lg transition duration-300 transform hover:scale-105"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;