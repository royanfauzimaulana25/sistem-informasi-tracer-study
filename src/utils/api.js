/**
 * API Service Module
 *
 * Module ini menyediakan fungsi-fungsi untuk berinteraksi dengan Notes API Dicoding.
 * Menggunakan Axios sebagai HTTP client dengan automatic token authentication.
 *
 * @author Your Name
 * @version 1.0.0
 */

import axios from 'axios';

// Base URL untuk API Dicoding Notes
const BASE_URL = 'https://notes-api.dicoding.dev/v1';

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
 * Mengambil access token dari localStorage
 * @returns {string|null} Access token atau null jika tidak ada
 */
function getAccessToken() {
  return localStorage.getItem('accessToken');
}

/**
 * Menyimpan access token ke localStorage
 * @param {string} accessToken - Token akses yang akan disimpan
 * @returns {void}
 */
function putAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken);
}

/**
 * Interceptor untuk menambahkan Authorization header secara otomatis
 * pada setiap request yang menggunakan instance api
 */
api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Melakukan login pengguna
 * @param {Object} credentials - Kredensial login
 * @param {string} credentials.email - Email pengguna
 * @param {string} credentials.password - Password pengguna
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Object|null)
 * @example
 * const result = await login({ email: 'user@example.com', password: 'password123' });
 * if (!result.error) {
 *   console.log('Login berhasil:', result.data);
 * }
 */
async function login({ email, password }) {
  try {
    const response = await api.post('/login', { email, password });
    return { error: false, data: response.data.data };
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message);
    } else {
      alert('Terjadi kesalahan saat login.');
    }
    return { error: true, data: null };
  }
}

/**
 * Mendaftarkan pengguna baru
 * @param {Object} userData - Data pengguna baru
 * @param {string} userData.name - Nama lengkap pengguna
 * @param {string} userData.email - Email pengguna
 * @param {string} userData.password - Password pengguna
 * @returns {Promise<Object>} Object dengan property error (boolean)
 * @example
 * const result = await register({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   password: 'password123'
 * });
 * if (!result.error) {
 *   console.log('Registrasi berhasil');
 * }
 */
async function register({ name, email, password }) {
  try {
    await api.post('/register', { name, email, password });
    return { error: false };
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message);
    } else {
      alert('Terjadi kesalahan saat pendaftaran.');
    }
    return { error: true };
  }
}

/**
 * Mengambil data pengguna yang sedang login
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Object|null)
 * @example
 * const result = await getUserLogged();
 * if (!result.error) {
 *   console.log('Data pengguna:', result.data);
 * }
 */
async function getUserLogged() {
  try {
    const response = await api.get('/users/me');
    return { error: false, data: response.data.data };
  } catch (error) {
    // Tangani kesalahan, misalnya token tidak valid
    return { error: true, data: null };
  }
}

/**
 * Menambahkan catatan baru
 * @param {Object} noteData - Data catatan baru
 * @param {string} noteData.title - Judul catatan
 * @param {string} noteData.body - Isi catatan
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Object|null)
 * @example
 * const result = await addNote({
 *   title: 'Catatan Penting',
 *   body: 'Ini adalah isi catatan yang sangat penting.'
 * });
 * if (!result.error) {
 *   console.log('Catatan berhasil ditambahkan:', result.data);
 * }
 */
async function addNote({ title, body }) {
  try {
    const response = await api.post('/notes', { title, body });
    return { error: false, data: response.data.data };
  } catch (error) {
    return { error: true, data: null };
  }
}

/**
 * Mengambil semua catatan aktif (tidak diarsipkan)
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Array|null)
 * @example
 * const result = await getActiveNotes();
 * if (!result.error) {
 *   console.log('Catatan aktif:', result.data);
 * }
 */
async function getActiveNotes() {
  try {
    const response = await api.get('/notes');
    return { error: false, data: response.data.data };
  } catch (error) {
    return { error: true, data: null };
  }
}

/**
 * Mengambil semua catatan yang diarsipkan
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Array|null)
 * @example
 * const result = await getArchivedNotes();
 * if (!result.error) {
 *   console.log('Catatan arsip:', result.data);
 * }
 */
async function getArchivedNotes() {
  try {
    const response = await api.get('/notes/archived');
    return { error: false, data: response.data.data };
  } catch (error) {
    return { error: true, data: null };
  }
}

/**
 * Mengambil detail catatan berdasarkan ID
 * @param {string} id - ID catatan yang akan diambil
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Object|null)
 * @example
 * const result = await getNote('note-123');
 * if (!result.error) {
 *   console.log('Detail catatan:', result.data);
 * }
 */
async function getNote(id) {
  try {
    const response = await api.get(`/notes/${id}`);
    return { error: false, data: response.data.data };
  } catch (error) {
    return { error: true, data: null };
  }
}

/**
 * Mengarsipkan catatan berdasarkan ID
 * @param {string} id - ID catatan yang akan diarsipkan
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Object|null)
 * @example
 * const result = await archiveNote('note-123');
 * if (!result.error) {
 *   console.log('Catatan berhasil diarsipkan:', result.data);
 * }
 */
async function archiveNote(id) {
  try {
    const response = await api.post(`/notes/${id}/archive`);
    return { error: false, data: response.data.data };
  } catch (error) {
    return { error: true, data: null };
  }
}

/**
 * Membatalkan arsip catatan berdasarkan ID
 * @param {string} id - ID catatan yang akan dibatalkan arsipnya
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Object|null)
 * @example
 * const result = await unarchiveNote('note-123');
 * if (!result.error) {
 *   console.log('Catatan berhasil dikembalikan dari arsip:', result.data);
 * }
 */
async function unarchiveNote(id) {
  try {
    const response = await api.post(`/notes/${id}/unarchive`);
    return { error: false, data: response.data.data };
  } catch (error) {
    return { error: true, data: null };
  }
}

/**
 * Menghapus catatan berdasarkan ID
 * @param {string} id - ID catatan yang akan dihapus
 * @returns {Promise<Object>} Object dengan property error (boolean) dan data (Object|null)
 * @example
 * const result = await deleteNote('note-123');
 * if (!result.error) {
 *   console.log('Catatan berhasil dihapus:', result.data);
 * }
 */
async function deleteNote(id) {
  try {
    const response = await api.delete(`/notes/${id}`);
    return { error: false, data: response.data.data };
  } catch (error) {
    return { error: true, data: null };
  }
}

export {
  getAccessToken,
  putAccessToken,
  login,
  register,
  getUserLogged,
  addNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
};