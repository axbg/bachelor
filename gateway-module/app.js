const express = require("express");
const constants = require('./constants');
const Student = require('./models/index').Student;
const User = require('./models/index').User;
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('constants')
const findByCredentials = require('./services/login').findByCredentials;
const extractFromJWT = require('./services/authentication').extractFromJWT;

const app = express();

const proxy_options = {
    onProxyReq(proxyReq, req, res) {
        //add user_id, user_type, user_role extracted from jwt to custom headers
    }
}

const proxy = require('http-proxy-middleware');

app.get("/", async (req, res) => {
    //search for a student based on email and password
    //if the email contains "ase" consult the User Model
    //else consult the Student model
    //encrypt data resulted from the search in a jwt
    //return the jwt
    res.status(200).send({ message: "flow - gateway module" });
});

//example of header attachment
app.get("/test1", (req, res) => {
    console.log(req.headers);
    res.status(200).send({ message: "good" });
})

app.use("/test", proxy({
    target: "http://localhost:8010", pathRewrite: { "/test": "/test1" },
    onProxyReq: extractFromJWT
}))

//public
app.use('/login', (req, res) => {
    return findByCredentials(req.body.email, req.body.password);
})

//private
app.use("/student", proxy({
    target: constants.BASE_URL + ":" + constants.STUDENT_MODULE_PORT, pathRewrite: {
        "/student": ""
    }
}))

app.use("/mail", proxy({
    target: constants.BASE_URL + ":" + constants.MAILING_MODULE_PORT, pathRewrite: {
        "/mail": ""
    }
}))

app.listen(constants.GATEWAY_MODULE_PORT,
    () => console.log("Gateway module started on " + constants.BASE_URL + ":" + constants.GATEWAY_MODULE_PORT));