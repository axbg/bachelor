import React, { Component } from 'react';
import "./index.css";
import NavigationBar from '../../dumb/navigationBar';
import Container from '../../dumb/container';
import { USER_ROLES, STUDENT_NAVIGATION_OPTIONS, VOLUNTEER_NAVIGATION_OPTIONS, ADMIN_NAVIGATION_OPTIONS, CASHIER_NAVIGATION_OPTIONS, OPERATOR_NAVIGATION_OPTIONS } from '../../../constants';
import { connect } from 'react-redux';
import { loadStudentData } from '../../../reducers/studentReducer';
import { loadVolunteerData } from '../../../reducers/volunteerReducer';
import { mobileLayout } from '../../../reducers/shellReducer';
import Spinner from '../../dumb/spinner';
import BottomNavigationBar from '../../dumb/bottomNavigationBar';
import ReactResizeDetector from 'react-resize-detector';
import { toastr } from 'react-redux-toastr';

class Shell extends Component {
    componentDidMount() {
        if (window.localStorage.getItem("email").includes("@")) {
            this.props.loadStudentData();
        } else {
            this.props.loadVolunteerData();
        }
    }

    componentDidUpdate() {
        if (this.props.studentInitialLoadFailed || this.props.volunteerInitialLoadFailed) {
            toastr.warning("A apărut o eroare", "Reîncearcă mai târziu");
        }
    }

    onResize(width, height) {
        if (width < 620 && !this.props.mobileDevice) {
            this.props.mobileLayout(true);
        } else if (width >= 640 && this.props.mobileDevice) {
            this.props.mobileLayout(false);
        }
    }

    getNavigationOptions() {
        const role = this.props.volunteerRole || this.props.studentRole;
        switch (role) {
            case USER_ROLES.STUDENT:
                return STUDENT_NAVIGATION_OPTIONS;
            case USER_ROLES.ADMIN:
                return ADMIN_NAVIGATION_OPTIONS;
            case USER_ROLES.VOLUNTEER:
                return VOLUNTEER_NAVIGATION_OPTIONS;
            case USER_ROLES.CASHIER:
                return CASHIER_NAVIGATION_OPTIONS;
            case USER_ROLES.OPERATOR:
                return OPERATOR_NAVIGATION_OPTIONS;
            default:
                return VOLUNTEER_NAVIGATION_OPTIONS;
        }
    }

    render() {
        return (
            <div className="max-height">
                {
                    !this.props.volunteerLoading || !this.props.studentLoading ?
                        (<div className="max-height">
                            <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
                            {
                                this.props.mobileDevice ? ""
                                    : <NavigationBar position="fixed" options={this.getNavigationOptions()} />
                            }
                            <Container role={this.props.volunteerRole ? this.props.volunteerRole : this.props.studentRole} />
                            {
                                !this.props.mobileDevice ? ""
                                    :
                                    <div className="fix-bottom"><BottomNavigationBar options={this.getNavigationOptions()} /> </div>
                            }
                        </div>
                        )
                        :
                        <Spinner />
                }
            </div>
        )
    }
}

const mapStateToProps = ({ shellReducer, volunteerReducer, studentReducer }) => ({
    volunteerRole: volunteerReducer.role,
    volunteerLoading: volunteerReducer.loading,
    studentRole: studentReducer.role,
    studentLoading: studentReducer.loading,
    mobileDevice: shellReducer.mobileDevice,
    studentInitialLoadFailed: studentReducer.initialLoadFailed,
    volunteerInitialLoadFailed: volunteerReducer.initialLoadFailed
});

const mapDispatchToProps = { mobileLayout, loadStudentData, loadVolunteerData };

export default connect(mapStateToProps, mapDispatchToProps)(Shell);