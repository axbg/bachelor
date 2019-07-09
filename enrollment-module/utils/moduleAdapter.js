const axios = require('axios');
const MAIL_MODULE_PATH = require('../config/index').MAIL_ADDRESS;

module.exports.sendMail = (authToken, subject, message, destination, attachment) => {
    const mailData = {
        message: message,
        title: subject,
        destination: destination,
        file: attachment
    };

    const headers = {
        'Authorization': authToken
    };

    axios.post(MAIL_MODULE_PATH, { ...mailData }, { headers: headers });
}