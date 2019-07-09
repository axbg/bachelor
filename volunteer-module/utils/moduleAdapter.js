const axios = require('axios');
const MAIL_MODULE_PATH = require('../config/index').MAIL_ADDRESS;

module.exports.sendMail = (subject, message, destination) => {
    const mailData = {
        message: message,
        title: subject,
        destination: destination
    };

    axios.post(MAIL_MODULE_PATH, { ...mailData });
}