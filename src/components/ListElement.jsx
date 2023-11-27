function ListElement(props){
    const editTask = (index) => {
        const updatedTasks = [...props.tasks];
        const newTask = prompt("What should the task be renamed to?", updatedTasks[index]);
        if(newTask !== null && newTask != ""){
          updatedTasks[index] = newTask;
          props.update(updatedTasks);
        }
      };
      const deleteTask = (index) => {
        if(window.confirm("Are you sure?")){
          const updatedTasks = [...props.tasks];
          updatedTasks.splice(index, 1);
          props.update(updatedTasks);
        }
      };
    return(<li key={props.index}>{props.task}<span className="showMore">Show More</span></li>);
}
/*<span className="delete" onClick={() => deleteTask(index)}>Delete</span>     <span className="edit" onClick={() => editTask(index)}>Edit</span>*/
export default ListElement;