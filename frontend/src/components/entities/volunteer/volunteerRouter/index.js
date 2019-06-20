import React from 'react';
import { Switch, Route } from "react-router-dom";
import VolunteerCheck from "../volunteerCheck/index";
import VolunteerGenerateOrderNumber from "../volunteerGenerateOrderNumber/index";

const OperatorRouter = () => (
    <Switch>
        <Route path="/volunteer/check" component={VolunteerCheck} />
        <Route path="/volunteer/generate-order" component={VolunteerGenerateOrderNumber} />
    </Switch>
);

export default OperatorRouter;