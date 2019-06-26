import React, { Component } from 'react';
import "./index.css";
import Swipper from '../../../dumb/swipper';

class StudentRegistrationDay extends Component {

    render() {
        return (
            <div>
                <div className="student-registration-steps-container">
                    <h2>E ziua cea mare!</h2>
                    <h4>Aruncă o privire în lista de mai jos pentru a vedea toți pașii pe care trebuie să îi urmezi</h4>
                    <div className="student-registration-steps">
                        <Swipper />
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentRegistrationDay;