import React, { Component } from 'react';
import "./index.css";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import LanguageIcon from '../../../dumb/languageIcon';
import { Switch } from '@material-ui/core';
import SmartMultistepData from '../../../smart/smartMultistepData';
import { connect } from 'react-redux';

class StudentProfile extends Component {

    constructor() {
        super();

        //will be received as props
        this.state = {
            role: "STUDENT",
            language: "RO",
            taxPayed: false,
            //those will not be received as props
            readOnly: false,
            currentPage: 0,
            maxCurrentPage: 3
        }
    }

    componentDidMount() {
        if (this.state.role === "OPERATOR" || this.state.role === "ADMIN") {
            this.setState({
                maxCurrentPage: 4,
            })
        }

        //not operator but admin
        if (this.state.confirmed && this.state.role !== "ADMIN") {
            this.setState({
                readOnly: true
            })
        }
    }

    onSubmit = () => {

    }

    onChange = () => {

    }

    decreaseCurrentPage = () => {
        this.setState({
            currentPage: this.state.currentPage - 1
        })
    }

    increaseCurrentPage = () => {
        this.setState({
            currentPage: this.state.currentPage + 1
        })
    }

    openPasswordModal = () => {
        console.log("opening password modal");
    }

    generateOrderNumber = () => {
        if(window.confirm("are you sure?")) {

        }
    }

    render() {
        return (
            <div className="student-profile-container">
                <img className="big-avatar" alt="" src="data:image/png;base64,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" />
                {
                    this.state.role === "STUDENT" ?
                        <div className="student-profile-icon-container">
                            <LanguageIcon language={this.state.language} />
                            <img width="30" height="30" src="/password.png" onClick={this.openPasswordModal}
                             alt="PASSWORD"/>
                        </div>
                        : ""
                }
                {
                    this.state.role === "OPERATOR" ?
                        <div>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                multiple
                                type="file"
                            />
                            <label htmlFor="raised-button-file">
                                <Button color="primary" variant="contained" component="span" >
                                    Încarcă Fotografie
                                </Button>
                            </label>
                        </div> : (this.state.role === "CASHIER" ?
                            <div>
                                <p>Număr curent de credite: 0</p>
                                <input className="cashier-credits-input" type="number" min="-20" max="20" defaultValue="0"
                                />
                                <Button color="primary" variant="contained" component="span" >
                                    Adaugă credite
                                </Button>
                                <br />
                                <Switch
                                    checked={this.state.taxPayed}
                                    onChange={() => this.setState({ taxPayed: !this.state.taxPayed })}
                                    value="true"
                                    color="primary"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                <span>Taxă</span>
                            </div> : (this.state.role === "VOLUNTEER" ?
                                <div>
                                    <Button onClick={this.generateOrderNumber} color="primary" variant="contained" component="span" >
                                        Generează bon de ordine
                                    </Button>
                                </div>
                                : "")
                        )
                }
                <div className="student-profile-info">
                    <Paper className="student-profile-data-paper">
                       <SmartMultistepData />
                    </Paper>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ authReducer }) => ({
    role: authReducer.role,
    student: authReducer.student,
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfile);