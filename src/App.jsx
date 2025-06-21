// React Module
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Components
import Navigation from "./components/Navigation";

// Page Components
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import QuizDetail from './pages/QuizDetail';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import Alumni from "./pages/Alumni";

function App() {

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
          <Route path='/login' element={<Login />} />

          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/alumni' element={<Alumni />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
