import React from 'react';
import RadioGroup from './RadioGroup.jsx';

function FormQuestionnaire({ questions, answerOptions, values, onChange }) {
  if (!questions || questions.length === 0) {
    return null;
  }
  return (
    <>
      <hr className="border-gray-200" />
      <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">Kuisioner Kualitas Sekolah</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-8">
        {questions.map((question) => (
          <div key={question.value} className="py-4">
            <RadioGroup
              // Label adalah teks pertanyaan
              label={question.label}
              // Name adalah ID unik pertanyaan
              name={question.value}
              // Pilihan jawaban selalu sama untuk setiap pertanyaan
              options={answerOptions}
              // Nilai yang terpilih diambil dari state 'values' di parent
              selectedValue={values[question.value] || ''}
              // Saat ada perubahan, panggil handler 'onChange' dari parent
              // dengan memberikan ID pertanyaan dan ID jawaban yang baru
              onChange={(event) => onChange(question.value, event.target.value)}
              required
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default FormQuestionnaire;
