import React from 'react';
import QuizInputDetail from '../components/QuizInputDetail';
import { useParams, useNavigate } from 'react-router-dom';
import { getDetailAlumni } from '../utils/api';

function QuizDetailPage() {
  const { id } = useParams();
  const [alumniData, setAlumniData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const navigate = useNavigate();

  React.useEffect(() => {
    getDetailAlumni(id).then(({ error, data }) => {
      if (!error) {
        setAlumniData(data);
      } else {
        setAlumniData(null);
      }
      setLoading(false);
    }).catch(() => {
      setAlumniData(null);
      setLoading(false);
    });
  }, [id]);

  // Handle navigation when alumni has already filled the questionnaire
  React.useEffect(() => {
    if (!loading && alumniData?.alumni?.is_filled) {
      alert('Alumni Sudah Isi Kuesioner');
      navigate('/questionnaire/');
    }
  }, [loading, alumniData, navigate]);

  if (loading) {
    return <p>Loading</p>;
  }

  if (!alumniData || !alumniData.alumni) {
    return (
      <p>Alumni Tidak Ditemukan / Halaman Tidak Ditemukan</p>
    );
  }

  // Don't render the form if alumni has already filled it
  if (alumniData.alumni?.is_filled) {
    return <p>Redirecting...</p>;
  }

  return (
    <>
      <QuizInputDetail dataAlumni={alumniData}/>
    </>
  );
}

export default QuizDetailPage;