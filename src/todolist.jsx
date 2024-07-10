import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'; // Assuming you have styles imported

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() === '') {
      toast.warning('Please enter a task.');
      return;
    }

    if (tasks.includes(newTask)) {
      toast.warning('Task already exists.');
      return;
    }

    setTasks([...tasks, newTask]);
    setNewTask('');
  }

  function deleteTask(index) {
    // Confirmation toast
    toast.dark(
      <div>
        <div>Are you sure you want to delete this task?</div>
        <div>
          <button className='yes-button' onClick={() => handleDeleteConfirmation(index)}>Yes</button>
          <button className='no-button' onClick={() => toast.dismiss()}>No</button>
        </div>
      </div>,
      {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }

  function handleDeleteConfirmation(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    toast.dismiss();
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  return (
    <div className='todolist'>
      <h1>To-Do List</h1>
      <div>
        <input type="text" placeholder='Enter a task' value={newTask} onChange={handleInputChange} />
        <button className='addbutton' onClick={addTask}>Add</button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className='text'>{task}</span>
            <button className='delete-button' onClick={() => deleteTask(index)}>Delete</button>
            <button className='move-button' onClick={() => moveTaskUp(index)}>👆🏼</button>
            <button className='move-button' onClick={() => moveTaskDown(index)}>👇🏼</button>
          </li>
        ))}
      </ol>
      <ToastContainer /> {/* Toast container for displaying notifications */}
    </div>
  );
}

export default ToDoList;
