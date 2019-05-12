import React, { Component } from 'react';
import "./index.css";
import { Switch } from "react-router-dom";
import { PrivateRoute } from "../privateRoute/index";
import StudentRouter from '../../entities/student/studentRouter';
import { USER_ROLES } from '../../../constants/index';

class Container extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <div className="grid-container">
                <div className="app-container">
                    <Switch>
                        <PrivateRoute path="/student" component={StudentRouter} authorityNeeded={USER_ROLES.STUDENT}
                            userAuthority={this.props.role} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Container;