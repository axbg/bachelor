import React, { Component } from "react";
import { Route } from "react-router-dom";

const checkAuthority = (authority) => {
    //get user authorities using props
    //compare it with what it's needed
    //allow or not
    console.log("salut");
    return true;
};

export const PrivateRoute = ({ component: Component, authority: authority, ...rest }) => {
    return checkAuthority(authority) ?
        <Route
            {...rest}
            render={props => <Component {...props} />} />
        :
        console.log("salut")
};