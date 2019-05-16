import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Login from '../../smart/login';
import StudentRegister from '../../entities/student/studentRegister';

const UnprotecterRouter = () => (
    <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={StudentRegister} />
        <Redirect to="/register" />
    </Switch>
);

export default UnprotecterRouter;