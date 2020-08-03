import React, { Component } from 'react';
import './index.css';
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from 'axios';
import { BASE_URL } from '../../../constants'

class MultistepData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: null,
            lastname: null,
            parentInitial: null,
            email: null,
            phone: null,
            cnp: null,
            series: null,
            number: null,
            idPublisher: null,
            address: null,
            city: null,
            bacAverage: null,
            bacRomanian: null,
            average9: null,
            average10: null,
            average11: null,
            average12: null,
            currentPage: 0,
            maxPageNumber: 3,
            registered: false
        }
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    displayValidationErrors = e => {
        const firstField = e[0].props.name;

        if (["firstname", "lastname", "parentInitial"].includes(firstField)) {
            this.setState({ currentPage: 0 });
        } else if (["email", "phone", "address", "city"].includes(firstField)) {
            this.setState({ currentPage: 1 });

        } else if (["cnp", "series", "number", "idPublisher"].includes(firstField)) {
            this.setState({ currentPage: 2 });

        } else {
            this.setState({ currentPage: 3 });
        }
    }

    onSubmit = e => {
        e.preventDefault();
        axios.post(BASE_URL + "/student/create", { ...this.state })
            .then(result => {
                this.setState({
                    registered: true
                })
            })
    };

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

    render() {
        return (
            (!this.state.registered ?
                <div>
                    <div className="student-profile-navigation-container">
                        {
                            this.state.currentPage > 0 ? <span className="student-navigation-left" onClick={this.decreaseCurrentPage}>⇠</span> : ""
                        }
                        {
                            this.state.currentPage < this.state.maxPageNumber ? <span className="student-navigation-right" onClick={this.increaseCurrentPage}>⇢</span> : ""
                        }
                    </div>
                    <ValidatorForm ref="form" onSubmit={this.onSubmit} onError={errors => this.displayValidationErrors(errors)}>
                        <div className={this.state.currentPage !== 0 ? 'hidden' : ''}>
                            <h4 className="student-data-header">Date Personale</h4>
                            <TextValidator
                                fullWidth
                                label="Prenume"
                                onChange={this.change}
                                name="firstname"
                                value={this.state.firstname || ''}
                                validators={['required', 'isString', 'minStringLength: 2', 'maxStringLength: 50']}
                                errorMessages={['Câmp obligatoriu', 'Text invalid', 'Lungime minimă: 2', 'Lungime maximă: 50']}
                                variant="outlined"
                                InputProps={{
                                    readOnly: this.state.readOnly,
                                }}
                            />
                            <br />
                            <br />
                            <TextValidator
                                fullWidth
                                label="Nume"
                                onChange={this.change}
                                name="lastname"
                                value={this.state.lastname || ''}
                                validators={['required', 'isString', 'minStringLength: 2', 'maxStringLength: 50']}
                                errorMessages={['Câmp obligatoriu', 'Text invalid', 'Lungime minimă: 2', 'Lungime maximă: 50']}
                                variant="outlined"
                                InputProps={{
                                    readOnly: this.state.readOnly,
                                }}
                            />
                            <br />
                            <br />

                            <TextValidator
                                fullWidth
                                label="Inițiala tatălui"
                                onChange={this.change}
                                name="parentInitial"
                                value={this.state.parentInitial || ''}
                                validators={['required', 'minStringLength:1', 'maxStringLength:2']}
                                errorMessages={['Câmp obligatoriu', 'Lungime minimă: 1', 'Lungime maximă: 2']}
                                variant="outlined"
                                InputProps={{
                                    readOnly: this.state.readOnly,
                                }}
                            />
                            <br />
                            <br />
                        </div>
                        <div className={this.state.currentPage !== 1 ? 'hidden' : ''}>
                            <h4 className="student-data-header">Date Contact</h4>
                            <TextValidator
                                fullWidth
                                label="Email"
                                onChange={this.change}
                                name="email"
                                value={this.state.email || ''}
                                validators={['required', 'isEmail']}
                                errorMessages={['Câmp obligatoriu', 'Adresă nevalidă']}
                                variant="outlined"
                                InputProps={{
                                    readOnly: this.state.readOnly,
                                }}
                            />
                            <br />
                            <br />
                            <TextValidator
                                fullWidth
                                label="Telefon"
                                onChange={this.change}
                                name="phone"
                                value={this.state.phone || ''}
                                validators={['required', 'isNumber', 'minStringLength:10', 'maxStringLength:10']}
                                errorMessages={['Câmp obligatoriu', 'Număr invalid', 'Lungime minimă: 10', 'Lungime maximă: 10']}
                                variant="outlined"
                                InputProps={{
                                    readOnly: this.state.readOnly,
                                }}
                            />
                            <br />
                            <br />
                            <TextValidator
                                fullWidth
                                label="Addresă"
                                onChange={this.change}
                                name="address"
                                value={this.state.address || ''}
                                validators={['required']}
                                errorMessages={['Câmp obligatoriu']}
                                variant="outlined"
                                InputProps={{
                                    readOnly: this.state.readOnly,
                                }}
                            />
                            <br />
                            <br />
                            <TextValidator
                                fullWidth
                                label="Oraș"
                                onChange={this.change}
                                name="city"
                                value={this.state.city || ''}
                                validators={['required', 'isString']}
                                errorMessages={['Câmp obligatoriu']}
                                variant="outlined"
                                InputProps={{
                                    readOnly: this.state.readOnly,
                                }}
                            />
                            <br />
                            <br />
                        </div>
                        <div className={this.state.currentPage !== 2 ? 'hidden' : ''}>
                            <h4 className="student-data-header">Date Oficiale</h4>
                            <TextValidator
                                fullWidth
                                label="CNP"
                                onChange={this.change}
                                name="cnp"
                                value={this.state.cnp || ''}
                                validators={['required', 'isNumber', 'minStringLength:13', 'maxStringLength:13', 'matchRegexp:^([1-8]{1}[0-9]{12})$']}
                                errorMessages={['Câmp obligatoriu', 'Număr invalid', 'Lungime minimă: 13', 'Lungime maximă: 13', 'CNP invalid']}
                                variant="outlined"
                                InputProps={{
                                    readOnly: this.state.readOnly,
                                }}
                            />
                            <br />
                            <br />
                            <TextValidator
                                fullWidth
                                label="Serie buletin"
                                onChange={this.change}
                                name="series"
                                value={this.state.series || ''}
                                validators={['required', 'isString', 'minStringLength:2', 'maxStringLength:2']}
                                errorMessages={['Obligatoriu', 'Text invalid', 'Lungime minimă: 2', 'Lungime maximă: 2']}
                                variant="outlined"
                                InputProps={{
                                    readOnly: this.state.readOnly,
                                }}
                            />
                            <br />
                            <br />
                            <TextValidator
                                fullWidth
                                label="Număr buletin"
                                onChange={this.change}
                                name="number"
                                value={this.state.number || ''}
                                validators={['required', 'isNumber', 'minStringLength:6', 'maxStringLength:6']}
                                errorMessages={['Obligatoriu', 'Număr invalid', 'Lungime minimă: 6', 'Lungime maximă: 6']}
                                variant="outlined"
                                InputProps={{
                                    readOnly: this.state.readOnly,
                                }}
                            />
                            <br />
                            <br />
                            <TextValidator
                                fullWidth
                                label="Eliberator buletin"
                                onChange={this.change}
                                name="idPublisher"
                                value={this.state.idPublisher || ''}
                                validators={['required']}
                                errorMessages={['Câmp obligatoriu']}
                                variant="outlined"
                                InputProps={{
                                    readOnly: this.state.readOnly,
                                }}
                            />
                            <br />
                            <br />
                        </div>
                        <div className={this.state.currentPage !== 3 ? 'hidden' : ''}>
                            <h4 className="student-data-header">Date Concurs</h4>
                            <TextValidator
                                fullWidth
                                label="Medie Bacalaureat"
                                onChange={this.change}
                                name="bacAverage"
                                value={this.state.bacAverage || ''}
                                validators={['required', 'minFloat:6', 'maxFloat:10']}
                                errorMessages={['Câmp obligatoriu', 'Notă minimă: 6.00', 'Notă maximă: 10']}
                                variant="outlined"
                                InputProps={{
                                    readOnly: this.state.readOnly,
                                }}
                            />
                            <br />
                            <br />
                            <TextValidator
                                fullWidth
                                label="Notă Bacalaureat Română"
                                onChange={this.change}
                                name="bacRomanian"
                                value={this.state.bacRomanian || ''}
                                validators={['required', 'minFloat:5', 'maxFloat:10']}
                                errorMessages={['Câmp obligatoriu', 'Notă minimă: 5.00', 'Notă maximă: 10']}
                                variant="outlined"
                                InputProps={{
                                    readOnly: this.state.readOnly,
                                }}
                            />
                            <br />
                            <br />
                            <TextValidator
                                fullWidth
                                label="Medie clasa a IX-a"
                                onChange={this.change}
                                name="average9"
                                value={this.state.average9 || ''}
                                validators={['required', 'minFloat:5', 'maxFloat:10']}
                                errorMessages={['Câmp obligatoriu', 'Notă minimă: 5.00', 'Notă maximă: 10']}
                                variant="outlined"
                                InputProps={{
                                    readOnly: this.state.readOnly,
                                }}
                            />
                            <br />
                            <br />
                            <TextValidator
                                fullWidth
                                label="Medie clasa a X-a"
                                onChange={this.change}
                                name="average10"
                                value={this.state.average10 || ''}
                                validators={['required', 'minFloat:5', 'maxFloat:10']}
                                errorMessages={['Câmp obligatoriu', 'Notă minimă: 5.00', 'Notă maximă: 10']}
                                variant="outlined"
                                InputProps={{
                                    readOnly: this.state.readOnly,
                                }}
                            />
                            <br />
                            <br />
                            <TextValidator
                                fullWidth
                                label="Medie clasa a XI-a"
                                onChange={this.change}
                                name="average11"
                                value={this.state.average11 || ''}
                                validators={['required', 'minFloat:5', 'maxFloat:10']}
                                errorMessages={['Câmp obligatoriu', 'Notă minimă: 5.00', 'Notă maximă: 10']}
                                variant="outlined"
                                InputProps={{
                                    readOnly: this.state.readOnly,
                                }}
                            />
                            <br />
                            <br />
                            <TextValidator
                                fullWidth
                                label="Medie clasa a XII-a"
                                onChange={this.change}
                                name="average12"
                                value={this.state.average12 || ''}
                                validators={['required', 'minFloat:5', 'maxFloat:10']}
                                errorMessages={['Câmp obligatoriu', 'Notă minimă: 5.00', 'Notă maximă: 10']}
                                variant="outlined"
                                InputProps={{
                                    readOnly: this.state.readOnly,
                                }}
                            />
                            <br />
                            <br />
                        </div>
                        <Button type="submit" color="primary" variant="contained" label="Submit" >Înregistrare</Button>
                    </ValidatorForm>
                </div>
                : <div style={{ padding: "50px" }}>
                    <h1>Ai fost înregistrat!</h1>
                    <h3>Vei primi, în scurt timp, un e-mail cu parola inițială</h3>
                    <p>Mergi la pagina de <a href="/login">autentificare</a></p>
                </div>
            )
        );
    }
}

export default MultistepData;