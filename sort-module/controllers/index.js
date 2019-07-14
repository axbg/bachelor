const adminService = require('../services/admin');
const httpHelper = require('../utils/httpHelper');

module.exports.drySort = async (ctx) => {
    await adminService.checkSortDetails(ctx.request.body.email, ctx.request.body.iteration);
    adminService.sort(true, ctx.state.user.id, ctx.headers.authorization, ctx.request.body.email,
        ctx.request.body.iteration);
    httpHelper.createHttpResponse(ctx, 200, "Dry sort process started");
}

module.exports.sort = async (ctx) => {
    await adminService.checkSortDetails(ctx.request.body.email, ctx.request.body.iteration);
    adminService.sort(false, ctx.state.user.id, ctx.headers.authorization, ctx.request.body.email,
        ctx.request.body.iteration);
    httpHelper.createHttpResponse(ctx, 200, "Sort process started");
}

module.exports.getIterations = async (ctx) => {
    httpHelper.createHttpResponse(ctx, 200, { iterations: await adminService.getIterations() });
}

module.exports.downloadDocuments = async (ctx) => {
    
}