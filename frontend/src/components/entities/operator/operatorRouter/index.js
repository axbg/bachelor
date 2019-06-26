import React from 'react';
import { Switch, Route } from "react-router-dom";
import OperatorEnrollment from "../operatorEnrollment/index";

const OperatorRouter = () => (
    <Switch>
        <Route path="/operator/enrollment" component={OperatorEnrollment} />
        <Route path="/operator/profile/:identification" component={OperatorEnrollment} />
    </Switch>
);

export default OperatorRouter;