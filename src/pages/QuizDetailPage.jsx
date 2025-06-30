import React from 'react';
import QuizDetailInput from '../components/QuizDetailInput';
import { useParams } from 'react-router-dom';
import { getTracerStatus } from '../utils/api';

function QuizDetailPage() {
  const { id } = useParams();
  const [tracerStatus, setTracerStatus] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getTracerStatus(id).then(({ error, data }) => {
      console.log(id);
      if (!error) {
        setTracerStatus(data.is_filled);
      }
    });
    setLoading(false);
  }, [id]);

  // Kembalikan Element Loading saat proses fethcing
  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  // Kembalikan Element 'Alumni sudah mengisi tracer'
  if (tracerStatus === true) {
    return (
      <>
        <p>Alumni Sudah Mengisi Tracer Study</p>
        <a href="/">Kembali ke Halaman Beranda</a>
      </>
    );
  }

  return (
    <>
      <QuizDetailInput idAlumni={id}/>
    </>
  );
}

export default QuizDetailPage;