import React, { Component } from 'react';
import "./index.css";
import { Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from "../privateRoute/index";
import StudentRouter from '../../entities/student/studentRouter';
import VolunteerRouter from '../../entities/volunteer/volunteerRouter';
import AdminRouter from '../../entities/admin/adminRouter';
import OperatorRouter from '../../entities/operator/operatorRouter';
import CashierRouter from '../../entities/cashier/cashierRouter';
import { USER_ROLES } from '../../../constants/index';
import Spinner from '../../dumb/spinner/index';
import { connect } from 'react-redux';

class Container extends Component {
    redirectToHome() {
        switch (this.props.role) {
            case USER_ROLES.STUDENT:
                return "/student/home";
            case USER_ROLES.ADMIN:
                return "/admin/control";
            case USER_ROLES.VOLUNTEER:
                return "/volunteer/check";
            case USER_ROLES.CASHIER:
                return "/cashier/credits";
            case USER_ROLES.OPERATOR:
                return "/operator/enrollment";
            default:
                return "";
        }
    }

    mountRoutes() {
        switch (this.props.role) {
            case USER_ROLES.STUDENT:
                return <PrivateRoute path="/student" component={StudentRouter} authorityNeeded={USER_ROLES.STUDENT}
                    userAuthority={this.props.role} />
            case USER_ROLES.ADMIN:
                return <PrivateRoute path="/admin" component={AdminRouter} authorityNeeded={USER_ROLES.ADMIN}
                    userAuthority={this.props.role} />
            case USER_ROLES.VOLUNTEER:
                return <PrivateRoute path="/volunteer" component={VolunteerRouter}
                    authorityNeeded={USER_ROLES.VOLUNTEER} userAuthority={this.props.role} />
            case USER_ROLES.CASHIER:
                return <PrivateRoute path="/cashier" component={CashierRouter} authorityNeeded={USER_ROLES.CASHIER}
                    userAuthority={this.props.role} />
            case USER_ROLES.OPERATOR:
                return <PrivateRoute path="/operator" component={OperatorRouter} authorityNeeded={USER_ROLES.OPERATOR}
                    userAuthority={this.props.role} />
            default:
                return "";
        }
    }

    render() {
        return (
            <div className="grid-container">
                {this.props.volunteerLoading || this.props.studentLoading ?
                    <Spinner />
                    :
                    <div className="app-container">
                        <Switch>
                            <Redirect exact from="/" to={this.redirectToHome()} />
                            {this.mountRoutes()}
                            <Redirect to="/" />
                        </Switch>
                    </div>
                }
            </div>
        );
    }
}


const mapStateToProps = ({ volunteerReducer, studentReducer }) => ({
    volunteerLoading: volunteerReducer.inAppLoading,
    studentLoading: studentReducer.inAppLoading,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Container)