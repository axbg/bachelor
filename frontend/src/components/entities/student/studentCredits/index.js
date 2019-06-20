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
            age: '',
            open: false
        };
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    initializePaymentRequest = () => {
        const networks = ['amex', 'jcb', 'visa'];

        const supportedInstruments = [{
            supportedMethods: 'basic-card',
            data: {
                supportedNetworks: networks,
                supportedTypes: ['debit', 'credit', 'prepaid']
            }
        }, {
            supportedMethods: 'https://apple.com/apple-pay',
            data: {
                version: 2,
                supportedNetworks: networks,
                countryCode: 'RO',
                merchantIdentifier: 'whatwebcando.today.sample',
                merchantCapabilities: ['supportsDebit', 'supportsCredit', 'supports3DS']
            }
        }];

        const details = {
            total: { label: 'Donation', amount: { currency: 'EUR', value: '10.00' } },
            displayItems: [
                {
                    label: 'Original donation amount',
                    amount: { currency: 'EUR', value: '15.00' }
                },
                {
                    label: 'Friends and family discount',
                    amount: { currency: 'EUR', value: '-5.00' }
                }
            ]
        };

        return new PaymentRequest(supportedInstruments, details);
    }

    showPaymentRequest = () => {
        let paymentRequest = this.initializePaymentRequest();
        paymentRequest.show();
    }

    render() {
        return (
            <div className="student-info">
                <div className="student-options">
                    <h1>Credits & Faculties</h1>
                    <h4>Your options</h4>
                    <h5>The first option should be your top preference</h5>
                    <div className="student-credits-table-container">
                        <Paper>
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
                                        <TableCell><Button>Remove</Button></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                    </div>
                    <br />
                    <br />
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
                            <label className="select-label">Options</label>
                        </div>
                        <br />
                        <Button variant="contained" color="primary">Add Option</Button>
                    </div>
                </div>
                <div className="student-credits-container">
                    <h4>You currently have 0 credits.</h4>
                    <h4>Using the credits, you can add options to the faculties list down below</h4>
                    <h4>You can either buy them online and choose your preferences here, or buy them phisically on the registration day from our cashiers</h4>
                    <Button variant="contained" color="primary" onClick={this.showPaymentRequest}>Buy credits</Button>
                </div>
            </div>
        )
    }
}

export default StudentCredits;