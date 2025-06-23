// React Module
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

// Components
import Navigation from './components/Navigation';

// Page Components
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import QuizDetail from './pages/QuizDetail';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard';
import Alumni from './pages/Alumni';

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
            <Route path='/' element={<Home />} />
            <Route path='/questionnaire' element={<Quiz />} />
            <Route path='/questionnaire/:id' element={<QuizDetail />} />
            <Route path='/*' element={<LoginPage onLoginSuccess={onLoginSuccess}/>} />
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
          <Route path='/' element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/alumni' element={<Alumni />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
