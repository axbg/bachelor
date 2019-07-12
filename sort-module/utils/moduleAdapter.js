const axios = require('axios');
const MAIL_ADDRESS = require('../config/index').MAIL_ADDRESS;

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

    axios.post(MAIL_ADDRESS, { ...mailData }, { headers: headers });
}

module.exports.sendMultipleAttachmentsMail = (authToken, subject, message, destination) => {
    const mailData = {
        message: message,
        title: subject,
        destination: destination,
        multiple: true
    };

    const headers = {
        'Authorization': authToken
    };

    axios.post(MAIL_ADDRESS, { ...mailData }, { headers: headers });
}
