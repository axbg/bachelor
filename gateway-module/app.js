const express = require("express");
const proxy = require('http-proxy-middleware');
const constants = require('./constants');
const Student = require('./models/index').Student;
const User = require('./models/index').User;
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('constants')

const app = express();

app.use("/login", async (ctx) => {
    //search for a student based on email and password
    //if the email contains "ase" consult the User Model
    //else consult the Student model
    //encrypt data resulted from the search in a jwt
    //return the jwt
});

app.use("/student", proxy({
    target: constants.BASE_URL + constants.STUDENT_MODULE_PORT, pathRewrite: {
        "/student": ""
    }
}))

app.use("/mail", proxy({
    target: constants.BASE_URL + constants.MAILING_MODULE_PORT, pathRewrite: {
        "/mail": ""
    }
}))

app.listen(constants.GATEWAY_MODULE_PORT,
    () => console.log("Gateway module started on " + constants.BASE_URL + constants.GATEWAY_MODULE_PORT));