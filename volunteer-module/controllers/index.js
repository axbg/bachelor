const userService = require('../services/user');
const studentService = require('../services/student');
const httpHelper = require('../utils/httpHelper');

module.exports.createUser = async (ctx) => {
    const user = await userService.createUser(ctx.request.body);
    httpHelper.createHttpResponse(ctx, 201, { user: user });
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
