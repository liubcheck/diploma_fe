import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentLesson} from '../../redux/selectors/lessonSelector';
import {getCurrentProgress} from '../../redux/selectors/progressSelector';
import TaskPractice from './TaskPractice';
//import {useNavigate} from 'react-router-dom';
import {saveProgress} from '../../redux/thunks/progressThunks';
import {AppDispatch} from '../../redux/store';

const PracticePage: React.FC = () => {
  const lesson = useSelector(getCurrentLesson);
  const currentProgress = useSelector(getCurrentProgress);
  const [completed, setCompleted] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  //const navigate = useNavigate();

  const handleComplete = async (score: number) => {
    if (lesson) {
      const progressData = {
        lessonId: lesson.id,
        score: score,
      };
      await dispatch(saveProgress(progressData)).then(() => setCompleted(true));
      //navigate('/lesson-completed');
    }
  };

  if (completed) {
    const scorePercentage =
      currentProgress?.score && lesson?.tasks.length
        ? currentProgress.score / lesson.tasks.length
        : 0;
    if (scorePercentage >= 0.8) {
      return (
        <h1>{`Lesson Completed! Your score: ${currentProgress?.score}`}</h1>
      );
    } else {
      return <h1>Lesson Failed! Less than 80% of right answers!</h1>;
    }
  }

  return (
    <React.Fragment>
      <section className="text-center">
        {lesson && <TaskPractice lesson={lesson} onComplete={handleComplete} />}
      </section>
    </React.Fragment>
  );
};

export default PracticePage;
