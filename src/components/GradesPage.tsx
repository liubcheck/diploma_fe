import React from 'react';
import GradeButton from './GradeButton';
import {useSelector} from 'react-redux';
import {getLoggedInUser} from '../redux/selectors/userSelector';
import Navbar from './Navbar';
import {useNavigate} from 'react-router-dom';

const grades = Array.from({length: 11}, (_, i) => i + 1);

const GradesPage = () => {
  const user = useSelector(getLoggedInUser);
  const navigate = useNavigate();

  const returnBack = () => {
    navigate('/');
  };

  return (
    <React.Fragment>
      <Navbar username={user!.username} />
      <section className="text-center">
        <h1 className="grade-title">Обери клас</h1>
        <div className="grade-button-container">
          {grades.map(grade => (
            <div key={grade}>
              <GradeButton grade={grade} />
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

export default GradesPage;
