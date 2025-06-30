import React from 'react';
import SelectInput from './SelectInput';
import FormInput from './FormInput';
import FileUpload from './FileUpload';

function FormDetailPendidikan({ perguruanTinggiOptions, programStudiOptions, sumberPembiayaanOptions, value, onChange, onFileChange, buktiKuliahFileName }) {

  const handleFileUploadChange = (event) => {
    const { id, files } = event.target;
    // Panggil onFileChange dari parent, passing id dan file object
    if (onFileChange) {
      onFileChange(id, files[0]); // Mengirimkan ID input dan objek File itu sendiri
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectInput
          label="Perguruan Tinggi *" // Nama label disesuaikan
          id="id_perguruan_tinggi"
          options={perguruanTinggiOptions}
          value={value.id_perguruan_tinggi}
          onChange={onChange}
          placeholder="Pilih Perguruan Tinggi"
        />
        <SelectInput
          label="Program Studi" // Nama label disesuaikan
          id="id_program_studi"
          options={programStudiOptions}
          value={value.id_program_studi}
          onChange={onChange}
          placeholder="Pilih Program Studi"
        />
        <SelectInput
          label="Sumber Biaya" // Nama label disesuaikan
          id="id_sumber_biaya"
          options={sumberPembiayaanOptions}
          value={value.sumber_biaya}
          onChange={onChange}
          placeholder="Pilih Sumber Biaya Kuliah"
        />
        <FormInput label="Tahun Masuk" id="tahun_masuk" type="number" placeholder="2022" value={value.tahun_masuk} onChange={onChange} />
      </div>
      <FileUpload
        label="Upload Bukti KTM / KRS / Transkrip / Surat Penerimaan"
        id="bukti_kuliah"
        selectedFileName={buktiKuliahFileName}
        onFileChange={handleFileUploadChange}
        buttonText="Upload"
      />
    </>
  );
}

export default FormDetailPendidikan;