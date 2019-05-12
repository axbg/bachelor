import React, { Component } from 'react';
import "./index.css";
import { Switch } from "react-router-dom";
import { PrivateRoute } from "../router/index";
import StudentRouter from '../../entities/student/studentRouter';
import { USER_ROLES } from '../../../constants/index';

class Container extends Component {
    render() {
        return (
            <div className="grid-container">
                <div className="app-container">
                    <Switch>
                        <PrivateRoute path="/student" component={StudentRouter} authority={USER_ROLES.STUDENT} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Container;