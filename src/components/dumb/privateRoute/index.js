import React from "react";
import { Route } from "react-router-dom";
import CustomSnackbar from "../customSnackbar/index";

const checkAuthority = (authorityNeeded, userAutority) => {
    return authorityNeeded === userAutority;
};

export const PrivateRoute = ({
    component: Component, authorityNeeded, userAuthority, ...rest }) => {
    return checkAuthority(authorityNeeded, userAuthority) ?
        <Route
            {...rest}
            render={props => <Component {...props} />} />
        :
        <CustomSnackbar opened={true} />
};