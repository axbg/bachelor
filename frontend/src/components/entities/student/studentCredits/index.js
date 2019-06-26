import React, { Component } from 'react';
import "./index.css";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class StudentCredits extends Component {

    constructor() {
        super();
        this.state = {
            confirmed: false
        }
    }

    render() {
        return (
            <div className="student-info">
                <div className="student-options">
                    <h1>Credite & Facultate</h1>
                    {
                        !this.state.confirmed ?
                            <div className="student-credits-container">
                                <h4>Momentan ai 0 credite.</h4>
                                <h4>Folosind creditele poți insera opțiuni în lista de preferințe</h4>
                                <h4>Creditele pot fi achiziționate online sau cu ajutorul unui casier, în ziua înscrierii.</h4>
                                <Button variant="contained" color="primary">Cumpără credite</Button>
                            </div>
                            : ""
                    }
                    <h4>Opțiunile tale</h4>
                    <h5>Opțiunile trebuie înregistrate crescător în ordinea preferințelor</h5>
                    <div className="student-credits-table-container">
                        <Paper>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="no-padding-table-cell">#</TableCell>
                                        <TableCell>Facultate</TableCell>
                                        {!this.state.confirmed ? <TableCell className="no-padding-table-cell"></TableCell> : <td></td>}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="no-padding-table-cell">21</TableCell>
                                        <TableCell>CSIE - Informatică Economică Engleză - Buget</TableCell>
                                        {!this.state.confirmed ? <TableCell className="no-padding-table-cell"><Button>Șterge</Button></TableCell> : <td></td>}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="no-padding-table-cell">21</TableCell>
                                        <TableCell>CSIE - Informatică Economică Engleză - Buget</TableCell>
                                        {!this.state.confirmed ? <TableCell className="no-padding-table-cell"><Button>Șterge</Button></TableCell> : <td></td>}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                    </div>
                    <br />
                    <br />
                    {
                        !this.state.confirmed ?
                            <div className="options-select">
                                <div className="select">
                                    <select className="select-text" required>
                                        <option value="" disabled></option>
                                        <option value="1">CSIE - Taxa</option>
                                        <option value="2">FABBV - Buget</option>
                                        <option value="3">FABBV - Taxa</option>
                                    </select>
                                    <span className="select-highlight"></span>
                                    <span className="select-bar"></span>
                                    <label className="select-label">Opțiuni</label>
                                </div>
                                <br />
                                <Button variant="contained" color="primary">Adaugă Opțiune</Button>
                            </div>
                            : ""
                    }
                </div>
            </div>
        )
    }
}

export default StudentCredits;