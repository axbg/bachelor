import React, { Component } from 'react';
import './index.css'
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

class AdminAddUser extends Component {

    constructor() {
        super();
        this.state = {
            email: ""
        };
    }

    render() {
        return (
            <div className="admin-add-container">
                <Paper style={{ padding: "10px" }}>
                    <h2>Adaugă utilizator</h2>
                    <TextField
                        fullWidth
                        label="Email"
                        onChange={(value) => { this.setState({ email: value.value }) }}
                        name="email"
                        variant="outlined"
                    />
                    <div className="options-select">
                        <div className="select">
                            <select className="select-text" required>
                                <option value="" disabled></option>
                                <option value="1">Voluntar</option>
                                <option value="2">Casier</option>
                                <option value="3">Operator</option>
                            </select>
                            <span className="select-highlight"></span>
                            <span className="select-bar"></span>
                            <label className="select-label">Rol</label>
                        </div>
                        <br />
                        <Button variant="contained" color="primary">Adaugă Utilizator</Button>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default AdminAddUser;