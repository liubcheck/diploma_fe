import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {AuthProvider} from './components/authentication/AuthProvider';
import ProtectedRoute from './components/authentication/ProtectedRoute';
import LoginPage from './components/authentication/LoginPage';
import HomePage from './components/home/HomePage';
import CreateLessonPage from './components/admin/CreateLessonPage';
import EditLessonPage from './components/admin/EditLessonPage';
import GradesPage from './components/GradesPage';
import SubjectsPage from './components/SubjectsPage';
import LessonsPage from './components/admin/LessonsPage';
import RegisterPage from './components/authentication/RegisterPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/grades" element={<GradesPage />} />
            <Route path="/:grade/subjects" element={<SubjectsPage />} />
            <Route path="/:grade/:subject/lessons" element={<LessonsPage />} />
            <Route path="/createLesson" element={<CreateLessonPage />} />
            <Route path="/editLesson" element={<EditLessonPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
