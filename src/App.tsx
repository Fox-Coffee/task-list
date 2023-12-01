import { useState, useRef } from "react";
import ListElement from "./components/ListElement";
import Form from "./components/Form";
import './App.css'

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

  //Ref used to read the value of the input responsible for task's name
  const taskInputRef:any = useRef();
  //Ref used to read the value of the input responsible for task's description
  const descriptionInputRef:any = useRef();

  const addTask = (event:any) => {
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
      <header><img src="/icon512.png" className="logo"></img><h1>ask List</h1></header>
      {tasks.length === 0 ? (
        //Displayed if no task is present
        <p>No tasks available. Add some tasks!</p>
      ) : (
        //List of tasks
        <ul>
          {tasks.map((task:string, index:number) => (
            /*
              index - Index of the current element of the list.
              task - The name of the task
              updateName - Function to change the name of the tasks
              updateName - Function to change the description of the tasks
              tasks - The table of all task names
              description - The table of all task names
            */
            <ListElement index={index} task={task} updateName={setTasks} updateDesc={setDescribe} tasks={tasks} description={describe}/>
          ))}
        </ul>
      )}
      {/*Form used to add tasks*/}
      <form onSubmit={addTask}>
        <label htmlFor="taskInput">Task:<br/></label>
        <Form taskInputRef={taskInputRef} descriptionInputRef={descriptionInputRef} />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
export default App;
