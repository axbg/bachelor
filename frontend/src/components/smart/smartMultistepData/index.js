import React, { Component } from 'react';
import './index.css';
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { toastr } from 'react-redux-toastr';
import Credits from '../../dumb/credits';

class SmartMultistepData extends Component {

    constructor(props) {
        super(props);
        if (this.props.student.criterias) {
            this.state = {
                firstname: this.props.student.firstname,
                lastname: this.props.student.lastname,
                parentInitial: this.props.student.parentInitial,
                email: this.props.student.email,
                phone: this.props.student.phone,
                cnp: this.props.student.cnp,
                series: this.props.student.series,
                number: this.props.student.number,
                idPublisher: this.props.student.idPublisher,
                address: this.props.student.address,
                city: this.props.student.city,
                bacAverage: this.props.student.criterias[0].value,
                bacRomanian: this.props.student.criterias[1].value,
                average9: this.props.student.criterias[2].value,
                average10: this.props.student.criterias[3].value,
                average11: this.props.student.criterias[4].value,
                average12: this.props.student.criterias[5].value,
                currentPage: 0,
                maxPageNumber: 3,
            };
        } else {
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
                maxPageNumber: 3
            }
        }
    }

    componentDidMount() {
        this.setState({
            maxPageNumber: (this.props.role === "OPERATOR" || this.props.role === "ADMIN") ? 4 : 3,
            readOnly: this.isReadOnly()
        })

        if (((this.props.role === "OPERATOR" && this.props.student.enrolled === false) || this.props.role === "ADMIN")
            && !this.props.formattedOptions) {
            this.props.getFormattedOptions(this.props.student.id);
        }
    }

    isReadOnly() {
        if (this.props.role === "ADMIN") {
            return false;
        } else if ((this.props.role === "OPERATOR" || this.props.role === "STUDENT") && !this.props.student.enrolled) {
            return false;
        } else {
            return true;
        }
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    displayValidationErrors = e => {
        const firstField = e[0].props.name;
        let errorOnFields = "";

        e.map(error => errorOnFields += " " + error.props.label + " ");

        toastr.warning("Campuri nevalide: " + errorOnFields);

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
        if (this.props.role !== "STUDENT") {
            this.props.updateData({ studentId: this.props.student.id, data: this.state });
        } else {
            this.props.updateData(this.state);
        }

        toastr.success("Datele au fost actualizate");
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
                            name="lastname"
                            value={this.state.lastname || ''}
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
                            name="parentInitial"
                            value={this.state.parentInitial || ''}
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
                            name="series"
                            value={this.state.series || ''}
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
                            name="number"
                            value={this.state.number || ''}
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
                            value={this.state.bacRomanian || ''}
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
                    <div className={this.state.currentPage !== 4 ? 'hidden' : ''}>
                        {this.state.currentPage === 4 && this.props.formattedOptions ?
                            <Credits role={this.props.role} student={this.props.student} options={this.props.formattedOptions}
                                addOption={this.props.addOption} deleteOption={this.props.deleteOption} />
                            : <div><h2>Perioada de înscriere a expirat</h2></div>}
                    </div>
                    {
                        this.state.currentPage !== 4 && !this.state.readOnly ?
                            <Button type="submit" color="primary" variant="contained" label="Submit" >Înregistrare</Button>
                            : ""
                    }
                </ValidatorForm>
            </div>
        );
    }
}

export default SmartMultistepData;