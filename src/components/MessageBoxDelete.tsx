import "./MessageBox.css";

function MessageBoxDelete(props:any){
    return(<div className="MessageContainer">
        <div className="MessageBox">
            <h2>Are you sure you want to delete this task?</h2>
            <button className="button" onClick={props.yes}>Yes</button>
            <button className="button" onClick={props.close}>No</button>
        </div>
    </div>)
}

export default MessageBoxDelete;