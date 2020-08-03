const User = require('../models').User;
const Role = require('../models').Role;
const generateError = require('../utils/FlowError').generateError;

module.exports.withAdminValidation = async (ctx, next) => {
  const user = await User.findOne({ where: { id: ctx.state.user.id }, include: [{ model: Role }] });
  user.role && user.role.role === 'ADMIN' || generateError('Unauthorized: only administrators allowed', 403);
  await next();
};
