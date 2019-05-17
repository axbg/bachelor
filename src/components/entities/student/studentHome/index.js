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
        this.setState({ modal: true })
    }

    handleClose() {
        this.setState({ modal: false })
    }

    render() {
        return (
            <div>
                <Modal open={this.state.modal} onClose={this.handleClose}>
                    <p>saluuut</p>
                </Modal>
                <h2>Welcome, Student</h2>
                <div className="student-info">
                    <br />
                    <div className="student-registration-info">
                        <h3>Your order number is 412</h3>
                        <h4>Latest order number is 315</h4>
                        <h5>Average waiting time for a person: 5:30 minutes</h5>
                        <h5>The last group was formed by 30 students and entered at 13:32</h5>
                    </div>
                    <br />
                    <h2>Your enrollment is pending.</h2>
                    <br />
                    <h4 onClick={this.openModal} className="student-profile-modal">
                        You can find more info about enrollment here
                    </h4>
                    <p><a href="https://ase.ro" target="_blank">Still got a questions? Contact us!</a></p>
                </div>
            </div>
        )
    }
}

export default StudentHome;