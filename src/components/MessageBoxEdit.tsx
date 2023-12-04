import { useRef } from "react";
import PropTypes from 'prop-types';
import "./MessageBox.scss";
import Form from "./Form";

function MessageBoxEdit(props:any){
    //Ref used to read the value of the input responsible for task's name
    const taskInputRef:any = useRef();
    //Ref used to read the value of the input responsible for task's description
    const descriptionInputRef:any = useRef();
    return(<div className="MessageContainer">
    <div className="MessageBox">
        <h2>What should the task's name and description be?</h2>
        <form onSubmit={(e)=>{
            e.preventDefault();
            const newTask:string = taskInputRef.current.value.trim();
            let newDescription:string = descriptionInputRef.current.value.trim();        
            props.editTask(props.index, newTask, newDescription);
            props.close();
        }}>
            <Form defName={props.oldName} defDesc={props.oldDesc} taskInputRef={taskInputRef} descriptionInputRef={descriptionInputRef}/>
            <input type="submit" className="button" value={"Edit"}></input>
            <button className="button" onClick={props.close}>Cancel</button>
        </form>
    </div>
</div>)
}

MessageBoxEdit.propTypes = {
    oldName: PropTypes.string,
    oldDesc: PropTypes.string,
    index: PropTypes.number,
    editTask: PropTypes.func,
    close: PropTypes.func
}

export default MessageBoxEdit;