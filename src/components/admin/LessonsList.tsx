import React from 'react';
import {Lesson} from '../../redux/slices/lessonSlice';

interface Props {
  lessons: Lesson[];
  onClick: () => void;
}

const LessonsList = ({lessons, onClick}: Props) => {
  return (
    <div>
      {lessons.map((lesson: Lesson) => (
        <button onClick={onClick} className="btn login-btn btn-outline-dark">
          {lesson.title}
        </button>
      ))}
    </div>
  );
};

export default LessonsList;
