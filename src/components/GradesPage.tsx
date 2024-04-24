import React from 'react';
import GradeButton from './GradeButton';
import {useSelector} from 'react-redux';
import {getLoggedInUser} from '../redux/selectors/userSelector';
import Navbar from './Navbar';

const grades = Array.from({length: 11}, (_, i) => i + 1);

const GradesPage = () => {
  const user = useSelector(getLoggedInUser);

  return (
    <React.Fragment>
      <Navbar username={user!.username} />
      <section className="text-center">
        <h1>Обери клас</h1>
        {grades.map(grade => (
          <div key={grade}>
            <GradeButton grade={grade} />
          </div>
        ))}
      </section>
    </React.Fragment>
  );
};

export default GradesPage;
