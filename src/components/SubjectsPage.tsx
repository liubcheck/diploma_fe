import React from 'react';
import SubjectButton from './SubjectButton';
import {useSelector} from 'react-redux';
import {getLoggedInUser} from '../redux/selectors/userSelector';
import Navbar from './Navbar';
import {useNavigate} from 'react-router-dom';

const subjects = [
  'Українська мова',
  'Математика',
  'Алгебра',
  'Геометрія',
  'Географія',
  'Біологія',
  'Історія України',
  'Англійська мова',
];

const SubjectsPage = () => {
  const user = useSelector(getLoggedInUser);
  const navigate = useNavigate();

  const returnBack = () => {
    navigate('/grades');
  };

  return (
    <React.Fragment>
      <Navbar username={user!.username} />
      <section className="home-section text-center">
        <h1>Обери предмет</h1>
        <div className="subject-button-container">
          {subjects.map(subject => (
            <div key={subject}>
              <SubjectButton key={subject} subject={subject} />
            </div>
          ))}
          <button
            onClick={returnBack}
            className="btn btn-outline-dark button-back"
          >
            Назад
          </button>
        </div>
      </section>
    </React.Fragment>
  );
};

export default SubjectsPage;
