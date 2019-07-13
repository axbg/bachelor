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
    httpHelper.createHttpResponse(ctx, 200, { ...studentData });
}

module.exports.updateStudent = async (ctx) => {
    const student = await studentService.updateStudent(ctx.request.body, ctx.user.id);
    student ? httpHelper.createHttpResponse(ctx, 200, { student: student })
        : httpHelper.createHttpResponse(ctx, 400, "Data cannot be modified after a student was enrolled");
}

module.exports.generateOrderNumber = async (ctx) => {
    const orderNumber = await studentService.generateOrderNumber(ctx.request.body, ctx.user.id);
    httpHelper.createHttpResponse(ctx, 200, { student: { orderNumber: orderNumber } });
}

module.exports.getOptions = async (ctx) => {
    const studentId = ctx.user.type === "STUDENT" ? ctx.user.id : ctx.params.studentId;
    const options = await studentService.getOptions(studentId);
    const student = await studentService.loadStudentData(studentId);
    httpHelper.createHttpResponse(ctx, 200, { options: options, student: student });
}

module.exports.createOption = async (ctx) => {
    const studentId = ctx.user.type === "STUDENT" ? ctx.user.id : ctx.params.studentId;
    await studentService.createOption(ctx.request.body, studentId);
    const options = await studentService.getOptions(studentId);
    const student = await studentService.loadStudentData(studentId);
    httpHelper.createHttpResponse(ctx, 200, { options: options, student: student });
}

module.exports.deleteOption = async (ctx) => {
    const studentId = ctx.user.type === "STUDENT" ? ctx.user.id : ctx.params.studentId;
    await studentService.deleteOption(ctx.params, studentId);
    const options = await studentService.getOptions(studentId);
    const student = await studentService.loadStudentData(studentId);
    httpHelper.createHttpResponse(ctx, 200, { options: options, student: student });
}
