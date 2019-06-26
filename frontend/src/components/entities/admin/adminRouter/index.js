import React from 'react';
import { Switch, Route } from "react-router-dom";
import AdminControl from "../adminControl/index";
import AdminSorting from "../adminSorting/index";

const OperatorRouter = () => (
    <Switch>
        <Route path="/admin/control" component={AdminControl} />
        <Route path="/admin/sorting" component={AdminSorting} />
        <Route path="/admin/add-user" component={AdminSorting} />
        <Route path="/admin/search" component={AdminSorting} />
    </Switch>
);

export default OperatorRouter;