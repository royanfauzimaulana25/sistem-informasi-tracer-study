import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className='relative  py-16 md:py-24 overflow-hidden'>
      <div className='container mx-auto flex flex-col md:flex-row items-center justify-between px-4'>

        {/* Konten Teks */}
        <div className='md:w-1/2 text-center md:text-left mb-10 md:mb-0'>
          <h1 className='text-5xl md:text-6xl font-bold text-gray-800 leading-tight'>
            Welcome,
            <br />
            <span className='text-teal-600'>Tracer Study Website</span>
          </h1>
          <p className='mt-6 text-lg text-gray-600 max-w-lg mx-auto md:mx-0'>
            Kami hadir sebagai jembatan penghubung antara alumni, sekolah, dan dunia kerja,
            menyediakan wadah informasi yang dinamis untuk memantau jejak langkah kesuksesan lulusan,
            memperkuat jaringan alumni, serta memberikan inspirasi dan arahan bagi siswa-siswi SMA YP UNILA
            Bandar Lampung dalam merencanakan masa depan gemilang mereka.
          </p>
          <button className='mt-10 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-md shadow-xl text-lg transition duration-300'>
            <Link to='/questionnaire'>Isi Kuesioner</Link>
          </button>
        </div>

        {/* Ilustrasi */}
        <div className='md:w-1/2 flex justify-center md:justify-end'>
          <img
            src='/SHS Character.png'
            alt='Ilustrasi Siswa'
            className='w-full max-w-xs md:max-w-md lg:max-w-lg h-auto object-contain'
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;