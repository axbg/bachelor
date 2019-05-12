import React from 'react';
import { Switch, Route } from "react-router-dom";
import Login from "../../../smart/login";

const StudentRouter = () => (
      <Switch>
        <Route exact path="/student/home" component={Login}/>
      </Switch>
  );
  
  export default StudentRouter;