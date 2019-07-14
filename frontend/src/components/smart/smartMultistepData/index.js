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

    componentWillReceiveProps(nextProps) {
        this.setState({
            firstname: nextProps.firstname || this.state.firstname,
            lastname: nextProps.lastname || this.state.lastname,
            parentInitial: nextProps.parentInitial || this.state.parentInitial,
            email: nextProps.email || this.state.email,
            phone: nextProps.phone || this.state.phone,
            cnp: nextProps.cnp || this.state.cnp,
            series: nextProps.series || this.state.series,
            number: nextProps.number || this.state.number,
            idPublisher: nextProps.idPublisher || this.state.idPublisher,
            address: nextProps.address || this.state.address,
            city: nextProps.city || this.state.city,
            bacAverage: nextProps.criterias[0].value || this.state.criterias[0].value,
            bacRomanian: nextProps.criterias[1].value || this.state.criterias[1].value,
            average9: nextProps.criterias[2].value || this.state.criterias[2].value,
            average10: nextProps.criterias[3].value || this.state.criterias[3].value,
            average11: nextProps.criterias[4].value || this.state.nextProps.criterias[4].value,
            average12: nextProps.criterias[5].value || this.state.nextProps.criterias[5].value
        })
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