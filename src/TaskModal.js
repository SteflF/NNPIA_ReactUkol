import * as React from "react";

class TaskModal extends React.Component{
    state={
        name: "",
        description: ""
    }

    componentDidMount() {
        if (this.props.taskToEdit !== undefined) {
            console.log(this.props.taskToEdit.name + this.props.taskToEdit.description)
            this.setState({name: this.props.taskToEdit.name, description: this.props.taskToEdit.description});
        }
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(this.props.taskToEdit !== undefined){
            const editedTask = {id: this.props.taskToEdit.id, name: this.state.name, description: this.state.description};
            this.props.onAccept(editedTask);
        }
        else{
            const newTask = {name: this.state.name, description: this.state.description};
            this.props.onAccept(newTask);
        }
    }

    render() {
        return (
            <div className="modal fade show" role="dialog" style={{ display: "block", paddingRight: 17 }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.modalTitle}</h5>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label className="col-form-label">Název:</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="form-control"
                                        onChange={this.handleNameChange}
                                        value={this.state.name}
                                        required
                                    >
                                    </input>
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label">Popis:</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        className="form-control"
                                        onChange={this.handleDescriptionChange}
                                        value={this.state.description}
                                        required
                                    >
									</textarea>
                                </div>
                                <div className="float-right">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => this.props.onClose()}
                                    >
                                        {this.props.cancelBtnTitle}
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary ml-2"
                                    >
                                        {this.props.acceptBtnTitle}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default TaskModal;
