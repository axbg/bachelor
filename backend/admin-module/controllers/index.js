const adminService = require('../services/admin');
const httpHelper = require('../utils/httpHelper');

module.exports.getVolunteers = async (ctx) => {
  httpHelper.createHttpResponse(ctx, 200, {
    volunteers: await adminService.getVolunteers(ctx.user.id, ctx.user.facultyId)
  });
};

module.exports.updateVolunteerRoleAndPosition = async (ctx) => {
  httpHelper.createHttpResponse(ctx, 200,
    { volunteers: await adminService.updateVolunteerRoleAndPosition(ctx.request.body, ctx.user.id, ctx.user.facultyId) });
};

module.exports.solvePositionRequest = async (ctx) => {
  await adminService.solvePositionRequest(ctx.request.headers.authorization,
    ctx.request.body.positionRequestId, ctx.request.body.response, ctx.user.facultyId);
  httpHelper.createHttpResponse(ctx, 200, 'Position updated');
};
