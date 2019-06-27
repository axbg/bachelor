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

class AdminSorting extends Component {
    render() {
        return (
            <div className="admin-sorting-container">
                <h1>Sortare</h1>
                <Paper>
                    <TextField
                        fullWidth
                        label="Introdu prefixul iterație"
                        onChange={(value) => { this.setState({ iteratie: value.value }) }}
                        name="email"
                        variant="outlined"
                    />
                </Paper>
                <div className="admin-sorting-buttons-container">
                    <Button variant="contained" color="primary">Sortare Test</Button>
                    <Button variant="contained" color="primary">Sortare Oficială</Button>
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

export default AdminSorting;