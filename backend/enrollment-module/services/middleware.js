module.exports.withSecurityHeaders = async (ctx, next) => {
  ctx.user = {
    id: ctx.request.headers['x-id'],
    email: ctx.request.headers['x-email'],
    type: ctx.request.headers['x-type'],
  };

  await next();
};
