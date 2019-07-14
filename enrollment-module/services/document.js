const generateError = require('../utils/FlowError').generateError;
const Document = require('../models/index').Document;
const pdfMake = require('pdfmake/build/pdfmake');
const vfsFonts = require('pdfmake/build/vfs_fonts');
const sendEnrollmentMail = require('./student').sendEnrollmentMail;
pdfMake.vfs = vfsFonts.pdfMake.vfs;

const generateEnrollmentDocument = async (authToken, studentId) => {
    const documentDefintion = {
        content: [
            'Admitere ASE',
            'Felicitari! ai fost inscris!'
        ]
    };

    pdfMake.createPdf(documentDefintion).getBase64(async (result) => {
        await Document.create({
            title: "Bun venit la ASE",
            file: result,
            studentId: studentId
        });
        sendEnrollmentMail(authToken, result, studentId);
    });
}

module.exports = {
    generateEnrollmentDocument
}