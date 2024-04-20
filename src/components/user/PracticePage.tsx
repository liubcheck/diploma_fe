import React from 'react';
import {useSelector} from 'react-redux';
import {getCurrentLesson} from '../../redux/selectors/lessonSelector';

const PracticePage: React.FC = () => {
  const lesson = useSelector(getCurrentLesson);

  return (
    <React.Fragment>
      <section className="text-center">
        {lesson?.tasks.map(task => <h1>{task.question}</h1>)}
      </section>
    </React.Fragment>
  );
};

export default PracticePage;
