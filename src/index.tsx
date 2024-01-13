/**
    task-list - a program used to manage tasks
    Copyright (C) 2023  Filip Kamieniecki

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

// This file contains the code for the main app.

import ReactDOM from 'react-dom/client';
import { useState, useRef } from "react";
import ListElement from "./components/ListElement";
import Form from "./components/Form";
import MessageBoxDelete from "./components/MessageBoxDelete";
import './App.scss'

// Custom hook for managing local storage
const useLocalStorage = (key:string, initialValue: any) => {
  // Retrieve stored value from local storage
  const storedValue = localStorage.getItem(key);
  // Parse stored value or use initial value if not present
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  // State to manage the current value
  const [value, setValue] = useState(initial);

  // Function to update value and store it in local storage
  const updateValue = (newValue:string) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, updateValue];
};

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [describe, setDescribe] = useLocalStorage("descriptions", []);
  const [color, setColor] = useLocalStorage("color", []);
  const [show, setShow] = useState(false);
  const [date, setDate] = useLocalStorage("date", []);

  //Ref used to read the value of the input responsible for task's name
  const taskInputRef:any = useRef();
  //Ref used to read the value of the input responsible for task's description
  const descriptionInputRef:any = useRef();
  //Ref used to read the value of the input responsible for task's color
  const colorInputRef:any = useRef();

  const addTask = (event:any) => {
    event.preventDefault();
    const newTask = taskInputRef.current.value.trim();
    let newDescription = descriptionInputRef.current.value.trim();
    let newColor = colorInputRef.current.value;
    let newDate = new Date();

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

    const updatedColors = [...color, newColor];
    setColor(updatedColors);

    const updatedDate = [...date, newDate];
    setDate(updatedDate);
  };
  function clear(){
    setTasks([]);
    setDescribe([]);
    setColor([]);
    setShow(false);
    setDate([]);
  }
  return (
    <div className="App">
      <header><img src="/icon512.png" className="logo"></img><h1>ask List</h1></header>
      {tasks.length === 0 ? (
        //Displayed if no task is present
        <p>No tasks available. Add some tasks!</p>
      ) : (
        //List of tasks
        <ul className="tasks">
          {tasks.map((task:string, index:number) => (
            /*
              index - Index of the current element of the list.
              task - The name of the task
              color - the color used for accented elements of an element
              date - the date of creation of the task
              description - The table of all task names
              tasks - The table of all task names
              updateName - Function to change the name of the tasks
              updateName - Function to change the description of the tasks
              updateDate - Function to change the date of the task
            */
            <ListElement index={index} task={task} updateName={setTasks} updateDesc={setDescribe} updateCol={setColor} tasks={tasks} description={describe} color={color} date={date} updateDate={setColor}/>
          ))}
        </ul>
      )}
      {/*Form used to add tasks*/}
      <form onSubmit={addTask}>
        <label htmlFor="taskInput">Task:<br/></label>
        <Form taskInputRef={taskInputRef} descriptionInputRef={descriptionInputRef} colorInputRef={colorInputRef}/>
        <button type="submit" className="button">Add Task</button>
        {show ? <MessageBoxDelete close={()=>{setShow(false)}} yes={clear} txt="Do you want to delete all tasks?"/> : <></>}
        <button className="button" onClick={()=>{setShow(true)}}>Clear List</button>
      </form>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <App />
);