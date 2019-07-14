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
import { connect } from 'react-redux';
import socketIO from 'socket.io-client';
import { solvePositionRequest } from '../../../../reducers/volunteerReducer';

const SECRET_ADMIN_TOKEN = "SECRET_ADMIN_TOKEN";

const options = {
    chart: {
        title: "Participanți/Oră",
        subtitle: "27/07/2019"
    }
};

class AdminControl extends Component {

    constructor() {
        super();
        this.state = {
            data: [["Ora", "Numar Participanți"], [8, 50]],
            requests: [],
            socket: null
        };
    }

    componentDidMount() {
        if (this.props.user) {
            this.mountSocket();
        }
    }

    mountSocket() {
        const facultyId = this.props.user.facultyId;

        const socket = socketIO('http://localhost:8000',
            { query: 'facultyId=' + facultyId + "&adminId=" + this.props.user.id + "&secret=" + SECRET_ADMIN_TOKEN });

        socket.on("flow-position-request", (message) => {
            this.setState({ requests: message.positionRequests });
        })

        socket.on('flow-admin-data', message => {
            let newData = [];
            newData.push(["Ora", "Număr Participanți"])
            message.map(data => {
                Object.keys(data).map(key => {
                    newData.push([key, data[key]]);
                })
            })

            this.setState({
                data: newData
            })
        })

        this.setState({
            socket: socket
        })
    }

    handleSubmit(e) {
        const requestId = e.target.parentNode.getAttribute("requestid");
        const response = e.target.parentNode.getAttribute("response")
        this.props.solvePositionRequest({ positionRequestId: requestId, response: response });
    }

    componentWillUnmount() {
        this.state.socket.disconnect();
    }

    render() {
        return (
            <div className="admin-control-container">
                <div className="admin-control-graphic-container">
                    <Chart
                        chartType="Line"
                        width="100%"
                        height="400px"
                        data={this.state.data}
                        options={options}
                    />
                </div>
                <div className="admin-control-request-container">
                    <h3>Cereri Poziție</h3>
                    {this.state.requests ?
                        <Paper style={{ overflow: "auto", maxHeight: "300px" }}>
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
                                    {this.state.requests.map((request, key) => {
                                        return (<TableRow key={key}>
                                            <TableCell>{request.id}</TableCell>
                                            <TableCell>{request["user.username"]}</TableCell>
                                            <TableCell>{request["user.position.position"]}</TableCell>
                                            <TableCell>{request["position.position"]}</TableCell>
                                            <TableCell className="no-padding-table-cell">
                                                <Button requestid={request.id} response="true" onClick={(e) => this.handleSubmit(e)}>Acceptă</Button>
                                                <Button requestid={request.id} response="false" onClick={(e) => this.handleSubmit(e)}> Respinge</Button>
                                            </TableCell>
                                        </TableRow>)
                                    })}
                                </TableBody>
                            </Table>
                        </Paper> : ""
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ volunteerReducer }) => ({
    user: volunteerReducer.volunteer,
    role: volunteerReducer.role
});

const mapDispatchToProps = { solvePositionRequest };

export default connect(mapStateToProps, mapDispatchToProps)(AdminControl);