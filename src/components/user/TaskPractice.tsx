import React, {useState, useEffect} from 'react';
import {shuffleArray} from '../utils/shuffle';
import {Task} from '../../redux/slices/taskSlice';
import {Lesson} from '../../redux/slices/lessonSlice';
import {calculateScore} from '../utils/calculateScore';

interface TaskPracticeProps {
  lesson: Lesson;
  onComplete: (score: number) => void;
}

const TaskPractice: React.FC<TaskPracticeProps> = ({lesson, onComplete}) => {
  const [shuffledTasks, setShuffledTasks] = useState<Task[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{[key: number]: string}>({});
  const [selectedVariant, setSelectedVariant] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    if (lesson?.tasks) {
      setShuffledTasks(shuffleArray([...lesson.tasks]));
    }
  }, [lesson]);

  const handleAnswer = (taskId: number, answer: string) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [taskId]: answer,
    }));
    if (shuffledTasks[currentTaskIndex].taskType !== 'OPEN_ANSWER') {
      setSelectedVariant(prevSelected => ({
        ...prevSelected,
        [taskId]: answer,
      }));
    }
  };

  const goToNextTask = () => {
    if (currentTaskIndex < shuffledTasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      calculateScore(shuffledTasks, userAnswers, currentTaskIndex, onComplete);
    }
  };

  const currentTask = shuffledTasks[currentTaskIndex];
  return (
    <div>
      {currentTask && (
        <div>
          <h1>{currentTask.question}</h1>
          {currentTask.taskType === 'OPEN_ANSWER' ? (
            <input
              type="text"
              value={userAnswers[currentTask.id] || ''}
              onChange={e => handleAnswer(currentTask.id, e.target.value)}
            />
          ) : (
            currentTask.variants?.map(variant => (
              <button
                key={variant.id}
                onClick={() => handleAnswer(currentTask.id, variant.value)}
                className={`btn login-btn btn-outline-dark ${
                  selectedVariant[currentTask.id] === variant.value
                    ? 'selected'
                    : ''
                }`}
                style={{
                  margin: '5px',
                  backgroundColor:
                    selectedVariant[currentTask.id] === variant.value
                      ? 'darkblue'
                      : '',
                }}
              >
                {variant.value}
              </button>
            ))
          )}
          <button
            onClick={goToNextTask}
            className="btn login-btn btn-outline-dark"
            style={{margin: '5px'}}
          >
            {currentTaskIndex === shuffledTasks.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskPractice;
