// React Modules
import React from 'react';
import { Link } from 'react-router-dom';

// Icons

// Asset
import Logo from '../../public/Logo-SMAN4.png';
import { FaUserCircle } from 'react-icons/fa';

// Components

function Navigation() {

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container  mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo SMA Negeri 4 Bandar Lampung" className="h-auto" />
        </div>

        {/* Navigasi */}
        <ul className="flex space-x-8 items-center  font-medium">
          <li><Link to='/' className='hover:text-teal-600 font-bold'>Home</Link></li>
          <li><Link to='/questionnaire' className='font-bold hover:text-teal-600  active:text-teal-600'>Isi Kuesioner</Link></li>

          {/*Admin Navigation*/}
          <li><Link to='/dashboard' className='font-bold hover:text-teal-600  active:text-teal-600'>Dashboard</Link></li>
          <li><Link to='/alumni' className='font-bold hover:text-teal-600  active:text-teal-600'>Direktori Alumni</Link></li>

          <div className="flex items-center space-x-3 text-gray-700">
            <FaUserCircle className="text-2xl text-gray-500" />
            <span>Hai, Eka Subiani !</span>
            <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-md shadow-lg transition duration-300">
              <Link to='/login' className='font-bold hover:text-teal-600  active:text-teal-600'>Login</Link>
            </button>
          </div>
        </ul>
      </div>


      {/* Informasi Pengguna & Logout */}

    </nav>

  );
}

export default Navigation;