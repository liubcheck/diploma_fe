import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import RequireAuth from './components/authentication/RequireAuth';
import LoginPage from './components/authentication/LoginPage';
import HomePage from './components/home/HomePage';
import CreateLessonPage from './components/admin/CreateLessonPage';
import EditLessonPage from './components/admin/EditLessonPage';
import GradesPage from './components/GradesPage';
import SubjectsPage from './components/SubjectsPage';
import LessonsPage from './components/admin/LessonsPage';
import RegisterPage from './components/authentication/RegisterPage';
import PracticePage from './components/user/PracticePage';
import Missing from './components/Missing';
import StatsPage from './components/user/StatsPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/*" element={<Missing />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/grades" element={<GradesPage />} />
          <Route path="/:grade/subjects" element={<SubjectsPage />} />
          <Route path="/:grade/:subject/lessons" element={<LessonsPage />} />
          <Route
            path="/:grade/:subject/lessons/:lessonId/practice"
            element={<PracticePage />}
          />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/createLesson" element={<CreateLessonPage />} />
          <Route path="/editLesson" element={<EditLessonPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
