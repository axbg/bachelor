import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminControl from '../adminControl/index';
import AdminSorting from '../adminSorting/index';
import AdminAddUser from '../adminAddUser';
import AdminSearch from '../adminSearch';

const OperatorRouter = () => (
  <Switch>
    <Route path="/admin/control" component={AdminControl} />
    <Route path="/admin/sorting" component={AdminSorting} />
    <Route path="/admin/add-user" component={AdminAddUser} />
    <Route path="/admin/search" component={AdminSearch} />
  </Switch>
);

export default OperatorRouter;
