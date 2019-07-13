import React, { Component } from 'react';
import "./index.css";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import LanguageIcon from '../../../dumb/languageIcon';
import { Switch } from '@material-ui/core';
import SmartMultistepData from '../../../smart/smartMultistepData';
import { STUDENT_DEFAULT_IMAGE } from '../../../../constants/index';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { changePassword, updateData } from '../../../../reducers/studentReducer';
import { addCredits, changeTaxStatus } from '../../../../reducers/volunteerReducer';
import { logout } from '../../../../reducers/authReducer';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class StudentProfile extends Component {

    constructor() {
        super();

        this.state = {
            language: "RO",
            readOnly: false,
            currentPage: 0,
            maxCurrentPage: 3,
            modal: false,
            newPassword: "",
            newPasswordCheck: "",
            actualCredits: 0,
            credits: 0,
            tax: false
        }

        this.openModal = this.openModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        if (this.props.userRole === "OPERATOR" || this.props.userRole === "ADMIN") {
            this.setState({
                maxCurrentPage: 4,
            })
        }

        if (this.props.userRole === "CASHIER") {
            this.setState({
                tax: this.props.userStudent.tax,
                actualCredits: this.props.userStudent.credits
            })
        }

        if ((this.props.studentData.admitted || this.props.userStudent.admitted) && this.props.userRole !== "ADMIN") {
            this.setState({
                readOnly: true
            })
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    openModal() {
        this.setState({ modal: true })
    }

    handleClose() {
        this.setState({ modal: false })
    }

    submitNewPassword() {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (this.state.newPassword !== this.state.newPasswordCheck) {
            toastr.error("Parolele introduse nu coincid");
        } else if (!regex.test(this.state.newPassword)) {
            toastr.error("Parola nu respectă recomandările de securitate");
        } else {
            this.props.changePassword(this.state.newPassword);
            this.setState({ modal: false });
            toastr.success("Parola a fost actualizată");
        }
    }

    generateOrderNumber = () => {
        if (window.confirm("are you sure?")) {

        }
    }

    render() {
        return (
            < div className="student-profile-container" >
                <Dialog open={this.state.modal} onClose={this.handleClose} TransitionComponent={Transition}
                    keepMounted aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">
                    <DialogTitle id="alert-dialog-slide-title">Actualizare parolă</DialogTitle>
                    <DialogContent className="password-modal-container">
                        <DialogContentText id="alert-dialog-slide-description">
                            Parola trebuie să aibă dimensiunea minimă de 8 caractere și
                                să conțină minim o literă mare, o literă mică, o cifră și un simbol
                        </DialogContentText>
                        <input type="password" name="newPassword" placeholder="Inserează noua parolă" value={this.state.newPassword} onChange={this.onChange} />
                        <input type="password" name="newPasswordCheck" placeholder="Repetă parola" value={this.state.newPasswordCheck} onChange={this.onChange} />
                        <Button onClick={() => this.submitNewPassword()} color="primary" variant="contained" component="span" >
                            Salvează
                        </Button>
                    </DialogContent>
                </Dialog>
                <img className="big-avatar" alt=""
                    src={"data:image/png;base64," + (this.props.studentData.photo || this.props.userStudent.photo ? (this.props.studentData.photo ? this.props.studentData.photo : this.props.userStudent.photo) : STUDENT_DEFAULT_IMAGE)} />
                {
                    this.props.studentRole === "STUDENT" ?
                        <div className="student-profile-icon-container">
                            <LanguageIcon language={this.state.language} />
                            <img width="30" height="30" src="/password.png" onClick={() => this.openModal()}
                                alt="PASSWORD" />
                        </div>
                        : ""
                }
                {
                    this.props.studentRole === "STUDENT" ?
                        <div className="student-profile-icon-container">
                            <Button color="primary" variant="contained" component="span" onClick={() => this.props.logout()}>
                                Logout
                            </Button>
                        </div>
                        : ""
                }
                {
                    this.props.userRole === "OPERATOR" ?
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
                        </div> :
                        (this.props.userRole === "CASHIER" ?
                            <div>
                                <p>Număr curent de credite: {this.state.actualCredits}</p>
                                <input className="cashier-credits-input" type="number" min="-20" max="20"
                                    value={this.state.credits} name="credits" onChange={(e) => this.onChange(e)} />
                                <Button color="primary" variant="contained" component="span"
                                    onClick={() => {
                                        this.setState({ actualCredits: this.state.actualCredits + parseInt(this.state.credits) });
                                        this.props.addCredits({ studentId: this.props.userStudent.id, credits: parseInt(this.state.credits) });
                                        toastr.success("Credite actualizate");
                                    }}>
                                    Adaugă credite
                                </Button>
                                <br />
                                <Switch
                                    checked={this.state.tax}
                                    onChange={() => {
                                        this.setState({ tax: !this.state.tax });
                                        this.props.changeTaxStatus(this.props.userStudent.id);
                                        toastr.success("Taxa a fost actualizată");
                                    }}
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
                        <SmartMultistepData role={this.props.studentRole ? this.props.studentRole : this.props.userRole}
                            student={this.props.studentRole ? this.props.studentData : this.props.userStudent}
                            updateData={this.props.updateData} />
                    </Paper>
                </div>
            </div >
        )
    }
}

const mapStateToProps = ({ studentReducer, volunteerReducer }) => ({
    studentRole: studentReducer.role,
    studentData: studentReducer,
    userRole: volunteerReducer.role,
    userStudent: volunteerReducer.student,
});

const mapDispatchToProps = { changePassword, updateData, logout, addCredits, changeTaxStatus };

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfile);