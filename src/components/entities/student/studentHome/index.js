import React, { Component } from 'react';
import "./index.css";
import Modal from '@material-ui/core/Modal';

class StudentHome extends Component {

    constructor() {
        super();
        this.state = {
            modal: false
        }

        this.openModal = this.openModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    openModal() {
        this.setState({modal: true})
    }

    handleClose() {
        this.setState({modal: false})
    }

    render() {
        return (
            <div>
                <h1>Welcome, Student</h1>
                <div className="student-info">
                    <h4>Your order number is 412</h4>
                    <h5>Latest order number is 315</h5>
                    <h5>Average waiting time for a person: 5:30 minutes</h5>
                    <h5>The last group was formed by 30 students and entered at 13:32</h5>
                    <p>Your enrollment is pending.</p>
                    <p>Congrats! You've been addmitted at Facultatea de Cibernetica, Statistica si Informatica Economica, Buget</p>
                    <p>Do you have any questions? Contact us!</p>
                    <a onClick={this.openModal}>You can find more info about enrollment here</a>
                    <Modal open={this.state.modal} onClose={this.handleClose}>
                        <p>saluuut</p>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default StudentHome;