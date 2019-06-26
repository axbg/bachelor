import React from 'react';
import { Switch, Route } from "react-router-dom";
import VolunteerCheck from "../volunteerCheck/index";
import VolunteerGenerateOrderNumber from "../volunteerGenerateOrderNumber/index";
import VolunteerPosition from '../volunteerPosition';

const OperatorRouter = () => (
    <Switch>
        <Route path="/volunteer/check" component={VolunteerCheck} />
        <Route path="/volunteer/generate" component={VolunteerGenerateOrderNumber} />
        <Route path="/volunteer/position" component={VolunteerPosition} />
    </Switch>
);

export default OperatorRouter;