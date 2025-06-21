import React from 'react';
import { FaCheck } from 'react-icons/fa'; // Import ikon centang

function NotificationPopup({ message, isOpen, onClose }) {
  if (!isOpen) {
    return null; // Tidak merender apa-apa jika popup tidak terbuka
  }

  return (
    <div className="fixed inset-0 bg-[#00000059] flex items-center justify-center z-50 p-4">
      {/* Container utama popup */}
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center transform scale-100 opacity-100 transition-all duration-300 ease-out">
        {/* Lingkaran hijau dengan ikon centang */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-teal-500 rounded-full p-4">
            <FaCheck className="text-white text-3xl" />
          </div>
        </div>

        {/* Pesan Notifikasi */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-8">
          {message}
        </h3>

        {/* Tombol Lanjutkan */}
        <button
          onClick={onClose}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-md shadow-lg text-lg transition duration-300 transform hover:scale-105"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
};

export default NotificationPopup;