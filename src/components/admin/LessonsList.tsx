import React from 'react';
import {Lesson} from '../../redux/slices/lessonSlice';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {setCurrentLesson} from '../../redux/slices/lessonSlice';
import {getLoggedInUser} from '../../redux/selectors/userSelector';

interface Props {
  lessons: Lesson[];
}

const LessonsList = ({lessons}: Props) => {
  const user = useSelector(getLoggedInUser);
  const {grade, subject} = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLessonChoice = (lessonId: number) => {
    const lesson = lessons.find(lesson => lesson.id === lessonId);
    if (lesson) {
      dispatch(setCurrentLesson(lesson));
    }
    if (user && user.role.name !== 'ADMIN') {
      navigate(`/${grade}/${subject}/lessons/${lessonId}/practice`);
    } else {
      navigate(`/${grade}/${subject}/lessons/${lessonId}/edit`);
    }
  };

  return (
    <div className="lesson-button-container">
      {lessons.map(lesson => (
        <button
          key={lesson.id}
          onClick={() => handleLessonChoice(lesson.id)}
          className="btn login-btn btn-outline-dark lesson-button"
        >
          {lesson.title}
        </button>
      ))}
    </div>
  );
};

export default LessonsList;
