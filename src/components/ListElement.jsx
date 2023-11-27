import { useState } from "react";

function ListElement(props){
  const [show, changeShow] = useState(false);
  function turnOff(){
    changeShow(false);
  }
  function turnOn(){
    changeShow(true);
  }
    const editTask = (index) => {
        const updatedTasks = [...props.tasks];
        const newTask = prompt("What should the task be renamed to?", updatedTasks[index]);
        if(newTask !== null && newTask !== ""){
          updatedTasks[index] = newTask;
          props.updateName(updatedTasks);
        }
      };
      const deleteTask = (index) => {
        if(window.confirm("Are you sure?")){
          const updatedTasks = [...props.tasks];
          updatedTasks.splice(index, 1);
          props.updateName(updatedTasks);
          const updatedDesc = [...props.description];
          updatedDesc.splice(index, 1);
          props.updateDesc(updatedDesc);
        }
      };
    return(<li key={props.index}><h3>{props.task}</h3>
      {(show && <><span className="show" onClick={turnOff}><sup><sub>Show Less</sub></sup></span>
      <ul className="description"><li>{props.description[props.index]}<br/><br/>
        <span className="delete" onClick={() => deleteTask(props.index)}>Delete</span><span className="edit" onClick={() => editTask(props.index)}>Edit</span>
        </li></ul></>) || <span className="show" onClick={turnOn}><sup><sub>Show More</sub></sup></span>}
    </li>);
}
export default ListElement; 