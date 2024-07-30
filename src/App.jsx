import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';
import './index.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    axios.get('/src/data/tasks.json')
      .then(response => setTasks(response.data))
      .catch(err => console.error(err));
  }, []);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: tasks.length + 1,
      completed: false,
      timestamp: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
    saveTasks([...tasks, newTask]);
  };

  const updateTask = (id, updatedTask) => {
    const updatedTasks = tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task));
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const saveTasks = (updatedTasks) => {
    // Mock saving tasks to JSON file
    // In a real app, you'd make a POST/PUT request to your backend here
    console.log('Tasks saved to JSON:', updatedTasks);
  };

  return (
    <div className='home'>
      <h2>To Do List</h2>
      <input
        type="text"
        className="search_input"
        placeholder="Search Tasks"
        value={search}
        onChange={handleSearchChange}
      />
      <CreateTask addTask={addTask} editingTask={editingTask} updateTask={updateTask} />
      <TaskList
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        search={search}
        setEditingTask={setEditingTask}
      />
    </div>
  );
};

export default App;
