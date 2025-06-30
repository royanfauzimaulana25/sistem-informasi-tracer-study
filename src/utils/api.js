/**
 * API Service Module
 *
 * Module ini menyediakan fungsi-fungsi untuk berinteraksi dengan Tracer Study SMA API.
 * Menggunakan Axios sebagai HTTP client dengan automatic token authentication.
 *
 * @author Your Name
 * @version 1.0.0
 */

import axios from 'axios';

// Base URL untuk Tracer Study SMA API
const BASE_URL = 'https://backend-system-tracer-study-development.up.railway.app/';

/**
 * Instance Axios yang dikonfigurasi dengan base URL dan header default
 */
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Melakukan login pengguna
 * @param {Object} credentials - Kredensial login
 * @param {string} credentials.username - Username pengguna
 * @param {string} credentials.password - Password pengguna
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Object|null)
 * @example
 * const result = await login({ username: 'admin', password: 'password123' });
 * if (!result.error) {
 *   console.log('Login_Page berhasil:', result.data);
 * }
 */
async function login({ email, password }) {
  try {
    const response = await api.post('/login', { email, password });
    if (response.status === 200) {
      putUserInfo(response.data.data.nama);
      return { error: false, data: response.data.data.nama };
    }
  } catch (error) {
    if (error.response) {
      alert(error.response.data);
    } else {
      alert('Terjadi kesalahan saat login.');
    }
    return { error: true, data: null };
  }
}

/**
 * Memeriksa data alumni berdasarkan NISN, NIS, NIK, dan tanggal lahir
 * @param {Object} data - Data alumni yang akan diperiksa
 * @param {string} data.nisn - NISN alumni
 * @param {string} data.nis - NIS alumni
 * @param {string} data.nik - NIK alumni
 * @param {string} data.tanggal_lahir - Tanggal lahir alumni (format: YYYY-MM-DD)
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Object|null)
 * @example
 * const result = await checkAlumni({
 *   nisn: '1234567890',
 *   nis: '123456',
 *   nik: '1234567890123456',
 *   tanggal_lahir: '2000-01-01'
 * });
 * if (!result.error) {
 *   console.log('Data alumni ditemukan:', result.data);
 * }
 */
async function checkAlumni({ nisn, nis, nik, tanggal_lahir }) {
  try {
    const response = await api.post('/alumni/check', { nisn, nis, nik, tanggal_lahir });
    return { error: false, data: response.data };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { error: true, message: 'Alumni tidak ditemukan', data: null };
    }
    return { error: true, message: 'Terjadi kesalahan saat memeriksa data alumni', data: null };
  }
}

/**
 * Mengirimkan data tracer study
 * @param {Object} data - Data tracer study
 * @param {number} data.id_alumni - ID alumni
 * @param {string} data.alamat_email - Alamat email alumni
 * @param {string} data.no_telepon - Nomor telepon alumni
 * @param {string} data.status - Status alumni (e.g., "MELANJUTKAN", "BEKERJA")
 * @param {string} data.perguruan_tinggi - Nama perguruan tinggi (jika melanjutkan)
 * @param {string} data.program_studi - Nama program studi (jika melanjutkan)
 * @param {string} data.sumber_biaya - Sumber biaya pendidikan (jika melanjutkan)
 * @param {number} data.tahun_masuk - Tahun masuk perguruan tinggi (jika melanjutkan)
 * @param {Object} data.jawaban_kuesioner - Jawaban kuesioner dalam format {pertanyaan: jawaban}
 * @param {File} buktiKuliah - File bukti kuliah (jika melanjutkan)
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Object|null)
 * @example
 * const result = await submitTracer({
 *   id_alumni: 1,
 *   alamat_email: 'alumni@example.com',
 *   no_telepon: '08123456789',
 *   status: 'MELANJUTKAN',
 *   perguruan_tinggi: 'Universitas Indonesia',
 *   program_studi: 'Teknik Informatika',
 *   sumber_biaya: 'Orang Tua',
 *   tahun_masuk: 2022,
 *   jawaban_kuesioner: {
 *     'Apakah anda puas dengan pendidikan di SMA?': 'Sangat Puas'
 *   }
 * }, buktiKuliahFile);
 * if (!result.error) {
 *   console.log('Data tracer berhasil dikirim:', result.data);
 * }
 */
async function submitTracer(data, buktiKuliah) {
  try {
    const formData = new FormData();
    if (buktiKuliah){
      formData.append('bukti_kuliah', buktiKuliah);
    }

    // Convert data object to JSON string and append to form data

    formData.append('payload', JSON.stringify(data));
    console.log(JSON.stringify(data));
    console.log(buktiKuliah);
    const response = await api.post('/questionnaire/submit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: 'Terjadi kesalahan saat mengirim data tracer study', data: null };
  }
}

/**
 * Mengambil data referensi perguruan tinggi dan program studi
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Array|null)
 * @example
 * const result = await getPerguruanTinggiProdi();
 * if (!result.error) {
 *   console.log('Data perguruan tinggi dan prodi:', result.data);
 * }
 */
async function getPerguruanTinggiProdi() {
  try {
    const response = await api.get('/referensi/perguruan-tinggi');
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, data: null };
  }
}

/**
 * Mengambil data referensi kuesioner dan jawaban
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Object|null)
 * @example
 * const result = await getKuesioner();
 * if (!result.error) {
 *   console.log('Data kuesioner:', result.data);
 * }
 */
async function getKuesioner() {
  try {
    const response = await api.get('/referensi/kuesioner');
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, data: null };
  }
}

/**
 * Mengambil data referensi status
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Array|null)
 * @example
 * const result = await getStatus();
 * if (!result.error) {
 *   console.log('Data status:', result.data);
 * }
 */
async function getStatus() {
  try {
    const response = await api.get('/referensi/status');
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, data: null };
  }
}

/**
 * Mengambil data referensi jawaban
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Array|null)
 * @example
 * const result = await getJawaban();
 * if (!result.error) {
 *   console.log('Data status:', result.data);
 * }
 */
async function getJawaban() {
  try {
    const response = await api.get('/referensi/jawaban');
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, data: null };
  }
}

/**
 * Mengambil statistik alumni per tahun
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Array|null)
 * @example
 * const result = await getStatistikAlumni();
 * if (!result.error) {
 *   console.log('Statistik alumni:', result.data);
 * }
 */
async function getStatistikAlumni() {
  try {
    const response = await api.get('/statistik/alumni');
    // console.log(response.data);
    return { error: false, data: response.data.data };
  } catch (error) {
    return { error: true, data: null };
  }
}

/**
 * Mengambil statistik jawaban kuesioner per tahun
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Array|null)
 * @example
 * const result = await getStatistikKuesioner();
 * if (!result.error) {
 *   console.log('Statistik kuesioner:', result.data);
 * }
 */
async function getStatistikKuesioner() {
  try {
    const response = await api.get('/statistik/kuesioner');
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, data: null };
  }
}

/**
 * Membuat data alumni baru
 * @param {Object} data - Data alumni baru
 * @param {string} data.nisn - NISN alumni
 * @param {string} data.nis - NIS alumni
 * @param {string} data.nik - NIK alumni
 * @param {string} data.nama_siswa - Nama alumni
 * @param {string} data.tanggal_lahir - Tanggal lahir alumni (format: YYYY-MM-DD)
 * @param {number} data.tahun_lulus - Tahun lulus alumni
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Object|null)
 * @example
 * const result = await createAlumni({
 *   nisn: '1234567890',
 *   nis: '123456',
 *   nik: '1234567890123456',
 *   nama_siswa: 'John Doe',
 *   tanggal_lahir: '2000-01-01',
 *   tahun_lulus: 2022
 * });
 * if (!result.error) {
 *   console.log('AlumniPage berhasil dibuat:', result.data);
 * }
 */
async function createAlumni(data) {
  try {
    const response = await api.post('/alumni/create', data);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: 'Terjadi kesalahan saat membuat data alumni', data: null };
  }
}

/**
 * Mengambil detail alumni berdasarkan ID
 * @param {number} id - ID alumni
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Object|null)
 * @example
 * const result = await getDetailAlumni(1);
 * if (!result.error) {
 *   console.log('Detail alumni:', result.data);
 * }
 */
async function getQuestionnaireDetail(id) {
  try {
    const response = await api.get(`/questionnaire/detail/${id}`);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, data: null };
  }
}

/**
 * Mengambil Metadata Form Quesioner Detail
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Object|null)
 * @example
 * const result = await getDetailAlumni(1);
 * if (!result.error) {
 *   console.log('Detail alumni:', result.data);
 * }
 */
async function getMetadataForm(id) {
  try {
    const response = await api.get('/quesioner-metadata');
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, data: null };
  }
}

/**
 * Cek Status Tracer Studi
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Object|null)
 * @example
 * const result = await getDetailAlumni(1);
 * if (!result.error) {
 *   console.log('Detail alumni:', result.data);
 * }
 */
async function getTracerStatus(id) {
  try {
    const response = await api.get(`/tracer/status/${id}`);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, data: null };
  }
}

/**
 * Get Program Study by Perguruan Tinggi
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Object|null)
 * @example
 * const result = await getDetailAlumni(1);
 * if (!result.error) {
 *   console.log('Detail alumni:', result.data);
 * }
 */
async function getProgramStudi(idPerguruanTinggi) {
  try {
    const response = await api.get(`/programStudi/${idPerguruanTinggi}`);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, data: null };
  }
}

/**
 * Get All Data Tracer Alumni
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Object|null)
 * @example
 * const result = await getAllAlumni(1);
 * if (!result.error) {
 *   console.log('Detail alumni:', result.data);
 * }
 */
async function getAllAlumni() {
  try {
    const response = await api.get(`/tracer/all`);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, data: null };
  }
}

function putUserInfo(userInfo) {
  return localStorage.setItem('username', userInfo);
}

export {
  putUserInfo,
  login,
  checkAlumni,
  submitTracer,
  getPerguruanTinggiProdi,
  getKuesioner,
  getStatus,
  getJawaban,
  getStatistikAlumni,
  getStatistikKuesioner,
  createAlumni,
  getQuestionnaireDetail,
  getMetadataForm,
  getTracerStatus,
  getProgramStudi,
  getAllAlumni,
};