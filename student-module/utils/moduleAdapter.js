const axios = require('axios');
const jwt = require('jsonwebtoken');
const MAIL_MODULE_PATH = require('../config/index').MAIL_ADDRESS;
const JWT_SECRET = require('../config/index').JWT_SECRET;

module.exports.sendMail = (subject, message, destination) => {
    const mailData = {
        message: message,
        title: subject,
        destination: destination
    };

    //create fake jwt
    const fakeJwt = jwt.sign({}, JWT_SECRET);

    const headers = {
        'Authorization': fakeJwt
    };

    //has to hack the gateway because it doesn't own jwt headers
    axios.post(MAIL_MODULE_PATH, { ...mailData }, { headers: headers });
}