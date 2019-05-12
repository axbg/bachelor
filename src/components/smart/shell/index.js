import React, { Component } from 'react';
import "./index.css";
import NavigationBar from '../../dumb/navigationBar';
import Container from '../../dumb/container';
import { USER_ROLES, STUDENT_NAVIGATION_OPTIONS } from '../../../constants/index';
import { connect } from 'react-redux';
import { authenticate } from '../../../reducers/authReducer';
import Spinner from '../../dumb/spinner/index';

//will be changed based on user role
//this will retrieve from back-end what navigation tabs should be displayed
//this also will retrieve user data such as role


class Shell extends Component {

    componentDidMount() {
        this.props.authenticate();
    }

    getNavigationOptions() {
        switch (this.props.role) {
            case USER_ROLES.STUDENT:
                return STUDENT_NAVIGATION_OPTIONS;
            case USER_ROLES.ADMIN:
            case USER_ROLES.VOLUNTEER:
            case USER_ROLES.CASHIER:
            case USER_ROLES.OPERATOR:
            default:
                return STUDENT_NAVIGATION_OPTIONS;
        }
    }

    render() {
        return (
            <div className="max-height">
                {
                    this.props.loaded ?
                        (<div className="max-height">
                            <NavigationBar position="static" options={this.getNavigationOptions()} />
                            <Container role={this.props.role} />
                        </div>
                        )
                        :
                        <Spinner/>
                }
            </div>
        )
    }
}

const mapStateToProps = ({ shellReducer, authReducer }) => ({
    shell: shellReducer,
    role: authReducer.role,
    loaded: authReducer.loaded
});

const mapDispatchToProps = { authenticate };

export default connect(mapStateToProps, mapDispatchToProps)(Shell);