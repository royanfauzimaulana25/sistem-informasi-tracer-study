import React from 'react';
import { getQuestionnaireDetail, getMetadataForm, getProgramStudi, submitTracer } from '../utils/api';
import useApi from '../hooks/useApi'; // Import the custom hook
import { useNavigate } from 'react-router-dom';
import FormGeneralInformation from './FormGeneralInformation';
import FormDetailPendidikan from './FormDetailPendidikan';
import FormQuestionnaire from './FormQuestionnaire';
import ButtonSubmit from './ButtonSubmit';
import RadioGroup from './RadioGroup';

function QuizDetailInput({ idAlumni }) {
  // Fetch initial data using the custom hook
  const { data: personalDataInitial, loading: loadingPersonalData } = useApi(getQuestionnaireDetail, idAlumni);
  const { data: metadataForm, loading: loadingMetadata } = useApi(getMetadataForm);

  // State Management
  const [personalData, setPersonalData] = React.useState({});
  const [detailPendidikan, setDetailPendidikan] = React.useState({
    id_perguruan_tinggi: '',
    id_program_studi: '',
    tahun_masuk: '',
    id_sumber_biaya: '',
  });
  const [statusAlumni, setStatusAlumni] = React.useState('');
  const [questionerAnswers, setQuestionerAnswers] = React.useState({});
  const [programStudiOptions, setProgramStudiOptions] = React.useState([]);

  // State terpisah untuk objek File dan nama file
  const [buktiKuliahFile, setBuktiKuliahFile] = React.useState(null);
  const [buktiKuliahFileName, setBuktiKuliahFileName] = React.useState('');

  const navigate = useNavigate();

  // Effect to populate personal data once fetched
  React.useEffect(() => {
    if (personalDataInitial) {
      setPersonalData({
        ...personalDataInitial,
        alamat_email: '', // Initialize empty fields
        no_telepon: '',
      });
    }
  }, [personalDataInitial]);

  // Effect to fetch program studi when a university is selected
  React.useEffect(() => {
    if (detailPendidikan.id_perguruan_tinggi) {
      getProgramStudi(detailPendidikan.id_perguruan_tinggi).then(({ error, data }) => {
        if (!error) {
          const options = data.map((item) => ({ label: item.nama_program_studi, value: item.id_program_studi }));
          setProgramStudiOptions(options);
        }
      });
    } else {
      setProgramStudiOptions([]); // Clear options if no university is selected
    }
  }, [detailPendidikan.id_perguruan_tinggi]);

  // Memoized Options for Select Inputs
  const { statusOptions, perguruanTinggiOptions, sumberPembiayaanOptions, answerOptions, questionerOptions } = React.useMemo(() => {
    if (!metadataForm) return { statusOptions: [], perguruanTinggiOptions: [], sumberPembiayaanOptions: [],  answerOptions : [], questionerOptions : [] };
    return {
      statusOptions: metadataForm.statusOptions.map((item) => ({ label: item.status, value: item.kode_status })),
      perguruanTinggiOptions: [{ label: 'Pilih Perguruan Tinggi', value: '' }, ...metadataForm.perguruanTinggiOptions.map((item) => ({ label: item.perguruan_tinggi, value: item.id_perguruan_tinggi }))],
      sumberPembiayaanOptions: [{ label: 'Pilih Sumber Biaya', value: '' }, ...metadataForm.sumberBiayaOptions.map((item) => ({ label: item.sumber_biaya, value: item.id_sumber_biaya }))],
      answerOptions: metadataForm.answerOptions.map((item) => ({ label: item.jawaban, value: item.id_jawaban })),
      questionerOptions: metadataForm.questioner.map((item) => ({ label: item.pertanyaan, value: item.id_kuesioner })),
    };
  }, [metadataForm]);


  // Event Handlers
  const handleDataChange = (setter) => (event) => {
    const { name, value, files } = event.target;
    setter((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  // --- Handler khusus untuk input File ---
  const handleFileChange = (id, file) => { // Menerima id dan objek file
    if (id === 'bukti_kuliah') {
      setBuktiKuliahFile(file); // Simpan objek File di state terpisah
      setBuktiKuliahFileName(file ? file.name : ''); // Simpan nama file untuk tampilan

      // PERBAIKAN DI SINI: Pastikan sintaks spread operator dan objek benar
      setDetailPendidikan((prevState) => ({ // <-- Tambahkan kurung kurawal pembuka {
        ...prevState, // <-- Pastikan ada tiga titik (...)
        bukti_kuliah: file
      }));
    }
    // Anda bisa tambahkan logika untuk file upload lain jika ada
  };

  const handleQuestionnaireChange = (questionId, answerId) => {
    setQuestionerAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerId,
    }));
  };

  const handleStatusChange = (event) => {
    if (event.target.value !== 'PEND') {
      setDetailPendidikan({
        id_perguruan_tinggi: '',
        id_program_studi: '',
        tahun_masuk: '',
        id_sumber_biaya: '',
      });
      setBuktiKuliahFile(null);
      setBuktiKuliahFileName('');
    }
    setStatusAlumni(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const submissionData = {
      id_alumni: idAlumni,
      personal_data: { ...personalData },
      status: statusAlumni,
      detail_pendidikan : detailPendidikan.id_perguruan_tinggi ? { ...detailPendidikan } : null,
      kuesioner: questionerAnswers
      // Add other necessary data for submission
    };

    console.log(submissionData);

    const { error } = await submitTracer(submissionData, buktiKuliahFile);

    if (error) {
      alert('Submission failed. Please try again.');
    } else {
      alert('Questionnaire submitted successfully!');
      navigate('/');
    }
  };

  if (loadingPersonalData || loadingMetadata) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="ml-4 text-lg text-gray-600">Loading Data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Isi Kuesioner Tracer Study
        </h1>

        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Informasi Dasar</h2>
            <FormGeneralInformation data={personalData} onDataChange={handleDataChange(setPersonalData)} />

            <hr className="border-gray-300" />
            <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">Kuisioner</h2>
            <RadioGroup
              label="Status Anda saat ini?*"
              name="status"
              options={statusOptions}
              selectedValue={statusAlumni}
              onChange={handleStatusChange}
              required
            />

            {statusAlumni === 'PEND' && ( // Conditionally render the education details form
              <FormDetailPendidikan
                perguruanTinggiOptions={perguruanTinggiOptions}
                programStudiOptions={programStudiOptions}
                sumberPembiayaanOptions={sumberPembiayaanOptions}
                value={detailPendidikan}
                onChange={handleDataChange(setDetailPendidikan)}
                onFileChange={handleFileChange} // <-- Teruskan handler file ke FormDetailPendidikan
                buktiKuliahFileName={buktiKuliahFileName} // <-- Teruskan nama file ke FormDetailPendidikan
              />
            )}

            <FormQuestionnaire
              questions={questionerOptions}
              answerOptions={answerOptions}
              values={questionerAnswers}
              onChange={handleQuestionnaireChange}
            />

            <div className="flex justify-center mt-10">
              <ButtonSubmit />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default QuizDetailInput;