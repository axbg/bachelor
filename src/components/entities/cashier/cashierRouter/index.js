import React from 'react';
import { Switch, Route } from "react-router-dom";
import CashierCredits from "../cashierCredits/index";

const OperatorRouter = () => (
    <Switch>
        <Route path="/cashier/credits" component={CashierCredits} />
    </Switch>
);

export default OperatorRouter;