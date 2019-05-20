const MAILGUN_API_KEY = require('../config/index').MAILGUN_API_KEY;
const MAILGUN_DOMAIN = require('../config/index').MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });

module.exports.sendEmail = async (ctx) => {

    if (!ctx.request.body.message || !ctx.request.body.title || !ctx.request.body.destination) {
        ctx.body = { message: "The request is missing one of the mandatory fields: title, message, destination" };
        ctx.status = 400;
        return;
    }

    ctx.body = { message: "Email will be sent as soon as possible" };

    const mailData = {
        from: "bisagalexstefan@gmail.com", to: ctx.request.body.destination, subject: ctx.request.body.title,
        text: ctx.request.body.message
    };

    mailgun.messages().send(mailData, (error, body) => {
    })
}