import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {updateLesson} from '../../redux/thunks/lessonThunks';
import {getCurrentLesson} from '../../redux/selectors/lessonSelector';
import Navbar from '../Navbar';
import TaskForm from './TaskForm';
import {Lesson} from '../../redux/slices/lessonSlice';
import {AppDispatch} from '../../redux/store';
import {getLoggedInUser} from '../../redux/selectors/userSelector';

const EditLessonPage = () => {
  const user = useSelector(getLoggedInUser);
  const currentLesson = useSelector(getCurrentLesson);
  const [lessonToEdit, setLessonToEdit] = useState<Lesson>({
    id: 0,
    subject: '',
    grade: 0,
    title: '',
    tasks: [],
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentLesson) {
      setLessonToEdit(currentLesson);
    }
  }, [currentLesson]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLessonToEdit({...lessonToEdit, title: e.target.value});
  };

  const handleUpdateTask = (index, updatedTask) => {
    const updatedTasks = lessonToEdit.tasks.map((task, i) =>
      i === index ? updatedTask : task
    );
    setLessonToEdit({...lessonToEdit, tasks: updatedTasks});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateLesson(lessonToEdit)).then(() => {
      navigate('/');
    });
  };

  const returnBack = () => {
    navigate('/:grade/subjects/lessons');
  };

  return (
    <React.Fragment>
      <Navbar username={user!.username} />
      <div className="main-content">
        <h1>Редагувати урок</h1>
        <form onSubmit={handleSubmit} className="main-form">
          <input
            className="main-form--title"
            type="text"
            value={lessonToEdit.title}
            onChange={handleTitleChange}
            placeholder="Назва теми"
          />

          <button type="submit" className="main-form--create">
            Редагувати урок
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
          {lessonToEdit.tasks.map((task, index) => (
            <TaskForm
              key={index}
              task={task}
              updateTask={updatedTask => handleUpdateTask(index, updatedTask)}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditLessonPage;
