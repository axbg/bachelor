import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css';
import { authenticate } from '../../../reducers/authReducer';

class Login extends Component {
    fakeLogin() {
        window.localStorage.setItem("auth-token", "dummyToken");
        window.location.reload();
    }

    render() {
        return (
            <div className="login-page">
                <div className="form">
                    <img src="/step1w.png" />
                    <div className="login-form">
                        <input type="text" placeholder="username" />
                        <input type="password" placeholder="password" />
                        <button onClick={() => { this.fakeLogin() }}>login</button>
                        <p className="message">Not registered? <a href="#">Create an account</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = { authenticate };

export default connect(mapStateToProps, mapDispatchToProps)(Login);