// React Module
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

// Components
import Navigation from './components/Navigation';

// Page Components
import HomePage from './pages/HomePage.jsx';
import QuizPage from './pages/QuizPage.jsx';
import QuizDetailPage from './pages/QuizDetailPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AlumniPage from './pages/AlumniPage.jsx';

// Utils

function App() {
  const navigate = useNavigate();
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);

  // Life Cycle
  React.useEffect(() => {
    const user = localStorage.getItem('username');
    setAuthedUser(user);
    setInitializing(false);
  }, []);

  const onLoginSuccess = async () => {
    const user = localStorage.getItem('username');
    setAuthedUser(user);
    navigate('/dashboard');
  };

  const onLogout = () => {
    setAuthedUser(null);
    localStorage.removeItem('username');
    navigate('/');
  };

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <div className='app-container'>
        <header>
          <Navigation />
        </header>
        <main className='container mx-auto px-4 py-12'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/questionnaire' element={<QuizPage />} />
            <Route path='/questionnaire/detail/:id' element={<QuizDetailPage />} />
            <Route path='/*' element={<LoginPage onLoginSuccess={onLoginSuccess} />} />
          </Routes>
        </main>
      </div>
    );
  }


  return (
    <div className='app-container'>
      <header>
        <Navigation user={authedUser} logout={onLogout}/>
      </header>
      <main className='container mx-auto px-4 py-12'>
        <Routes>
          <Route path='*' element={<p>404 Not Found</p>} />
          <Route path='/' element={<DashboardPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/alumni' element={<AlumniPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
