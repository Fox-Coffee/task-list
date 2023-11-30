function Form(props:any){
    return(<div><input type="text" id="taskInput" ref={props.taskInputRef} placeholder="Name of the task" size={51} max={40} defaultValue={props.defName}/><br/>
    <textarea ref={props.descriptionInputRef} placeholder="Description" rows={4} cols={50} defaultValue={props.defDesc}/><br/></div>)
}

export default Form;