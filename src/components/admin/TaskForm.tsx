import React from 'react';
import {useEffect} from 'react';
import {Task} from '../../redux/slices/taskSlice';
import {Variant} from '../../redux/slices/variantSlice';

interface TaskFormProps {
  task: Task;
  updateTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({task, updateTask}) => {
  useEffect(() => {
    if (!task.taskType) {
      updateTask({...task, taskType: 'SINGLE_ANSWER'});
    }
  }, [task, updateTask]);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTask({...task, question: e.target.value});
  };

  const handleTaskTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const taskType = e.target.value;
    if (taskType === 'SINGLE_ANSWER') {
      const resetVariants = Array(4)
        .fill(null)
        .map((_, index) => ({
          value: '',
          isRight: index === 0,
        }));
      updateTask({
        ...task,
        taskType,
        variants: resetVariants,
        rightAnswer: undefined,
      });
    } else if (taskType === 'OPEN_ANSWER') {
      updateTask({
        ...task,
        taskType,
        variants: undefined,
        rightAnswer: '',
      });
    }
  };

  const handleVariantChange = (index: number, variant: Partial<Variant>) => {
    let updatedVariants = task.variants?.map((v, i) =>
      i === index ? {...v, ...variant} : v
    );
    if (variant.isRight) {
      updatedVariants = updatedVariants?.map((v, i) => ({
        ...v,
        isRight: i === index,
      }));
    }
    updateTask({...task, variants: updatedVariants});
  };

  return (
    <div className="lesson-form">
      <input
        type="text"
        value={task.question}
        onChange={handleQuestionChange}
        placeholder="Питання"
        className="lesson-input"
      />
      <select
        value={task.taskType}
        onChange={handleTaskTypeChange}
        className="lesson-select"
      >
        <option value="SINGLE_ANSWER" className="lesson-option">
          З варіантами
        </option>
        <option value="OPEN_ANSWER" className="lesson-option">
          Текстова відповідь
        </option>
      </select>
      <div className="lesson-answers">
        {task.taskType === 'SINGLE_ANSWER' &&
          task.variants?.map((variant, index) => (
            <div key={index} className="lesson-variant">
              <input
                className="lesson-option"
                type="text"
                value={variant.value}
                onChange={e =>
                  handleVariantChange(index, {value: e.target.value})
                }
                placeholder="Варіант"
              />
              <input
                className="lesson-checkbox"
                type="checkbox"
                checked={variant.isRight}
                onChange={e =>
                  handleVariantChange(index, {isRight: e.target.checked})
                }
              />
            </div>
          ))}
      </div>

      {task.taskType === 'OPEN_ANSWER' && (
        <input
          type="text"
          value={task.rightAnswer || ''}
          onChange={e => updateTask({...task, rightAnswer: e.target.value})}
          placeholder="Правильна відповідь"
        />
      )}
    </div>
  );
};

export default TaskForm;
