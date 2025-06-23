import React from 'react';
import useInput from '../hooks/useInput';
import AuthInput from './AuthInput';
import PropTypes from 'prop-types';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmitEventHandler = (event) => {
    event.preventDefault();

    login({
      email,
      password,
    });
  };

  return (
    <form onSubmit={onSubmitEventHandler} className="space-y-6">
      {/* Menggunakan AuthInput untuk Email */}
      <AuthInput
        label="Email"
        id="email"
        type="email"
        placeholder="Masukkan email Anda"
        value={email}
        onChange={onEmailChange}
        autoComplete='new-email'
      />

      {/* Menggunakan AuthInput untuk Password */}
      <AuthInput
        label="Password"
        id="password"
        type="password"
        placeholder="Masukkan password Anda"
        value={password}
        onChange={onPasswordChange}
        autoComplete='new-password'
      />

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
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
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;