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
    setSelectedVariant({});
    if (currentTaskIndex < shuffledTasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      calculateScore(shuffledTasks, userAnswers, currentTaskIndex, onComplete);
    }
  };

  const currentTask = shuffledTasks[currentTaskIndex];
  if (!currentTask) {
    console.error('No current task available at index', currentTaskIndex);
    return <div>No task available</div>;
  }
  const isNextEnabled =
    currentTask.taskType === 'OPEN_ANSWER'
      ? userAnswers[currentTask.id]
      : Object.keys(selectedVariant).length > 0;

  return (
    <div>
      {currentTask && (
        <div>
          <h1>{currentTask.question}</h1>
          <div className="answer-container">
            {currentTask.taskType === 'OPEN_ANSWER' ? (
              <input
                type="text"
                className="main-form--title"
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
                        ? 'green'
                        : '',
                    color:
                      selectedVariant[currentTask.id] === variant.value
                        ? 'white'
                        : '',
                  }}
                >
                  {variant.value}
                </button>
              ))
            )}
            <button
              disabled={!isNextEnabled}
              onClick={goToNextTask}
              className="btn login-btn btn-outline-dark"
              style={{margin: '5px'}}
            >
              {currentTaskIndex === shuffledTasks.length - 1
                ? 'Finish'
                : 'Next'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskPractice;
