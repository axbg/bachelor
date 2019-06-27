import React, { Component } from 'react';
import './index.css';
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class MultistepData extends Component {
    state = {
        firstname: "",
        lastname: "",
        initial: "",
        email: "",
        password: "",
        phone: "",
        pin: "",
        series: "",
        number: "",
        idEntity: "",
        address: "",
        city: "",
        bacAverage: "",
        bacRomanian: "",
        average9: "",
        average10: "",
        average11: "",
        average12: "",
        currentPage: 0,
    };


    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        // this.props.onSubmit(this.state);
        console.log(this.state);
        this.props.register(this.state);
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
            <div>
                <div className="student-profile-navigation-container">
                    {
                        this.state.currentPage > 0 ? <span className="student-navigation-left" onClick={this.decreaseCurrentPage}>⇠</span> : ""
                    }
                    {
                        this.state.currentPage < 3 ? <span className="student-navigation-right" onClick={this.increaseCurrentPage}>⇢</span> : ""
                    }
                </div>
                <ValidatorForm ref="form" onSubmit={this.onSubmit} onError={errors => console.log(errors)}>
                    <div className={this.state.currentPage !== 0 ? 'hidden' : ''}>
                        <h4 className="student-data-header">Date Personale</h4>
                        <TextValidator
                            fullWidth
                            label="Prenume"
                            onChange={this.change}
                            name="firstName"
                            value={this.state.firstName || ''}
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
                            label="Nume"
                            onChange={this.change}
                            name="lastName"
                            value={this.state.lastName || ''}
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
                            label="Inițiala tatălui"
                            onChange={this.change}
                            name="initial"
                            value={this.state.initial || ''}
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
                    <div className={this.state.currentPage !== 1 ? 'hidden' : ''}>
                        <h4 className="student-data-header">Date Contact</h4>
                        <TextValidator
                            fullWidth
                            label="Email"
                            onChange={this.change}
                            name="email"
                            value={this.state.email || ''}
                            validators={['required', 'isEmail']}
                            errorMessages={['Câmp obligatoriu', 'not a valid email address']}
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
                    <div className={this.state.currentPage !== 2 ? 'hidden' : ''}>
                        <h4 className="student-data-header">Date Oficiale</h4>
                        <TextValidator
                            fullWidth
                            label="CNP"
                            onChange={this.change}
                            name="cnp"
                            value={this.state.cnp || ''}
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
                            label="Serie buletin"
                            onChange={this.change}
                            name="idSeries"
                            value={this.state.idSeries || ''}
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
                            label="Număr buletin"
                            onChange={this.change}
                            name="idNumber"
                            value={this.state.idNumber || ''}
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
                            label="Eliberator buletin"
                            onChange={this.change}
                            name="idEntity"
                            value={this.state.idEntity || ''}
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
                            label="Notă Bacalaureat Română"
                            onChange={this.change}
                            name="bacRomanian"
                            value={this.bacRomanian || ''}
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
                            label="Medie clasa a IX-a"
                            onChange={this.change}
                            name="average9"
                            value={this.state.average9 || ''}
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
                            label="Medie clasa a X-a"
                            onChange={this.change}
                            name="average10"
                            value={this.state.average10 || ''}
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
                            label="Medie clasa a XI-a"
                            onChange={this.change}
                            name="average11"
                            value={this.state.average11 || ''}
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
                            label="Medie clasa a XII-a"
                            onChange={this.change}
                            name="average12"
                            value={this.state.average12 || ''}
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
                    <Button type="submit" color="primary" variant="contained" label="Submit" >Înregistrare</Button>
                </ValidatorForm>
            </div>
        );
    }
}

export default MultistepData;