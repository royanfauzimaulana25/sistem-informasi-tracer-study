import React from 'react';
import QuizInput from '../components/QuizInput';
import { checkAlumni } from '../utils/api';
import { useNavigate } from 'react-router-dom';

function QuizPage() {
  const navigate = useNavigate();
  async function onCheckAlumni({ nisn, nis, nik, tanggal_lahir }) {
    const { error, data } = await checkAlumni({ nisn, nis, nik, tanggal_lahir });

    if (!error & !data.is_filled) {
      console.log(data);
      navigate(`/questionnaire/detail/${data.id_alumni}`);
    }

    if (!error & data.is_filled) {
      alert('Anda sudah mengisi tracer study');
      navigate(`/`);
    }
  }

  return (
    <QuizInput onCheckAlumni={onCheckAlumni}/>
  );
}

export default QuizPage;