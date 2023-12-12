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
import { useState } from "react";
import PropTypes from 'prop-types';
import MessageBoxDelete from "./MessageBoxDelete";
import MessageBoxEdit from "./MessageBoxEdit";
import "./ListElement.scss"

function ListElement(props:any){
  /*
    index - Index of the current element of the list.
    task - The name of the task
    updateName - Function to change the name of the tasks
    updateName - Function to change the description of the tasks
    tasks - The table of all task names
    description - The table of all task names
    color - the color used for accented elements of an element
  */

  //Used to determine if 
  const [showDetails, changeShowDetails] = useState(false);
  const [showDeleteMessageBox, changeShowDeleteMessageBox] = useState(false);
  const [showEditMessageBox, changeShowEditMessageBox] = useState(false);
  const [deleteAnimation, setDeleteAnimation] = useState(false);

  
  const [index, setIndex] = useState(props.index);

  const editTask = (index:number, newTask:string, newDesc:string, newColor:string) => {
    const updatedTasks = [...props.tasks];
    //Checks if the task's name changed, and changes to the new name
    if(newTask !== null && newTask !== ""){
      updatedTasks[index] = newTask;
      props.updateName(updatedTasks);
    }
    const updatedDesc = [...props.description];
    //Checks if the task's description changed, and changes to the new description
    if(newDesc !== null && newDesc !== ""){
      updatedDesc[index] = newDesc;
      props.updateDesc(updatedDesc);
    }
    const updatedColors = [...props.color];
    updatedColors[index] = newColor;
    props.updateCol(updatedColors);

    changeShowEditMessageBox(false);
  };
  const deleteTask = () => {
    setDeleteAnimation(true);
    setTimeout(()=>{
      //Updating the list of names
      const updatedTasks = [...props.tasks];
      updatedTasks.splice(index, 1);
      props.updateName(updatedTasks);

      //Updating the list of descriptions
      const updatedDesc = [...props.description];
      updatedDesc.splice(index, 1);
      props.updateDesc(updatedDesc);

      const updatedColors = [...props.color];
      updatedDesc.splice(index, 1);
      props.updateCol(updatedColors);
    }, 500)

    //Hiding the message box
    changeShowDeleteMessageBox(false);
  };
  return(
  <li key={index} className={`task ${deleteAnimation ? "delAni" : ""}`}>
          {/*If showDeleteMessageBox is true, the message box for confirming deletion of a task will appear, where the user can confirm the deletion, or cancel it*/}
          {showDeleteMessageBox ? <MessageBoxDelete txt="Are you sure you want to delete this task?" yes={deleteTask} close={()=>{changeShowDeleteMessageBox(false)}}/> : <></>}
          {/*If showEditMessageBox is true, the message box for editing a task will appear*/}
          {showEditMessageBox ? <MessageBoxEdit editTask={editTask} index={index} close={()=>{changeShowEditMessageBox(false)}} oldName={props.task} oldDesc={props.description[props.index]} oldColor={props.color[index]}/> : <></>}
    <div className="taskName" style={{backgroundColor: props.color[index]}}>{props.task}</div>
          {/*If showDetails is true, the description and buttons to edit and delete appear*/}
    {showDetails ? <><span className="show" onClick={()=>{changeShowDetails(false)}}>Show Less</span>
    <ul className="description" key="Description"><li className="taskDescription">{props.description[props.index]}<br/><br/>
      <span className="delete" onClick={() => {changeShowDeleteMessageBox(true);setIndex(props.index)}}>Delete</span><span className="edit" onClick={() => {changeShowEditMessageBox(true);setIndex(props.index)}}>Edit</span>
      </li></ul></> : <span className="show" onClick={()=>{changeShowDetails(true)}}>Show More</span>}
  </li>);
}

ListElement.propTypes = {
  index: PropTypes.number,
  task: PropTypes.string,
  description: PropTypes.array,
  updateName: PropTypes.func,
  updateDesc: PropTypes.func,
  tasks: PropTypes.array,
  color: PropTypes.array,
  updateCol: PropTypes.func
}

export default ListElement; 