import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import LessonsList from './LessonsList';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {getAllLessons} from '../../redux/selectors/lessonSelector';
import {fetchLessonsByGradeAndSubject} from '../../redux/thunks/lessonThunks';

const LessonsPage: React.FC = () => {
  const {grade, subject} = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const lessons = useSelector(getAllLessons);

  useEffect(() => {
    if (grade && subject) {
      dispatch(
        fetchLessonsByGradeAndSubject({grade: parseInt(grade), subject})
      );
    }
  }, [dispatch, grade, subject]);

  return (
    <section className="text-center">
      <h1>
        Lessons for {subject} Grade {grade}
      </h1>
      <LessonsList lessons={lessons} onClick={() => navigate('/')} />
    </section>
  );
};

export default LessonsPage;
