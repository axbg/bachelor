const express = require("express");
const constants = require('./constants');
const findByCredentials = require('./services/login').findByCredentials;
const extractFromJWT = require('./services/authentication').extractFromJWT;
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const JWT_SECRET = require('./constants').JWT_SECRET;
const cors = require('cors');
const app = express();
const proxy = require('http-proxy-middleware');

app.use(cors({ credentials: true, origin: 'http://localhost:4000' }));

app.get("/", async (req, res) => {
    res.status(200).send({ message: "flow - gateway module" });
});

//public
app.post('/login', bodyParser.json(), async (req, res) => {
    const jwt = await findByCredentials(req.body.email, req.body.password);

    if (jwt) { return res.status(200).send({ jwt: jwt }); }

    return res.status(400).send({ message: "Credentials not matched." });
});

app.use("/student/create", proxy({
    target: constants.STUDENT_BASE_URL + ":" + constants.STUDENT_MODULE_PORT, pathRewrite: {
        "/student/create": "/create"
    }
}));

app.use("/volunteer/create", proxy({
    target: constants.VOLUNTEER_BASE_URL + ":" + constants.VOLUNTEER_MODULE_PORT, pathRewrite: {
        "/volunteer/create": "/create"
    }
}));

app.use("/socket.io", proxy({
    target: constants.SCREENING_MODULE_URL + ":" + constants.SCREENING_MODULE_PORT, pathRewrite: {
        "/screening": ""
    }, ws: true
}));

//private
app.use(jwt({ secret: JWT_SECRET }));

app.use("/student", proxy({
    target: constants.STUDENT_BASE_URL + ":" + constants.STUDENT_MODULE_PORT, pathRewrite: {
        "/student": ""
    },
    onProxyReq: extractFromJWT
}));

app.use("/mail", proxy({
    target: constants.MAILING_BASE_URL + ":" + constants.MAILING_MODULE_PORT, pathRewrite: {
        "/mail": ""
    }
}));

app.use("/enrollment", proxy({
    target: constants.ENROLLMENT_BASE_URL + ":" + constants.ENROLLMENT_MODULE_PORT, pathRewrite: {
        "/enrollment": ""
    },
    onProxyReq: extractFromJWT
}));

app.use("/volunteer", proxy({
    target: constants.VOLUNTEER_BASE_URL + ":" + constants.VOLUNTEER_MODULE_PORT, pathRewrite: {
        "/volunteer": ""
    },
    onProxyReq: extractFromJWT
}));

app.use("/payment", proxy({
    target: constants.PAYMENT_BASE_URL + ":" + constants.PAYMENT_MODULE_PORT, pathRewrite: {
        "/payment": ""
    },
    onProxyReq: extractFromJWT
}));

app.use("/admin", proxy({
    target: constants.ADMIN_BASE_URL + ":" + constants.ADMIN_MODULE_PORT, pathRewrite: {
        "/admin": ""
    },
    onProxyReq: extractFromJWT
}));

app.listen(constants.GATEWAY_MODULE_PORT,
    () => console.log("Gateway module started on " + constants.BASE_URL + ":" + constants.GATEWAY_MODULE_PORT));
