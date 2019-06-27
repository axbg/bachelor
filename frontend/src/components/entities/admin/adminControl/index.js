import React, { Component } from 'react';
import './index.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Chart from 'react-google-charts';

const data = [
    ["Ora", "Număr Participanți"],
    ["8", 50],
    ["9", 111],
    ["10", 311],
    ["11", 80]
];
const options = {
    chart: {
        title: "Participanți/Oră",
        subtitle: "27/07/2019"
    }
};

class AdminControl extends Component {
    render() {
        return (
            <div className="admin-control-container">
                <div className="admin-control-graphic-container">
                    <Chart
                        chartType="Line"
                        width="100%"
                        height="400px"
                        data={data}
                        options={options}
                    />
                </div>
                <div className="admin-control-request-container">
                    <h3>Cereri Poziție</h3>
                    <Paper style={{ overflow: "auto", maxHeight: "200px" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="no-padding-table-cell sticky">#</TableCell>
                                    <TableCell className="sticky">Voluntar</TableCell>
                                    <TableCell className="sticky">Poz. Curentă</TableCell>
                                    <TableCell className="sticky">Poz. Solicitată</TableCell>
                                    <TableCell className="sticky proeminent">Răspuns</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="no-padding-table-cell">4</TableCell>
                                    <TableCell>UTILIZATOR_1</TableCell>
                                    <TableCell>USA_INTRARE</TableCell>
                                    <TableCell>SCARA_1</TableCell>
                                    <TableCell className="no-padding-table-cell">
                                        <Button>Acceptă</Button>
                                        <Button>Respinge</Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="no-padding-table-cell">3</TableCell>
                                    <TableCell>UTILIZATOR_2</TableCell>
                                    <TableCell>SALA_DOSARE</TableCell>
                                    <TableCell>NEALOCAT</TableCell>
                                    <TableCell className="no-padding-table-cell">
                                        <Button>Acceptă</Button>
                                        <Button>Respinge</Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="no-padding-table-cell">2</TableCell>
                                    <TableCell>UTILIZATOR_13</TableCell>
                                    <TableCell>SCARA_1</TableCell>
                                    <TableCell>USA_INTRARE</TableCell>
                                    <TableCell className="no-padding-table-cell">
                                        <Button>Acceptă</Button>
                                        <Button>Respinge</Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="no-padding-table-cell">1</TableCell>
                                    <TableCell>UTILIZATOR_1</TableCell>
                                    <TableCell>USA_INTRARE</TableCell>
                                    <TableCell>SCARA_1</TableCell>
                                    <TableCell className="no-padding-table-cell">
                                        <Button>Acceptă</Button>
                                        <Button>Respinge</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </div>
        )
    }
}

export default AdminControl;