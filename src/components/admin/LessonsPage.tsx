import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import LessonsList from './LessonsList';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {getAllLessons} from '../../redux/selectors/lessonSelector';
import {fetchLessonsByGradeAndSubject} from '../../redux/thunks/lessonThunks';

const LessonsPage: React.FC = () => {
  const {grade, subject} = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const lessons = useSelector(getAllLessons);

  useEffect(() => {
    if (grade && subject) {
      dispatch(
        fetchLessonsByGradeAndSubject({grade: parseInt(grade), subject})
      );
    }
  }, [dispatch, grade, subject]);

  return (
    <section className="home-section text-center">
      <h2>
        Уроки з предмету "{subject}" для {grade} класу
      </h2>
      <LessonsList lessons={lessons} />
    </section>
  );
};

export default LessonsPage;
