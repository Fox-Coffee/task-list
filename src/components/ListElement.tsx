import { useState } from "react";
import PropTypes from 'prop-types';
import MessageBoxDelete from "./MessageBoxDelete";
import MessageBoxEdit from "./MessageBoxEdit";

function ListElement(props:any){
  /*
    index - Index of the current element of the list.
    task - The name of the task
    updateName - Function to change the name of the tasks
    updateName - Function to change the description of the tasks
    tasks - The table of all task names
    description - The table of all task names
  */

  //Used to determine if 
  const [showDetails, changeShowDetails] = useState(false);
  const [showDeleteMessageBox, changeShowDeleteMessageBox] = useState(false);
  const [showEditMessageBox, changeShowEditMessageBox] = useState(false);

  
  const [index, setIndex] = useState(0);

  const editTask = (index:number, newTask:string, newDesc:string) => {
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
  };
  const deleteTask = () => {
    //Updating the list of names
    const updatedTasks = [...props.tasks];
    updatedTasks.splice(index, 1);
    props.updateName(updatedTasks);

    //Updating the list of descriptions
    const updatedDesc = [...props.description];
    updatedDesc.splice(index, 1);
    props.updateDesc(updatedDesc);

    //Hiding the message box
    changeShowDeleteMessageBox(false);
  };
  return(
  <li key={props.index}>
          {/*If showDeleteMessageBox is true, the message box for confirming deletion of a task will appear, where the user can confirm the deletion, or cancel it*/}
          {showDeleteMessageBox ? <MessageBoxDelete yes={deleteTask} close={()=>{changeShowDeleteMessageBox(false)}}/> : <></>}
          {/*If showEditMessageBox is true, the message box for editing a task will appear*/}
          {showEditMessageBox ? <MessageBoxEdit editTask={editTask} index={index} close={()=>{changeShowEditMessageBox(false)}} oldName={props.task} oldDesc={props.description[props.index]}/> : <></>}
    <h3>{props.task}</h3>
          {/*If showDetails is true, the description and buttons to edit and delete appear*/}
    {showDetails ? <><span className="show" onClick={()=>{changeShowDetails(false)}}>Show Less</span>
    <ul className="description" key="Description"><li>{props.description[props.index]}<br/><br/>
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
  tasks: PropTypes.array
}

export default ListElement; 