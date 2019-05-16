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
        password: ""
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
            <Button type="submit"  variant="contained" label="Submit" >Submit</Button>
          </ValidatorForm>
            </div>
        );
      }
}


export default StudentRegister;