import React from 'react';
import LoginIlustration from '/Login Character.png';
import LoginInput from '../components/LoginInput';
import { login } from '../utils/api';

function LoginPage({ onLoginSuccess }) {
  async function onLogin({ email, password }) {
    const { error } = await login({ email, password });

    if (!error) {
      onLoginSuccess();
    }
  }

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row max-w-5xl w-full">

        <div className="md:w-1/2 bg-gray-50 p-6 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-70"></div>
          <img
            src={LoginIlustration}
            alt="Ilustrasi Login_Page"
            className="relative z-10 w-full max-w-xs md:max-w-sm lg:max-w-md h-auto object-contain"
          />
        </div>

        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Masuk ke Halaman Administrator</h2>
          <p className="text-gray-600 mb-8">Masukan informasi akun kamu dulu ya.</p>

          <LoginInput login={onLogin}/>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;