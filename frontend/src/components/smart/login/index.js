import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css';
import { authenticate } from '../../../reducers/authReducer';
import { TextField } from '@material-ui/core';
import { toastr } from 'react-redux-toastr'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.failed) {
            toastr.error("Datele nu sunt valide");
        }
    }

    handleLogin() {
        window.localStorage.setItem("email", this.state.email);
        this.props.authenticate({ email: this.state.email, password: this.state.password });
    }

    handleJwt() {
        if (this.props.jwt) {
            window.localStorage.setItem("auth-token", this.props.jwt);
            window.location.reload();
        }
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        this.handleJwt();
        return (
            <div style={{ height: "100%" }}>
                <div className="login-page">
                    <div className="form">
                        <img src="/logo_transparent.png" width="250" alt="logo" />
                        <br />
                        <br />
                        <div className="login-form">
                            <TextField
                                fullWidth
                                label="Email"
                                onChange={this.change}
                                name="email"
                                value={this.state.email || ''}
                                variant="outlined"
                            />
                            <br />
                            <br />
                            <TextField
                                fullWidth
                                label="Password"
                                onChange={this.change}
                                name="password"
                                value={this.state.password || ''}
                                variant="outlined"
                                type="password"
                            />
                            <br />
                            <br />
                            <button onClick={() => { this.handleLogin() }}>Logare</button>
                            <p className="message">Nu te-ai înscris încă? <a href="/register">Crează un cont!</a></p>
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
}

const mapStateToProps = ({ authReducer }) => ({
    jwt: authReducer.jwt,
    failed: authReducer.failed
});

const mapDispatchToProps = { authenticate };

export default connect(mapStateToProps, mapDispatchToProps)(Login);