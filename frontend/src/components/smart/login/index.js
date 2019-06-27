import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css';
import { authenticate } from '../../../reducers/authReducer';
import { TextField } from '@material-ui/core';


class Login extends Component {
    fakeLogin() {
        window.localStorage.setItem("auth-token", "dummyToken");
        window.location.reload();
    }

    render() {
        return (
            <div className="login-page">
                <div className="form">
                    <img src="/logo_transparent.png" width="250" alt="logo" />
                    <br />
                    <br />
                    <div className="login-form">
                        <TextField
                            fullWidth
                            label="Email"
                            onChange={(value) => { this.setState({ username: value.value }) }}
                            name="email"
                            variant="outlined"
                        />
                        <br/>
                        <br/>
                        <TextField
                            fullWidth
                            label="Password"
                            onChange={(value) => { this.setState({ password: value.value }) }}
                            name="email"
                            variant="outlined"
                            type="password"
                        />
                        <br/>
                        <br/>
                        <button onClick={() => { this.fakeLogin() }}>Logare</button>
                        <p className="message">Nu te-ai înscris încă? <a href="/register">Crează un cont!</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = { authenticate };

export default connect(mapStateToProps, mapDispatchToProps)(Login);