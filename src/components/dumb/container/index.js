import React, { Component } from 'react';
import "./index.css";
import { Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from "../privateRoute/index";
import StudentRouter from '../../entities/student/studentRouter';
import { USER_ROLES } from '../../../constants/index';

class Container extends Component {

    componentDidMount() {
    }

    redirectToHome() {
        switch (this.props.role) {
            case USER_ROLES.STUDENT:
                return "/student/home";
            case USER_ROLES.ADMIN:
            case USER_ROLES.VOLUNTEER:
            case USER_ROLES.CASHIER:
            case USER_ROLES.OPERATOR:
            default:
                return "/";
        }
    }


    //make a "mountRoutes" method that returns the whole switch needed to avoid loading all the paths
    //this way, the privateRoute becomes kinda useless, because only allowed paths will be loaded for each role
    render() {
        return (
            <div className="grid-container">
                <div className="app-container">
                    <Switch>
                        <Redirect exact from="/" to={this.redirectToHome()} />
                        <PrivateRoute path="/student" component={StudentRouter} authorityNeeded={USER_ROLES.STUDENT}
                            userAuthority={this.props.role} />
                        <Redirect to="/" />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Container;