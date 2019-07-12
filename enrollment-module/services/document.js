const generateError = require('../utils/FlowError').generateError;
const Document = require('../models/index').Document;
const pdfMake = require('pdfmake/build/pdfmake');
const vfsFonts = require('pdfmake/build/vfs_fonts');
const sendEnrollmentMail = require('./student').sendEnrollmentMail;
pdfMake.vfs = vfsFonts.pdfMake.vfs;

const generateEnrollmentDocument = async (authToken, studentId, document) => {
    const documentDefintion = {
        content: [
            'First paragraph',
            'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
        ]
    };

    pdfMake.createPdf(documentDefintion).getBase64(async (result) => {
        await Document.create({
            title: document.title,
            file: result,
            studentId: studentId
        });
        sendEnrollmentMail(authToken, result, studentId);
    });
}

module.exports = {
    generateEnrollmentDocument
}