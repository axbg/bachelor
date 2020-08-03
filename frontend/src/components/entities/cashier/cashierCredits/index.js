import React, { Component } from 'react';
import './index.css';
import StudentProfile from '../../student/studentProfile';
import SearchBar from 'material-ui-search-bar';
import { connect } from 'react-redux';
import { loadStudentData } from '../../../../reducers/volunteerReducer';
import Spinner from '../../../dumb/spinner';
import { toastr } from 'react-redux-toastr';
import Button from '@material-ui/core/Button';
import { logout } from '../../../../reducers/authReducer';

class CashierCredits extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
    };
  }

  UNSAFE_UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.notFound) {
      toastr.error('Candidatul nu a fost găsit');
    }
  }

  updateSearchText(e) {
    this.setState({
      searchText: e,
    });
  }

  searchStudent() {
    this.props.loadStudentData(this.state.searchText);
  }

  render() {
    return (
      <div className="operator-enrollment-container">
        <div className="operator-search-container">
          <div style={{ padding: '10px' }}>
            <div className="inline-container">
              <SearchBar
                placeholder="Caută după număr de ordine sau CNP"
                value={this.state.searchText}
                onChange={(e) => this.updateSearchText(e)}
                onRequestSearch={() => this.searchStudent()}
                style={{
                  margin: '0 auto',
                  height: '80%',
                }}
              />
            </div>
            <Button color="primary" variant="contained" label="Submit" onClick={() => this.props.logout()}>Logout</Button>
          </div>
        </div>
        <br />
        {Object.keys(this.props.student).length !== 0 ?
          <StudentProfile /> :
          (this.props.searchLoading ?
            <Spinner /> :
            <div>
              <h1>Bună, {this.props.user.username}</h1>
              <h3>Poți căuta un candidat folosind CNP-ul sau numărul de ordine al acestuia, urmat de tasta Enter.</h3>
              <h2>Să începem!</h2>
            </div>
          )
        }
      </div>
    );
  }
}
const mapStateToProps = ({ volunteerReducer }) => ({
  user: volunteerReducer.volunteer,
  student: volunteerReducer.student,
  searchLoading: volunteerReducer.searchLoading,
  notFound: volunteerReducer.notFound,
});

const mapDispatchToProps = { loadStudentData, logout };

export default connect(mapStateToProps, mapDispatchToProps)(CashierCredits);
