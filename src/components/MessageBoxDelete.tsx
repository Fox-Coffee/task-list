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
import PropTypes from 'prop-types';
import "./MessageBox.scss";

function MessageBoxDelete(props:any){
    return(<div className="MessageContainer">
        <div className="MessageBox">
            <h2>{props.txt}</h2>
            <button className="button" onClick={props.yes}>Yes</button>
            <button className="button" onClick={props.close}>No</button>
        </div>
    </div>)
}

MessageBoxDelete.propTypes = {
    yes: PropTypes.func,
    close: PropTypes.func,
    txt: PropTypes.string
}

export default MessageBoxDelete;