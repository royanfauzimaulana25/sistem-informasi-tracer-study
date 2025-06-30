import React from 'react';
import FormInput from './FormInput';
import useInput from '../hooks/useInput';

function FormGeneralInformation({ data, onDataChange }){

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput label="NIS (Nomor Induk Siswa)" id="nis" type="text" value={data.nis} onChange={onDataChange} disabled={true}  />
        <FormInput label="NISN (Nomor Induk Siswa Nasional)" id="nisn" type="text" value={data.nisn} onChange={onDataChange}  disabled={true} />
        <FormInput label="NIK (Nomor Induk Kependudukan)" id="nik" type="text" value={data.nik} onChange={onDataChange} disabled={true} />
        <FormInput label="Tanggal Lahir" id="tanggalLahir" type="date" value={data.tanggal_lahir} onChange={onDataChange} disabled={true} />
        <FormInput label="Nama Siswa" id="nama_siswa" type="text" placeholder="Nama Lengkap Anda" value={data.nama_siswa} onChange={onDataChange} disabled={true} />
        <FormInput label="Tahun Lulus" id="tahun_lulus" type="number" placeholder="Contoh: 2020" value={data.tahun_lulus} onChange={onDataChange} disabled={true} />
        <FormInput label="Alamat Email" id="alamat_email" type="email" placeholder="email@example.com" value={data.email} onChange={onDataChange} required />
        <FormInput label="Nomor Telepon" id="no_telepon" type="tel" placeholder="08xxxxxxxxxx" value={data.telepon} onChange={onDataChange} required />
      </div>
    </>
  );
}

export default FormGeneralInformation;