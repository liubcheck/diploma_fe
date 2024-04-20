import React from 'react';
import {Task} from '../../redux/slices/taskSlice';

interface Props {
  tasks: Task[];
}

const TasksList: React.FC<Props> = ({tasks}) => {
  return (
    <div>
      {tasks.map((task: Task) => (
        <button key={task.id} className="btn login-btn btn-outline-dark">
          {task.question}
        </button>
      ))}
    </div>
  );
};

export default TasksList;
