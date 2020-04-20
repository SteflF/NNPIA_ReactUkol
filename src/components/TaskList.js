import React, { Component } from 'react';
import { Button, Container, Table } from 'reactstrap';
import AppNavbar from '../AppNavbar';
import TaskModal from "./TaskModal";

class GroupList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [
                {
                    id: 1,
                    name: "task1",
                    description: "popis tasku"
                },
                {
                    id: 2,
                    name: "task2",
                    description: "popis tasku 2"
                }],
            taskToEdit: {
                id: null,
                name: "",
                description: ""
            },
            showEditModal: false,
            showCreateModal: false
        };
    }

    handleShowCreateTaskModal = () =>{
        this.setState({showCreateModal: true});
    }

    handleCloseCreateTaskModal = () =>{
        this.setState({showCreateModal: false});
    }

    handleShowEditTaskModal = (task) =>{
        this.setState({showEditModal: true, taskToEdit: task});
    }

    handleCloseEditTaskModal = () =>{
        this.setState({showEditModal: false});
    }

    handleCreate = (newTask) => {
        const maxId = Math.max.apply(Math, this.state.tasks.map(function (task) {return task.id}))
        newTask.id = maxId + 1;
        const tasks = [newTask, ...this.state.tasks];

        this.setState({tasks, showCreateModal: false});
        console.log(this.state.tasks);
    }

    handleEdit = (editedTask) => {
        const tasks = [...this.state.tasks];
        const index = tasks.findIndex(i => i.id === editedTask.id);
        tasks[index] = { ...editedTask };

        this.setState({tasks, showEditModal: false});
    }

    handleDelete = (id) => {
        let updatedTasks = [...this.state.tasks].filter(i => i.id !== id);
        this.setState({tasks: updatedTasks});
    }

    render() {
        const {tasks} = this.state;

        const taskList = tasks.map(task => {

            return <tr key={task.id}>
                <td style={{whiteSpace: 'nowrap'}}>{task.name}</td>
                <td>{task.description}</td>
                <td>
                    <Button className="btn btn-sm mr-2" size="sm" color="primary" onClick={() => this.handleShowEditTaskModal(task)}>Edit</Button>
                    <Button className="btn btn-sm " size="sm" color="danger" onClick={() => this.handleDelete(task.id)}>Delete</Button>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" onClick={() => this.handleShowCreateTaskModal()}>Add Task</Button>
                    </div>
                    <h3>Tasks</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Name</th>
                            <th width="20%">Description</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {taskList}
                        </tbody>
                    </Table>
                </Container>
                {this._editCategoryModal()}
                {this._createCategoryModal()}
            </div>
        );
    }

    _createCategoryModal = () => {
        const acceptBtnTitle = "Vytvořit";
        const cancelBtnTitle = "Zrušit";
        const modalTitle = "Nový task";

        if (this.state.showCreateModal) {
            return (
                <TaskModal
                    acceptBtnTitle={acceptBtnTitle}
                    cancelBtnTitle={cancelBtnTitle}
                    modalTitle={modalTitle}
                    onAccept={(newTask) => this.handleCreate(newTask)}
                    onClose={this.handleCloseCreateTaskModal}
                />
            );
        }
    }

    _editCategoryModal = () => {
        const acceptBtnTitle = "Potvrdit";
        const cancelBtnTitle = "Zrušit";
        const modalTitle = "Editace tasku";

        if (this.state.showEditModal) {
            return (
                <TaskModal
                    acceptBtnTitle={acceptBtnTitle}
                    cancelBtnTitle={cancelBtnTitle}
                    modalTitle={modalTitle}
                    taskToEdit={this.state.taskToEdit}
                    onAccept={(editedTask) => this.handleEdit(editedTask)}
                    onClose={this.handleCloseEditTaskModal}
                />
            );
        }
    }
}

export default GroupList;