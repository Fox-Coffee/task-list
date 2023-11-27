import React, { useState, useEffect, useRef } from "react";
import { ListElement } from "./components/ListElement";
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

  return (
    <div className="App">
      <h1>Task List</h1>
      {tasks.length === 0 ? (
        <p>No tasks available. Add some tasks!</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <ListElement index={index} task={task} update={setTasks} tasks={tasks}/>
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
