import React from 'react';
import GradeButton from './GradeButton';

const grades = Array.from({length: 11}, (_, i) => i + 1);

const GradesPage = () => {
  return (
    <section className="text-center">
      <h1>Select a Grade</h1>
      {grades.map(grade => (
        <div key={grade}>
          <GradeButton grade={grade} />
        </div>
      ))}
    </section>
  );
};

export default GradesPage;
