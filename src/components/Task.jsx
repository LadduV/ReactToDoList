import React, { useState } from 'react';
import { BsCircle, BsCheckCircle, BsTrash, BsPencil } from 'react-icons/bs';

const Task = ({ task, updateTask, deleteTask, setEditingTask }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleComplete = () => {
    updateTask(task.id, { completed: !task.completed });
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="task">
      <div className="task-header">
        <div onClick={toggleComplete}>
          {task.completed ? <BsCheckCircle /> : <BsCircle />}
        </div>
        <div onClick={toggleExpand}>
          {task.title}
        </div>
        <div>
          <BsPencil onClick={() => setEditingTask(task)} />
          <BsTrash onClick={() => deleteTask(task.id)} />
        </div>
      </div>
      {isExpanded && (
        <div className="task-details">
          <p>{task.description}</p>
          <p>{new Date(task.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default Task;
