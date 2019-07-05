const studentService = require('../services/student');
const httpHelper = require('../utils/httpHelper');
const sendRegistrationMail = require('../services/student').sendRegistrationMail;

module.exports.createStudent = async (ctx) => {
    const student = await studentService.createStudent(ctx.request.body);
    httpHelper.createHttpResponse(ctx, 201, "Registration successful");
    //sendRegistrationMail(student);
}

module.exports.changePassword = async (ctx) => {
    await studentService.changePassword(ctx.request.body.password, ctx.user.id) ?
        httpHelper.createHttpResponse(ctx, 200, "Password changed") :
        httpHelper.createHttpResponse(ctx, 400, "Password too weak: minimum length 8, should contain at least one letter and one number");
}

module.exports.loadStudent = async (ctx) => {
    const studentData = await studentService.loadStudent(ctx.user.id);
    httpHelper.createHttpResponse(ctx, 200, { student: studentData });
}