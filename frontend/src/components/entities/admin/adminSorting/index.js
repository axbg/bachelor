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

class AdminSorting extends Component {

    constructor() {
        super();
        this.state = {
            iteration: "",
            email: ""
        }
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
            this.props.drySort({iteration: this.state.iteration, email: this.state.email});
        } else {
            this.props.sort({iteration: this.state.iteration, email: this.state.email});
        }
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
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="no-padding-table-cell">#</TableCell>
                                    <TableCell>Iterație</TableCell>
                                    <TableCell>Documente</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="no-padding-table-cell">1</TableCell>
                                    <TableCell>TEST 1</TableCell>
                                    <TableCell className="no-padding-table-cell"><Button>Descarcă</Button></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="no-padding-table-cell">2</TableCell>
                                    <TableCell>REPARTIZARE_1 INT</TableCell>
                                    <TableCell className="no-padding-table-cell"><Button>Descarcă</Button></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
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