const axios = require('axios');
const jwt = require('jsonwebtoken');

const MAIL_MODULE_PATH = require('../config').MAIL_ADDRESS;
const JWT_SECRET = require('../config').JWT_SECRET;

module.exports.sendMail = (subject, message, destination, authorization) => {
  const mailData = {
    message: message,
    title: subject,
    destination: destination,
  };

  const fakeJwt = jwt.sign({}, JWT_SECRET);

  const headers = {
    'Authorization': 'Bearer ' + fakeJwt,
  };

  // has to hack the gateway because it doesn't own jwt headers
  axios.post(MAIL_MODULE_PATH, { ...mailData }, { headers: headers });
};
