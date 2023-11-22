import React, { useState, useEffect, useRef } from "react";
import './App.css'

const useLocalStorage = (key, initialValue) => {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState(initial);

  const updateValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, updateValue];
};

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const taskInputRef = useRef();

  const addTask = (event) => {
    event.preventDefault();
    const newTask = taskInputRef.current.value.trim();

    if (newTask) {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      taskInputRef.current.value = "";
    }
  };
  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Task List</h1>
      {tasks.length === 0 ? (
        <p>No tasks available. Add some tasks!</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>{task}<span className="delete" onClick={() => deleteTask(index)}>Delete</span></li>
          ))}
        </ul>
      )}
      <form onSubmit={addTask}>
        <label htmlFor="taskInput">Task:</label>
        <input type="text" id="taskInput" ref={taskInputRef} />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default App;