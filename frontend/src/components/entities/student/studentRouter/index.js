import React from 'react';
import { Switch, Route } from 'react-router-dom';
import StudentHome from '../studentHome/index';
import StudentProfile from '../studentProfile/index';
import StudentRegistrationDay from '../studentRegistrationDay/index';
import StudentCredits from '../studentCredits/index';

const StudentRouter = () => (
  <Switch>
    <Route path="/student/home" component={StudentHome} />
    <Route path="/student/profile" component={StudentProfile} />
    <Route path="/student/registration-day" component={StudentRegistrationDay} />
    <Route path="/student/credits" component={StudentCredits} />
  </Switch>
);

export default StudentRouter;
