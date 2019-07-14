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
import { connect } from 'react-redux';
import { getRoles, getPositions, getVolunteers, updateVolunteer, createVolunteer } from '../../../../reducers/volunteerReducer';
import { toastr } from 'react-redux-toastr';

class AdminAddUser extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        };
    }

    componentDidMount() {
        this.props.getVolunteers();
        this.props.getPositions();
        this.props.getRoles();
    }

    createUser() {
        if (this.state.username.trim() === "" || this.state.username.includes(" ")
            || this.state.username.length < 5) {
            toastr.error("Numele de utilizator este invalid");
        } else if (this.state.password.trim() === "" || this.state.username.includes(" ")
            || this.state.password.length < 5) {
            toastr.error("Parola este invalida");
        } else {
            this.props.createVolunteer({ username: this.state.username, password: this.state.password, 
                facultyId: this.props.user.facultyId, userId: this.props.user.id });
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateRole(e) {
        this.props.updateVolunteer({ userId: e.target.getAttribute("userid"), roleId: e.target.value });
        toastr.success("Rolul a fost actualizat");
    }

    updatePosition(e) {
        this.props.updateVolunteer({ userId: e.target.getAttribute("userid"), positionId: e.target.value });
        toastr.success("Poziția a fost actualizată");
    }

    render() {
        return (
            <div>
                <div className="admin-add-container">
                    <Paper style={{ padding: "10px" }}>
                        <h2>Adaugă utilizator</h2>
                        <TextField
                            fullWidth
                            label="Username"
                            onChange={(e) => this.handleChange(e)}
                            name="username"
                            variant="outlined"
                        />
                        <br />
                        <br />
                        <TextField
                            fullWidth
                            label="Password"
                            onChange={(e) => this.handleChange(e)}
                            name="password"
                            variant="outlined"
                            type="password"
                        />
                        <div className="options-select">
                            <Button variant="contained" color="primary" onClick={() => this.createUser()}>Adaugă Utilizator</Button>
                        </div>
                    </Paper>
                </div>
                {this.props.volunteers && this.props.roles && this.props.positions ?
                    <div className="admin-control-position-container">
                        <h3>Gestiune Voluntari</h3>
                        <Paper style={{ overflow: "auto", maxHeight: "400px" }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="no-padding-table-cell sticky">ID</TableCell>
                                        <TableCell className="sticky">Voluntar</TableCell>
                                        <TableCell className="sticky proeminent">Rol</TableCell>
                                        <TableCell className="sticky proeminent">Pozitie</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.props.volunteers.map((volunteer, key) => {
                                            return (
                                                <TableRow key={key}>
                                                    <TableCell>{volunteer.id}</TableCell>
                                                    <TableCell>{volunteer.username}</TableCell>
                                                    <TableCell className="no-padding-table-cell">
                                                        <div className="select align-cell">
                                                            <select className="select-text" onChange={(e) => this.updateRole(e)} defaultValue={volunteer.role ? volunteer.role.id : 1}
                                                                userid={volunteer.id}>
                                                                {this.props.roles.map((role, key) => <option key={key} value={role.id}>{role.role}</option>)}
                                                            </select>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="no-padding-table-cell">
                                                        <div className="select align-cell">
                                                            {volunteer.role.role === "VOLUNTEER" ?
                                                                <select className="select-text" onChange={(e) => this.updatePosition(e)} defaultValue={volunteer.position ? volunteer.position.id : 1}
                                                                    userid={volunteer.id}>
                                                                    {this.props.positions.map((position, key) => <option key={key} value={position.id}>{position.position}</option>)}
                                                                </select> : ""}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </Paper>
                    </div> : ""}
            </div>
        )
    }
}

const mapStateToProps = ({ volunteerReducer }) => ({
    user: volunteerReducer.volunteer,
    volunteers: volunteerReducer.volunteers,
    roles: volunteerReducer.roles,
    positions: volunteerReducer.positions
});

const mapDispatchToProps = { getVolunteers, getRoles, getPositions, updateVolunteer, createVolunteer };

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddUser);