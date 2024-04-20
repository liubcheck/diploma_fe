import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Lesson} from '../../redux/slices/lessonSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {createLesson} from '../../redux/thunks/lessonThunks';
import {Task} from '../../redux/slices/taskSlice';
import {Variant} from '../../redux/slices/variantSlice';
import {getLoggedInUser} from '../../redux/selectors/userSelector';
import Navbar from '../Navbar';

const subjects = ['Math', 'Science', 'Literature'];
const grades = Array.from({length: 11}, (_, i) => i + 1);

const CreateLessonPage: React.FC = () => {
  const user = useSelector(getLoggedInUser);
  const [lesson, setLesson] = useState<Lesson>({
    id: 0,
    subject: 'Math',
    grade: 1,
    title: '',
    tasks: [],
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const addTask = () => {
    const newTask = {
      id: 0,
      question: '',
      taskType: 'SINGLE_ANSWER',
      variants: Array(4).fill({value: '', isRight: false}),
    };
    setLesson({
      ...lesson,
      tasks: [...lesson.tasks, newTask],
    });
  };

  const updateTask = (index: number, task: Task) => {
    const updatedTasks = lesson.tasks.map((t, i) => (i === index ? task : t));
    setLesson({...lesson, tasks: updatedTasks});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(lesson);
    dispatch(createLesson(lesson));
    navigate('/');
  };

  return (
    <React.Fragment>
      <Navbar username={user!.username} />
      <div>
        <form onSubmit={handleSubmit}>
          <select
            value={lesson.subject}
            onChange={e => setLesson({...lesson, subject: e.target.value})}
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <select
            value={lesson.grade}
            onChange={e =>
              setLesson({...lesson, grade: Number(e.target.value)})
            }
          >
            {grades.map(grade => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={lesson.title}
            onChange={e => setLesson({...lesson, title: e.target.value})}
            placeholder="Lesson title"
          />
          {lesson.tasks.map((task, index) => (
            <TaskForm
              key={index}
              task={task}
              updateTask={updatedTask => updateTask(index, updatedTask)}
            />
          ))}
          <button type="button" onClick={addTask}>
            Add Task
          </button>
          <button type="submit">Create Lesson</button>
        </form>
      </div>
    </React.Fragment>
  );
};

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
    <div>
      <input
        type="text"
        value={task.question}
        onChange={handleQuestionChange}
        placeholder="Question"
      />
      <select value={task.taskType} onChange={handleTaskTypeChange}>
        <option value="SINGLE_ANSWER">With Variants</option>
        <option value="OPEN_ANSWER">Text Answer</option>
      </select>
      {task.taskType === 'SINGLE_ANSWER' &&
        task.variants?.map((variant, index) => (
          <div key={index}>
            <input
              type="text"
              value={variant.value}
              onChange={e =>
                handleVariantChange(index, {value: e.target.value})
              }
              placeholder="Variant"
            />
            <input
              type="checkbox"
              checked={variant.isRight}
              onChange={e =>
                handleVariantChange(index, {isRight: e.target.checked})
              }
            />
          </div>
        ))}
      {task.taskType === 'OPEN_ANSWER' && (
        <input
          type="text"
          value={task.rightAnswer || ''}
          onChange={e => updateTask({...task, rightAnswer: e.target.value})}
          placeholder="Right Answer"
        />
      )}
    </div>
  );
};

export default CreateLessonPage;
