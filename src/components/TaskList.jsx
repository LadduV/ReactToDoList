import React, { useState } from 'react';
import { BsTrash, BsPencil, BsCheckCircle, BsCircle, BsChevronDown, BsChevronUp } from 'react-icons/bs';

const TaskList = ({ tasks, updateTask, deleteTask, search, setEditingTask }) => {
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="task_list">
      {filteredTasks.length === 0 ? (
        <p>No records found !!</p>
      ) : (
        filteredTasks.map(task => (
          <div key={task.id} className="task">
            <div className="task-header">
              <div onClick={() => toggleExpand(task.id)} className="expand-icon">
                {expandedTaskId === task.id ? <BsChevronUp /> : <BsChevronDown />}
              </div>
              <span className="task-title">{task.title}</span>
              <div className="task-actions">
                {task.completed ? (
                  <BsCheckCircle onClick={() => updateTask(task.id, { completed: !task.completed })} />
                ) : (
                  <BsCircle onClick={() => updateTask(task.id, { completed: !task.completed })} />
                )}
                <BsPencil onClick={() => setEditingTask(task)} />
                <BsTrash onClick={() => deleteTask(task.id)} />
              </div>
            </div>
            {expandedTaskId === task.id && (
              <div className="task-details">
                <p>{task.description}</p>
                <p>Last updated: {new Date(task.timestamp).toLocaleString()}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
