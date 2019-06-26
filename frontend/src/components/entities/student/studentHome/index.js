import React, { Component } from 'react';
import "./index.css";
import { Dialog, DialogTitle, DialogContent, DialogContentText, Button } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class StudentHome extends Component {

    constructor() {
        super();
        this.state = {
            modal: false,
            withdraw: false,
            confirmed: true,
        }

        this.openModal = this.openModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    openModal() {
        this.setState({ modal: true })
    }

    handleClose() {
        this.setState({ modal: false })
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
                            Accesează link-urile următoare pentru a afla mai multe despre procesul de admitere
                            aicea link-uri
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                <h2>Bună, Alex</h2>
                <div className="student-info">
                    <h3>Starea curentă: Nerepartizat</h3>
                    {
                        !this.state.confirmed ?
                            <div className="student-home-cards-container">
                                <Card className="student-home-card">
                                    <CardContent>
                                        <Typography variant="h2" component="h2">
                                            312
                                        </Typography>
                                        <Typography variant="h6" component="h6">
                                            bonul tău de ordine
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card className="student-home-card">
                                    <CardContent>
                                        <Typography variant="h2" component="h2">
                                            210
                                        </Typography>
                                        <Typography variant="h6" component="h6">
                                            bonul de ordine curent
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card className="student-home-card">
                                    <CardContent>
                                        <Typography variant="h2" component="h2">
                                            5:30
                                        </Typography>
                                        <Typography variant="h6" component="h6">
                                            timpul mediu de așteptare/student
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card className="student-home-card">
                                    <CardContent>
                                        <Typography variant="h2" component="h2">
                                            13:21
                                        </Typography>
                                        <Typography variant="h6" component="h6">
                                            ora estimată de intrare
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                            : <div>
                                <h3>Felicitări! Ai finalizat cu succes procesul de înscriere</h3>
                                <h4>Orice modificare a stării curente va fi semnalată atât aici,
                                    cât și prin trimiterea unui email</h4>
                                {
                                    !this.state.withdraw ?
                                        <div>
                                            <h5>Dacă vrei să îți retragi dosarul, poți apăsa pe butonul de mai jos pentru a fi
                                                repartizat la o coadă specială în ziua retragerii</h5>
                                            <Button type="submit" color="primary" variant="contained" label="Submit" >Retragere Dosar</Button>
                                        </div>
                                        : <h5>Prezintă-te la coada specială pentru retragerea dosarului</h5>
                                }
                            </div>
                    }

                    <h4 onClick={this.openModal} className="student-profile-modal">
                        Poți găsi mai multe informații despre înscriere aici
                    </h4>
                    <p><a href="https://ase.ro" target="_blank">Ai o nelămurire? Contactează-ne!</a></p>
                </div>
            </div>
        )
    }
}

export default StudentHome;