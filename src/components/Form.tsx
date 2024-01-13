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
    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      props.setSelectedColor(event.target.value);
    }

    return(<div><input type="text" id="taskInput" className="taskInput" ref={props.taskInputRef} placeholder="Name of the task" size={51} max={40} defaultValue={props.defName}/><br/>
    <textarea ref={props.descriptionInputRef} placeholder="Description" className="descriptionInput" rows={4} cols={50} defaultValue={props.defDesc}/><br/>
    <label>Color: </label>
    <input type="radio" name="color" id="red" value="red" defaultChecked onChange={handleColorChange} />
    <label htmlFor="red"></label>
    <input type="radio" name="color" id="blue" value="#3535ff" onChange={handleColorChange} />
    <label htmlFor="blue"></label>
    <input type="radio" name="color" id="green" value="#089b08" onChange={handleColorChange} />
    <label htmlFor="green"></label>
    <input type="radio" name="color" id="yellow" value="#ffff6e" onChange={handleColorChange} />
    <label htmlFor="yellow"></label>
    <input type="radio" name="color" id="orange" value="orange" onChange={handleColorChange} />
    <label htmlFor="orange"></label>
    <input type="radio" name="color" id="purple" value="#a500a5" onChange={handleColorChange} />
    <label htmlFor="purple"></label>
    <br/>
    </div>)  
}

export default Form;