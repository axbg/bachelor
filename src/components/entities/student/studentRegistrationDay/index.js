import React, { Component } from 'react';
import "./index.css";
import Swipper from '../../../dumb/swipper';

class StudentRegistrationDay extends Component {

    render() {
        return (
            <div>
                <div className="student-registration-steps-container">
                    <h2>It's your big day!</h2>
                    <h3>Your order number is 312</h3>
                    <h4>Swipe through the steps down bellow to complete your enrollment!</h4>
                    <div className="student-registration-steps">
                        <Swipper />
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentRegistrationDay;