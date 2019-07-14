const documentService = require('../services/document');
const studentService = require('../services/student');
const httpHelper = require('../utils/httpHelper');

module.exports.enrollStudent = async (ctx) => {
    await studentService.enrollStudent(ctx.request.body.studentId);
    await documentService.generateEnrollmentDocument(ctx.request.headers.authorization, ctx.request.body.studentId);
    httpHelper.createHttpResponse(ctx, 200, "Student was enrolled");
}