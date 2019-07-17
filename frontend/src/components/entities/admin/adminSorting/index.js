import React, { Component } from 'react';
import './index.css';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { getIterations, sort, drySort } from '../../../../reducers/volunteerReducer';
import { SORT_URL } from '../../../../constants/index';
import Axios from 'axios';

class AdminSorting extends Component {

    constructor() {
        super();
        this.state = {
            iteration: "",
            email: ""
        }
    }

    componentDidMount() {
        this.props.getIterations();
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    beginSort(isDry) {
        if (this.state.iteration.trim() === "" || this.state.iteration.includes(" ")
            || this.state.iteration.length < 5) {
            toastr.error("Prefixul iteratiei este invalid");
        } else if (this.state.email.trim() === "" || this.state.email.includes(" ")
            || !this.state.email.includes("@") || !this.state.email.includes(".")) {
            toastr.error("Adresa de email este invalida");
        } else if (isDry) {
            this.props.drySort({ iteration: this.state.iteration, email: this.state.email });
            toastr.success("Procesul de sortare test a început");
        } else {
            this.props.sort({ iteration: this.state.iteration, email: this.state.email });
            toastr.success("Procesul de sortare oficiala a început");
        }
    }

    downloadFile(e) {
        const iteration = e.target.parentNode.getAttribute("iteration");
        const auth = window.localStorage.getItem("auth-token");

        Axios.get(SORT_URL + "/documents/" + iteration, { headers: { Authorization: "Bearer " + auth }, responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', iteration + ".zip");
                document.body.appendChild(link);
                link.click();
            });
    }

    render() {
        return (
            <div className="admin-sorting-container">
                <h1>Sortare</h1>
                <Paper>
                    <TextField
                        fullWidth
                        label="Prefixul iterației"
                        onChange={(e) => { this.handleChange(e) }}
                        value={this.state.iteration}
                        name="iteration"
                        variant="outlined"
                    />
                </Paper>
                <br />
                <Paper>
                    <TextField
                        fullWidth
                        label="Email-ul la care vor fi trimise documentele"
                        onChange={(e) => { this.handleChange(e) }}
                        value={this.state.email}
                        name="email"
                        variant="outlined"
                    />
                </Paper>
                <div className="admin-sorting-buttons-container">
                    <Button variant="contained" color="primary" onClick={() => this.beginSort(true)}>Sortare Test</Button>
                    <Button variant="contained" color="primary" onClick={() => this.beginSort(false)}>Sortare Oficială</Button>
                </div>
                <div className="admin-sorting-iterations-container">
                    <h3>Iterațiile precedente</h3>
                    {this.props.iterations ?
                        <div className="admin-control-position-container">
                            <Paper style={{ overflow: "auto", maxHeight: "400px" }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="no-padding-table-cell sticky">ID</TableCell>
                                            <TableCell className="sticky">Iterație</TableCell>
                                            <TableCell className="sticky proeminent">Documente</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            this.props.iterations.map((iteration, key) => {
                                                return (
                                                    <TableRow key={key}>
                                                        <TableCell>{key + 1}</TableCell>
                                                        <TableCell>{iteration.iteration}</TableCell>
                                                        <TableCell className="no-padding-table-cell">
                                                            <Button iteration={iteration.iteration} onClick={(e) => this.downloadFile(e)}>Descarcă</Button>
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
            </div>
        )
    }
}

const mapStateToProps = ({ volunteerReducer }) => ({
    iterations: volunteerReducer.iterations
});

const mapDispatchToProps = { getIterations, sort, drySort };

export default connect(mapStateToProps, mapDispatchToProps)(AdminSorting);