import React, { useState, useEffect } from 'react';

const CreateTask = ({ addTask, editingTask, updateTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      if (editingTask) {
        updateTask(editingTask.id, { title, description });
      } else {
        addTask({ title, description });
      }
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form className="create_form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default CreateTask;
