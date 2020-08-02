const User = require('../models').User;
const Role = require('../models').Role;
const generateError = require('../utils/FlowError').generateError;

module.exports.withSecurityHeaders = async (ctx, next) => {
  ctx.user = {
    id: ctx.request.headers['x-id'],
    email: ctx.request.headers['x-email'],
    type: ctx.request.headers['x-type'],
  };

  await next();
};

module.exports.withAdminValidation = async (ctx, next) => {
  const user = await User.findOne({ where: { id: ctx.user.id }, include: [{ model: Role }] });
  user.role.role === 'ADMIN' || generateError('Unauthorized: only administrators allowed', 403);
  ctx.user.facultyId = user.facultyId;
  await next();
};
