import React, { Component } from 'react';
import './index.css';
import Swipper from '../../../dumb/swipper';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { toastr } from 'react-redux-toastr';
import { requestOrderNumber } from '../../../../reducers/studentReducer';

class StudentRegistrationDay extends Component {
  constructor() {
    super();
    this.state = {
      facultyId: 1,
    };
  }

  onChange(e) {
    this.setState({
      facultyId: e.target.value,
    });
  }

  requestOrderNumber() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = position.coords.latitude + '#' + position.coords.longitude;
          const payload = { location: location, facultyId: this.props.student.options.length === 0 ? this.state.facultyId : null };
          this.props.requestOrderNumber(payload);
        },
        (error) => toastr.error('Locația nu a putut fi calculată'));
  }

  render() {
    return (
      <div>
        {
                    this.props.student.orderNumber ?
                        <div className="student-registration-steps-container">
                          <h2>E ziua cea mare!</h2>
                          <h4>Numărul tău de ordine este {this.props.student.orderNumber}</h4>
                          <h4>Aruncă o privire în lista de mai jos pentru a vedea toți pașii pe care trebuie să îi urmezi</h4>
                          <div className="student-registration-steps">
                            <Swipper />
                          </div>
                        </div> :
                        <div className="student-registration-location-container">
                          {
                                this.props.student.options.length === 0 ?
                                    <div className="select">
                                      <select className="select-text" onChange={(e) => this.onChange(e)} value={this.state.facultyId} >
                                        {this.props.faculties.map((faculty, key) => <option key={key} value={faculty.id}>{faculty.name}</option>)}
                                      </select>
                                      <span className="select-highlight"></span>
                                      <span className="select-bar"></span>
                                      <label className="select-label">Facultate</label>
                                    </div> :
                                    <h4>Bonul de ordine va fi alocat facultății ce reprezintă prima ta opțiune</h4>
                          }
                          <Button variant="contained" color="primary" onClick={() => this.requestOrderNumber()}>Solicită un bon de ordine</Button>
                        </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ studentReducer }) => ({
  role: studentReducer.role,
  student: studentReducer,
  faculties: studentReducer.faculties,
});

const mapDispatchToProps = { requestOrderNumber };

export default connect(mapStateToProps, mapDispatchToProps)(StudentRegistrationDay);
