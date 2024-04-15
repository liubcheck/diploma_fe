import React from 'react';
import SubjectButton from './SubjectButton';

const subjects = ['Math', 'Science', 'History'];

const SubjectsPage = () => {
  return (
    <section className="home-section text-center">
      {subjects.map(subject => (
        <div key={subject}>
          <SubjectButton key={subject} subject={subject} />
        </div>
      ))}
    </section>
  );
};

export default SubjectsPage;
