const paymentService = require('../services/payment');
const httpHelper = require('../utils/httpHelper');

module.exports.updateCredits = async (ctx) => {
  const studentId = ctx.user.type === 'STUDENT' ? ctx.user.id : ctx.request.body.studentId;
  const credits = ctx.user.type === 'STUDENT' ? await paymentService.updateCreditsAsStudent(ctx.request.body, studentId) :
    await paymentService.updateCreditsAsCashier(studentId, ctx.request.body);
  return httpHelper.createHttpResponse(ctx, 200, { credits: credits });
};

module.exports.updateTax = async (ctx) => {
  await paymentService.updateTax(ctx.request.body);
  httpHelper.createHttpResponse(ctx, 200, 'Tax field updated');
};
