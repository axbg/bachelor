import React, { Component } from 'react';
import "./index.css";
import StudentProfile from '../../student/studentProfile';
import SearchBar from 'material-ui-search-bar'
import { connect } from 'react-redux';
import { loadStudentData, getWithdrawals } from '../../../../reducers/volunteerReducer';
import { logout } from '../../../../reducers/authReducer'
import Spinner from '../../../dumb/spinner/index';
import { toastr } from 'react-redux-toastr';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class OperatorEnrollment extends Component {

    constructor() {
        super();
        this.state = {
            showWithdrawals: false,
            withdrawals: null,
            searchText: "",
            searchBarText: "Caută după număr de ordine sau CNP"
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.notFound) {
            toastr.error("Candidatul nu a fost găsit")
        }

        if (nextProps.withdrawals) {
            this.setState({
                withdrawals: nextProps.withdrawals
            })
        }
    }

    updateSearchText(e) {
        this.setState({
            searchText: e
        })

        if (this.state.showWithdrawals) {
            let currentList = [];
            let newList = [];
            if (e !== "") {
                const searchable = e.toLowerCase();
                currentList = this.props.withdrawals;
                newList = currentList.filter(item => {
                    if (item.firstname.toLowerCase().includes(searchable) ||
                        item.lastname.toLowerCase().includes(searchable) ||
                        item.cnp.toLowerCase().includes(searchable)) {
                        return true;
                    }

                    return false;
                });

                this.setState({
                    withdrawals: newList
                })
            } else {
                this.setState({
                    withdrawals: this.props.withdrawals
                })
            }
        }
    }

    searchStudent() {
        this.props.loadStudentData(this.state.searchText);
    }

    toggleWithdrawals() {
        if (!this.state.showWithdrawals) {
            this.props.getWithdrawals();
            this.setState({
                showWithdrawals: true,
                searchText: "",
                searchBarText: "Caută după nume, prenume sau CNP"
            });
        } else {
            this.setState({
                showWithdrawals: false,
                searchText: "",
                searchBarText: "Caută după număr de ordine sau CNP"
            });
        }
    }

    render() {
        return (
            <div className="operator-enrollment-container">
                <div className="operator-search-container">
                    <div style={{ padding: '10px' }}>
                        <div className="inline-container">
                            <SearchBar
                                placeholder={this.state.searchBarText}
                                value={this.state.searchText}
                                onChange={(e) => this.updateSearchText(e)}
                                onRequestSearch={() => this.searchStudent()}
                                style={{
                                    margin: '0 auto',
                                    height: '80%'
                                }}
                            />
                        </div>
                        <Button color="primary" variant="contained" label="Submit" onClick={() => this.toggleWithdrawals()}>
                            {!this.state.withdrawals ? "Retrageri" : "Căutare"}
                        </Button>
                        <Button color="primary" variant="contained" label="Submit" onClick={() => this.props.logout()}>Logout</Button>
                    </div>
                </div>
                <br />
                {
                    this.props.searchLoading ?
                        <Spinner />
                        : (this.state.showWithdrawals ?
                            (this.state.withdrawals ?
                                <div>
                                    <Paper style={{ overflow: "auto", maxHeight: "600px" }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className=" sticky">ID</TableCell>
                                                    <TableCell className="sticky">Nume</TableCell>
                                                    <TableCell className="sticky">Prenume</TableCell>
                                                    <TableCell className="sticky proeminent">CNP</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.withdrawals.length === 0 ?
                                                    <TableRow>
                                                        <TableCell>
                                                            Nicio înregistrare găsită
                                                        </TableCell>
                                                    </TableRow>
                                                    : this.state.withdrawals.map((withdrawal, key) => {
                                                        return (
                                                            <TableRow key={key}>
                                                                <TableCell>{withdrawal.id}</TableCell>
                                                                <TableCell>{withdrawal.lastname}</TableCell>
                                                                <TableCell>{withdrawal.firstname}</TableCell>
                                                                <TableCell>{withdrawal.cnp}</TableCell>
                                                            </TableRow>)
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                    </Paper>
                                </div>
                                : "")
                            :
                            (Object.keys(this.props.student).length !== 0) ?
                                < StudentProfile />
                                :
                                <div>
                                    <h1>Bună, {this.props.user.username}</h1>
                                    <h3>Poți căuta un candidat folosind CNP-ul sau numărul de ordine al acestuia, urmat de tasta Enter.</h3>
                                    <h2>Să începem!</h2>
                                </div>
                        )
                }
            </div >
        )
    }
}

const mapStateToProps = ({ volunteerReducer }) => ({
    user: volunteerReducer.volunteer,
    student: volunteerReducer.student,
    searchLoading: volunteerReducer.searchLoading,
    notFound: volunteerReducer.notFound,
    withdrawals: volunteerReducer.withdrawals
});

const mapDispatchToProps = { loadStudentData, logout, getWithdrawals };

export default connect(mapStateToProps, mapDispatchToProps)(OperatorEnrollment);