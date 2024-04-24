import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentLesson} from '../../redux/selectors/lessonSelector';
import TaskPractice from './TaskPractice';
import {saveProgress} from '../../redux/thunks/progressThunks';
import {AppDispatch} from '../../redux/store';
import Button from '../home/HomeButton';

const PracticePage: React.FC = () => {
  const lesson = useSelector(getCurrentLesson);
  const [completed, setCompleted] = useState<boolean>(false);
  const [lessonScore, setLessonScore] = useState<number>(0);
  const [passed, setPassed] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const resetPractice = useCallback(() => {
    setCompleted(false);
  }, []);

  const handleComplete = async (score: number) => {
    if (lesson) {
      const progressData = {
        lessonId: lesson.id,
        score: score,
      };
      await dispatch(saveProgress(progressData)).then(() => {
        setLessonScore(score);
        setPassed(score / lesson?.tasks.length >= 0.8);
        setCompleted(true);
      });
    }
  };

  return (
    <React.Fragment>
      <section className="home-section text-center">
        {completed ? (
          <div>
            <h1>{`Урок ${
              passed
                ? 'пройдений!'
                : 'не пройдений! Має бути не менше 80% правильних відповідей!'
            } Результат: ${lessonScore}/${lesson?.tasks.length}`}</h1>
            <Button label="Заново" onClick={resetPractice} />
            <Button label="На головну" link="/" />
          </div>
        ) : (
          lesson && <TaskPractice lesson={lesson} onComplete={handleComplete} />
        )}
      </section>
    </React.Fragment>
  );
};

export default PracticePage;
