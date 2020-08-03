import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import { register } from '../../../../reducers/studentRegistrationReducer';
import MultistepData from '../../../smart/multistepData';

class StudentRegister extends Component {
  render() {
    // move the login inside the container and add some nice images
    // add a spinner for loading
    if (this.props.loading) {
      return (
        <div>
          <h1>loading</h1>
        </div>
      );
    } else if (this.props.registered) {
      return (
        <div>
          <h1>Congrats {this.state.firstname}! You are registered! Check your email!</h1>
        </div>
      );
    } else if (this.props.error) {
      return (
        <div>
          <h2>Something bad happened</h2>
        </div>
      );
    }
    return (
      <div className="register-container">
        <div className="register-logo">
          <img src="/logo_transparent.png" alt="logo" />
        </div>
        <div className="register-container-fields">
          <MultistepData />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ studentRegistrationReducer }) => ({
  loading: studentRegistrationReducer.loading,
  registered: studentRegistrationReducer.registered,
  error: studentRegistrationReducer.error,
});

const mapDispatchToProps = { register };

export default connect(mapStateToProps, mapDispatchToProps)(StudentRegister);
