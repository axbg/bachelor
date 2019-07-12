import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css';
import { authenticate } from '../../../reducers/authReducer';
import { TextField } from '@material-ui/core';
import Shell from '../shell/index';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
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
                {!this.props.jwt ?
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
                    :
                    <Shell />
                }
            </div>
        );
    }
}

const mapStateToProps = ({ authReducer }) => ({
    jwt: authReducer.jwt,
});

const mapDispatchToProps = { authenticate };

export default connect(mapStateToProps, mapDispatchToProps)(Login);