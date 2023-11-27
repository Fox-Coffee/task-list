import React, { useState, useRef } from "react";
import ListElement from "./components/ListElement";
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
  const [describe, setDescribe] = useLocalStorage("descriptions", []);

  const taskInputRef = useRef();
  const descriptionInputRef = useRef();

  const addTask = (event) => {
    event.preventDefault();
    const newTask = taskInputRef.current.value.trim();
    let newDescription = descriptionInputRef.current.value.trim();

    if (newTask) {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      taskInputRef.current.value = "";
    }
    if (!newDescription) {
      newDescription = "No description given."
    }
    const updatedDescriptions = [...describe, newDescription];
    setDescribe(updatedDescriptions);
    descriptionInputRef.current.value = "";
  };

  return (
    <div className="App">
      <h1>Task List</h1>
      {tasks.length === 0 ? (
        <p>No tasks available. Add some tasks!</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <ListElement index={index} task={task} updateName={setTasks} updateDesc={setDescribe} tasks={tasks} description={describe}/>
          ))}
        </ul>
      )}
      <form onSubmit={addTask}>
        <label htmlFor="taskInput">Task:<br/></label>
        <input type="text" id="taskInput" ref={taskInputRef} placeholder="Name of the task" size="51" max="40" min="3"/><br/>
        <textarea ref={descriptionInputRef} placeholder="Description" rows="4" cols="50"/><br/>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
export default App;
