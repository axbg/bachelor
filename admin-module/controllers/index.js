const adminService = require('../services/admin');
const httpHelper = require('../utils/httpHelper');

module.exports.getVolunteers = async (ctx) => {
    httpHelper.createHttpResponse(ctx, 200, { volunteers: await adminService.getVolunteers(ctx.user.id) });
}

module.exports.updateVolunteerRoleAndPosition = async (ctx) => {
    httpHelper.createHttpResponse(ctx, 200,
        { volunteers: await adminService.updateVolunteerRoleAndPosition(ctx.request.body, ctx.user.id) });
}