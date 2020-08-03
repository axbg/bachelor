const MAILGUN_API_KEY = require('../config').MAILGUN_API_KEY;
const MAILGUN_DOMAIN = require('../config').MAILGUN_DOMAIN;
const ADMIN_EMAIL = require('../config').ADMIN_EMAIL;

const mailgun = require('mailgun-js')({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });
const Document = require('../models').Document;

const withAttachment = async (data) => {
  if (data.file) {
    return new mailgun.Attachment({ data: Buffer.from(data.file, 'base64'), filename: 'ADMITERE_ASE.pdf' });
  } else if (data.multiple && data.userId) {
    const documents = await Document.findAll({
      where: { userId: data.userId, iteration: data.iteration },
      attributes: ['title', 'file'],
    });


    const attachments = [];
    for (let index = 0; index < documents.length; index++) {
      attachments.push(new mailgun.Attachment(
        { data: Buffer.from(documents[index].file, 'base64'), filename: documents[index].title }));
    }

    return attachments;
  }
};

const buildMailData = async (data) => {
  return {
    from: ADMIN_EMAIL,
    to: data.destination,
    subject: data.title,
    text: data.message,
    attachment: await withAttachment(data),
  };
};

module.exports.sendEmail = async (ctx) => {
  if (!ctx.request.body.message || !ctx.request.body.title || !ctx.request.body.destination) {
    ctx.body = { message: 'The request is missing one of the mandatory fields: title, message, destination' };
    ctx.status = 400;
    return;
  }

  ctx.body = { message: 'Email will be sent as soon as possible' };

  const mailData = await buildMailData(ctx.request.body);

  mailgun.messages().send(mailData, (error, body) => {
  });
};
