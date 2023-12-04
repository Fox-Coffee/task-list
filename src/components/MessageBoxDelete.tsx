import PropTypes from 'prop-types';
import "./MessageBox.scss";

function MessageBoxDelete(props:any){
    return(<div className="MessageContainer">
        <div className="MessageBox">
            <h2>Are you sure you want to delete this task?</h2>
            <button className="button" onClick={props.yes}>Yes</button>
            <button className="button" onClick={props.close}>No</button>
        </div>
    </div>)
}

MessageBoxDelete.propTypes = {
    yes: PropTypes.func,
    close: PropTypes.func
}

export default MessageBoxDelete;