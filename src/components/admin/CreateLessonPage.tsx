import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Lesson} from '../../redux/slices/lessonSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {createLesson} from '../../redux/thunks/lessonThunks';
import {Task} from '../../redux/slices/taskSlice';
import {getLoggedInUser} from '../../redux/selectors/userSelector';
import Navbar from '../Navbar';
import TaskForm from './TaskForm';

const subjects = [
  'Математика',
  'Алгебра',
  'Українська мова',
  'Англійська мова',
  'Географія',
];
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
    dispatch(createLesson(lesson));
    navigate('/');
  };

  const returnBack = () => {
    navigate('/');
  };

  return (
    <React.Fragment>
      <Navbar username={user!.username} />
      <div className="main-content">
        <h1>Створити урок</h1>
        <form onSubmit={handleSubmit} className="main-form">
          <select
            className="main-form--subject"
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
            className="main-form--grade"
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
            className="main-form--title"
            type="text"
            value={lesson.title}
            onChange={e => setLesson({...lesson, title: e.target.value})}
            placeholder="Назва теми"
          />
          <button
            type="button"
            onClick={addTask}
            disabled={lesson.tasks.length >= 10}
            className="main-form--add"
          >
            Додати питання
          </button>
          <button type="submit" className="main-form--create">
            Створити урок
          </button>
          <button
            type="button"
            className="main-form--back"
            onClick={returnBack}
          >
            Назад
          </button>
        </form>
        <div className="task-form">
          {lesson.tasks.slice(0, 10).map((task, index) => (
            <TaskForm
              key={index}
              task={task}
              updateTask={updatedTask => updateTask(index, updatedTask)}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateLessonPage;
