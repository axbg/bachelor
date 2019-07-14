import React, { Component } from 'react';
import "./index.css";
import { Dialog, DialogTitle, DialogContent, DialogContentText, Button } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import socketIO from 'socket.io-client';
import { BASE_URL } from '../../../../constants/index';
import { withdrawPortfolio } from '../../../../reducers/studentReducer';
import moment from 'moment';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class StudentHome extends Component {

    constructor() {
        super();
        this.state = {
            modal: false,
            withdraw: false,
            confirmed: false,
            currentOrderNumber: 0,
            averageTimePerStudent: "",
        }

        this.openModal = this.openModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        if (!this.props.student.active) {
            toastr.info("Nu uita să îți actualizezi parola din fereastra Profil");
        }

        if (!this.props.student.enrolled && this.props.student.orderNumber !== 0) {
            this.mountSocket();
        }

        //extract to a method

    }

    mountSocket() {
        const facultyId = this.getFacultyId();

        const socket = socketIO(BASE_URL, { query: 'facultyId=' + facultyId });

        socket.on(facultyId, (message) => {
            this.setState({
                currentOrderNumber: message.currentOrderNumber,
                averageTimePerStudent: message.averageTimePerStudent,
            });
        })
    }

    getFacultyId() {
        return this.props.student.options ? this.props.student.options[0].faculty_profile.facultyId
            : this.props.student.temporaryFacultyId
    }

    calculateEntryTime() {
        const [minutes, seconds] = this.state.averageTimePerStudent.split(":");

        if (this.props.student.orderNumber > this.state.currentOrderNumber) {
            let travel = moment().format("HH:MM");

            travel = moment().add(minutes * (this.props.student.orderNumber - this.state.currentOrderNumber), "minutes").format("HH:MM");
            travel = moment().add(seconds * (this.props.student.orderNumber - this.state.currentOrderNumber), "seconds").format("HH:MM");

            return travel;
        }
    }

    openModal() {
        this.setState({ modal: true })
    }

    handleClose() {
        this.setState({ modal: false })
    }

    isAdmitted() {
        const option = this.props.student.options.find(option => option.admitted);
        return option ? (option.faculty_profile.name + (option.faculty_profile.type === "B" ? " - BUGET" : " - TAXA")) : "";
    }

    render() {
        return (
            <div>
                <Dialog open={this.state.modal} onClose={this.handleClose} TransitionComponent={Transition}
                    keepMounted aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">
                    <DialogTitle id="alert-dialog-slide-title">Informații utile</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Accesează link-urile următoare pentru a afla mai multe despre procesul de admitere poți accesa:
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-slide-description">
                            <a href="https://ase.ro">Academia de Studii Economice din București</a>
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-slide-description">
                            <a href="http://sisc.ro">Sindicatul Studenților din cibernetică</a>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                <h2>Bună, {this.props.student.firstname}</h2>
                <div className="student-info">
                    {this.isAdmitted() ? <h3>Ai fost repartizat la {this.isAdmitted()}</h3>
                        : (this.props.orderNumber !== 0 ?
                            <h3>Starea curentă: Nerepartizat</h3>
                            : "")
                    }
                    {
                        ((!this.props.student.enrolled) && (this.props.student.orderNumber !== 0)) ?
                            <div className="student-home-cards-container">
                                <Card className="student-home-card">
                                    <CardContent>
                                        <Typography variant="h2" component="h2">
                                            {this.props.student.orderNumber}
                                        </Typography>
                                        <Typography variant="h6" component="h6">
                                            bonul tău de ordine
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card className="student-home-card">
                                    <CardContent>
                                        <Typography variant="h2" component="h2">
                                            {this.state.currentOrderNumber}
                                        </Typography>
                                        <Typography variant="h6" component="h6">
                                            bonul de ordine curent
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card className="student-home-card">
                                    <CardContent>
                                        <Typography variant="h2" component="h2">
                                            {this.state.averageTimePerStudent}
                                        </Typography>
                                        <Typography variant="h6" component="h6">
                                            timpul mediu de așteptare/student
                                        </Typography>
                                    </CardContent>
                                </Card>
                                {this.props.student.orderNumber > this.state.currentOrderNumber ?
                                    <Card className="student-home-card">
                                        <CardContent>
                                            <Typography variant="h2" component="h2">
                                                {this.calculateEntryTime()}
                                            </Typography>
                                            <Typography variant="h6" component="h6">
                                                ora estimată de intrare
                                        </Typography>
                                        </CardContent>
                                    </Card> : ""
                                }
                            </div>
                            : <div>
                                {!this.isAdmitted() && this.props.student.orderNumber !== 0 ?
                                    <div>
                                        <h3>Felicitări! Ai finalizat cu succes procesul de înscriere</h3>
                                        <h4>Orice modificare a stării curente va fi semnalată atât aici,
                                            cât și prin trimiterea unui email</h4>
                                    </div>
                                    : <div>
                                        <h3>Felicitări! Ești pe punctul de a face primul pas spre cea mai frumoasă perioadă a vieții!</h3>
                                        <p>Dacă nu ești sigur cu privire la datele introduse, le poți actualiza în pagina <strong>Profil</strong></p>
                                        <p>Pentru a eficientiza procesul de înscriere, îți poți selecta opțiunile în pagina <strong>Opțiuni</strong></p>
                                        <p>Pentru a selecta opțiuni, trebuie, mai întâi să achiziționezi credite</p>
                                        <p>Te vezi deja stând la coadă? Din fericire, poți achiziționa bonuri din aceeași pagină, fără nicio grijă</p>
                                        <p>În ziua înscrierii, solicită un bon de ordine din pagina <strong>Înscriere</strong></p>
                                        <p>Pentru ca bonul să fie generat, trebuie să te afli în proximitatea facultății pentru care optezi</p>
                                    </div>
                                }
                                {
                                    this.props.student.orderNumber === 0 ?
                                        "" :
                                        (!this.props.student.withdrawPortfolio ?
                                            <div>
                                                <h5>Dacă vrei să îți retragi dosarul, poți apăsa pe butonul de mai jos pentru a fi
                                                repartizat la o coadă specială în ziua retragerii</h5>
                                                <Button type="submit" color="primary" variant="contained" label="Submit"
                                                    onClick={() => this.props.withdrawPortfolio()}>Retragere Dosar</Button>
                                            </div>
                                            :
                                            <div>
                                                <h5>
                                                    Prezintă-te la coada specială pentru retragerea dosarului</h5>
                                                <h5>Dacă te-ai răzgândit, nu este nicio problemă!</h5>
                                                <h5>Nu vei fi exclus din repartizare decât din momentul în care îți retragi fizic dosarul</h5>
                                            </div>)
                                }
                            </div>
                    }

                    <h4 onClick={this.openModal} className="student-profile-modal">
                        Poți găsi mai multe informații despre înscriere aici
                    </h4>
                    <p><a href="https://ase.ro" target="_blank" rel="noopener noreferrer">Ai o nelămurire? Contactează-ne!</a></p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ studentReducer }) => ({
    role: studentReducer.role,
    student: studentReducer,
});

const mapDispatchToProps = { withdrawPortfolio };

export default connect(mapStateToProps, mapDispatchToProps)(StudentHome);