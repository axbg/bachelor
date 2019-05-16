import React, { Component } from 'react';
import "./index.css";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class StudentCredits extends Component {

    render() {
        return (
            <div className="student-info">
                <h1>Credits & Faculties</h1>
                <h4>You currently have 0 credits.</h4>
                <h4>Using the credits, you can add options to the faculties list down below</h4>
                <h4>You can either buy them online and choose your preferences here, or buy them phisically on the registration day from our cashiers</h4>
                <button>buy credits</button>
                <div className="student-options">
                <h4>Your options</h4>
                <h5>The first option should be your top preference</h5>
                <Paper >
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Faculty</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>CSIE Buget</TableCell>
                        <TableCell><button>remove option</button></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                </Paper>
                <h4>Add a new option</h4>
                <select>
                    <option>other faculty</option>
                </select>
                </div>
            </div>
        )
    }
}

export default StudentCredits;