import React, { Component } from 'react';
import './index.css';
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class MultistepData extends Component {

    constructor(props) {
        super();
        this.state = {
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
            //if role is not student or admin or 
            maxPageNumber: 4
        };
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        // this.props.onSubmit(this.state);
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
                        this.state.currentPage < this.state.maxPageNumber ? <span className="student-navigation-right" onClick={this.increaseCurrentPage}>⇢</span> : ""
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
                        <div>
                            <h4 className="student-data-header">Date Sistem</h4>
                            <div>
                                <div className="student-credits-table-container">
                                    <h4>Număr credite: 0</h4>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className="no-padding-table-cell">#</TableCell>
                                                <TableCell>Facultate</TableCell>
                                                <TableCell className="no-padding-table-cell"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="no-padding-table-cell">21</TableCell>
                                                <TableCell>CSIE - Informatică Economică - Buget</TableCell>
                                                <TableCell className="no-padding-table-cell"><Button>Șterge</Button></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="no-padding-table-cell">21</TableCell>
                                                <TableCell>CSIE - Informatică Economică - Taxă</TableCell>
                                                <TableCell className="no-padding-table-cell"><Button>Șterge</Button></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                                <br />
                                <br />
                                <div className="options-select">
                                    <div className="select">
                                        <select className="select-text" required>
                                            <option value="" disabled></option>
                                            <option value="1">CSIE - Cibernetică Economică - Taxă</option>
                                            <option value="2">FABBV - Buget</option>
                                            <option value="3">FABBV - Taxa</option>
                                        </select>
                                        <span className="select-highlight"></span>
                                        <span className="select-bar"></span>
                                        <label className="select-label">Opțiuni</label>
                                    </div>
                                    <br />
                                    <Button variant="contained" color="primary">Adaugă Opțiune</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.currentPage !== 4 ?
                            <Button type="submit" color="primary" variant="contained" label="Submit" >Înregistrare</Button>
                            : ""
                    }
                </ValidatorForm>
            </div>
        );
    }
}

export default MultistepData;