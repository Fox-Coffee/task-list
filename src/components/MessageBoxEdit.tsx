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