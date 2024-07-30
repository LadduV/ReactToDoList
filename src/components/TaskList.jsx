import React, { useState } from 'react';
import { BsChevronDown, BsChevronUp, BsCircle, BsCheckCircle, BsPencil, BsTrash } from 'react-icons/bs';

const TaskList = ({ tasks, updateTask, deleteTask, search, setEditingTask }) => {
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const toggleExpand = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  const handleToggleComplete = (task) => {
    updateTask(task.id, { completed: !task.completed });
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="task_list">
      {filteredTasks.map(task => (
        <div className="task" key={task.id}>
          <div className="task-header">
            <div onClick={() => toggleExpand(task.id)} className="expand-icon">
              {expandedTaskId === task.id ? <BsChevronUp /> : <BsChevronDown />}
            </div>
            <div onClick={() => toggleExpand(task.id)} className="task-title">
              {task.title}
            </div>
            <div className="task-actions">
              <BsPencil onClick={() => setEditingTask(task)} />
              <BsTrash onClick={() => deleteTask(task.id)} />
              {task.completed ? <BsCheckCircle onClick={() => handleToggleComplete(task)} /> : <BsCircle onClick={() => handleToggleComplete(task)} />}
            </div>
          </div>
          {expandedTaskId === task.id && (
            <div className="task-details">
              <p>{task.description}</p>
              <p>Last updated: {new Date(task.timestamp).toLocaleString()}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
