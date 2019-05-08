const express = require("express");
const proxy = require('http-proxy-middleware');
const constants = require('./constants');

const app = express();

app.use("/student", proxy({
    target: constants.BASE_URL + constants.STUDENT_MODULE_PORT, pathRewrite: {
        "/student": "/"
    }
}))

app.listen(constants.GATEWAY_MODULE_PORT,
    () => console.log("Gateway module started on " + constants.BASE_URL + constants.GATEWAY_MODULE_PORT));