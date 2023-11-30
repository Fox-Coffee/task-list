import { useState } from "react";
import PropTypes from 'prop-types';
import MessageBoxDelete from "./MessageBoxDelete";
import MessageBoxEdit from "./MessageBoxEdit";

function ListElement(props:any){
  const [show, changeShow] = useState(false);
  const [showDeleteMessageBox, changeShowDeleteMessageBox] = useState(false);
  const [showEditMessageBox, changeShowEditMessageBox] = useState(false);
  const [index, setIndex] = useState(0);
  function turnOff(){
    changeShow(false);
  }
  function turnOn(){
    changeShow(true);
  }
    const editTask = (index:number, newTask:string, newDesc:string) => {
        const updatedTasks = [...props.tasks];
        if(newTask !== null && newTask !== ""){
          updatedTasks[index] = newTask;
          props.updateName(updatedTasks);
        }
        const updatedDesc = [...props.description];
        if(newDesc !== null && newDesc !== ""){
          updatedDesc[index] = newDesc;
          props.updateDesc(updatedDesc);
        }
      };
      const deleteTask = () => {
          const updatedTasks = [...props.tasks];
          updatedTasks.splice(index, 1);
          props.updateName(updatedTasks);
          const updatedDesc = [...props.description];
          updatedDesc.splice(index, 1);
          props.updateDesc(updatedDesc);
          changeShowDeleteMessageBox(false);
      };
    return(
    <li key={props.index}>
            {showDeleteMessageBox ? <MessageBoxDelete yes={deleteTask} close={()=>{changeShowDeleteMessageBox(false)}}/> : <></>}
            {showEditMessageBox ? <MessageBoxEdit editTask={editTask} index={index} close={()=>{changeShowEditMessageBox(false)}} oldName={props.task} oldDesc={props.description[props.index]}/> : <></>}
      <h3>{props.task}</h3>
      {show ? <><span className="show" onClick={turnOff}>Show Less</span>
      <ul className="description"><li>{props.description[props.index]}<br/><br/>
        <span className="delete" onClick={() => {changeShowDeleteMessageBox(true);setIndex(props.index)}}>Delete</span><span className="edit" onClick={() => {changeShowEditMessageBox(true);setIndex(props.index)}}>Edit</span>
        </li></ul></> : <span className="show" onClick={turnOn}>Show More</span>}
    </li>);
}

ListElement.propTypes = {
  index: PropTypes.number,
  task: PropTypes.string,
  description: PropTypes.array,
  updateName: PropTypes.func,
  updateDesc: PropTypes.func,
  tasks: PropTypes.array
}

export default ListElement; 