const adminService = require('../services/admin');
const httpHelper = require('../utils/httpHelper');

module.exports.drySort = async (ctx) => {
    adminService.sort(true, ctx.state.user.id, ctx.headers.authorization, ctx.request.body.email);
    httpHelper.createHttpResponse(ctx, 200, "Dry sort process started");
}

module.exports.sort = async (ctx) => {
    adminService.sort(false, ctx.state.user.id, ctx.headers.authorization, ctx.request.body.email);
    httpHelper.createHttpResponse(ctx, 200, "Sort process started");
}