const studentService = require('../services/student');
const httpHelper = require('../utils/httpHelper');
const sendRegistrationMail = require('../services/student').sendRegistrationMail;

module.exports.getDocuments = async (ctx) => {
    console.log("getting documents");
    ctx.body = { message: "flow - student module - student get documents" };
}

module.exports.getDocument = async (ctx) => {
    console.log("getting documents");
    ctx.body = { message: "flow - student module - student get detailed document" };
}

module.exports.createStudent = async (ctx) => {
    const student = await studentService.createStudent(ctx.request.body);
    httpHelper.createHttpResponse(ctx, 201, "Registration successful!");
    sendRegistrationMail(student, subject, message, destination);
}