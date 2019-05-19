import React, { Component } from 'react';
import "./index.css";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class StudentRegister extends Component {
  state = {
    firstName: "",
    lastName: "",
    initial: "",
    email: "",
    password: "",
    phone: "",
    cnp: "",
    idSeries: "",
    idNumber: "",
    idEntity: "",
    address: "",
    city: "",
    bacAverage: "",
    bacRomanian: "",
    average9: "",
    average10: "",
    average11: "",
    average12: "",
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
  };

  render() {
    return (
      <div className="register-container">
        <ValidatorForm ref="form" onSubmit={this.onSubmit} onError={errors => console.log(errors)}>
          <h1> Student Register Form </h1>
          <h4> All fields are required </h4>
          <TextValidator
            fullWidth
            label="First Name"
            onChange={this.change}
            name="firstName"
            value={this.state.firstName}
            validators={['required']}
            errorMessages={['This field is required']}
          />
          <br />
          <br />
          <TextValidator
            fullWidth
            label="Last Name"
            onChange={this.change}
            name="lastName"
            value={this.state.lastName}
            validators={['required']}
            errorMessages={['This field is required']}
          />
          <br />
          <br />
          <TextValidator
            fullWidth
            label="Email"
            onChange={this.change}
            name="email"
            value={this.state.email}
            validators={['required', 'isEmail']}
            errorMessages={['This field is required', 'not a valid email address']}
          />
          <br />
          <br />
          <TextValidator
            fullWidth
            type="password"
            label="Password"
            onChange={this.change}
            name="password"
            value={this.state.password}
            validators={['required']}
            errorMessages={['This field is required']}
          />
          <br />
          <br />
          <TextValidator
            fullWidth
            label="Father's Initial"
            onChange={this.change}
            name="initial"
            value={this.state.initial}
            validators={['required']}
            errorMessages={['This field is required']}
          />
          <br />
          <br />
          <TextValidator
            fullWidth
            label="Phone"
            onChange={this.change}
            name="phone"
            value={this.state.phone}
            validators={['required']}
            errorMessages={['This field is required']}
          />
          <br />
          <br />
          <TextValidator
            fullWidth
            label="PIN"
            onChange={this.change}
            name="cnp"
            value={this.state.cnp}
            validators={['required']}
            errorMessages={['This field is required']}
          />
          <br />
          <br />
          <TextValidator
            fullWidth
            label="ID Series"
            onChange={this.change}
            name="idSeries"
            value={this.state.idSeries}
            validators={['required']}
            errorMessages={['This field is required']}
          />
          <br />
          <br />
          <TextValidator
            fullWidth
            label="ID Number"
            onChange={this.change}
            name="idNumber"
            value={this.state.idNumber}
            validators={['required']}
            errorMessages={['This field is required']}
          />
          <br />
          <br />
          <TextValidator
            fullWidth
            label="ID published by"
            onChange={this.change}
            name="idEntity"
            value={this.state.idEntity}
            validators={['required']}
            errorMessages={['This field is required']}
          />
          <br />
          <br />
          <TextValidator
            fullWidth
            label="Address"
            onChange={this.change}
            name="address"
            value={this.state.address}
            validators={['required']}
            errorMessages={['This field is required']}
          />
          <br />
          <br />
          <TextValidator
            fullWidth
            label="City"
            onChange={this.change}
            name="city"
            value={this.state.city}
            validators={['required']}
            errorMessages={['This field is required']}
          />
          <br />
          <br />
          <TextValidator
            fullWidth
            label="Baccalaureate Average Grade"
            onChange={this.change}
            name="bacAverage"
            value={this.state.bacAverage}
            validators={['required']}
            errorMessages={['This field is required']}
          />
          <br />
          <br />
          <TextValidator
            fullWidth
            label="Baccalaureate - Romanian Exam Grade"
            onChange={this.change}
            name="bacRomanian"
            value={this.bacRomanian}
            validators={['required']}
            errorMessages={['This field is required']}
          />
          <br />
          <br />
          <TextValidator
            fullWidth
            label="9th Grade Average"
            onChange={this.change}
            name="average9"
            value={this.state.average9}
            validators={['required']}
            errorMessages={['This field is required']}
          />
          <br />
          <br />
          <TextValidator
            fullWidth
            label="10th Grade Average"
            onChange={this.change}
            name="average10"
            value={this.state.average10}
            validators={['required']}
            errorMessages={['This field is required']}
          />
          <br />
          <br />
          <TextValidator
            fullWidth
            label="11th Grade Average"
            onChange={this.change}
            name="average11"
            value={this.state.average11}
            validators={['required']}
            errorMessages={['This field is required']}
          />
          <br />
          <br />
          <TextValidator
            fullWidth
            label="12th Grade Average"
            onChange={this.change}
            name="average12"
            value={this.state.average12}
            validators={['required']}
            errorMessages={['This field is required']}
          />
          <br />
          <br />
          <Button type="submit" variant="contained" label="Submit" >Submit</Button>
        </ValidatorForm>
      </div>
    );
  }
}


export default StudentRegister;