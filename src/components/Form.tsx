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

// This file contains the code for the form used to add and edit tasks

import "./Form.scss";

function Form(props:any){
    return(<div><input type="text" id="taskInput" className="taskInput" ref={props.taskInputRef} placeholder="Name of the task" size={51} max={40} defaultValue={props.defName}/><br/>
    <textarea ref={props.descriptionInputRef} placeholder="Description" className="descriptionInput" rows={4} cols={50} defaultValue={props.defDesc}/><br/>
    <label htmlFor="color">Color: </label><input type="color" name="color" id="color" defaultValue={props.defColor} ref={props.colorInputRef}/>
    </div>)  
}

export default Form;