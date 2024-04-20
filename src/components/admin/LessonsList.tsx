import React from 'react';
import {Lesson} from '../../redux/slices/lessonSlice';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {setCurrentLesson} from '../../redux/slices/lessonSlice';

interface Props {
  lessons: Lesson[];
}

const LessonsList = ({lessons}: Props) => {
  const {grade, subject} = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLessonChoice = (lessonId: number) => {
    const lesson = lessons.find(lesson => lesson.id === lessonId);
    if (lesson) {
      dispatch(setCurrentLesson(lesson));
    }
    navigate(`/${grade}/${subject}/lessons/${lessonId}/practice`);
  };

  return (
    <div>
      {lessons.map((lesson: Lesson) => (
        <button
          key={lesson.id}
          onClick={() => handleLessonChoice(lesson.id)}
          className="btn login-btn btn-outline-dark"
        >
          {lesson.title}
        </button>
      ))}
    </div>
  );
};

export default LessonsList;
