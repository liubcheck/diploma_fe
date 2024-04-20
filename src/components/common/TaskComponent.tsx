import React from 'react';

const TaskComponent = ({task, onChange}) => {
  return (
    <div className="task-container">
      <h2>{task.question}</h2>
      {task.options.map(option => (
        <label key={option.id}>
          <input
            type="radio"
            name={`task-${task.id}`}
            value={option.id}
            onChange={() => onChange(task.id, option.id)}
          />
          {option.text}
        </label>
      ))}
    </div>
  );
};

export default TaskComponent;
