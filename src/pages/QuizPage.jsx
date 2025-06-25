import React from 'react';
import QuizInput from '../components/QuizInput';
import { checkAlumni } from '../utils/api';

function QuizPage() {

  async function onCheckAlumni({ nisn, nis, nik, tanggal_lahir }) {
    const { error, data } = await checkAlumni({ nisn, nis, nik, tanggal_lahir });
    // console.log(data.id_alumni);

    if (!error & !data.is_filled) {
      navigate(`/questionnaire/:${data.id}`);
    }
  }

  return (
    <QuizInput onCheckAlumni={onCheckAlumni}/>
  );
}

export default QuizPage;