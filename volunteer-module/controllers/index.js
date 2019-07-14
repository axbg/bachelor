const userService = require('../services/user');
const studentService = require('../services/student');
const httpHelper = require('../utils/httpHelper');

module.exports.createUser = async (ctx) => {
    httpHelper.createHttpResponse(ctx, 201, { volunteers: await userService.createUser(ctx.request.body) });
}

module.exports.subscribe = async (ctx) => {
    await userService.subscribe(ctx.request.body.notificationToken, ctx.user.id);
}

module.exports.loadUser = async (ctx) => {
    const user = await userService.loadUser(ctx.user.id);
    httpHelper.createHttpResponse(ctx, 200, { user: user });
}

module.exports.searchStudent = async (ctx) => {
    const student = await studentService.findStudent(ctx.params.search, ctx.user.id);
    student ? httpHelper.createHttpResponse(ctx, 200, { student: student })
        : httpHelper.createHttpResponse(ctx, 404);
}

module.exports.generateOrderNumber = async (ctx) => {
    const orderNumber = await studentService.generateOrderNumber(ctx.request.body);
    httpHelper.createHttpResponse(ctx, 200, { orderNumber: orderNumber });
}

module.exports.getPositions = async (ctx) => {
    httpHelper.createHttpResponse(ctx, 200, await userService.getPositions(ctx.user.id));
}

module.exports.createPositionRequest = async (ctx) => {
    httpHelper.createHttpResponse(ctx, 201,
        { positionRequest: await userService.createPositionRequest(ctx.request.body, ctx.user.id) });
}

module.exports.createFlow = async (ctx) => {
    await userService.createFlow(ctx.request.body, ctx.user.id);
    httpHelper.createHttpResponse(ctx, 200, "Created flow");
}

module.exports.notifyStudent = async (ctx) => {
    await studentService.notifyStudent(ctx.request.body.studentId);
    httpHelper.createHttpResponse(ctx, 200, "Notification sent");
}

module.exports.notifyStudents = async (ctx) => {
    await studentService.notifyStudents(ctx.request.body.numberOfStudents, ctx.user.id);
    httpHelper.createHttpResponse(ctx, 200, "Notifications sent");
}

module.exports.notifyUser = async (ctx) => {
    await userService.notifyUser(ctx.request.body.userId);
    httpHelper.createHttpResponse(ctx, 200, "Notification sent");
}

module.exports.getFaculties = async (ctx) => {
    httpHelper.createHttpResponse(ctx, 200, { faculties: await userService.getFaculties() })
}

module.exports.getRoles = async (ctx) => {
    httpHelper.createHttpResponse(ctx, 200, { roles: await userService.getRoles() });
}