import React, { Component } from 'react';
import './index.css'
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class AdminAddUser extends Component {

    constructor() {
        super();
        this.state = {
            email: ""
        };
    }

    render() {
        return (
            <div>
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
                <div className="admin-control-position-container">
                    <h3>Gestiune Voluntari</h3>
                    <Paper style={{ overflow: "auto", maxHeight: "400px" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="no-padding-table-cell sticky">#</TableCell>
                                    <TableCell className="sticky">Voluntar</TableCell>
                                    <TableCell className="sticky proeminent">Rol</TableCell>
                                    <TableCell className="sticky proeminent">Pozitie</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="no-padding-table-cell">1</TableCell>
                                    <TableCell>VOLUNTAR_1</TableCell>
                                    <TableCell className="no-padding-table-cell">
                                        <div className="select align-cell">
                                            <select className="select-text" defaultValue="1">
                                                <option value="1">Voluntar</option>
                                                <option value="2">Casier</option>
                                                <option value="3">Operator</option>
                                            </select>
                                        </div>
                                    </TableCell>
                                    <TableCell className="no-padding-table-cell">
                                        <div className="select align-cell">
                                            <select className="select-text" defaultValue='1'>
                                                <option value="1">USA_INTRARE</option>
                                                <option value="2">SALA_DOSARE</option>
                                                <option value="3">NEALOCAT</option>
                                            </select>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="no-padding-table-cell">2</TableCell>
                                    <TableCell>CASIER_1</TableCell>
                                    <TableCell className="no-padding-table-cell">
                                        <div className="select align-cell">
                                            <select className="select-text" defaultValue="2">
                                                <option value="1">Voluntar</option>
                                                <option value="2" >Casier</option>
                                                <option value="3">Operator</option>
                                            </select>
                                        </div>
                                    </TableCell>
                                    <TableCell className="no-padding-table-cell">
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="no-padding-table-cell">3</TableCell>
                                    <TableCell>VOLUNTAR_2</TableCell>
                                    <TableCell className="no-padding-table-cell">
                                        <div className="select align-cell">
                                            <select className="select-text" defaultValue="1">
                                                <option value="1">Voluntar</option>
                                                <option value="2" >Casier</option>
                                                <option value="3">Operator</option>
                                            </select>
                                        </div>
                                    </TableCell>
                                    <TableCell className="no-padding-table-cell">
                                        <div className="select align-cell">
                                            <select className="select-text" defaultValue="3">
                                                <option value="1">USA_INTRARE</option>
                                                <option value="2">SALA_DOSARE</option>
                                                <option value="3">NEALOCAT</option>
                                            </select>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="no-padding-table-cell">1</TableCell>
                                    <TableCell>OPERATOR_1</TableCell>
                                    <TableCell className="no-padding-table-cell">
                                        <div className="select align-cell">
                                            <select className="select-text" defaultValue="3">
                                                <option value="1">Voluntar</option>
                                                <option value="2" >Casier</option>
                                                <option value="3">Operator</option>
                                            </select>
                                        </div>
                                    </TableCell>
                                    <TableCell className="no-padding-table-cell">
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                    <Button style={{ width: "100%" }} variant="contained" color="primary">Confirmare</Button>
                </div>
            </div>
        )
    }
}

export default AdminAddUser;